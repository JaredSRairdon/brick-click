import React, { useContext, useEffect, useState } from 'react'
import brick_main from './../../assets/brick_main.png'
import { GameContext } from '../../contexts/GameContext'

function Brick() {
  const { brickCount, incrementBrickCountByClickPower, clickPower } = useContext(GameContext);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Checks if the user is on a mobile device
  useEffect(() => {
    if (typeof document !== 'undefined') {
      let isTouchDevice = 'ontouchstart' in document.documentElement;
      setIsTouchDevice(isTouchDevice);
    }
  }, [])

  const handleClick = () => {
    incrementBrickCountByClickPower(clickPower);
    
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, 70);
    }
  };

  return (
    <div className='brick'>
      <img 
        src={brick_main}
        alt='Main brick'
        draggable='false'
        onClick={isTouchDevice ? undefined : handleClick} // ensures that the onClick event doesn't fire on mobile
        onTouchStart={handleClick} // Add touch event listener
        className= {isAnimating ? "brick-animation" : ""}
      />
    </div>

  )
}

export default Brick

