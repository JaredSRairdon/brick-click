import React, { useContext, useState } from 'react'
import { GameContext } from '../../contexts/GameContext'

function OptionMenu({handleClick}) {
  const { resetStats } = useContext(GameContext);

  return (
    <div className='option-menu'>
      <button onClick={handleClick}>Stats</button>
      {/* <button>Info</button> */}
    </div>
  )
}

export default OptionMenu