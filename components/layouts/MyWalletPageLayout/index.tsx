import React, { ReactChildren, ReactChild } from 'react'

// Utils
import { VirtualFloor } from "lib/graph"

// Components
import * as S from './StyledComponents'
import PendingPage from '../../../components/betPage/PendingPage'
import SideContent from "./SideContent"
import FullLayout from '../../../components/layouts/fullLayOut'
// import SideBar from './components/SideBar'


interface AuxPropsI {
  children: ReactChild | ReactChildren
  vf: VirtualFloor
}

const BetPageLayout = ({ children, vf }: AuxPropsI) => {

  return (
    <FullLayout>
      <>
        {Boolean(vf.id) && <SideContent vf={vf} />}
        <S.Content>
          {Boolean(vf.id) ? children : <PendingPage />}
        </S.Content>
      </>
    </FullLayout>
  )
}

export default BetPageLayout