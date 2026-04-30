import React, { useState, useCallback } from 'react';
import { HomeScreen, GameScreen, GameOverScreen } from './screens';

type GameState = 'home' | 'playing' | 'gameover';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('home');
  const [finalScore, setFinalScore] = useState(0);

  const handlePlay = useCallback(() => {
    setGameState('playing');
    setFinalScore(0);
  }, []);

  const handleGameOver = useCallback((score: number) => {
    setFinalScore(score);
    setGameState('gameover');
  }, []);

  const handleReplay = useCallback(() => {
    setFinalScore(0);
    setGameState('playing');
  }, []);

  const handleHome = useCallback(() => {
    setGameState('home');
  }, []);

  switch (gameState) {
    case 'home':
      return <HomeScreen onPlay={handlePlay} />;
    case 'playing':
      return <GameScreen onGameOver={handleGameOver} />;
    case 'gameover':
      return (
        <GameOverScreen
          score={finalScore}
          onReplay={handleReplay}
          onHome={handleHome}
        />
      );
    default:
      return <HomeScreen onPlay={handlePlay} />;
  }
}
