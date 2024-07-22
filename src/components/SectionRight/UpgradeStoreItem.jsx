import React, { useContext, useState, useEffect } from 'react'
import { GameContext } from '../../contexts/GameContext'

function UpgradeStoreItem({ upgradeName }) {
  const { clickUpgrades, purchaseUpgrade, playerStats } = useContext(GameContext);
  const [isLocked, setIsLocked] = useState(true);
  const [isPurchased, setIsPurchased] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const clickUpgrade = clickUpgrades[upgradeName]
  const relatedBuilding = clickUpgrade.relatedBuilding;

  useEffect(() => {
    setIsLocked(playerStats.brickCount < clickUpgrade.currentPrice);
    setIsVisible(
      (playerStats.brickCount > (clickUpgrade.currentPrice * 0.50))
      &&
      (playerStats.buildingStats[relatedBuilding].count > 0)
    );
    setIsPurchased(clickUpgrade.count > 0);
  }, [playerStats.brickCount])

  const handleUpgrade = () => {
    purchaseUpgrade(upgradeName);
  }

  return (
    <button className={`upgrade-store-item ${isLocked ? "locked":""} ${isVisible ? "":"hidden"} ${isPurchased ? "hidden":""}`} onClick={handleUpgrade}>
        <p>{upgradeName}</p>
        <p>{clickUpgrade.currentPrice.toLocaleString("en-us", { maximumFractionDigits: 0 })}🧱</p>
        <p>{clickUpgrade.upgradePower}x</p>
        <h1>?</h1>
        <label>{clickUpgrade.currentPrice.toLocaleString("en-us", { maximumFractionDigits: 0 })}</label>
    </button>
  )
}

export default UpgradeStoreItem