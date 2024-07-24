import React, { useContext } from 'react'
import UpgradeStoreItem from './UpgradeStoreItem'
import { GameContext } from '../../contexts/GameContext';

function UpgradeStore() {
  const { clickUpgrades } = useContext(GameContext);

  const sortedUpgrades = Object.keys(clickUpgrades).sort((a, b) => {
    return clickUpgrades[a].currentPrice - clickUpgrades[b].currentPrice;
  });

  return (
    <div className='upgrade-store'>
      {sortedUpgrades.map((upgradeName) => (
        <UpgradeStoreItem key={upgradeName} upgradeName={upgradeName}/>
      ))}
    </div>
  );
}

export default UpgradeStore;