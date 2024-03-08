import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Chess } from 'chess.js';

type GameContextType = {
  pieceCaptured: boolean;
  setPieceCaptured: (captured: boolean) => void;
  fakeBoard: Chess;
};

const defaultValue: GameContextType = {
  pieceCaptured: false,
  setPieceCaptured: () => { },
  fakeBoard: new Chess(),
};

const GameContext = createContext<GameContextType>(defaultValue);

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [pieceCaptured, setPieceCaptured] = useState(false);
  const fakeBoard = new Chess();

  const value = {
    pieceCaptured,
    setPieceCaptured,
    fakeBoard
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => useContext(GameContext);
