// Utils
import * as SC from 'components/createBetPage/Main/StyledComponents'

// Components
import SelectButton from "components/shared/SelectButton"

interface PropsI {
  setSelectedPaymentToken: React.Dispatch<React.SetStateAction<string | number>>
  paymentOptionNames: string[]
  selectedPaymentToken: string | number
}

const PaymentOptions = ({ paymentOptionNames, setSelectedPaymentToken, selectedPaymentToken }: PropsI) => {
  return (
    <SC.SectionWrapper>
      <SC.Title>
        Payment Options<SC.Required>*</SC.Required>
      </SC.Title>
      <SC.InputContainer>
        <SelectButton
          options={paymentOptionNames}
          setOption={setSelectedPaymentToken}
          selectedOption={selectedPaymentToken}
        />
      </SC.InputContainer>
    </SC.SectionWrapper>
  );
};

export default PaymentOptions;
