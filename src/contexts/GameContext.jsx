import React, { createContext, useEffect, useState, useCallback } from 'react';

// Create a new context
const GameContext = createContext();

// Create a provider component
const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState({
    playerStats: {
      playerName: "Player 1",
      bakeryName: "Brick Bakery",
      brickCount: 0,
      bricksPerSecond: 0,
      clickPower: 1,
      buildingCount: 0,
      buildingStats: {
        "Trowel": { count: 0, upgrades: 0 },
        "Wheelbarrow": { count: 0, upgrades: 0 },
        "Oven": { count: 0, upgrades: 0 },
        "Factory": { count: 0, upgrades: 0 },
        "Nuclear Brick Plant": { count: 0, upgrades: 0 },
        "Brick Cultivation Pods": { count: 0, upgrades: 0 },
        "Brick-a-tron": { count: 0, upgrades: 0 },
        "Mother of Bricks": { count: 0, upgrades: 0 },
        "Brick Government": { count: 0, upgrades: 0 },
        "Holy Church of Bricks": { count: 0, upgrades: 0 }
      },
    },
    storePrices: {
      "Trowel": { currentPrice: 15, basePrice: 15, bpsUpgradeAmount: 0.2 },
      "Wheelbarrow": { currentPrice: 100, basePrice: 100, bpsUpgradeAmount: 1 },
      "Oven": { currentPrice: 1100, basePrice: 1100, bpsUpgradeAmount: 5 },
      "Factory": { currentPrice: 12000, basePrice: 12000, bpsUpgradeAmount: 10 },
      "Nuclear Brick Plant": { currentPrice: 130000, basePrice: 130000, bpsUpgradeAmount: 100 },
      "Brick Cultivation Pods": { currentPrice: 1400000, basePrice: 1400000, bpsUpgradeAmount: 1000 },
      "Brick-a-tron": { currentPrice: 20000000, basePrice: 20000000, bpsUpgradeAmount: 10000 },
      "Mother of Bricks": { currentPrice: 330000000, basePrice: 330000000, bpsUpgradeAmount: 1000000 },
      "Brick Government": { currentPrice: 5100000000, basePrice: 5100000000, bpsUpgradeAmount: 10000000 },
      "Holy Church of Bricks": { currentPrice: 75000000000, basePrice: 75000000000, bpsUpgradeAmount: 100000000 }
    },
    clickUpgrades: {
      "Ergonomic Handle": { currentPrice: 10, upgradePower: 2, count: 0, relatedBuilding: "Trowel", unlockCondition: 0, description: "Doubles the efficiency of all trowels." },
      "Bronze Blade": { currentPrice: 500, upgradePower: 2, count: 0, relatedBuilding: "Trowel", unlockCondition: 0, description: "Doubles the efficiency of all trowels." },
      "Silver Blade": { currentPrice: 10_000, upgradePower: 2, count: 0, relatedBuilding: "Trowel", unlockCondition: 0, description: "Doubles the efficiency of all trowels." },
      "Golden Blade": { currentPrice: 100_000, upgradePower: 1, count: 0, relatedBuilding: "Trowel", unlockCondition: 0, description: "Click power and trowels gain +0.1 bricks for each non-trowel object owned." },
      "Turbo Trowel": { currentPrice: 10_000_000, upgradePower: 1, count: 0, relatedBuilding: "Trowel", unlockCondition: 0, description: "Click power and trowels gain +5 bricks for each non-trowel object owned." },
      "Turboer Trowel": { currentPrice: 100_000_000, upgradePower: 1, count: 0, relatedBuilding: "Trowel", unlockCondition: 0, description: "Click power and trowels gain +10 bricks for each non-trowel object owned." },
      "Turboerer Trowel": { currentPrice: 1_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Trowel", unlockCondition: 0, description: "Click power and trowels gain +20 bricks for each non-trowel object owned." },

      "All-Terrain Tires": { currentPrice: 1000, upgradePower: 1, count: 0, relatedBuilding: "Wheelbarrow", unlockCondition: 0, description: "" },
      "Bronze Tub": { currentPrice: 5000, upgradePower: 1, count: 0, relatedBuilding: "Wheelbarrow", unlockCondition: 0, description: "" },
      "Silver Tub": { currentPrice: 50_000, upgradePower: 1, count: 0, relatedBuilding: "Wheelbarrow", unlockCondition: 0, description: "" },
      "Golden Tub": { currentPrice: 5_000_000, upgradePower: 1, count: 0, relatedBuilding: "Wheelbarrow", unlockCondition: 0, description: "" },
      "Turbo Boosted V6": { currentPrice: 500_000_000, upgradePower: 1, count: 0, relatedBuilding: "Wheelbarrow", unlockCondition: 0, description: "" },

      "Electric Stove": { currentPrice: 11_000, upgradePower: 1, count: 0, relatedBuilding: "Oven", unlockCondition: 0, description: "" },
      "Gas-Powered Cooker": { currentPrice: 55_000, upgradePower: 1, count: 0, relatedBuilding: "Oven", unlockCondition: 0, description: "" },
      "Silver-plated Door": { currentPrice: 550_000, upgradePower: 1, count: 0, relatedBuilding: "Oven", unlockCondition: 0, description: "" },
      "Crystal Glass": { currentPrice: 55_000_000, upgradePower: 1, count: 0, relatedBuilding: "Oven", unlockCondition: 0, description: "" },
      "The Oven Light": { currentPrice: 5_500_000_000, upgradePower: 1, count: 0, relatedBuilding: "Oven", unlockCondition: 0, description: "" },

      "Reinforced Forklifts": { currentPrice: 120_000, upgradePower: 1, count: 0, relatedBuilding: "Factory", unlockCondition: 0, description: "" },
      "OSHA Violations": { currentPrice: 600_000, upgradePower: 1, count: 0, relatedBuilding: "Factory", unlockCondition: 0, description: "" },
      "Amazon Urine Bottles": { currentPrice: 6_000_000, upgradePower: 1, count: 0, relatedBuilding: "Factory", unlockCondition: 0, description: "" },
      "Weather-Proof Doors": { currentPrice: 600_000_000, upgradePower: 1, count: 0, relatedBuilding: "Factory", unlockCondition: 0, description: "" },
      "Brick Overseer": { currentPrice: 60_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Factory", unlockCondition: 0, description: "" },

      "Certified Engineers": { currentPrice: 1_300_000, upgradePower: 1, count: 0, relatedBuilding: "Nuclear Brick Plant", unlockCondition: 0, description: "" },
      "Overheat Protection": { currentPrice: 6_500_000, upgradePower: 1, count: 0, relatedBuilding: "Nuclear Brick Plant", unlockCondition: 0, description: "" },
      "Homer Simpson": { currentPrice: 65_000_000, upgradePower: 1, count: 0, relatedBuilding: "Nuclear Brick Plant", unlockCondition: 0, description: "" },
      "Radroach Infestation": { currentPrice: 6_500_000_000, upgradePower: 1, count: 0, relatedBuilding: "Nuclear Brick Plant", unlockCondition: 0, description: "" },
      "Mortar Meltdown": { currentPrice: 650_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Nuclear Brick Plant", unlockCondition: 0, description: "" },

      "Climate Controlled Pods": { currentPrice: 200_000_000, upgradePower: 1, count: 0, relatedBuilding: "Brick Cultivation Pods", unlockCondition: 0, description: "" },
      "Nutrient-Rich Additives": { currentPrice: 1_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Brick Cultivation Pods", unlockCondition: 0, description: "" },
      "Sustainable Energy Sources": { currentPrice: 10_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Brick Cultivation Pods", unlockCondition: 0, description: "" },
      "Crystal Glass Tubes": { currentPrice: 1_000_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Brick Cultivation Pods", unlockCondition: 0, description: "" },
      "Jeff Goldbluum": { currentPrice: 100_000_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Brick Cultivation Pods", unlockCondition: 0, description: "" },

      "Golden Arm": { currentPrice: 3_300_000_000, upgradePower: 1, count: 0, relatedBuilding: "Brick-a-tron", unlockCondition: 0, description: "" },
      "Voltron's Head": { currentPrice: 16_500_000_000, upgradePower: 1, count: 0, relatedBuilding: "Brick-a-tron", unlockCondition: 0, description: "" },
      "The Leg": { currentPrice: 165_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Brick-a-tron", unlockCondition: 0, description: "" },
      "The Arms": { currentPrice: 16_500_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Brick-a-tron", unlockCondition: 0, description: "" },
      "The Platinum Heart": { currentPrice: 1_650_000_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Brick-a-tron", unlockCondition: 0, description: "" },

      "Care": { currentPrice: 750_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Mother of Bricks", unlockCondition: 0, description: "" },
      "Love": { currentPrice: 3_750_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Mother of Bricks", unlockCondition: 0, description: "" },
      "Joy": { currentPrice: 37_500_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Mother of Bricks", unlockCondition: 0, description: "" },
      "Grace": { currentPrice: 3_750_000_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Mother of Bricks", unlockCondition: 0, description: "" },
      "And Everything Nice": { currentPrice: 375_000_000_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Mother of Bricks", unlockCondition: 0, description: "" },

      "The Executive Branch": { currentPrice: 10_000_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Brick Government", unlockCondition: 0, description: "" },
      "The Judicial Branch": { currentPrice: 50_000_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Brick Government", unlockCondition: 0, description: "" },
      "The Legislative Branch": { currentPrice: 500_000_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Brick Government", unlockCondition: 0, description: "" },
      "Bricks and Corruption": { currentPrice: 50_000_000_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Brick Government", unlockCondition: 0, description: "" },
      "Brick Republic": { currentPrice: 5_000_000_000_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Brick Government", unlockCondition: 0, description: "" },

      "The Holy Brick Prayer": { currentPrice: 140_000_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Holy Church of Bricks", unlockCondition: 0, description: "" },
      "Brick Wednesday": { currentPrice: 700_000_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Holy Church of Bricks", unlockCondition: 0, description: "" },
      "Brick-or-Treat": { currentPrice: 7_000_000_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Holy Church of Bricks", unlockCondition: 0, description: "" },
      "Feeding the Brickless": { currentPrice: 700_000_000_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Holy Church of Bricks", unlockCondition: 0, description: "" },
      "Pope Brick-cis": { currentPrice: 70_000_000_000_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Holy Church of Bricks", unlockCondition: 0, description: "" },
    }
  });

  // default state for the resetStats function, needs to always match gameState if new items are added
  const [defaultGameState, setDefaultGameState] = useState({
    playerStats: {
      playerName: "Player 1",
      bakeryName: "Brick Bakery",
      brickCount: 0,
      bricksPerSecond: 0,
      clickPower: 1,
      buildingCount: 0,
      buildingStats: {
        "Trowel": { count: 0, upgrades: 0 },
        "Wheelbarrow": { count: 0, upgrades: 0 },
        "Oven": { count: 0, upgrades: 0 },
        "Factory": { count: 0, upgrades: 0 },
        "Nuclear Brick Plant": { count: 0, upgrades: 0 },
        "Brick Cultivation Pods": { count: 0, upgrades: 0 },
        "Brick-a-tron": { count: 0, upgrades: 0 },
        "Mother of Bricks": { count: 0, upgrades: 0 },
        "Brick Government": { count: 0, upgrades: 0 },
        "Holy Church of Bricks": { count: 0, upgrades: 0 }
      },
    },
    storePrices: {
      "Trowel": { currentPrice: 15, basePrice: 15, bpsUpgradeAmount: 0.2 },
      "Wheelbarrow": { currentPrice: 100, basePrice: 100, bpsUpgradeAmount: 1 },
      "Oven": { currentPrice: 1100, basePrice: 1100, bpsUpgradeAmount: 5 },
      "Factory": { currentPrice: 12000, basePrice: 12000, bpsUpgradeAmount: 10 },
      "Nuclear Brick Plant": { currentPrice: 130000, basePrice: 130000, bpsUpgradeAmount: 100 },
      "Brick Cultivation Pods": { currentPrice: 1400000, basePrice: 1400000, bpsUpgradeAmount: 1000 },
      "Brick-a-tron": { currentPrice: 20000000, basePrice: 20000000, bpsUpgradeAmount: 10000 },
      "Mother of Bricks": { currentPrice: 330000000, basePrice: 330000000, bpsUpgradeAmount: 1000000 },
      "Brick Government": { currentPrice: 5100000000, basePrice: 5100000000, bpsUpgradeAmount: 10000000 },
      "Holy Church of Bricks": { currentPrice: 75000000000, basePrice: 75000000000, bpsUpgradeAmount: 100000000 }
    },
    clickUpgrades: {
      "Ergonomic Handle": { currentPrice: 10, upgradePower: 2, count: 0, relatedBuilding: "Trowel", unlockCondition: 0, description: "Doubles the efficiency of all trowels." },
      "Bronze Blade": { currentPrice: 500, upgradePower: 2, count: 0, relatedBuilding: "Trowel", unlockCondition: 0, description: "Doubles the efficiency of all trowels." },
      "Silver Blade": { currentPrice: 10_000, upgradePower: 2, count: 0, relatedBuilding: "Trowel", unlockCondition: 0, description: "Doubles the efficiency of all trowels." },
      "Golden Blade": { currentPrice: 100_000, upgradePower: 1, count: 0, relatedBuilding: "Trowel", unlockCondition: 0, description: "Click power and trowels gain +0.1 bricks for each non-trowel object owned." },
      "Turbo Trowel": { currentPrice: 10_000_000, upgradePower: 1, count: 0, relatedBuilding: "Trowel", unlockCondition: 0, description: "Click power and trowels gain +5 bricks for each non-trowel object owned." },
      "Turboer Trowel": { currentPrice: 100_000_000, upgradePower: 1, count: 0, relatedBuilding: "Trowel", unlockCondition: 0, description: "Click power and trowels gain +10 bricks for each non-trowel object owned." },
      "Turboerer Trowel": { currentPrice: 1_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Trowel", unlockCondition: 0, description: "Click power and trowels gain +20 bricks for each non-trowel object owned." },

      "All-Terrain Tires": { currentPrice: 1000, upgradePower: 1, count: 0, relatedBuilding: "Wheelbarrow", unlockCondition: 0, description: "" },
      "Bronze Tub": { currentPrice: 5000, upgradePower: 1, count: 0, relatedBuilding: "Wheelbarrow", unlockCondition: 0, description: "" },
      "Silver Tub": { currentPrice: 50_000, upgradePower: 1, count: 0, relatedBuilding: "Wheelbarrow", unlockCondition: 0, description: "" },
      "Golden Tub": { currentPrice: 5_000_000, upgradePower: 1, count: 0, relatedBuilding: "Wheelbarrow", unlockCondition: 0, description: "" },
      "Turbo Boosted V6": { currentPrice: 500_000_000, upgradePower: 1, count: 0, relatedBuilding: "Wheelbarrow", unlockCondition: 0, description: "" },

      "Electric Stove": { currentPrice: 11_000, upgradePower: 1, count: 0, relatedBuilding: "Oven", unlockCondition: 0, description: "" },
      "Gas-Powered Cooker": { currentPrice: 55_000, upgradePower: 1, count: 0, relatedBuilding: "Oven", unlockCondition: 0, description: "" },
      "Silver-plated Door": { currentPrice: 550_000, upgradePower: 1, count: 0, relatedBuilding: "Oven", unlockCondition: 0, description: "" },
      "Crystal Glass": { currentPrice: 55_000_000, upgradePower: 1, count: 0, relatedBuilding: "Oven", unlockCondition: 0, description: "" },
      "The Oven Light": { currentPrice: 5_500_000_000, upgradePower: 1, count: 0, relatedBuilding: "Oven", unlockCondition: 0, description: "" },

      "Reinforced Forklifts": { currentPrice: 120_000, upgradePower: 1, count: 0, relatedBuilding: "Factory", unlockCondition: 0, description: "" },
      "OSHA Violations": { currentPrice: 600_000, upgradePower: 1, count: 0, relatedBuilding: "Factory", unlockCondition: 0, description: "" },
      "Amazon Urine Bottles": { currentPrice: 6_000_000, upgradePower: 1, count: 0, relatedBuilding: "Factory", unlockCondition: 0, description: "" },
      "Weather-Proof Doors": { currentPrice: 600_000_000, upgradePower: 1, count: 0, relatedBuilding: "Factory", unlockCondition: 0, description: "" },
      "Brick Overseer": { currentPrice: 60_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Factory", unlockCondition: 0, description: "" },

      "Certified Engineers": { currentPrice: 1_300_000, upgradePower: 1, count: 0, relatedBuilding: "Nuclear Brick Plant", unlockCondition: 0, description: "" },
      "Overheat Protection": { currentPrice: 6_500_000, upgradePower: 1, count: 0, relatedBuilding: "Nuclear Brick Plant", unlockCondition: 0, description: "" },
      "Homer Simpson": { currentPrice: 65_000_000, upgradePower: 1, count: 0, relatedBuilding: "Nuclear Brick Plant", unlockCondition: 0, description: "" },
      "Radroach Infestation": { currentPrice: 6_500_000_000, upgradePower: 1, count: 0, relatedBuilding: "Nuclear Brick Plant", unlockCondition: 0, description: "" },
      "Mortar Meltdown": { currentPrice: 650_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Nuclear Brick Plant", unlockCondition: 0, description: "" },

      "Climate Controlled Pods": { currentPrice: 200_000_000, upgradePower: 1, count: 0, relatedBuilding: "Brick Cultivation Pods", unlockCondition: 0, description: "" },
      "Nutrient-Rich Additives": { currentPrice: 1_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Brick Cultivation Pods", unlockCondition: 0, description: "" },
      "Sustainable Energy Sources": { currentPrice: 10_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Brick Cultivation Pods", unlockCondition: 0, description: "" },
      "Crystal Glass Tubes": { currentPrice: 1_000_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Brick Cultivation Pods", unlockCondition: 0, description: "" },
      "Jeff Goldbluum": { currentPrice: 100_000_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Brick Cultivation Pods", unlockCondition: 0, description: "" },

      "Golden Arm": { currentPrice: 3_300_000_000, upgradePower: 1, count: 0, relatedBuilding: "Brick-a-tron", unlockCondition: 0, description: "" },
      "Voltron's Head": { currentPrice: 16_500_000_000, upgradePower: 1, count: 0, relatedBuilding: "Brick-a-tron", unlockCondition: 0, description: "" },
      "The Leg": { currentPrice: 165_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Brick-a-tron", unlockCondition: 0, description: "" },
      "The Arms": { currentPrice: 16_500_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Brick-a-tron", unlockCondition: 0, description: "" },
      "The Platinum Heart": { currentPrice: 1_650_000_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Brick-a-tron", unlockCondition: 0, description: "" },

      "Care": { currentPrice: 750_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Mother of Bricks", unlockCondition: 0, description: "" },
      "Love": { currentPrice: 3_750_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Mother of Bricks", unlockCondition: 0, description: "" },
      "Joy": { currentPrice: 37_500_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Mother of Bricks", unlockCondition: 0, description: "" },
      "Grace": { currentPrice: 3_750_000_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Mother of Bricks", unlockCondition: 0, description: "" },
      "And Everything Nice": { currentPrice: 375_000_000_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Mother of Bricks", unlockCondition: 0, description: "" },

      "The Executive Branch": { currentPrice: 10_000_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Brick Government", unlockCondition: 0, description: "" },
      "The Judicial Branch": { currentPrice: 50_000_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Brick Government", unlockCondition: 0, description: "" },
      "The Legislative Branch": { currentPrice: 500_000_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Brick Government", unlockCondition: 0, description: "" },
      "Bricks and Corruption": { currentPrice: 50_000_000_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Brick Government", unlockCondition: 0, description: "" },
      "Brick Republic": { currentPrice: 5_000_000_000_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Brick Government", unlockCondition: 0, description: "" },

      "The Holy Brick Prayer": { currentPrice: 140_000_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Holy Church of Bricks", unlockCondition: 0, description: "" },
      "Brick Wednesday": { currentPrice: 700_000_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Holy Church of Bricks", unlockCondition: 0, description: "" },
      "Brick-or-Treat": { currentPrice: 7_000_000_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Holy Church of Bricks", unlockCondition: 0, description: "" },
      "Feeding the Brickless": { currentPrice: 700_000_000_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Holy Church of Bricks", unlockCondition: 0, description: "" },
      "Pope Brick-cis": { currentPrice: 70_000_000_000_000_000_000, upgradePower: 1, count: 0, relatedBuilding: "Holy Church of Bricks", unlockCondition: 0, description: "" },
    }
  });

  // Function to increment brickCount by the user's clickPower amount (called when user clicks the brick)
  const incrementBrickCountByClickPower = () => {
    setGameState((prevState) => ({
      ...prevState,
      playerStats: {
        ...prevState.playerStats,
        brickCount: prevState.playerStats.brickCount + prevState.playerStats.clickPower,
      }
    }));
  };

  // Function to calculate the number of non-trowel buildings owned
const getNonTrowelBuildingCount = (buildingStats) => {
  return Object.keys(buildingStats).reduce((total, building) => {
    if (building !== "Trowel") {
      total += buildingStats[building].count;
    }
    return total;
  }, 0);
};

  // Function to handle upgrade purchase
  const purchaseUpgrade = (upgradeName) => {
    setGameState((prevState) => {
      const upgrade = prevState.clickUpgrades[upgradeName];
      const relatedBuilding = upgrade.relatedBuilding;
      const relatedBuildingStats = prevState.playerStats.buildingStats[relatedBuilding];
      const relatedBuildingCount = relatedBuildingStats.count;
  
      if (prevState.playerStats.brickCount >= upgrade.currentPrice) {
        let trowelBonus = 0;

        if (relatedBuilding === "Trowel") {
          console.log("trowel upgrade bought!")
          switch (relatedBuildingStats.upgrades) {
            case 3:
              trowelBonus = getNonTrowelBuildingCount(prevState.playerStats.buildingStats) * 0.1
              console.log(`case 3: ${trowelBonus}`)
              break;
            case 4:
              trowelBonus = getNonTrowelBuildingCount(prevState.playerStats.buildingStats) * 5;
              console.log(`case 4: ${trowelBonus}`)
              break;
            case 5:
              trowelBonus = getNonTrowelBuildingCount(prevState.playerStats.buildingStats) * 10;
              console.log(`case 5: ${trowelBonus}`)
              break;
            default:
              if (relatedBuildingStats.upgrades > 5) {
                trowelBonus = getNonTrowelBuildingCount(prevState.playerStats.buildingStats) * 20;
                console.log(`default: ${trowelBonus}`)
              }
          }
        }

        return {
          ...prevState,
          playerStats: {
            ...prevState.playerStats,
            brickCount: prevState.playerStats.brickCount - upgrade.currentPrice,
            clickPower: (prevState.playerStats.clickPower * upgrade.upgradePower + trowelBonus) ,
            bricksPerSecond: prevState.playerStats.bricksPerSecond + (relatedBuildingCount * prevState.storePrices[relatedBuilding].bpsUpgradeAmount) + trowelBonus,
            buildingStats: {
              ...prevState.playerStats.buildingStats,
              [relatedBuilding]: {
                ...prevState.playerStats.buildingStats[relatedBuilding],
                upgrades: prevState.playerStats.buildingStats[relatedBuilding].upgrades + 1
              }
            }
          },
          clickUpgrades: {
            ...prevState.clickUpgrades,
            [upgradeName]: {
              ...upgrade,
              count: upgrade.count + 1
            },
          },
          storePrices: {
            ...prevState.storePrices,
            [relatedBuilding]: {
              ...prevState.storePrices[relatedBuilding],
              bpsUpgradeAmount: prevState.storePrices[relatedBuilding].bpsUpgradeAmount * 2 + trowelBonus
            }
          }
        };
      }
      return prevState;
    });
  };

  const purchaseBuilding = (buildingName) => {
    setGameState((prevState) => {
      const building = prevState.storePrices[buildingName];
      const buildingCount = prevState.playerStats.buildingStats[buildingName].count;
      const newPrice = building.basePrice * Math.pow(1.15, buildingCount); // Calculate the new price for the next purchase
  
      if (prevState.playerStats.brickCount >= building.currentPrice) {
        return {
          ...prevState,
          playerStats: {
            ...prevState.playerStats,
            brickCount: prevState.playerStats.brickCount - building.currentPrice,
            bricksPerSecond: prevState.playerStats.bricksPerSecond + building.bpsUpgradeAmount,
            buildingStats: {
              ...prevState.playerStats.buildingStats,
              [buildingName]: {
                ...prevState.playerStats.buildingStats[buildingName],
                count: buildingCount + 1
              }
            }
          },
          storePrices: {
            ...prevState.storePrices,
            [buildingName]: {
              ...building,
              currentPrice: newPrice // Update the current price to the new price
            }
          }
        };
      }
      return prevState; // Ensure the previous state is returned if the condition is not met
    });
  };

  // Loads the saved game state from localStorage
  useEffect(() => {
    const savedGameState = localStorage.getItem("gameState");

    if (savedGameState) {
      setGameState(JSON.parse(savedGameState));
    }
  }, []);

  // Saves the entire game state to localStorage every 100ms
  useEffect(() => {
    const saveInterval = setInterval(() => {
      localStorage.setItem('gameState', JSON.stringify(gameState));
    }, 100);

    return () => clearInterval(saveInterval);
  }, [gameState]);

  // // 100ms intervals for updating brick count based on bricksPerSecond
  useEffect(() => {
    const cpsInterval = setInterval(() => {
      setGameState((prevState) => ({
        ...prevState,
        playerStats: {
          ...prevState.playerStats,
          brickCount: prevState.playerStats.brickCount + (prevState.playerStats.bricksPerSecond / 10)
        }
      }));
    }, 100);
  
    return () => clearInterval(cpsInterval);
  }, [gameState.playerStats.bricksPerSecond]);

  // Function to reset all player stats/store price items
  const resetStats = () => {
    localStorage.clear();
    setGameState(defaultGameState);
  };

  // Provides the game state and actions to consuming components
  const contextValue = {
    ...gameState,
    setGameState,
    incrementBrickCountByClickPower,
    purchaseUpgrade,
    purchaseBuilding,
    resetStats
  };

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
};

export { GameProvider, GameContext };