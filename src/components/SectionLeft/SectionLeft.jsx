import React, { useState } from 'react'
import BakeryTitle from './BakeryTitle.jsx'
import BrickCount from './BrickCount.jsx'
import Brick from './Brick'
import OptionMenu from './OptionMenu.jsx'
import Stats from './Stats.jsx'
import './SectionLeft.css'

function SectionLeft() {
  const [showStats, setShowStats] = useState(false);
  
  const enableStats = () => {
    setShowStats(!showStats);
  }

  return (
    <div className='section-left'>
      <>
        <BakeryTitle/>
        <BrickCount/>
        <Brick/>
        <OptionMenu handleClick={enableStats}/>
        <Stats showStats={showStats} setShowStats={setShowStats}/>
      </>
    </div>
  )
}

export default SectionLeft;