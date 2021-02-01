import React from 'react'
import { MdCompareArrows } from 'react-icons/md'

import { StyledStatusbar, ToolbarContainer } from './styles'

export default function Statusbar() {
  return (
    <StyledStatusbar>
      <ToolbarContainer>
        <div className="conn">
          <MdCompareArrows style={{ paddingRight: 5 }} size={20} />
          Offline
        </div>
      </ToolbarContainer>
    </StyledStatusbar>
  )
}
