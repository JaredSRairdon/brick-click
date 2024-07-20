import React, { useContext, useState, useEffect } from 'react'
import { GameContext } from '../../contexts/GameContext'

function BuildingStoreItem({ buildingName }) {
  const { storePrices, purchaseBuilding, playerStats } = useContext(GameContext);
  const building = storePrices[buildingName]
  const [isLocked, setIsLocked] = useState(true);

  // Sets the item to locked if the player cannot afford it
  useEffect(() => {
    setIsLocked(playerStats.brickCount < building.currentPrice);
  }, [playerStats.brickCount, building.currentPrice])

  const handleBuildingPurchase = () => {
    purchaseBuilding(buildingName)
  }

  return (
    <button className={`building-store-item ${isLocked ? "locked":""}`} onClick={handleBuildingPurchase}>
        <p>{buildingName}</p>
        <p>{Math.trunc(building.currentPrice).toLocaleString("en-us")} Bricks</p>
        <p>+{building.bpsUpgradeAmount}bps</p>
        <h1>?</h1>
        <label>{building.currentPrice.toLocaleString("en-us")}</label>
    </button>
  )
}

export default BuildingStoreItem