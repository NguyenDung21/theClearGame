import React from 'react'
import {memo} from 'react'
const Info = (count) => {
  return (
    <div>
    <h1 className="">{count}</h1>
    </div>
   
  )
}

export default memo(Info)