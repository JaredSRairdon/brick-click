import React, { useContext, useEffect, useMemo, useState } from 'react'
import { GameContext } from '../../contexts/GameContext'

function BuildingStoreItem({  buildingName, buildingPrice, buildingAmount, onItemPurchase }) {
  const [isLocked, setIsLocked] = useState(false);
  const gc = useContext(GameContext);

  // Sets the item to locked if the player cannot afford it
  useEffect(() => {
    setIsLocked(gc.brickCount < buildingPrice);
  }, [gc.brickCount, buildingPrice])

  const handlePurchase = () => {
    onItemPurchase(buildingName, buildingPrice, buildingAmount);
  }

  return (
    <button className={`building-store-item ${isLocked ? "locked":""}`} onClick={handlePurchase}>
        <p>{buildingName}</p>
        <p>{Math.trunc(buildingPrice).toLocaleString("en-us")} Bricks</p>
        <p>+{buildingAmount}bps</p>
        <h1>?</h1>
        <label>{buildingPrice.toLocaleString("en-us")}</label>
    </button>
  )
}

export default BuildingStoreItem