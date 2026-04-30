import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { GAME_CONFIG, COLORS } from '../constants';
import { Bird, Obstacle, Food, Controls, HUD, Background, EnemyBird } from '../components';
import { checkCollision, isOffScreen, getLaneX, getRandomLane } from '../utils';

interface GameEntity {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  lane: number;
}

interface GameScreenProps {
  onGameOver: (score: number) => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({ onGameOver }) => {
  // Bird position (center of screen, moves left/right only)
  const [birdX, setBirdX] = useState(GAME_CONFIG.BIRD_START_X);
  const [score, setScore] = useState(0);
  const [obstacles, setObstacles] = useState<GameEntity[]>([]);
  const [enemyBirds, setEnemyBirds] = useState<GameEntity[]>([]);
  const [foods, setFoods] = useState<GameEntity[]>([]);
  const [backgroundOffset, setBackgroundOffset] = useState(0);
  
  // Movement state
  const movingLeft = useRef(false);
  const movingRight = useRef(false);
  
  // Game state
  const gameRunning = useRef(true);
  const entityIdCounter = useRef(0);
  const speedMultiplier = useRef(1);
  const lastObstacleSpawn = useRef(0);
  const lastEnemyBirdSpawn = useRef(0);
  const lastFoodSpawn = useRef(0);
  const recentlyUsedLanes = useRef<Map<number, number>>(new Map()); // lane -> timestamp

  // Bird entity for collision
  const birdEntity = {
    x: birdX,
    y: GAME_CONFIG.BIRD_Y,
    width: GAME_CONFIG.BIRD_SIZE,
    height: GAME_CONFIG.BIRD_SIZE,
  };

  // Movement handlers
  const handleLeftPress = useCallback(() => {
    movingLeft.current = true;
  }, []);

  const handleLeftRelease = useCallback(() => {
    movingLeft.current = false;
  }, []);

  const handleRightPress = useCallback(() => {
    movingRight.current = true;
  }, []);

  const handleRightRelease = useCallback(() => {
    movingRight.current = false;
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        movingLeft.current = true;
      } else if (e.key === 'ArrowRight') {
        movingRight.current = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        movingLeft.current = false;
      } else if (e.key === 'ArrowRight') {
        movingRight.current = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Get available lane (not recently used)
  const getAvailableLane = useCallback((minDelay: number = 500) => {
    const currentTime = Date.now();
    const availableLanes: number[] = [];
    
    // Clean up old entries
    for (const [lane, timestamp] of recentlyUsedLanes.current.entries()) {
      if (currentTime - timestamp > minDelay) {
        recentlyUsedLanes.current.delete(lane);
      }
    }
    
    // Find available lanes
    for (let i = 0; i < GAME_CONFIG.LANES; i++) {
      if (!recentlyUsedLanes.current.has(i)) {
        availableLanes.push(i);
      }
    }
    
    // If all lanes are occupied, use any lane
    if (availableLanes.length === 0) {
      return getRandomLane();
    }
    
    // Pick random available lane
    const lane = availableLanes[Math.floor(Math.random() * availableLanes.length)];
    recentlyUsedLanes.current.set(lane, currentTime);
    return lane;
  }, []);

  // Spawn obstacle
  const spawnObstacle = useCallback(() => {
    const lane = getAvailableLane(800); // Éviter la même lane pendant 800ms
    const x = getLaneX(lane) - GAME_CONFIG.OBSTACLE_WIDTH / 2;
    
    const newObstacle: GameEntity = {
      id: entityIdCounter.current++,
      x,
      y: -GAME_CONFIG.OBSTACLE_HEIGHT,
      width: GAME_CONFIG.OBSTACLE_WIDTH,
      height: GAME_CONFIG.OBSTACLE_HEIGHT,
      lane,
    };
    
    setObstacles(prev => [...prev, newObstacle]);
  }, [getAvailableLane]);

  // Spawn enemy bird
  const spawnEnemyBird = useCallback(() => {
    const lane = getAvailableLane(800); // Éviter la même lane pendant 800ms
    const x = getLaneX(lane) - GAME_CONFIG.ENEMY_BIRD_SIZE / 2;
    
    const newEnemyBird: GameEntity = {
      id: entityIdCounter.current++,
      x,
      y: -GAME_CONFIG.ENEMY_BIRD_SIZE,
      width: GAME_CONFIG.ENEMY_BIRD_SIZE,
      height: GAME_CONFIG.ENEMY_BIRD_SIZE,
      lane,
    };
    
    setEnemyBirds(prev => [...prev, newEnemyBird]);
  }, [getAvailableLane]);

  // Spawn food
  const spawnFood = useCallback(() => {
    const lane = getAvailableLane(800); // Éviter la même lane pendant 800ms
    const x = getLaneX(lane) - GAME_CONFIG.FOOD_SIZE / 2;
    
    const newFood: GameEntity = {
      id: entityIdCounter.current++,
      x,
      y: -GAME_CONFIG.FOOD_SIZE,
      width: GAME_CONFIG.FOOD_SIZE,
      height: GAME_CONFIG.FOOD_SIZE,
      lane,
    };
    
    setFoods(prev => [...prev, newFood]);
  }, [getAvailableLane]);

  // Game loop
  useEffect(() => {
    const gameLoop = setInterval(() => {
      if (!gameRunning.current) return;

      const currentTime = Date.now();
      const currentSpeed = GAME_CONFIG.OBSTACLE_SPEED_INITIAL * speedMultiplier.current;

      // Increase difficulty over time
      speedMultiplier.current = Math.min(
        speedMultiplier.current + GAME_CONFIG.SPEED_INCREASE_RATE,
        GAME_CONFIG.MAX_SPEED_MULTIPLIER
      );

      // Update background offset
      setBackgroundOffset(prev => prev + currentSpeed);

      // Move bird
      setBirdX(prev => {
        let newX = prev;
        if (movingLeft.current) {
          newX = Math.max(0, prev - GAME_CONFIG.BIRD_SPEED);
        }
        if (movingRight.current) {
          newX = Math.min(
            GAME_CONFIG.SCREEN_WIDTH - GAME_CONFIG.BIRD_SIZE,
            prev + GAME_CONFIG.BIRD_SPEED
          );
        }
        return newX;
      });

      // Spawn obstacles
      const obstacleInterval = GAME_CONFIG.OBSTACLE_SPAWN_INTERVAL - 
        (Math.random() * GAME_CONFIG.OBSTACLE_SPAWN_VARIANCE);
      if (currentTime - lastObstacleSpawn.current > obstacleInterval / speedMultiplier.current) {
        spawnObstacle();
        lastObstacleSpawn.current = currentTime;
      }

      // Spawn enemy birds
      const enemyBirdInterval = GAME_CONFIG.ENEMY_BIRD_SPAWN_INTERVAL - 
        (Math.random() * GAME_CONFIG.ENEMY_BIRD_SPAWN_VARIANCE);
      if (currentTime - lastEnemyBirdSpawn.current > enemyBirdInterval / speedMultiplier.current) {
        spawnEnemyBird();
        lastEnemyBirdSpawn.current = currentTime;
      }

      // Spawn food
      const foodInterval = GAME_CONFIG.FOOD_SPAWN_INTERVAL - 
        (Math.random() * GAME_CONFIG.FOOD_SPAWN_VARIANCE);
      if (currentTime - lastFoodSpawn.current > foodInterval / speedMultiplier.current) {
        spawnFood();
        lastFoodSpawn.current = currentTime;
      }

      // Move obstacles
      setObstacles(prev => {
        const updated = prev
          .map(obs => ({ ...obs, y: obs.y + currentSpeed }))
          .filter(obs => !isOffScreen(obs));
        
        // Check collisions with bird
        const currentBird = {
          x: birdX,
          y: GAME_CONFIG.BIRD_Y,
          width: GAME_CONFIG.BIRD_SIZE,
          height: GAME_CONFIG.BIRD_SIZE,
        };
        
        for (const obs of updated) {
          if (checkCollision(currentBird, obs)) {
            gameRunning.current = false;
            onGameOver(score);
            return updated;
          }
        }
        
        return updated;
      });

      // Move enemy birds
      setEnemyBirds(prev => {
        const updated = prev
          .map(bird => ({ ...bird, y: bird.y + currentSpeed }))
          .filter(bird => !isOffScreen(bird));
        
        // Check collisions with player bird
        const currentBird = {
          x: birdX,
          y: GAME_CONFIG.BIRD_Y,
          width: GAME_CONFIG.BIRD_SIZE,
          height: GAME_CONFIG.BIRD_SIZE,
        };
        
        for (const bird of updated) {
          if (checkCollision(currentBird, bird)) {
            gameRunning.current = false;
            onGameOver(score);
            return updated;
          }
        }
        
        return updated;
      });

      // Move and collect food
      setFoods(prev => {
        const currentBird = {
          x: birdX,
          y: GAME_CONFIG.BIRD_Y,
          width: GAME_CONFIG.BIRD_SIZE,
          height: GAME_CONFIG.BIRD_SIZE,
        };
        
        const remaining: GameEntity[] = [];
        let pointsToAdd = 0;
        
        for (const food of prev) {
          const movedFood = { ...food, y: food.y + currentSpeed };
          
          if (isOffScreen(movedFood)) {
            continue;
          }
          
          if (checkCollision(currentBird, movedFood)) {
            pointsToAdd += GAME_CONFIG.FOOD_POINTS;
          } else {
            remaining.push(movedFood);
          }
        }
        
        if (pointsToAdd > 0) {
          setScore(s => s + pointsToAdd);
        }
        
        return remaining;
      });
    }, GAME_CONFIG.FRAME_TIME);

    return () => clearInterval(gameLoop);
  }, [birdX, score, spawnObstacle, spawnEnemyBird, spawnFood, onGameOver]);

  return (
    <View style={styles.container}>
      <Background offset={backgroundOffset} />
      
      {/* Obstacles */}
      {obstacles.map(obs => (
        <Obstacle key={obs.id} x={obs.x} y={obs.y} />
      ))}
      
      {/* Enemy Birds */}
      {enemyBirds.map(bird => (
        <EnemyBird key={bird.id} x={bird.x} y={bird.y} />
      ))}
      
      {/* Food */}
      {foods.map(food => (
        <Food key={food.id} x={food.x} y={food.y} />
      ))}
      
      {/* Bird */}
      <Bird x={birdX} y={GAME_CONFIG.BIRD_Y} />
      
      {/* HUD */}
      <HUD score={score} />
      
      {/* Controls */}
      <Controls
        onLeftPress={handleLeftPress}
        onLeftRelease={handleLeftRelease}
        onRightPress={handleRightPress}
        onRightRelease={handleRightRelease}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SKY,
  },
});
