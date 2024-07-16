import React, { createContext, useEffect, useState } from 'react';

// Create a new context
const GameContext = createContext();

// Create a provider component
const GameProvider = ({ children }) => {
  // Game variables
  const [brickCount, setBrickCount] = useState(0);
  const [bricksPerSecond, setBricksPerSecond] = useState(0);
  const [clickPower, setClickPower] = useState(1);

  // Player stats object, contains building names and how many the player owns
  const [playerStats, setPlayerStats] = useState({
  "playerName": "Player 1",
  "bakeryName": "Brick Bakery",
  "brickCount": 0,
  "bricksPerSecond": 0,
  "clickPower": 1, 
  "buildingStats":  {
    "Building": { count: 0, upgrades: 0 },
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
  }
  });

  // Store prices object, contains inventory items + price and base price
  const [storePrices, setStorePrices] = useState({
    "Trowel": { currentPrice: 15, basePrice: 15 },
    "Wheelbarrow": { currentPrice: 100, basePrice: 100 },
    "Oven": { currentPrice: 11000, basePrice: 11000 },
    "Factory": { currentPrice: 12000, basePrice: 12000 },
    "Nuclear Brick Plant": { currentPrice: 130000, basePrice: 130000 },
    "Brick Cultivation Pods": { currentPrice: 1400000, basePrice: 1400000 },
    "Brick-a-tron": { currentPrice: 20000000, basePrice: 20000000 },
    "Mother of Bricks": { currentPrice: 330000000, basePrice: 330000000 },
    "Brick Government": { currentPrice: 5100000000, basePrice: 5100000000 },
    "Holy Church of Bricks": { currentPrice: 75000000000, basePrice: 75000000000 }
  });

  // Function to increment brickCount by the user's clickPower amount (called when user clicks the brick)
  const incrementBrickCountByClickPower = () => {
    setPlayerStats((prevPlayerStats) => ({
      ...prevPlayerStats,
      brickCount: prevPlayerStats.brickCount + playerStats.clickPower,
    }));
    console.log(playerStats)
    console.log(playerStats.clickPower)
  };

  // Loads the saved score for each stat from localStorage
  useEffect(() => {
    // Loads playerStats from local storage, if it exists.
    if (localStorage.getItem("playerStats") != null) {
      const savedPlayerStats = localStorage.getItem("playerStats");
      const savedStorePrices = localStorage.getItem("storePrices");
      setPlayerStats(JSON.parse(savedPlayerStats));
      setStorePrices(JSON.parse(savedStorePrices));
    }

    // Handles brickCount, BPS, and ClickPower (legacy method)
    const savedDataKeys = ['brickCount', 'bricksPerSecond', 'clickPower'];

    savedDataKeys.forEach((key) => {
      const savedData = localStorage.getItem(key);
      if (savedData) {
        switch (key) {
          case 'brickCount':
            setBrickCount(parseInt(savedData, 10));
            break;
          case 'bricksPerSecond':
            setBricksPerSecond(parseFloat(savedData));
            break;
          case 'clickPower':
            setClickPower(parseFloat(savedData));
            break;
          }
      }
    })

  }, []);

  // 100ms second intervals for updating brick count based on bricksPerSecond (divided by 10 since the interval is set to 100ms)
  useEffect(() => {
    const cpsInterval = setInterval(() => {
      setBrickCount((prevBricks) => prevBricks + (bricksPerSecond / 10))
  }, 100);

    return () => clearInterval(cpsInterval);
  }, [bricksPerSecond]);

  // Saves player stats to localStorage every 100ms
  // useEffect(() => {
  //   const saveInterval = setInterval(() => {
  //     // localStorage.setItem('brickCount', brickCount.toString());
  //     // localStorage.setItem('bricksPerSecond', bricksPerSecond.toString());
  //     // localStorage.setItem('clickPower', clickPower.toString());
  //     console.log(JSON.stringify(playerStats))
  //     localStorage.setItem('storePrices', JSON.stringify(storePrices))
  //     localStorage.setItem('playerStats', JSON.stringify(playerStats));
  //   }, 100);

  //   return () => clearInterval(saveInterval);
  // }, [brickCount, bricksPerSecond, clickPower]);

  // Function to reset all player stats/store price items
  const resetStats = () => {
    // Object.keys(playerStats).forEach((i) => playerStats[i] = 0);
    // Object.keys(storePrices).forEach((i) => storePrices[i] = basePrices[i]);
    // setPlayerStats({
    //   buildingCount: {
    //     "Building": 0,
    //     "Trowel": 0,
    //     "Wheelbarrow": 0,
    //     "Oven": 0,
    //     "Factory": 0,
    //     "Nuclear Brick Plant": 0,
    //     "Brick Cultivation Pods": 0,
    //     "Brick-a-tron": 0,
    //     "Mother of Bricks": 0,
    //     "Brick Government": 0,
    //     "Holy Church of Bricks": 0,
    //   },
    //   upgradeCount: {
    //     "Trowel": 0,
    //     "Wheelbarrow": 0,
    //     "Oven": 0,
    //     "Factory": 0,
    //     "Nuclear Brick Plant": 0,
    //     "Brick Cultivation Pods": 0,
    //     "Brick-a-tron": 0,
    //     "Mother of Bricks": 0,
    //     "Brick Government": 0,
    //     "Holy Church of Bricks": 0,
    //   }
    // });

    // Not sure if this works
    setStorePrices(prevPrices => {
      const resetPrices = {};
      for (const key in prevPrices) {
        resetPrices[key] = { ...prevPrices[key], currentPrice: prevPrices[key].basePrice };
      }
      return resetPrices;
    });

    setBrickCount(0);
    setBricksPerSecond(0);
    setClickPower(1);
    console.log("Stats reset!")
  }

  // Provides the game state and actions to consuming components
  const contextValue = {
    brickCount,
    setBrickCount,
    incrementBrickCountByClickPower,
    bricksPerSecond,
    setBricksPerSecond,
    clickPower,
    setClickPower,
    playerStats,
    setPlayerStats,
    resetStats,
    storePrices,
    setStorePrices,
  };

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
};

export { GameProvider, GameContext };