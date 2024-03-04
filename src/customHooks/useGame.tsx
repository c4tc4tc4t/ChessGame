import React, { createContext, useContext, useState, ReactNode } from 'react';

type GameContextType = {
  pieceCaptured: boolean;
  setPieceCaptured: (captured: boolean) => void;
};

const defaultValue: GameContextType = {
  pieceCaptured: false,
  setPieceCaptured: () => {},
};

const GameContext = createContext<GameContextType>(defaultValue);

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [pieceCaptured, setPieceCaptured] = useState(false);

  const value = {
    pieceCaptured,
    setPieceCaptured,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => useContext(GameContext);
