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
      "Trowel": { currentPrice: 15, basePrice: 15, bpsUpgradeAmount: 1 },
      "Wheelbarrow": { currentPrice: 100, basePrice: 100, bpsUpgradeAmount: 1 },
      "Oven": { currentPrice: 11000, basePrice: 11000, bpsUpgradeAmount: 1 },
      "Factory": { currentPrice: 12000, basePrice: 12000, bpsUpgradeAmount: 1 },
      "Nuclear Brick Plant": { currentPrice: 130000, basePrice: 130000, bpsUpgradeAmount: 1 },
      "Brick Cultivation Pods": { currentPrice: 1400000, basePrice: 1400000, bpsUpgradeAmount: 1 },
      "Brick-a-tron": { currentPrice: 20000000, basePrice: 20000000, bpsUpgradeAmount: 1 },
      "Mother of Bricks": { currentPrice: 330000000, basePrice: 330000000, bpsUpgradeAmount: 1 },
      "Brick Government": { currentPrice: 5100000000, basePrice: 5100000000, bpsUpgradeAmount: 1 },
      "Holy Church of Bricks": { currentPrice: 75000000000, basePrice: 75000000000, bpsUpgradeAmount: 1 }
    },
    clickUpgrades: {
      "Reinforced Finger": { currentPrice: 10, basePrice: 10, upgradePower: 2, count: 0 },
      "Steel Pointer": { currentPrice: 10, basePrice: 10, upgradePower: 3, count: 0 },
      "Golden Lad": { currentPrice: 10, basePrice: 10, upgradePower: 4, count: 0 },
      "Platinum Poke": { currentPrice: 10, basePrice: 10, upgradePower: 5, count: 0 },
      "God Touch": { currentPrice: 10, basePrice: 10, upgradePower: 6, count: 0 },
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

  // Function to handle upgrade purchase
  const purchaseUpgrade = (upgradeName) => {
    setGameState((prevState) => {
      const upgrade = prevState.clickUpgrades[upgradeName];
      if (prevState.playerStats.brickCount >= upgrade.currentPrice) {
        return {
          ...prevState,
          playerStats: {
            ...prevState.playerStats, // Spread the existing playerStats
            brickCount: prevState.playerStats.brickCount - upgrade.currentPrice,
            clickPower: prevState.playerStats.clickPower * upgrade.upgradePower,
          },
          clickUpgrades: { // Correct the key to clickUpgrades
            ...prevState.clickUpgrades, // Spread the existing clickUpgrades
            [upgradeName]: {
              ...upgrade,
              currentPrice: upgrade.currentPrice * 1.5, // Increase price by 50%
              count: upgrade.count + 1
            },
          },
        };
      }
      return prevState;
    });
  };

  const purchaseBuilding = (buildingName) => {
    setGameState((prevState) => {
      const building = prevState.storePrices[buildingName];
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
                count: prevState.playerStats.buildingStats[buildingName].count + 1
              }
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
    setGameState((prevState) => ({
      ...prevState,
      playerStats: {
        ...prevState.playerStats,
        playerName: "Player 1",
        bakeryName: "Brick Bakery",
        brickCount: 0,
        bricksPerSecond: 1,
        clickPower: 1,
        buildingCount: 0, // Reset buildingCount
        buildingStats: Object.keys(prevState.playerStats.buildingStats).reduce((acc, key) => {
          acc[key] = { count: 0, upgrades: 0 };
          return acc;
        }, {})
      },
      storePrices: Object.keys(prevState.storePrices).reduce((acc, key) => {
        acc[key] = { ...prevState.storePrices[key], currentPrice: prevState.storePrices[key].basePrice };
        return acc;
      }, {}),
      clickUpgrades: Object.keys(prevState.clickUpgrades).reduce((acc, key) => {
        acc[key] = { ...prevState.clickUpgrades[key], currentPrice: prevState.clickUpgrades[key].basePrice, count: 0 };
        return acc;
      }, {})
    }));
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