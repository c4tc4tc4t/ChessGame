import React, { createContext, useContext, ReactNode } from 'react';
import { Chess } from 'chess.js';

type GameContextType = {
  fakeBoard: Chess;
};

const defaultValue: GameContextType = {
  fakeBoard: new Chess(),
};

const GameContext = createContext<GameContextType>(defaultValue);

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const fakeBoard = new Chess();

  const value = {
    fakeBoard
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => useContext(GameContext);
