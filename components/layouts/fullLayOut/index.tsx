import React, { ReactChildren, ReactChild } from 'react'

// Utils
import { ToastContainer } from "react-toastify"

// Components
import Navbar from '../shared/Navbar'
import * as S from './StyledComponents'
import UseNetwork from 'components/shared/UseNetwork'
// import SideBar from './components/SideBar'


interface AuxPropsI {
  children: ReactChild | ReactChildren
}

const FullLayout = ({ children }: AuxPropsI) => {

  return (
    <S.FullLayoutContainer>
      <Navbar />
      {/* <SideBar/> */}
      <S.Main>
        <S.SubMain>
          {children}
        </S.SubMain>
      </S.Main>
      <S.BackgroundImage />
      <UseNetwork />
      <ToastContainer autoClose={10000} />
    </S.FullLayoutContainer>
  )
}

export default FullLayout