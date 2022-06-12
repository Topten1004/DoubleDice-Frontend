import { useRef, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import axios from "axios";

// Utils
import { HiFlag } from "react-icons/hi";
import { osloGray } from "styles/colors";
import { toast } from "react-toastify";
import Honeybadger from '@honeybadger-io/js'

// Components
import * as S from "./StyledComponents";

// Hooks
import useOutsideAlerter from "components/hooks/clickedOutside";
import { VirtualFloor } from "lib/graph";

interface CheckboxValueI {
  [key: string]: boolean;
}

interface CheckboxI {
  className?: string;
  name: string;
  [key: string]: any;
}
interface PropsI {
  virtualFloor: VirtualFloor;
}
interface Reasons {
  [key: string]: string;
}

const ReportButton = ({ virtualFloor }: PropsI) => {
  const { account } = useWeb3React();

  const [checkBoxValues, setCheckBoxValues] = useState<CheckboxValueI>({
    "1": false,
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isOthersInputOpen, setIsOthersInputOpen] = useState<boolean>(false);
  const [othersInput, setOthersInput] = useState<string>("");
  const [userReport, setUserReport] = useState<Reasons | null>(null);
  const buttonRef = useRef(null);
  useOutsideAlerter(buttonRef, () => setIsModalOpen(false));

  const reports = ["Bet is confusing", "Bet is unethical", "Challenge set result/outcome"];

  const handleToggleOthersInput = (e: { target: HTMLInputElement }) => {
    setCheckBoxValues((prevState) => ({
      ...prevState,
      [e.target.name]: !prevState[e.target.name],
    }));

    setIsOthersInputOpen((prev) => !prev)
  }

  const handleToggle = (e: { target: HTMLInputElement }) => {
    setCheckBoxValues((prevState) => ({
      ...prevState,
      [e.target.name]: !prevState[e.target.name],
    }));

    if (e.target.checked) {
      setUserReport((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    } else {
      userReport && delete userReport[e.target.name];
    }
  }

  const Checkbox = ({ className, name, ...props }: CheckboxI) => (
    <S.CheckboxSubContainer className={className}>
      <S.HiddenCheckbox
        checked={Boolean(checkBoxValues && checkBoxValues[name])}
        name={name}
        {...props}
      />
      <S.StyledCheckbox
        checked={Boolean(checkBoxValues && checkBoxValues[name])}
      >
        <S.Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </S.Icon>
      </S.StyledCheckbox>
    </S.CheckboxSubContainer>
  );

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      let reasons = [];

      if (userReport) {
        reasons.push(...Object.values(userReport));
      }
      if (othersInput) {
        reasons.push(othersInput);
      }
      const walletAddress = account ? account : "Not Provided"
      const postData = {
        virtualFloorId: virtualFloor.id,
        virtualFloorTitle: virtualFloor.title,
        reasons: reasons.toString(),
        account: walletAddress,
      };
      const request = await axios.post("/api/flag", postData);
      if (request.data.status === "success") {
        toast.success("Report submitted to the Admin")
        return;
      }
      if (request.data.status === "failed") {
        toast.error(request.data.message);
        return;
      }

    } catch (error: any) {
      if (error instanceof Error) {
        toast.error(error?.message);
        Honeybadger.notify(error)
      }
    }
  };


  return (
    <S.Container>
      <S.SubContainer ref={buttonRef}>
        <S.IconButton onClick={() => setIsModalOpen(true)}>
          <HiFlag size={20} color={osloGray} />
        </S.IconButton>
        {isModalOpen && (
          <S.Modal>
            <S.Title>What is the issue?</S.Title>
            <form onSubmit={handleSubmit}>
              {reports.map((report, index) => (
                <S.CheckboxContainer key={report}>
                  <S.Label>
                    <Checkbox onChange={handleToggle} value={report} name={String(index)} />
                    <S.Span>{report}</S.Span>
                  </S.Label>
                </S.CheckboxContainer>
              ))}
              <S.CheckboxContainer>
                <S.Label>
                  <Checkbox onChange={handleToggleOthersInput} name={String(reports.length)} />
                  <S.Span>Others</S.Span>
                </S.Label>
              </S.CheckboxContainer>
              {isOthersInputOpen && <S.TextArea value={othersInput} onChange={(e) => setOthersInput(e.target.value)}></S.TextArea>}
              <S.ConfirmButton type="submit">Report</S.ConfirmButton>
            </form>
          </S.Modal>
        )}
      </S.SubContainer>
    </S.Container>
  );
};

export default ReportButton;
