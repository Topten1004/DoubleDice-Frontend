import { useState, useEffect, useLayoutEffect } from "react";

// Next
import { useRouter } from "next/router";

// Redux
import { useAppDispatch, useAppSelector } from "components/hooks/reduxHooks";
import { setFormData, removeFormData } from "components/createBetPage/ducks";

// Utils
import axios from "axios";
import * as S from "./StyledComponents";
import * as SC from "components/createBetPage/Main/StyledComponents";
import { toast } from "react-toastify";
import {
  encodeVirtualFloorMetadata,
  RoomEventInfo,
  VirtualFloorCreationParamsStruct,
} from "lib/contracts";
import { BigNumber as BigInteger, ethers } from "ethers";
import { validateRoomEventInfo } from "lib/metadata";
import { createVirtualFloor } from "web3Api/platformContract";
import { useWeb3React } from "@web3-react/core";
import { SpinnerDotted } from "spinners-react";
import { getUserBalance, increaseAllowanceIfNecessary } from "web3Api/tokenContract";
import Honeybadger from "@honeybadger-io/js";

// Components
import SelectButton from "components/shared/SelectButton";
import {
  convertNumToBigInt,
  isValidURL,
  maxInt,
  showError,
  slugifyUrl,
  ZERO,
} from "utils/helpers";
import SourceInput from "./SourceInput";
export interface SourcesI {
  title: string;
  url: string;
}

const Other = () => {
  const router = useRouter();
  const { active, activate, account, library } = useWeb3React();
  const [visibility, setVisibility] = useState<string | number>(
    "Public (Open to all, shown in lobby)"
  );
  const [isCheckboxClicked, setIsCheckboxClicked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sources, setSources] = useState<RoomEventInfo["resultSources"]>([ {title: "", url: ""}]);

  const createBetForm = useAppSelector((state) => state.createBetReducer);
  const dispatch = useAppDispatch();

  function handleRemoveSource(i: number) {
    const newSources = [...sources];
    newSources.splice(i, 1);
    setSources(newSources);
  }

  function handleSourceTitleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) {
    const newSources = [...sources];
    newSources[i].title = e.target.value;
    setSources(newSources);
  }

  function handleSourceLinkChange(
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) {
    const newSources = [...sources];
    newSources[i].url = e.target.value;
    setSources(newSources);
  }

  const createDiscordChannel = async (channelName: string) => {
    try {
      const res = await axios.post("/api/discord", { channelName });
      return res.data.data.id;
    } catch (error: any) {
      toast.error("Problem creating discord Channel");
      Honeybadger.notify(error);
    }
  };

  const pinataImageUpload = async (file: any) => {
    try {
      let data = new FormData();
      data.append("file", file);

      const headers = {
        pinata_api_key: process.env.PINATA_API_KEY as string,
        pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY as string,
      };

      const result = await axios.post(process.env.PINATA_URL as string, data, {
        headers,
      });
      if (result.data) {
        return result.data;
      }
    } catch (error: any) {
      toast.error("Error occurred while uploading image");
      Honeybadger.notify(error);
    }
  };

  const dataUrlToFile = async (dataUrl: string, filename: string) => {
    const arr = dataUrl.split(",");
    if (arr.length < 2) return undefined;
    const mimeArr = arr[0].match(/:(.*?);/);
    if (!mimeArr || mimeArr.length < 2) return undefined;
    const mime = mimeArr[1],
      buff = Buffer.from(arr[1], "base64");
    return new File([buff], filename.replaceAll("/", "_"), { type: mime });
  };

  const uploadFiles = async () => {
    const ipfsHashArray: RoomEventInfo["opponents"] = [];

    for (let i = 0; i < createBetForm.opponents.length; i++) {
      const image = createBetForm.opponents[i].image;
      const title = createBetForm.opponents[i].title;

      if (image) {
        const file = await dataUrlToFile(image, title);
        if (file) {
          const result = await pinataImageUpload(file);
          if (result && result.IpfsHash) {
            ipfsHashArray.push({
              title,
              image: `https://ipfs.doubledice.com/ipfs/${result.IpfsHash}`,
            });
          }
        }
      }
    }
    return ipfsHashArray;
  }

  const toggleNextStep = async () => {
    if (sources.length == 0) {
      toast.error("Please add at least one source");
      return;
    }

    for (let i = 0; i < sources.length; i++) {
      const url = sources[i].url;
      const title = sources[i].title;

      if (title.trim() === "") {
        toast.error(`Please add a title for Source #${i + 1}`);
        return;
      }

      if (url === "") {
        toast.error(`Please add a url for Source #${i + 1}`);
        return;
      }

      if (url.indexOf("https://") < 0 && url.indexOf("http://") < 0) {
        toast.error(`The url for Source #${i + 1} must have http:// or https:// protocol`);
        return;
      }

      if (!isValidURL(url)) {
        toast.error(`The url for Source #${i + 1} must be a valid URL`);
        return;
      }

      if (title.trim().length > 32) {
        toast.error("Title must be less than 32 characters");
        return;
      }
    }

    const urls = sources.map((source) => source.url);
    const titles = sources.map((source) => source.title);

    const isNotUniqueTitle = titles.some(
      (title, i) => titles.indexOf(title) !== i
    );

    const isNotUniqueUrl = urls.some((url, i) => urls.indexOf(url) !== i);

    if (isNotUniqueUrl) {
      toast.error("Source url must be unique");
      return;
    }

    if (isNotUniqueTitle) {
      toast.error("Source title must be unique");
      return;
    }

    if (!library || !account) {
      toast.error("Please connect your wallet to make this transaction");
      return;
    }

    if (!isCheckboxClicked) {
      toast.error("Please accept our Terms and condition to create the bet");
      return;
    }

    setIsLoading(true);
    const listed = visibility === "Public (Open to all, shown in lobby)" ? true : false;
    dispatch(setFormData({ resultSources: sources, isListed: listed }));
    const opponents = await uploadFiles();
    const discordChannelId = await createDiscordChannel(createBetForm.title);

    if (!discordChannelId) {
      toast.error("Unable to create betting discord channel");
      setIsLoading(false);
      return;
    }

    const metadata: RoomEventInfo = {
      title: createBetForm.title,
      description: createBetForm.description,
      category: createBetForm.category,
      subcategory: createBetForm.subCategory,
      opponents,
      outcomes: createBetForm.outcomes,
      resultSources: sources,
      isListed: listed,
      discordChannelId,
      extraData: "0x",
    };

    if (!validateRoomEventInfo(metadata)) {
      console.error(validateRoomEventInfo.errors);
      toast.error(JSON.stringify(validateRoomEventInfo.errors));
      setIsLoading(false);
      return;
    }

    const virtualFloorId = BigInteger.from(ethers.utils.randomBytes(8)).shl(
      5 * 8
    );

    const betaOpen_e18 = BigInteger.from(10)
      .pow(12)
      .mul(Number(createBetForm.multiplier) * 1_000000);
    const creationFeeRate_e18 = BigInteger.from(10)
      .pow(14)
      .mul(Number(createBetForm.rake) * 100);

    let tOpen = Number(createBetForm.tOpen);
    let tClose = Number(createBetForm.tClose);
    let tResolve = Number(createBetForm.tResolve);
    tOpen = tOpen - (tOpen % 60);
    tClose = tClose - (tClose % 60);
    tResolve = tResolve - (tResolve % 60);
    const nOutcomes = createBetForm.outcomes.length;

    try {
      const accountSigner = library.getSigner();

      const bigIntStartingPotAmount = createBetForm.startingPot
        ? convertNumToBigInt(
            10,
            createBetForm.paymentToken.decimals,
            createBetForm.startingPot
          )
        : BigInteger.from(0);

      if (bigIntStartingPotAmount.gt(ZERO)) {
        const balance = await getUserBalance(
          accountSigner,
          createBetForm.paymentToken.address,
          account
        );
        if (balance.lt(bigIntStartingPotAmount)) {
          toast.error("You do not have enough token to set your starting pot");
          setIsLoading(false);
          return;
        }
        await increaseAllowanceIfNecessary({
          signer: accountSigner,
          minAllowanceRequired: bigIntStartingPotAmount,
          tokenAddress: createBetForm.paymentToken.address
        });
      }

      const optionalMinCommitmentAmount = createBetForm.minimumBet
        ? convertNumToBigInt(
          10,
          createBetForm.paymentToken.decimals,
          createBetForm.minimumBet
        )
        : BigInteger.from(0);

      const optionalMaxCommitmentAmount = createBetForm.maximumBet
        ? convertNumToBigInt(
          10,
          createBetForm.paymentToken.decimals,
          createBetForm.maximumBet
        )
        : BigInteger.from(0);

      const params: VirtualFloorCreationParamsStruct = {
        virtualFloorId,
        betaOpen_e18,
        creationFeeRate_e18,
        tOpen,
        tClose,
        tResolve,
        nOutcomes,
        paymentToken: createBetForm.paymentToken.address,
        bonusAmount: bigIntStartingPotAmount,
        optionalMinCommitmentAmount,
        optionalMaxCommitmentAmount,
        metadata: encodeVirtualFloorMetadata(metadata),
      };

      const tx = await createVirtualFloor(accountSigner, params);
      if (tx) {
        toast.success("Congratulations! Bet creation was successful");
        router.push(
          `/success/${slugifyUrl("success", virtualFloorId.toString())}`
        );
        dispatch(removeFormData());
      }
    } catch (error: any) {
      setIsLoading(false);
      const { shortMessage, longMessage } = showError(error);
      toast.error(shortMessage);
      Honeybadger.notify(error);
    }
  };

  useLayoutEffect(() => {
    if (
      createBetForm.resultSources.length > 0
    ) {
      setSources([...createBetForm.resultSources]);
    }
    if (createBetForm.isListed)
      setVisibility("Public (Open to all, shown in lobby)");
    else if (createBetForm.isListed === false)
      setVisibility("Private (Invite only, not shown in lobby)");
  }, [createBetForm]);

  return (
    <S.Container>
      <SC.InputContainer>
        <SC.Title>
          Source of results<SC.Required>*</SC.Required>
        </SC.Title>
        {sources.map((source, i) => {
          return (
            <SourceInput
              key={i}
              handleSourceTitleChange={(e) => handleSourceTitleChange(e, i)}
              handleSourceLinkChange={(e) => handleSourceLinkChange(e, i)}
              handleRemoveSource={() => handleRemoveSource(i)}
              source={source}
              index={i}
              sourcesLength={sources.length}
            />
          );
        })}
      </SC.InputContainer>
      <SC.InputContainer>
        <SC.AddInputButton
          onClick={() => setSources([...sources, {title: "", url: ""}])}
        >
          Add Sources
        </SC.AddInputButton>
      </SC.InputContainer>
      <SC.InputContainer>
        <SC.Title>
          Visibility<SC.Required>*</SC.Required>
        </SC.Title>
        <SelectButton
          options={[
            "Public (Open to all, shown in lobby)",
            "Private (Invite only, not shown in lobby)",
          ]}
          setOption={setVisibility}
          selectedOption={visibility}
        />
      </SC.InputContainer>
      <S.CheckboxContainer>
        <S.Label>
          <S.CheckboxSubContainer>
            <S.HiddenCheckbox
              checked={isCheckboxClicked}
              onChange={() => setIsCheckboxClicked(!isCheckboxClicked)}
            />
            <S.StyledCheckbox checked={isCheckboxClicked}>
              <S.Icon viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </S.Icon>
            </S.StyledCheckbox>
          </S.CheckboxSubContainer>
          <S.Text>
            Agree to <S.Span>Ts and Cs</S.Span>
          </S.Text>
        </S.Label>
      </S.CheckboxContainer>
      <SC.ConfirmButton isDisabled={isLoading} onClick={toggleNextStep}>
        {/* Save and Preview &nbsp; */}
        {isLoading ? (
          <SpinnerDotted
            size={30}
            color="white"
            thickness={200}
            enabled={isLoading}
          />
        ) : (
          <S.ButtonText>Create bet page &nbsp;</S.ButtonText>
        )}
      </SC.ConfirmButton>
    </S.Container>
  );
};

export default Other;
