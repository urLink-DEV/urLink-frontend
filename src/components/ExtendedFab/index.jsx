import React from 'react'

import { StyledFab } from './style'

function ExtendedFab(props) {
  const isExtended = React.Children.toArray(props.children).find((child) => typeof child === 'string')

  return <StyledFab variant={isExtended && 'extended'} {...props} />
}

export default ExtendedFab
