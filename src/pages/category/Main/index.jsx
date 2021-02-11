import React from 'react'
import LinkDropZone from './LinkDropZone'
import InputBase from '@material-ui/core/InputBase'

export default function Main({title}) {

  return (
    <>
      <LinkDropZone />
      <div>
      TODO: 카테고리 제목

        {title 
          ? title 
          : <InputBase />
        }
      </div>


    </>
  )
}
