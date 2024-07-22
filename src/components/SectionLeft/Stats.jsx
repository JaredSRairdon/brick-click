import React, { useContext, useState } from 'react'
import { GameContext } from '../../contexts/GameContext'

function Stats({showStats}) {
    const { playerStats, resetStats } = useContext(GameContext);

    return (
    <div className={`stats ${showStats ? "show-stats":""}`}>
        <h1>Stats</h1>
        <div className="player-stats">
            <hr/>
            <p>Player Stats</p>
            <hr/>
            <p>Brick Count  <br/> {Math.trunc(playerStats.brickCount).toLocaleString('en-us')}</p>
            <p>Bricks  <br/> <label>per second</label> <br/> {playerStats.bricksPerSecond.toFixed(1).toLocaleString('en-us')}</p>
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

        {/* <button onClick={resetStats}>Reset Stats</button> */}
    </div>
    )
}

export default Stats