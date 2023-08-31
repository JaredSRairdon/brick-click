import React, { useContext, useState } from 'react'
import { GameContext } from '../../contexts/GameContext'

function Stats({showStats}) {
    const gc = useContext(GameContext);

    return (
    <div className={`stats ${showStats ? "show-stats":""}`}>
        <h1>Stats</h1>
        <div className="player-stats">
            <hr/>
            <p>Player Stats</p>
            <hr/>
            <p>Brick Count  <br/> {Math.trunc(gc.brickCount).toLocaleString('en-us')}</p>
            <p>Bricks  <br/> <label>per second</label> <br/> {Math.trunc(gc.bricksPerSecond)}</p>
            <p>Click Power <br/> {gc.clickPower.toLocaleString('en-us')}</p>
        </div>

        <div className="building-stats">
            <hr/>
            <p>Buildings <br/> {gc.playerStats.buildingCount["Building"]}</p>
            <hr/>
            <p>Trowels <br/> {gc.playerStats.buildingCount["Trowel"]}</p>
            <p>Wheelbarrows <br/> {gc.playerStats.buildingCount["Wheelbarrow"]}</p>
            <p>Ovens <br/> {gc.playerStats.buildingCount["Oven"]}</p>
            <p>Factories <br/> {gc.playerStats.buildingCount["Factory"]}</p>
            <p>Nuclear Brick Plants <br/> {gc.playerStats.buildingCount["Nuclear Brick Plant"]}</p>
            <p>Brick Cultivation Pods <br/> {gc.playerStats.buildingCount["Brick Cultivation Pods"]}</p>
            <p>Brick-a-Trons <br/> {gc.playerStats.buildingCount["Brick-a-tron"]}</p>
            <p>Mother of Bricks <br/> {gc.playerStats.buildingCount["Mother of Bricks"]}</p>
            <p>Brick Governments <br/> {gc.playerStats.buildingCount["Brick Government"]}</p>
            <p>Holy Churches of Bricks <br/> {gc.playerStats.buildingCount["Holy Church of Bricks"]}</p>
        </div>

        <button onClick={gc.resetStats}>Reset Stats</button>
    </div>
    )
}

export default Stats