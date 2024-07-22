import React, { useContext } from 'react'
import UpgradeStoreItem from './UpgradeStoreItem'
import { GameContext } from '../../contexts/GameContext';

function UpgradeStore() {
  const { clickUpgrades } = useContext(GameContext);

  return (
    <div className='upgrade-store'>
      {Object.keys(clickUpgrades).map((upgradeName) => (
        <UpgradeStoreItem key={upgradeName} upgradeName={upgradeName}/>
      ))}
    </div>
  );
}

export default UpgradeStore;