import React, { useContext, useState, useEffect } from 'react'
import { GameContext } from '../../contexts/GameContext'

function UpgradeStoreItem({ upgradeName }) {
  const { clickUpgrades, purchaseUpgrade, playerStats } = useContext(GameContext);
  const clickUpgrade = clickUpgrades[upgradeName]
  const [isLocked, setIsLocked] = useState(false);

  // Sets the item to locked if the player cannot afford it
  useEffect(() => {
    setIsLocked(playerStats.brickCount < clickUpgrade.currentPrice);
  }, [playerStats.brickCount, clickUpgrade.currentPrice])

  const handleUpgrade = () => {
    purchaseUpgrade(upgradeName)
  }

  return (
    <button className={`upgrade-store-item ${isLocked ? "locked":""}`} onClick={handleUpgrade}>
        <p>{upgradeName}</p>
        <p>{clickUpgrade.currentPrice.toLocaleString("en-us", { maximumFractionDigits: 0 })}🧱</p>
        <p>{clickUpgrade.upgradePower}x</p>
        <h1>?</h1>
        <label>{clickUpgrade.currentPrice.toLocaleString("en-us", { maximumFractionDigits: 0 })}</label>
    </button>
  )
}

export default UpgradeStoreItem