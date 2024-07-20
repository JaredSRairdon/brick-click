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
            <p>Bricks  <br/> <label>per second</label> <br/> {Math.trunc(playerStats.bricksPerSecond)}</p>
            <p>Click Power <br/> {playerStats.clickPower.toLocaleString('en-us')}</p>
        </div>

        <div className="building-stats">
                <hr />
                <p>Buildings <br /> {playerStats["Building"]?.count || 0}</p>
                <hr />
                <p>Trowels <br /> {playerStats["Trowel"]?.count || 0}</p>
                <p>Wheelbarrows <br /> {playerStats["Wheelbarrow"]?.count || 0}</p>
                <p>Ovens <br /> {playerStats["Oven"]?.count || 0}</p>
                <p>Factories <br /> {playerStats["Factory"]?.count || 0}</p>
                <p>Nuclear Brick Plants <br /> {playerStats["Nuclear Brick Plant"]?.count || 0}</p>
                <p>Brick Cultivation Pods <br /> {playerStats["Brick Cultivation Pods"]?.count || 0}</p>
                <p>Brick-a-Trons <br /> {playerStats["Brick-a-tron"]?.count || 0}</p>
                <p>Mother of Bricks <br /> {playerStats["Mother of Bricks"]?.count || 0}</p>
                <p>Brick Governments <br /> {playerStats["Brick Government"]?.count || 0}</p>
                <p>Holy Churches of Bricks <br /> {playerStats["Holy Church of Bricks"]?.count || 0}</p>
            </div>

        <button onClick={resetStats}>Reset Stats</button>
    </div>
    )
}

export default Stats