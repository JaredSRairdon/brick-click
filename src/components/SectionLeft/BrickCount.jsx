import React, { useContext } from 'react'
import { GameContext } from '../../contexts/GameContext'

function BrickCount() {
  const {playerStats} = useContext(GameContext);

  function abbreviateNum(num) {
    const abbreviations = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion'];
    const abbreviationsLength = abbreviations.length;

    let magnitude = Math.floor(Math.log10(num) / 3);

    // Check if the number is beyond the supported magnitudes
    if (magnitude >= abbreviationsLength) {
      return Math.trunc(num);
    }

    // Check if the number is 0
    if (num < 1) {
      return num;
    }

    // Check if the number is below 1 million
    if (magnitude < 2) {
      return Math.trunc(num);
    }

    let abbreviation = abbreviations[magnitude];

    // Calculate the division factor
    let divisor = Math.pow(10, magnitude * 3);

    // Calculate the converted value
    let converted = num / divisor;

    // Format the converted value with 2 decimal places
    let formatted = converted.toFixed(2);

    return formatted + ' ' + abbreviation;
  }

  const formattedBrickCount = abbreviateNum(playerStats.brickCount).toLocaleString("en-us");
  const formattedBricksPerSecond = abbreviateNum(playerStats.bricksPerSecond).toLocaleString("en-us");

  return (
    <>
      <div className="brick-count">
        <div className='bricks'>
          <p>{formattedBrickCount}</p>
          <p>Bricks</p>
        </div>
        <div className='bricks-per-second'>
          <p id='per-second'>Per Second: {formattedBricksPerSecond}</p>
          <br/>
          <p id='click-power'>Click Power: {Math.trunc(playerStats.clickPower).toLocaleString('en-us')}</p>
        </div>
      </div>
    </>
  )
}

export default BrickCount