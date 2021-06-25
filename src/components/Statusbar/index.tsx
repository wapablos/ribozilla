import React from 'react'
import { BsArrowLeftRight } from 'react-icons/bs'
import { StatusbarContainer, StyledToolbar } from './styles'

export default function Statusbar() {
  return (
    <StatusbarContainer>
      <StyledToolbar>
        <div className="hostname-chip">
          <BsArrowLeftRight size={12} style={{ paddingRight: 5 }} />
          localhost
        </div>
      </StyledToolbar>
    </StatusbarContainer>
  )
}
