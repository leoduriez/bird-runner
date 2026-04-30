import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants';

/**
 * Save high score to local storage
 */
export const saveHighScore = async (score: number): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.HIGH_SCORE, score.toString());
  } catch (error) {
    console.error('Error saving high score:', error);
  }
};

/**
 * Load high score from local storage
 */
export const loadHighScore = async (): Promise<number> => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.HIGH_SCORE);
    return value !== null ? parseInt(value, 10) : 0;
  } catch (error) {
    console.error('Error loading high score:', error);
    return 0;
  }
};

/**
 * Update high score if new score is higher
 */
export const updateHighScore = async (newScore: number): Promise<number> => {
  const currentHighScore = await loadHighScore();
  if (newScore > currentHighScore) {
    await saveHighScore(newScore);
    return newScore;
  }
  return currentHighScore;
};
