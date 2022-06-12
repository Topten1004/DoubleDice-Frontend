// Next
import type { GetServerSideProps, GetServerSidePropsContext } from "next";

// Components
import CreateBetSuccess from "components/Success";
import { ReactElement } from "react";

interface IProps {
  id: string | null;
}
const CreateBetPage = (props: IProps): ReactElement => {
  return (
    <CreateBetSuccess id={props.id} />
  );
};

export const getServerSideProps: GetServerSideProps = async (
  k: GetServerSidePropsContext
) => {
  let id = "";
  if (k.query && k.query.pid) {
    id = k.query.pid
      .toString()
      .split('-')[1];
  }

  return {
    props: {
      id
    },
  };
};

export default CreateBetPage;
