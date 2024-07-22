import React, { useContext, useState } from 'react'
import { GameContext } from '../../contexts/GameContext'

function Stats({showStats}) {
    const { playerStats, resetStats } = useContext(GameContext);

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
          return 0;
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
    const formattedBricksPerSecond = abbreviateNum(playerStats.brickCount).toLocaleString("en-us");

    return (
    <div className={`stats ${showStats ? "show-stats":""}`}>
        <h1>Stats</h1>
        <div className="player-stats">
            <hr/>
            <p>Player Stats</p>
            <hr/>
            <p>Brick Count  <br/> {formattedBrickCount}</p>
            <p>Bricks  <br/> <label>per second</label> <br/> {formattedBricksPerSecond}</p>
            <p>Click Power <br/> {playerStats.clickPower.toLocaleString('en-us')}</p>
        </div>

        <div className="building-stats">
                <hr />
                <p>Buildings <br /> {playerStats.buildingStats["Building"]?.count || 0}</p>
                <hr />
                <p>Trowels <br /> {playerStats.buildingStats["Trowel"]?.count || 0}</p>
                <p>Wheelbarrows <br /> {playerStats.buildingStats["Wheelbarrow"]?.count || 0}</p>
                <p>Ovens <br /> {playerStats.buildingStats["Oven"]?.count || 0}</p>
                <p>Factories <br /> {playerStats.buildingStats["Factory"]?.count || 0}</p>
                <p>Nuclear Brick Plants <br /> {playerStats.buildingStats["Nuclear Brick Plant"]?.count || 0}</p>
                <p>Brick Cultivation Pods <br /> {playerStats.buildingStats["Brick Cultivation Pods"]?.count || 0}</p>
                <p>Brick-a-Trons <br /> {playerStats.buildingStats["Brick-a-tron"]?.count || 0}</p>
                <p>Mother of Bricks <br /> {playerStats.buildingStats["Mother of Bricks"]?.count || 0}</p>
                <p>Brick Governments <br /> {playerStats.buildingStats["Brick Government"]?.count || 0}</p>
                <p>Holy Churches of Bricks <br /> {playerStats.buildingStats["Holy Church of Bricks"]?.count || 0}</p>
            </div>

        <button onClick={resetStats}>Reset Stats</button>
    </div>
    )
}

export default Stats