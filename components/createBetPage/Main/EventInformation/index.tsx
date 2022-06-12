import { useEffect, useState } from "react"

// Utils
import * as S from "./StyledComponents"
import * as SC from "../StyledComponents"
import { toast } from "react-toastify";

// Components
import SelectButton from '../../../shared/SelectButton'

// Redux
import { useAppDispatch, useAppSelector } from "components/hooks/reduxHooks"
import { setFormData } from "components/createBetPage/ducks";
import { categories } from "utils/categories";
import { useLayoutEffect } from "react";

interface PropsI {
  nextStep: () => void;
}

const EventInformation = ({ nextStep }: PropsI) => {
  const [subCategory, setSubCategory] = useState<string | number>("");
  const [subCategoryOptions, setSubCategoryOptions] = useState<string[]>([]);
  const [eventTitle, setEventTitle] = useState<string>("");
  const [eventDescription, setEventDescription] = useState<string>("");
  const dispatch = useAppDispatch()

  const { subCategory: theSubCategory, title, description, category } = useAppSelector((state) => state.createBetReducer)

  const toggleNextStep = () => {
    if (subCategory == "") {
      toast.error("Please select the sub-category");
      return;
    }
    if (eventTitle.trim() == "") {
      toast.error("Please enter the events Title");
      return;
    }
    if (eventTitle.trim().length > 32) {
      toast.error("Event titles must be less than 32 characters");
      return;
    }
    if (eventDescription.trim() == "") {
      toast.error("Please enter the events description");
      return;
    }
    if (eventDescription.trim().length > 256) {
      toast.error("Event description must be less than 256 characters");
      return;
    }

    dispatch(
      setFormData({
        subCategory: subCategory,
        title: eventTitle,
        description: eventDescription,
      }))
    nextStep()
  };

  useLayoutEffect(() => {
    if (category) handleCategory(category);
  }, [category, theSubCategory])

  useLayoutEffect(() => {
    if (title) setEventTitle(title)
  }, [title])

  useLayoutEffect(() => {
    if (description) setEventDescription(description)
  }, [description])

  const handleSetSubCategory = (subCategoryArr: string[]) => {
    if (subCategoryArr.length > 0 && subCategoryArr?.includes(theSubCategory)) {
      setSubCategory(theSubCategory)
    } else if (subCategoryArr && !subCategoryArr?.includes(theSubCategory)) {
      dispatch(
        setFormData({
          subCategory: '',
        }))
      setSubCategory('')
    }
  }

  const handleCategory = (theCategory: string) => {
    if (theCategory == categories.sports.title) {
      setSubCategoryOptions(categories.sports.subcategory)
      handleSetSubCategory(categories.sports.subcategory)
    }
    if (theCategory == categories.esports.title) {
      setSubCategoryOptions(categories.esports.subcategory)
      handleSetSubCategory(categories.esports.subcategory)
    }
    if (theCategory == categories.entertainment.title) {
      setSubCategoryOptions(categories.entertainment.subcategory)
      handleSetSubCategory(categories.entertainment.subcategory)
    }
    if (theCategory == categories.cryptoProjects.title) {
      setSubCategoryOptions(categories.cryptoProjects.subcategory)
      handleSetSubCategory(categories.cryptoProjects.subcategory)
    }
    if (theCategory == categories.others.title) {
      setSubCategoryOptions(categories.others.subcategory)
      handleSetSubCategory(categories.others.subcategory)
    }
    if (theCategory == categories.political.title) {
      setSubCategoryOptions(categories.political.subcategory)
      handleSetSubCategory(categories.political.subcategory)
    }
  };

  return (
    <S.Wrapper>
      <SC.InputContainer>
        <SC.Title>
          Subcategory<SC.Required>*</SC.Required>
        </SC.Title>
        <SelectButton
          options={subCategoryOptions}
          setOption={setSubCategory}
          selectedOption={subCategory}
        />
      </SC.InputContainer>
      <SC.InputContainer>
        <SC.Title>
          Event Title<SC.Required>*</SC.Required>
        </SC.Title>
        <SC.Input
          placeholder="Event Title..."
          onChange={(e) => setEventTitle(e.target.value)}
          value={eventTitle}
          maxLength={30}
        />
      </SC.InputContainer>
      <SC.InputContainer>
        <SC.Title>
          Event Description<SC.Required>*</SC.Required>
        </SC.Title>
        <SC.Textarea
          placeholder="Describe in detail the essence of the event"
          onChange={(e) => setEventDescription(e.target.value)}
          value={eventDescription}
          maxLength={150}
        />
      </SC.InputContainer>
      <SC.ConfirmButton onClick={toggleNextStep}>Next Step</SC.ConfirmButton>
    </S.Wrapper>
  );
};

export default EventInformation;
