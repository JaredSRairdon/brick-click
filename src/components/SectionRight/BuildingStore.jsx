import React, { useContext, useState } from 'react'
import BuildingStoreItem from './BuildingStoreItem'
import { GameContext } from '../../contexts/GameContext'

function BuildingStore() {
  const gc = useContext(GameContext);

  // Updates the stats/buildings owned on purchase
  const updateStats = (buildingName) => {
    gc.setPlayerStats((prevStats) => ({
      ...prevStats,
      [buildingName]: {
        count: (prevStats[buildingName]?.count || 0) + 1,
        upgrades: prevStats[buildingName]?.upgrades || 0 // Keeps the upgrades unchanged
      }
    }));
  }

  // Updates the price of a store item after it is purchased
  const updatePrice = (buildingName) => {
    gc.setStorePrices((prevPrices) => {
      const currentCount = gc.playerStats[buildingName]?.count || 0;
      return {
        ...prevPrices,
        [buildingName]: {
          ...prevPrices[buildingName],
          currentPrice: prevPrices[buildingName].basePrice * Math.pow(1.15, currentCount)
        }
      };
    });

    console.log(`Updating price of ${buildingName}...`);
    console.log(`${gc.storePrices[buildingName]?.basePrice} * (${gc.playerStats[buildingName]?.count || 0}) ^ 1.15`);
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
      <BuildingStoreItem buildingName={"Trowel"} buildingAmount={0.1} buildingPrice={gc.storePrices["Trowel"]["currentPrice"]} onItemPurchase={handleItemPurchase}/>
      <BuildingStoreItem buildingName={"Wheelbarrow"} buildingAmount={1} buildingPrice={gc.storePrices["Wheelbarrow"]["currentPrice"]} onItemPurchase={handleItemPurchase}/>
      <BuildingStoreItem buildingName={"Oven"} buildingAmount={8} buildingPrice={gc.storePrices["Oven"]["currentPrice"]} onItemPurchase={handleItemPurchase}/>
      <BuildingStoreItem buildingName={"Factory"} buildingAmount={47} buildingPrice={gc.storePrices["Factory"]["currentPrice"]} onItemPurchase={handleItemPurchase}/>
      <BuildingStoreItem buildingName={"Nuclear Brick Plant"} buildingAmount={260} buildingPrice={gc.storePrices["Nuclear Brick Plant"]["currentPrice"]} onItemPurchase={handleItemPurchase}/>
      <BuildingStoreItem buildingName={"Brick Cultivation Pods"} buildingAmount={1400} buildingPrice={gc.storePrices["Brick Cultivation Pods"]["currentPrice"]} onItemPurchase={handleItemPurchase}/>
      <BuildingStoreItem buildingName={"Brick-a-tron"} buildingAmount={7800} buildingPrice={gc.storePrices["Brick-a-tron"]["currentPrice"]} onItemPurchase={handleItemPurchase}/>
      <BuildingStoreItem buildingName={"Mother of Bricks"} buildingAmount={44000} buildingPrice={gc.storePrices["Mother of Bricks"]["currentPrice"]} onItemPurchase={handleItemPurchase}/>
      <BuildingStoreItem buildingName={"Brick Government"} buildingAmount={260000} buildingPrice={gc.storePrices["Brick Government"]["currentPrice"]} onItemPurchase={handleItemPurchase}/>
      <BuildingStoreItem buildingName={"Holy Church of Bricks"} buildingAmount={1600000} buildingPrice={gc.storePrices["Holy Church of Bricks"]["currentPrice"]} onItemPurchase={handleItemPurchase}/>
    </div>
  )
}

export default BuildingStore