import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const GAME_CONFIG = {
  // Screen dimensions
  SCREEN_WIDTH: width,
  SCREEN_HEIGHT: height,
  
  // Game area (leaving space for controls)
  GAME_AREA_HEIGHT: height * 0.75,
  CONTROL_AREA_HEIGHT: height * 0.25,
  
  // Bird settings
  BIRD_SIZE: 45,
  BIRD_SPEED: 10,
  BIRD_START_X: width / 2 - 22.5,
  BIRD_Y: height * 0.65,
  
  // Lane system (5 lanes pour plus d'obstacles)
  LANES: 5,
  LANE_WIDTH: width / 5,
  
  // Obstacle settings
  OBSTACLE_WIDTH: 45,
  OBSTACLE_HEIGHT: 45,
  OBSTACLE_SPEED_INITIAL: 5,
  OBSTACLE_SPEED_INCREMENT: 0.001,
  OBSTACLE_SPAWN_INTERVAL: 800, // ms (réduit pour plus d'obstacles)
  OBSTACLE_SPAWN_VARIANCE: 300, // ms
  
  // Enemy bird settings
  ENEMY_BIRD_SIZE: 45,
  ENEMY_BIRD_SPAWN_INTERVAL: 1200, // ms
  ENEMY_BIRD_SPAWN_VARIANCE: 400, // ms
  
  // Food settings
  FOOD_SIZE: 35,
  FOOD_SPAWN_INTERVAL: 2000, // ms
  FOOD_SPAWN_VARIANCE: 1000, // ms
  FOOD_POINTS: 1,
  
  // Game loop
  FRAME_RATE: 60,
  FRAME_TIME: 1000 / 60,
  
  // Difficulty
  SPEED_INCREASE_RATE: 0.0005,
  MAX_SPEED_MULTIPLIER: 3,
  
  // Hitbox reduction (for fairer collisions)
  HITBOX_REDUCTION: 5,
};

export const COLORS = {
  SKY: '#87CEEB',
  GRASS: '#90EE90',
  BIRD: '#FFD700',
  OBSTACLE: '#8B4513',
  FOOD: '#FF6347',
  BUTTON: '#4169E1',
  BUTTON_PRESSED: '#2E4A9E',
  TEXT: '#333333',
  WHITE: '#FFFFFF',
  OVERLAY: 'rgba(0, 0, 0, 0.7)',
  HUD_BG: 'rgba(0, 0, 0, 0.3)',
};

export const STORAGE_KEYS = {
  HIGH_SCORE: '@bird_runner_high_score',
};
