import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GAME_CONFIG, COLORS } from '../constants';

interface FoodProps {
  x: number;
  y: number;
}

export const Food: React.FC<FoodProps> = ({ x, y }) => {
  return (
    <View style={[styles.food, { left: x, top: y }]}>
      {/* Apple body */}
      <View style={styles.apple}>
        {/* Leaf */}
        <View style={styles.leaf} />
        {/* Stem */}
        <View style={styles.stem} />
        {/* Shine */}
        <View style={styles.shine} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  food: {
    position: 'absolute',
    width: GAME_CONFIG.FOOD_SIZE,
    height: GAME_CONFIG.FOOD_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  apple: {
    width: GAME_CONFIG.FOOD_SIZE * 0.8,
    height: GAME_CONFIG.FOOD_SIZE * 0.8,
    backgroundColor: COLORS.FOOD,
    borderRadius: GAME_CONFIG.FOOD_SIZE * 0.4,
    position: 'relative',
  },
  leaf: {
    width: 10,
    height: 8,
    backgroundColor: '#32CD32',
    borderRadius: 5,
    position: 'absolute',
    top: -2,
    right: 2,
    transform: [{ rotate: '45deg' }],
  },
  stem: {
    width: 3,
    height: 6,
    backgroundColor: '#8B4513',
    position: 'absolute',
    top: -4,
    left: '50%',
    marginLeft: -1.5,
  },
  shine: {
    width: 6,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 3,
    position: 'absolute',
    top: 6,
    left: 6,
  },
});
