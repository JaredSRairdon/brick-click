import React, { useContext, useState, useEffect } from 'react'
import { GameContext } from '../../contexts/GameContext'

function BuildingStoreItem({ buildingName }) {
  const { storePrices, purchaseBuilding, playerStats } = useContext(GameContext);
  const building = storePrices[buildingName]
  const [isLocked, setIsLocked] = useState(true);
  const [cantAfford, setCantAfford] = useState(true);

/* 
TODO
-----
+ Only show ??? if the item hasn't been purchased before
+ If an item is purchased before (but player can't afford) then slightly grey out item
+ Show owned building amount on the item card
-----
*/


  // Sets the item to locked if the player cannot afford it
  useEffect(() => {
    setIsLocked(playerStats.brickCount < building.currentPrice);
  }, [playerStats.brickCount, building.currentPrice])

  const handleBuildingPurchase = () => {
    purchaseBuilding(buildingName)
  }

  return (
    <button className={`building-store-item ${isLocked ? "locked":""} ${cantAfford ? "cant-afford": ""}`} onClick={handleBuildingPurchase}>
        <p>{buildingName}</p>
        <p>{Math.trunc(building.currentPrice).toLocaleString("en-us")} Bricks</p>
        <p>+{building.bpsUpgradeAmount}bps</p>
        <h1>?</h1>
        <label>{Math.trunc(building.currentPrice).toLocaleString("en-us")}</label>
    </button>
  )
}

export default BuildingStoreItem