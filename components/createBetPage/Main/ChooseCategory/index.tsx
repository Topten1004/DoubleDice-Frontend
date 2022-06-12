// Components
import CategoryBox from './CategoryBox'
import CategoryBoxOther from './CategoryBox/Other'
import * as S from "./StyledComponents";

// Redux
import { useAppDispatch, useAppSelector } from "components/hooks/reduxHooks"
import { setCategory, setFormData } from "components/createBetPage/ducks"
import { categories } from 'utils/categories';

interface PropsI {
  nextStep: () => void
}

const ChooseCategory = ({ nextStep }: PropsI) => {
  const { category } = useAppSelector((state) => state.createBetReducer)
  const dispatch = useAppDispatch()

  const handleCategory = (chosenCategory: string) => {
    if (chosenCategory !== category) {
      dispatch(setCategory(chosenCategory))
    }
    nextStep()
  }

  return (
    <S.Container>
      <CategoryBox
        onClick={() => handleCategory(categories.sports.title)}
        title={categories.sports.title}
        description={categories.sports.subcategory}
        backgroundColor="linear-gradient(172.75deg, #FF7373 8.74%, #D6212C 94.36%)"
        overlayColor="linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(68, 1, 1, 0.88) 100%)"
        imgSrc="/mock/fighter.png"
      />
      <CategoryBox
        onClick={() => handleCategory(categories.esports.title)}
        title={categories.esports.title}
        description={categories.esports.subcategory}
        backgroundColor=" linear-gradient(180deg, #F45F30 0%, #FF8181 100%)"
        overlayColor="linear-gradient(182.79deg, rgba(0, 0, 0, 0) 2.06%, rgba(79, 16, 16, 0.93) 83.46%)"
        imgSrc="/mock/gameCharacter.png"
      />
      <CategoryBox
        onClick={() => handleCategory(categories.political.title)}
        title={categories.political.title}
        description={categories.political.subcategory}
        backgroundColor="linear-gradient(172.75deg, #4F4BFF 8.74%, #7673FF 94.36%)"
        overlayColor="linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(12, 11, 79, 0.88) 100%)"
        imgSrc="/mock/politics.png"
      />
      <CategoryBox
        onClick={() => handleCategory(categories.entertainment.title)}
        title={categories.entertainment.title}
        description={categories.entertainment.subcategory}
        backgroundColor="linear-gradient(172.75deg, #FFBE15 8.74%, #FFE814 94.36%)"
        overlayColor="linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(160, 129, 19, 0.88) 100%)"
        imgSrc="/mock/entertainment.png"
        translateY={-3}
      />
      <CategoryBox
        onClick={() => handleCategory(categories.cryptoProjects.title)}
        title={categories.cryptoProjects.title}
        description={categories.cryptoProjects.subcategory}
        backgroundColor="linear-gradient(180deg, #C2B5FA 0%, #7DA3F5 100%)"
        overlayColor="linear-gradient(182.79deg, rgba(0, 0, 0, 0) 2.06%, #716A9B 83.46%)"
        imgSrc="/mock/legoSet.png"
        translateY={-3}
      />
      <CategoryBoxOther onClick={() => handleCategory(categories.others.title)} />
    </S.Container>
  );
};

export default ChooseCategory;
