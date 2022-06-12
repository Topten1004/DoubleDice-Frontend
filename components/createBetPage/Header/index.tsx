import React, { useEffect, useLayoutEffect, useState } from "react";

// Utils
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore from 'swiper'
import { useWeb3React } from "@web3-react/core";
import networkConfig from "config/networkConfig";

// Redux
import { useAppDispatch, useAppSelector } from "components/hooks/reduxHooks"
import { setStep } from "../ducks";

// Components
import * as S from "./StyledComponents"

const Header = () => {
  const { active, activate, library, chainId } = useWeb3React();
  const { step } = useAppSelector((state) => state.createBetReducer)
  const dispatch = useAppDispatch()
  const [swiper, setSwiper] = useState<SwiperCore | null>(null);

  function handleGoToStep(theStep: number) {
    dispatch(setStep(theStep))
    swiper && swiper.slideTo(theStep);
  }

  useEffect(() => {
    if ((step || step === 0) && swiper) handleGoToStep(step)
  }, [step, swiper])

  return (
    <S.Container>
      <Swiper
        slidesPerView={3}
        spaceBetween={0}
        centeredSlides={true}
        className="mySwiper"
        onSwiper={setSwiper}
        noSwiping={true}
        scrollbar={{ draggable: false }}
        allowTouchMove={false}
      >
        <SwiperSlide onClick={() => (active && chainId !== networkConfig.networkId) && handleGoToStep(0)}>
          {({ isActive }) => (
            <S.Title isActive={isActive} clickable={(active && chainId !== networkConfig.networkId) && step === 1}>CONNECT A WALLET</S.Title>
          )}
        </SwiperSlide>
        <SwiperSlide onClick={() => step && step > 1 && handleGoToStep(1)}>
          {({ isActive }) => (
            <S.Title isActive={isActive} clickable={step === 2}>Choose a category</S.Title>
          )}
        </SwiperSlide>
        <SwiperSlide onClick={() => step && step > 2 && handleGoToStep(2)}>
          {({ isActive }) => (
            <S.Title isActive={isActive} clickable={step === 3}>EVENT INFORMATION</S.Title>
          )}
        </SwiperSlide>
        <SwiperSlide onClick={() => step && step > 3 && handleGoToStep(3)}>
          {({ isActive }) => (
            <S.Title isActive={isActive} clickable={step === 4}>Bet Option Details</S.Title>
          )}
        </SwiperSlide>
        <SwiperSlide onClick={() => step && step > 4 && handleGoToStep(4)}>
          {({ isActive }) => (
            <S.Title isActive={isActive} clickable={step === 5}>Bet details</S.Title>
          )}
        </SwiperSlide>
        <SwiperSlide onClick={() => step && step > 5 && handleGoToStep(5)}>
          {({ isActive }) => (
            <S.Title isActive={isActive}>Other</S.Title>
          )}
        </SwiperSlide>
      </Swiper>
      <S.StepsContainer>
        <S.Step isActive={Boolean(step && (step >= 1))} isSemiActive={step === 0} />
        <S.Step isActive={Boolean(step && (step >= 2))} isSemiActive={step === 1} />
        <S.Step isActive={Boolean(step && (step >= 3))} isSemiActive={step === 2} />
        <S.Step isActive={Boolean(step && (step >= 4))} isSemiActive={step === 3} />
        <S.Step isActive={Boolean(step && (step >= 5))} isSemiActive={step === 4} />
      </S.StepsContainer>
    </S.Container>
  );
};

export default Header;
