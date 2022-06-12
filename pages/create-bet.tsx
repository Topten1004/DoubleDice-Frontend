import { useEffect } from "react";

// Next
import type { NextPage } from "next";

// Components
import CreateBet from "components/createBetPage";

// Redux
import { useDispatch } from "react-redux";
import { removeStepsData } from "components/createBetPage/ducks";

const CreateBetPage: NextPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(removeStepsData());
    };
  }, []);

  return <CreateBet />;
};

export default CreateBetPage;
