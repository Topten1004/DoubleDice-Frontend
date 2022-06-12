import { useEffect, useLayoutEffect, useState } from "react";
// Redux
import { useAppDispatch, useAppSelector } from "components/hooks/reduxHooks";
import { setFormData } from "components/createBetPage/ducks";

// Utils
import * as S from "./StyledComponents";
import * as SC from "components/createBetPage/Main/StyledComponents";
import { toast } from "react-toastify";
import { RoomEventInfo } from "lib/contracts";
import Honeybadger from '@honeybadger-io/js'

// GraphQL
import { gql } from "@apollo/client"
import client from "config/apolloConfig"
import { PaymentToken } from "lib/graph"
import { PAYMENT_TOKEN } from "graphql/queries";

// Components
import SelectButton from "components/shared/SelectButton"
import ImageInput from "./components/ImageInput";
import Options from "./components/Options";
import ImageBox from "./components/ImageBox";
import StartingPot from "./components/StartingPot";
import PaymentOptions from "../BetOptionDetails/components/PaymentOptions";

export interface HTMLInputEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & EventTarget;
}

interface PropsI {
  nextStep: () => void;
}

const BetOptionDetails = ({ nextStep }: PropsI) => {
  const [paymentOption, setPaymentOption] = useState<PaymentToken[]>([])
  const [paymentOptionNames, setPaymentOptionNames] = useState<string[]>([])
  const [selectedPaymentToken, setSelectedPaymentToken] = useState<string | number>("")
  const [betType, setBetType] = useState<string | number>("");
  const [opponents, setOpponents] = useState<RoomEventInfo["opponents"]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [startingPot, setStartingPot] = useState<string>("");
  const [imagesSrc, setImagesSrc] = useState<HTMLImageElement[]>([]);

  const createBetForm = useAppSelector((state) => state.createBetReducer);
  const dispatch = useAppDispatch();


  useEffect(() => {
    (async () => {
      try {
        const query = await client.query({
          query: PAYMENT_TOKEN
        });
        const paymentTokens = query.data.paymentTokens;

        const currencyNames: string[] = [];
        const currencies: PaymentToken[] = [];

        paymentTokens.forEach((paymentToken: PaymentToken) => {
          currencyNames.push(paymentToken.name);
          currencies.push({
            name: paymentToken.name,
            symbol: paymentToken.symbol,
            address: paymentToken.address,
            decimals: paymentToken.decimals,
            id: paymentToken.id,
          });
        });

        setPaymentOptionNames(currencyNames);
        setPaymentOption(currencies);

      } catch (error) {
        toast.error("Unable to fetch current supported payments")
        if (error instanceof Error) {
          Honeybadger.notify(error);
        }
      }
    })();
  }, []);


  const handleInputChange = (e: HTMLInputEvent, index: number) => {
    e.preventDefault();
    let newOpponents = [...opponents];
    newOpponents[index] = { ...newOpponents[index], title: e.target.value };
    setOpponents(newOpponents);
  };

  const toBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleUploadImage = async (e: HTMLInputEvent, index: number) => {
    e.preventDefault();
    const newImagesSrc = [...JSON.parse(JSON.stringify(imagesSrc))];
    if (e.target && e.target.files && e.target.files[0]) {
      const { size, type, name } = e.target.files[0];
      if (!type.toLowerCase().match(/image\/(jpg|jpeg|png|gif|webp)$/)) {
        toast.error(
          "Selected file image must be jpg, jpeg, png, gif or webp image only"
        );
        return;
      }

      if (size / 1000 <= 200) {
        try {
          newImagesSrc[index] = await toBase64(e.target.files[0]);
          setImagesSrc(newImagesSrc);
        } catch (error: any) {
          toast.error("We can't handle this image")
          Honeybadger.notify(error)
        }

        let newOpponents = [...opponents];
        newOpponents[index] = { ...newOpponents[index], image: newImagesSrc[index] };
        setOpponents(newOpponents);
      } else {
        toast.error('Image size should not exceed 200kb')
      }
    }
  };

  const handleSetOption = (e: string | number) => {
    setBetType(e);
    switch (e) {
      case "Single variable":
        setOpponents([{ title: "", image: "" }]);
        break;
      case "Two opponents":
        setOpponents(
          [{ title: "", image: "" }, { title: "", image: "" }]
        );
        break;
      case "Multiple opponents":
        setOpponents([
          { title: "", image: "" },
          { title: "", image: "" },
          { title: "", image: "" }
        ]);
        break;
      default:
        break;
    }
    setOptions([]);
    setStartingPot("");
  };

  const handleSetBetType = (numberOfOpponents: number) => {
    switch (true) {
      case numberOfOpponents === 1:
        setBetType("Single variable");
        break;
      case numberOfOpponents === 2:
        setBetType("Two opponents");
        break;
      case numberOfOpponents >= 3:
        setBetType("Multiple opponents");
        break;
      default:
        break;
    }
  };

  const handleRemoveOpponents = (index: number) => {
    const newOpponents = opponents.filter((opponent, i) => i !== index);
    setOpponents(newOpponents);
  };

  const toggleNextStep = () => {

    if (opponents.length > 1) {
      for (let i = 0; i < opponents.length; i++) {
        const image = opponents[i].image;
        const title = opponents[i].title;

        if (image === "") {
          toast.error(`Please upload an image for opponent #${i + 1}`);
          return;
        }

        if (title.trim() === "") {
          toast.error(`Please enter a name for opponent #${i + 1}`);
          return;
        }
      }
    } else if (opponents.length === 1) {
      if (opponents[0].image === "") {
        toast.error("Please upload an image");
        return;
      }

      if (opponents[0].title.trim() === "") {
        toast.error("Please enter a name");
        return;
      }
    }

    const titles = opponents.map((opponent) => opponent.title);
    const images = opponents.map((opponent) => opponent.image);

    const isNotUniqueName = titles.some(
      (title, i) => titles.indexOf(title) !== i
    );

    if (isNotUniqueName) {
      toast.error("Name must be unique");
      return;
    }

    const isNotUniqueImage = images.some(
      (image, i) => images.indexOf(image) !== i
    );

    if (isNotUniqueImage) {
      toast.error("Images must be unique");
      return;
    }

    if (options.length < 2) {
      if (options.length === 0) toast.error("Please add at least two options");
      else if (options.length === 1) toast.error("Please add at least one more option");
      return;
    }

    if (selectedPaymentToken === "") {
      toast.error("Please pick a payment Option");
      return;
    }

    if (Number(startingPot) < 0) {
      toast.error("Starting pot can not be less than zero");
      return;
    }

    const outcomes: RoomEventInfo["outcomes"] = [];

    for (let i = 0; i < options.length; i++) {
      const outcome = options[i];
      outcomes.push({ title: outcome });
    }

    const paymentToken = paymentOption.find(
      (option) => option.name == selectedPaymentToken
    );

    dispatch(
      setFormData({
        opponents,
        outcomes,
        paymentToken,
        startingPot: Number(startingPot),
      })
    );
    nextStep();
  };

  useLayoutEffect(() => {
    if (createBetForm) {

      if (createBetForm.outcomes) setOptions(createBetForm.outcomes.map(outcome => outcome.title))

      if (createBetForm.startingPot)
        setStartingPot(`${createBetForm.startingPot}`);
      if (createBetForm.opponents.length > 0) {
        setOpponents(createBetForm.opponents);
        const numberOfOpponents = createBetForm.opponents.length
        handleSetBetType(numberOfOpponents)
      }
      if (createBetForm.paymentToken.name) setSelectedPaymentToken(createBetForm.paymentToken.name)

    }
  }, [createBetForm]);

  useEffect(() => {
    handleSetBetType(opponents.length)
  }, [opponents.length])

  return (
    <S.Container>
      <SC.InputContainer>
        <SC.Title>
          Type of bet<SC.Required>*</SC.Required>
        </SC.Title>
        <SelectButton
          options={["Single variable", "Two opponents", "Multiple opponents"]}
          setOption={handleSetOption}
          selectedOption={betType}
        />
      </SC.InputContainer>
      <SC.InputContainer>
        {opponents.length > 1
          ? opponents.map((opponent, index) => {
            return (
              <ImageInput
                handleChange={handleUploadImage}
                handleInputChange={handleInputChange}
                handleRemoveOpponents={() => handleRemoveOpponents(index)}
                index={index}
                opponent={opponent}
                key={index}
              />
            );
          })
          : opponents.length === 1 && (
            <S.ImageInputContainer>
              <ImageBox
                handleChange={(e) => handleUploadImage(e, 0)}
                imageSrc={opponents[0].image}
                size={10}
                accept="image/jpg, image/jpeg, image/png, image/gif, image/webp"
              />
              <S.Message>
                {" "}
                Only JPG, JPEG, PNG, GIF & WEBP files are acceptble{" "}
              </S.Message>
              <S.InputSubContainer>
                <SC.Input
                  placeholder="Name"
                  onChange={(e) => handleInputChange(e, 0)}
                  value={opponents[0].title}
                  maxLength={30}
                />
              </S.InputSubContainer>
            </S.ImageInputContainer>
          )}
        {opponents.length > 2 && (
          <SC.AddInputButton
            onClick={() => setOpponents([...opponents, { title: "", image: "" }])}
          >
            Add Opponents
          </SC.AddInputButton>
        )}
      </SC.InputContainer>
      {opponents.length > 0 && (
        <Options setOptions={setOptions} options={options} />
      )}
      {betType && (
        <>
          <PaymentOptions
            setSelectedPaymentToken={setSelectedPaymentToken}
            paymentOptionNames={paymentOptionNames}
            selectedPaymentToken={selectedPaymentToken}
          />
          <StartingPot
            handleChange={setStartingPot}
            startingPot={startingPot}
          />
          <SC.ConfirmButton onClick={toggleNextStep}>
            Next Step
          </SC.ConfirmButton>
        </>
      )}
    </S.Container>
  );
};

export default BetOptionDetails;