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
                <hr />
                <p>Buildings <br /> {gc.playerStats["Building"]?.count || 0}</p>
                <hr />
                <p>Trowels <br /> {gc.playerStats["Trowel"]?.count || 0}</p>
                <p>Wheelbarrows <br /> {gc.playerStats["Wheelbarrow"]?.count || 0}</p>
                <p>Ovens <br /> {gc.playerStats["Oven"]?.count || 0}</p>
                <p>Factories <br /> {gc.playerStats["Factory"]?.count || 0}</p>
                <p>Nuclear Brick Plants <br /> {gc.playerStats["Nuclear Brick Plant"]?.count || 0}</p>
                <p>Brick Cultivation Pods <br /> {gc.playerStats["Brick Cultivation Pods"]?.count || 0}</p>
                <p>Brick-a-Trons <br /> {gc.playerStats["Brick-a-tron"]?.count || 0}</p>
                <p>Mother of Bricks <br /> {gc.playerStats["Mother of Bricks"]?.count || 0}</p>
                <p>Brick Governments <br /> {gc.playerStats["Brick Government"]?.count || 0}</p>
                <p>Holy Churches of Bricks <br /> {gc.playerStats["Holy Church of Bricks"]?.count || 0}</p>
            </div>

        <button onClick={gc.resetStats}>Reset Stats</button>
    </div>
    )
}

export default Stats