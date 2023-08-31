import React, { useContext, useState } from 'react'
import BuildingStoreItem from './BuildingStoreItem'
import { GameContext } from '../../contexts/GameContext'

function BuildingStore() {
  const gc = useContext(GameContext);

  // Updates the stats/buildings owned on purchase
  const updateStats = (buildingName) => {
    gc.setPlayerStats((prevStats) => ({
      ...prevStats,
      buildingCount: {
         ...prevStats.buildingCount,
         ["Building"]: prevStats.buildingCount["Building"] + 1,
         [buildingName]: prevStats.buildingCount[buildingName] + 1, // Increments purchased building owned by accessing playerStats using buildingName as the key
      }

    }));
  }

  // Updates the price of a store item after it is purchased
  const updatePrice = (buildingName) => {
    gc.setStorePrices((prevPrices) => ({
      ...prevPrices,
      [buildingName]: gc.basePrices[buildingName] * Math.pow(1.15, gc.playerStats.buildingCount[buildingName]),
    }));

    console.log(`Updating price of ${buildingName}...`)
    console.log(`${gc.basePrices[buildingName]} * ${ gc.playerStats.buildingCount[buildingName] } ^ 1.15`)
  }

  // Deducts price, upgrades bricks per second, updates player stats, increases item price
  const handleItemPurchase = (buildingName, buildingPrice, buildingAmount) => {
    if (gc.brickCount >= buildingPrice) {
      gc.setBrickCount((prevBC) => prevBC - buildingPrice);
      gc.setBricksPerSecond((prevBPS) => prevBPS + buildingAmount);
      updateStats(buildingName);
      updatePrice(buildingName);
      console.log(`${buildingName} bought!`);
    }
  }

  return (
    <div className='building-store'>
      <BuildingStoreItem buildingName={"Trowel"} buildingAmount={0.1} buildingPrice={gc.storePrices["Trowel"]} onItemPurchase={handleItemPurchase}/>
      <BuildingStoreItem buildingName={"Wheelbarrow"} buildingAmount={1} buildingPrice={gc.storePrices["Wheelbarrow"]} onItemPurchase={handleItemPurchase}/>
      <BuildingStoreItem buildingName={"Oven"} buildingAmount={8} buildingPrice={gc.storePrices["Oven"]} onItemPurchase={handleItemPurchase}/>
      <BuildingStoreItem buildingName={"Factory"} buildingAmount={47} buildingPrice={gc.storePrices["Factory"]} onItemPurchase={handleItemPurchase}/>
      <BuildingStoreItem buildingName={"Nuclear Brick Plant"} buildingAmount={260} buildingPrice={gc.storePrices["Nuclear Brick Plant"]} onItemPurchase={handleItemPurchase}/>
      <BuildingStoreItem buildingName={"Brick Cultivation Pods"} buildingAmount={1400} buildingPrice={gc.storePrices["Brick Cultivation Pods"]} onItemPurchase={handleItemPurchase}/>
      <BuildingStoreItem buildingName={"Brick-a-tron"} buildingAmount={7800} buildingPrice={gc.storePrices["Brick-a-tron"]} onItemPurchase={handleItemPurchase}/>
      <BuildingStoreItem buildingName={"Mother of Bricks"} buildingAmount={44000} buildingPrice={gc.storePrices["Mother of Bricks"]} onItemPurchase={handleItemPurchase}/>
      <BuildingStoreItem buildingName={"Brick Government"} buildingAmount={260000} buildingPrice={gc.storePrices["Brick Government"]} onItemPurchase={handleItemPurchase}/>
      <BuildingStoreItem buildingName={"Holy Church of Bricks"} buildingAmount={1600000} buildingPrice={gc.storePrices["Holy Church of Bricks"]} onItemPurchase={handleItemPurchase}/>
    </div>
  )
}

export default BuildingStore