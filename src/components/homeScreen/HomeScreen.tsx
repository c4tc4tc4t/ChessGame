import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();

  const handlePlayGame = () => {
    navigate('/referee');
  };

  return (
    <div className="flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <div className="text-center">
        <h1 className='text-white-alpha-90'>Welcome to Chess!</h1>
        <Button label="Play Game" className="p-button-rounded p-button-lg" onClick={handlePlayGame} />
      </div>
    </div>
  );
};

export default HomeScreen;
