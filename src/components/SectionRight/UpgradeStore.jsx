import React from 'react'
import UpgradeStoreItem from './UpgradeStoreItem'

/*
----- Upgrade Store Overhaul -----
 + There will be one upgrade slot for each type of building
 + The upgradeName will be dynamic, as each building will have at least 5 tiers of upgrades
 + Upgrade price will be dynamic depending on what tier of building upgrade the player is on
 + Set new unlock conditions based on how many buildings the player owns
 + upgradePower will always double the efficiency of the correlated building
*/

function UpgradeStore() {
  return (
    <div className='upgrade-store'>
      <>
        <UpgradeStoreItem upgradeName={'Reinforced Finger'}/>
        <UpgradeStoreItem upgradeName={'Steel Pointer'}/>
        <UpgradeStoreItem upgradeName={'Golden Lad'}/>
        <UpgradeStoreItem upgradeName={'Platinum Poke'}/>
        <UpgradeStoreItem upgradeName={'God Touch'}/>
      </>
    </div>
  );
}

export default UpgradeStore;