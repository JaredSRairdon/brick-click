import React, { useContext, useEffect, useState } from 'react'
import UpgradeStoreItem from './UpgradeStoreItem'
import { GameContext } from '../../contexts/GameContext';

/*
----- Upgrade Store Overhaul -----
 + There will be one upgrade slot for each type of building
 + The upgradeName will be dynamic, as each building will have at least 5 tiers of upgrades
 + Upgrade price will be dynamic depending on what tier of building upgrade the player is on
 + Set new unlock conditions based on how many buildings the player owns
 + upgradePower will always double the efficiency of the correlated building
*/

function UpgradeStore() {
  const { brickCount, setBrickCount, playerStats, setPlayerStats } = useContext(GameContext);

  // const buildingTypes = [
  //   { name: 'Trowel', basePrice: 15, unlockCondition: 1, },
  //   { name: 'Wheelbarrow', basePrice: 100, unlockCondition: 1, },
  //   { name: "Oven", basePrice:11000, unlockCondition: 1,},
  //   { name: "Factory", basePrice:12000, unlockCondition: 1,},
  //   { name: "Nuclear Brick Plant", basePrice:130000, unlockCondition: 1,},
  //   { name: "Brick Cultivation Pods", basePrice:1400000, unlockCondition: 1,},
  //   { name: "Brick-a-tron", basePrice:20000000, unlockCondition: 1,},
  //   { name: "Mother of Bricks", basePrice:330000000, unlockCondition: 1,},
  //   { name: "Brick Government", basePrice:5100000000, unlockCondition: 1,},
  //   { name: "Holy Church of Bricks", basePrice:75000000000, unlockCondition: 1,},
  // ]

  // // const [upgradeSlots, setUpgradeSlots] = useState(buildingTypes.map(() => null)); // Array of upgrade slots
  // const [upgradeNames, setUpgradeNames] = useState(buildingTypes.map(() => [])); // Array of upgrade names
  // const [upgradePrices, setUpgradePrices] = useState(buildingTypes.map(() => [])); // Array of upgrade prices
  // const [unlockConditions, setUnlockConditions] = useState(buildingTypes.map(() => 0)); // Array of unlock conditions
  // const [upgradePowers, setUpgradePowers] = useState(buildingTypes.map(() => 1)); // Array of upgrade powers
  // const [selectedTiers, setSelectedTiers] = useState(buildingTypes.map(() => 0));

  // This hook is used to set up the initial upgrade names,
  // prices, and unlock conditions for each building type.
  // It calculates the upgrade names and prices for each tier based on the basePrice when the component is mounted
  // useEffect(() => {
  //   buildingTypes.forEach((buildingType, index) => {
  //     const tiers = 5;
  //     const { basePrice } = buildingType;

  //     const names = [];
  //     const prices = [];

  //     let currentPrice = basePrice;
  //     for (let i = 0; i < tiers; i++) {
  //       const tier = i + 1;
  //       const name = `${buildingType.name} Upgrade Tier ${tier}`;

  //       names.push(name);
  //       prices.push(currentPrice);

  //       currentPrice *= 10; // Multiplier for setting prices for each tier
  //     }

  //     // Set the upgrade names, prices, and unlock conditions for each building type
  //     setUpgradeNames((prevUpgradeNames) => [...prevUpgradeNames.slice(0, index), names, ...prevUpgradeNames.slice(index + 1)]);
  //     setUpgradePrices((prevUpgradePrices) => [...prevUpgradePrices.slice(0, index), prices, ...prevUpgradePrices.slice(index + 1)]);
  //     setUnlockConditions((prevUnlockConditions) => [...prevUnlockConditions.slice(0, index), tiers, ...prevUnlockConditions.slice(index + 1)]);
  //   });
  // }, []);

  // const handleUpgradeClick = () => {
  //   // Check the current price of the clicked upgrade
  //   // const currentPrice = upgradePrices[buildingIndex][upgradeIndex];

  //   // Uses game context for brick count
  //   // Update the upgrade slot, upgrade power, and changes the selected tier
  //   // if the upgrade is affordable
  //   if (currentPrice <= brickCount) { 
  //     // setUpgradePowers((prevUpgradePowers) => [
  //     //   ...prevUpgradePowers.slice(0, buildingIndex),
  //     //   prevUpgradePowers[buildingIndex] * 2,
  //     //   ...prevUpgradePowers.slice(buildingIndex + 1)
  //     // ]);

  //     // setSelectedTiers((prevSelectedTiers) => [
  //     //   ...prevSelectedTiers.slice(0, buildingIndex),
  //     //   upgradeIndex + 1,
  //     //   ...prevSelectedTiers.slice(buildingIndex + 1)
  //     // ]);

  //     // Deduct the upgrade price from the player's resources
  //     setBrickCount((prevBC) => prevBC - currentPrice);

  //     // Implement the logic to update the player's resources (add upgrades into playerStats?)
  //     setPlayerStats((prevStats) => ({
  //       ...prevStats,
  //       upgradeCount: {
  //         ...prevStats.upgradeCount,
  //         [buildingName]: prevStats.upgradeCount[buildingName] + 1, // Increments purchased building owned by accessing playerStats using buildingName as the key
  //       }
  //     }));
  //   }
  // };

  return (
    <div className='upgrade-store'>
      <>
        <UpgradeStoreItem upgradeName={'Reinforced Finger'} upgradePrice={0} upgradePower={5}/>
        <UpgradeStoreItem upgradeName={'Steel Pointer'} upgradePrice={50000} upgradePower={5}/>
        <UpgradeStoreItem upgradeName={'Golden Lad'} upgradePrice={100000} upgradePower={5}/>
        <UpgradeStoreItem upgradeName={'Platinum Poke'} upgradePrice={100000} upgradePower={5}/>
        <UpgradeStoreItem upgradeName={'God Touch'} upgradePrice={10000000} upgradePower={5}/>
      </>

      {/* {buildingTypes.map((buildingType, buildingIndex) => {
        // const { name, unlockCondition } = buildingType;
        // const isUnlocked = playerStats.buildingCount[buildingType.name] >= unlockCondition;
        // const isBuildingOwned = playerStats.buildingCount[buildingType.name] > 0;



        if (!isBuildingOwned) {
          return null;
        }

        return (
          <div className='upgrade-item-container' key={buildingIndex}>
              <h3>{buildingType.name}</h3>
              <p>Unlock Condition: <br/> {unlockConditions[buildingIndex]} {buildingType.name}s owned</p>

              {!isUnlocked && <p>Upgrade locked until condition is met. <br/> {unlockCondition}</p>}
              
              {isUnlocked && isBuildingOwned && ( // checks if building is owned and isUnlocked are set to true
                <ul>
                  {upgradeNames[buildingIndex].map((upgradeName, upgradeIndex) => (
                    <li 
                      key={upgradeIndex}
                      style={{ display: upgradeIndex === selectedTiers[buildingIndex] ? 'block':'none' }}
                    >
                      <span>{upgradeName}</span><br/>
                      <span>Price: {upgradePrices[buildingIndex][upgradeIndex]}</span><br/>
                      <button onClick={() => handleUpgradeClick(buildingIndex, upgradeIndex, buildingType.name)}>
                        Upgrade
                      </button>
                    </li>
                  ))}
                </ul>
              )}

          </div>
          );
        }) } */}




    </div>
  );
}

export default UpgradeStore;