import React, { useContext, useState } from 'react'
import brick_main from './../../assets/brick_main.png'
import { GameContext } from '../../contexts/GameContext'

function Brick() {
  const { brickCount, incrementBrickCount, clickPower } = useContext(GameContext);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    incrementBrickCount(clickPower);
    
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
        onClick={handleClick}
        className= {isAnimating ? "brick-animation" : ""}
      />
    </div>

  )
}

export default Brick