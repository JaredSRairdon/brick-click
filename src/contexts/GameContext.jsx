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
      "Ergonomic Handle": { currentPrice: 100, upgradePower: 2, count: 0, relatedBuilding: "Trowel" },
      "Bronze Blade": { currentPrice: 1000, upgradePower: 2, count: 0, relatedBuilding: "Trowel" },
      "Silver Blade": { currentPrice: 10000, upgradePower: 2, count: 0, relatedBuilding: "Trowel" },
      "Golden Blade": { currentPrice: 50000, upgradePower: 2, count: 0, relatedBuilding: "Trowel" },
      "Turbo Trowel": { currentPrice: 10000, upgradePower: 2, count: 0, relatedBuilding: "Trowel" },

      "All-Terrain Tires": { currentPrice: 250, upgradePower: 1, count: 0, relatedBuilding: "Wheelbarrow" },
      "Bronze Tub": { currentPrice: 1250, upgradePower: 1, count: 0, relatedBuilding: "Wheelbarrow" },
      "Silver Tub": { currentPrice: 7500, upgradePower: 1, count: 0, relatedBuilding: "Wheelbarrow" },
      "Golden Tub": { currentPrice: 25000, upgradePower: 1, count: 0, relatedBuilding: "Wheelbarrow" },
      "Turbo Boosted V6": { currentPrice: 50000, upgradePower: 1, count: 0, relatedBuilding: "Wheelbarrow" },

      "Electric Stove": { currentPrice: 500, upgradePower: 1, count: 0, relatedBuilding: "Oven" },
      "Gas-Powered Cooker": { currentPrice: 2250, upgradePower: 1, count: 0, relatedBuilding: "Oven" },
      "Silver-plated Door": { currentPrice: 8850, upgradePower: 1, count: 0, relatedBuilding: "Oven" },
      "Crystal Glass": { currentPrice: 35000, upgradePower: 1, count: 0, relatedBuilding: "Oven" },
      "The Oven Light": { currentPrice: 75000, upgradePower: 1, count: 0, relatedBuilding: "Oven" },

      "Reinforced Forklifts": { currentPrice: 7500, upgradePower: 1, count: 0, relatedBuilding: "Factory" },
      "OSHA Violations": { currentPrice: 40000, upgradePower: 1, count: 0, relatedBuilding: "Factory" },
      "Amazon Urine Bottles": { currentPrice: 90000, upgradePower: 1, count: 0, relatedBuilding: "Factory" },
      "Weather-Proof Doors": { currentPrice: 375000, upgradePower: 1, count: 0, relatedBuilding: "Factory" },
      "Brick Overseer": { currentPrice: 850000, upgradePower: 1, count: 0, relatedBuilding: "Factory" },

      "Certified Engineers": { currentPrice: 1000, upgradePower: 1, count: 0, relatedBuilding: "Nuclear Brick Plant" },
      "Overheat Protection": { currentPrice: 5500, upgradePower: 1, count: 0, relatedBuilding: "Nuclear Brick Plant" },
      "Homer Simpson": { currentPrice: 95000, upgradePower: 1, count: 0, relatedBuilding: "Nuclear Brick Plant" },
      "Radroach Infestation": { currentPrice: 450000, upgradePower: 1, count: 0, relatedBuilding: "Nuclear Brick Plant" },
      "Mortar Meltdown": { currentPrice: 1000000, upgradePower: 1, count: 0, relatedBuilding: "Nuclear Brick Plant" },

      "Climate Controlled Pods": { currentPrice: 12500, upgradePower: 1, count: 0, relatedBuilding: "Brick Cultivation Pods" },
      "Nutrient-Rich Additives": { currentPrice: 72500, upgradePower: 1, count: 0, relatedBuilding: "Brick Cultivation Pods" },
      "Sustainable Energy Sources": { currentPrice: 125000, upgradePower: 1, count: 0, relatedBuilding: "Brick Cultivation Pods" },
      "Crystal Glass Tubes": { currentPrice: 600000, upgradePower: 1, count: 0, relatedBuilding: "Brick Cultivation Pods" },
      "Jeff Goldbluum": { currentPrice: 1200000, upgradePower: 1, count: 0, relatedBuilding: "Brick Cultivation Pods" },

      "Golden Arm": { currentPrice: 30000, upgradePower: 1, count: 0, relatedBuilding: "Brick-a-tron" },
      "Voltron's Head": { currentPrice: 60000, upgradePower: 1, count: 0, relatedBuilding: "Brick-a-tron" },
      "The Leg": { currentPrice: 120000, upgradePower: 1, count: 0, relatedBuilding: "Brick-a-tron" },
      "The Arms": { currentPrice: 250000, upgradePower: 1, count: 0, relatedBuilding: "Brick-a-tron" },
      "The Platinum Heart": { currentPrice: 1000000, upgradePower: 1, count: 0, relatedBuilding: "Brick-a-tron" },

      "Care": { currentPrice: 1000000, upgradePower: 1, count: 0, relatedBuilding: "Mother of Bricks" },
      "Love": { currentPrice: 2000000, upgradePower: 1, count: 0, relatedBuilding: "Mother of Bricks" },
      "Joy": { currentPrice: 3000000, upgradePower: 1, count: 0, relatedBuilding: "Mother of Bricks" },
      "Grace": { currentPrice: 4000000, upgradePower: 1, count: 0, relatedBuilding: "Mother of Bricks" },
      "And Everything Nice": { currentPrice: 5000000, upgradePower: 1, count: 0, relatedBuilding: "Mother of Bricks" },

      "The Executive Branch": { currentPrice: 10000000, upgradePower: 1, count: 0, relatedBuilding: "Brick Government" },
      "The Judicial Branch": { currentPrice: 20000000, upgradePower: 1, count: 0, relatedBuilding: "Brick Government" },
      "The Legislative Branch": { currentPrice: 30000000, upgradePower: 1, count: 0, relatedBuilding: "Brick Government" },
      "Bricks and Corruption": { currentPrice: 40000000, upgradePower: 1, count: 0, relatedBuilding: "Brick Government" },
      "Brick Republic": { currentPrice: 50000000, upgradePower: 1, count: 0, relatedBuilding: "Brick Government" },

      "The Holy Brick Prayer": { currentPrice: 100000000, upgradePower: 1, count: 0, relatedBuilding: "Holy Church of Bricks" },
      "Brick Wednesday": { currentPrice: 200000000, upgradePower: 1, count: 0, relatedBuilding: "Holy Church of Bricks" },
      "Brick-or-Treat": { currentPrice: 300000000, upgradePower: 1, count: 0, relatedBuilding: "Holy Church of Bricks" },
      "Feeding the Brickless": { currentPrice: 400000000, upgradePower: 1, count: 0, relatedBuilding: "Holy Church of Bricks" },
      "Pope Brick-cis": { currentPrice: 500000000, upgradePower: 1, count: 0, relatedBuilding: "Holy Church of Bricks" },
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
      "Oven": { currentPrice: 11000, basePrice: 11000, bpsUpgradeAmount: 5 },
      "Factory": { currentPrice: 12000, basePrice: 12000, bpsUpgradeAmount: 10 },
      "Nuclear Brick Plant": { currentPrice: 130000, basePrice: 130000, bpsUpgradeAmount: 100 },
      "Brick Cultivation Pods": { currentPrice: 1400000, basePrice: 1400000, bpsUpgradeAmount: 1000 },
      "Brick-a-tron": { currentPrice: 20000000, basePrice: 20000000, bpsUpgradeAmount: 10000 },
      "Mother of Bricks": { currentPrice: 330000000, basePrice: 330000000, bpsUpgradeAmount: 1000000 },
      "Brick Government": { currentPrice: 5100000000, basePrice: 5100000000, bpsUpgradeAmount: 10000000 },
      "Holy Church of Bricks": { currentPrice: 75000000000, basePrice: 75000000000, bpsUpgradeAmount: 100000000 }
    },
    clickUpgrades: {
      "Ergonomic Handle": { currentPrice: 100, upgradePower: 2, count: 0, relatedBuilding: "Trowel" },
      "Bronze Blade": { currentPrice: 1000, upgradePower: 2, count: 0, relatedBuilding: "Trowel" },
      "Silver Blade": { currentPrice: 10000, upgradePower: 2, count: 0, relatedBuilding: "Trowel" },
      "Golden Blade": { currentPrice: 50000, upgradePower: 2, count: 0, relatedBuilding: "Trowel" },
      "Turbo Trowel": { currentPrice: 10000, upgradePower: 2, count: 0, relatedBuilding: "Trowel" },

      "All-Terrain Tires": { currentPrice: 1000, upgradePower: 2, count: 0, relatedBuilding: "Wheelbarrow" },
      "Bronze Tub": { currentPrice: 5000, upgradePower: 1.25, count: 0, relatedBuilding: "Wheelbarrow" },
      "Silver Tub": { currentPrice: 50000, upgradePower: 1.25, count: 0, relatedBuilding: "Wheelbarrow" },
      "Golden Tub": { currentPrice: 5000000, upgradePower: 1.25, count: 0, relatedBuilding: "Wheelbarrow" },
      "Turbo Boosted V6": { currentPrice: 500000000, upgradePower: 1.25, count: 0, relatedBuilding: "Wheelbarrow" },

      "Electric Stove": { currentPrice: 11000, upgradePower: 2, count: 0, relatedBuilding: "Oven" },
      "Gas-Powered Cooker": { currentPrice: 55000, upgradePower: 1.25, count: 0, relatedBuilding: "Oven" },
      "Silver-plated Door": { currentPrice: 550000, upgradePower: 1.25, count: 0, relatedBuilding: "Oven" },
      "Crystal Glass": { currentPrice: 55000000, upgradePower: 1.25, count: 0, relatedBuilding: "Oven" },
      "The Oven Light": { currentPrice: 5500000000, upgradePower: 1.25, count: 0, relatedBuilding: "Oven" },

      "Reinforced Forklifts": { currentPrice: 120000, upgradePower: 2, count: 0, relatedBuilding: "Factory" },
      "OSHA Violations": { currentPrice: 600000, upgradePower: 1.25, count: 0, relatedBuilding: "Factory" },
      "Amazon Urine Bottles": { currentPrice: 6000000, upgradePower: 1.25, count: 0, relatedBuilding: "Factory" },
      "Weather-Proof Doors": { currentPrice: 600000000, upgradePower: 1.25, count: 0, relatedBuilding: "Factory" },
      "Brick Overseer": { currentPrice: 60000000000, upgradePower: 1.25, count: 0, relatedBuilding: "Factory" },

      "Certified Engineers": { currentPrice: 1300000, upgradePower: 2, count: 0, relatedBuilding: "Nuclear Brick Plant" },
      "Overheat Protection": { currentPrice: 5500, upgradePower: 1.25, count: 0, relatedBuilding: "Nuclear Brick Plant" },
      "Homer Simpson": { currentPrice: 95000, upgradePower: 1.25, count: 0, relatedBuilding: "Nuclear Brick Plant" },
      "Radroach Infestation": { currentPrice: 450000, upgradePower: 1.25, count: 0, relatedBuilding: "Nuclear Brick Plant" },
      "Mortar Meltdown": { currentPrice: 1000000, upgradePower: 1.25, count: 0, relatedBuilding: "Nuclear Brick Plant" },

      "Climate Controlled Pods": { currentPrice: 12500, upgradePower: 2, count: 0, relatedBuilding: "Brick Cultivation Pods" },
      "Nutrient-Rich Additives": { currentPrice: 72500, upgradePower: 1.25, count: 0, relatedBuilding: "Brick Cultivation Pods" },
      "Sustainable Energy Sources": { currentPrice: 125000, upgradePower: 1.25, count: 0, relatedBuilding: "Brick Cultivation Pods" },
      "Crystal Glass Tubes": { currentPrice: 600000, upgradePower: 1.25, count: 0, relatedBuilding: "Brick Cultivation Pods" },
      "Jeff Goldbluum": { currentPrice: 1200000, upgradePower: 1.25, count: 0, relatedBuilding: "Brick Cultivation Pods" },

      "Golden Arm": { currentPrice: 30000, upgradePower: 2, count: 0, relatedBuilding: "Brick-a-tron" },
      "Voltron's Head": { currentPrice: 60000, upgradePower: 1.25, count: 0, relatedBuilding: "Brick-a-tron" },
      "The Leg": { currentPrice: 120000, upgradePower: 1.25, count: 0, relatedBuilding: "Brick-a-tron" },
      "The Arms": { currentPrice: 250000, upgradePower: 1.25, count: 0, relatedBuilding: "Brick-a-tron" },
      "The Platinum Heart": { currentPrice: 1000000, upgradePower: 1.25, count: 0, relatedBuilding: "Brick-a-tron" },

      "Care": { currentPrice: 1000000, upgradePower: 2, count: 0, relatedBuilding: "Mother of Bricks" },
      "Love": { currentPrice: 2000000, upgradePower: 2, count: 0, relatedBuilding: "Mother of Bricks" },
      "Joy": { currentPrice: 3000000, upgradePower: 2, count: 0, relatedBuilding: "Mother of Bricks" },
      "Grace": { currentPrice: 4000000, upgradePower: 2, count: 0, relatedBuilding: "Mother of Bricks" },
      "And Everything Nice": { currentPrice: 5000000, upgradePower: 2, count: 0, relatedBuilding: "Mother of Bricks" },

      "The Executive Branch": { currentPrice: 10000000, upgradePower: 2, count: 0, relatedBuilding: "Brick Government" },
      "The Judicial Branch": { currentPrice: 20000000, upgradePower: 2, count: 0, relatedBuilding: "Brick Government" },
      "The Legislative Branch": { currentPrice: 30000000, upgradePower: 2, count: 0, relatedBuilding: "Brick Government" },
      "Bricks and Corruption": { currentPrice: 40000000, upgradePower: 2, count: 0, relatedBuilding: "Brick Government" },
      "Brick Republic": { currentPrice: 50000000, upgradePower: 2, count: 0, relatedBuilding: "Brick Government" },

      "The Holy Brick Prayer": { currentPrice: 100000000, upgradePower: 2, count: 0, relatedBuilding: "Holy Church of Bricks" },
      "Brick Wednesday": { currentPrice: 200000000, upgradePower: 2, count: 0, relatedBuilding: "Holy Church of Bricks" },
      "Brick-or-Treat": { currentPrice: 300000000, upgradePower: 2, count: 0, relatedBuilding: "Holy Church of Bricks" },
      "Feeding the Brickless": { currentPrice: 400000000, upgradePower: 2, count: 0, relatedBuilding: "Holy Church of Bricks" },
      "Pope Brick-cis": { currentPrice: 500000000, upgradePower: 2, count: 0, relatedBuilding: "Holy Church of Bricks" },
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
      const buildingStats = prevState.playerStats.buildingStats[relatedBuilding];
      const buildingCount = buildingStats.count;
  
      if (prevState.playerStats.brickCount >= upgrade.currentPrice) {
        return {
          ...prevState,
          playerStats: {
            ...prevState.playerStats,
            brickCount: prevState.playerStats.brickCount - upgrade.currentPrice,
            clickPower: prevState.playerStats.clickPower * upgrade.upgradePower,
            bricksPerSecond: prevState.playerStats.bricksPerSecond + (buildingCount * prevState.storePrices[relatedBuilding].bpsUpgradeAmount),
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
              bpsUpgradeAmount: prevState.storePrices[relatedBuilding].bpsUpgradeAmount * 2
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