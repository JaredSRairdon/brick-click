import React, { useContext, useEffect, useState } from 'react'
import { GameContext } from '../../contexts/GameContext'

function UpgradeStoreItem({ upgradeName, upgradePrice, upgradePower }) {
  const {brickCount, setBrickCount, setClickPower} = useContext(GameContext);
  const [isLocked, setIsLocked] = useState(true);

  useEffect(() => {
    setIsLocked(brickCount < upgradePrice);
  }, [brickCount, upgradePrice])

  const handleUpgrade = () => {
    if (brickCount >= upgradePrice) {
      setBrickCount((prevBC) => prevBC - upgradePrice);
      setClickPower((prevCP) => (prevCP * upgradePower) + prevCP)
    }
  }

  return (
    <button className={`upgrade-store-item ${isLocked ? "locked":""}`} onClick={handleUpgrade}>
        <p>{upgradeName}</p>
        <p>{upgradePrice}🧱</p>
        <p>{upgradePower}x</p>
        <h1>?</h1>
        <label>{upgradePrice.toLocaleString("en-us")}</label>
    </button>
  )
}

export default UpgradeStoreItem