import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GAME_CONFIG } from '../constants';

interface EnemyBirdProps {
  x: number;
  y: number;
}

export const EnemyBird: React.FC<EnemyBirdProps> = ({ x, y }) => {
  return (
    <View style={[styles.enemyBird, { left: x, top: y }]}>
      {/* Enemy bird body (red/orange) */}
      <View style={styles.body} />
      {/* Head */}
      <View style={styles.head}>
        {/* Eye */}
        <View style={styles.eye} />
        {/* Beak */}
        <View style={styles.beak} />
      </View>
      {/* Wing */}
      <View style={styles.wing} />
      {/* Tail */}
      <View style={styles.tail} />
    </View>
  );
};

const styles = StyleSheet.create({
  enemyBird: {
    position: 'absolute',
    width: GAME_CONFIG.BIRD_SIZE,
    height: GAME_CONFIG.BIRD_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    width: GAME_CONFIG.BIRD_SIZE * 0.7,
    height: GAME_CONFIG.BIRD_SIZE * 0.5,
    backgroundColor: '#FF4444',
    borderRadius: GAME_CONFIG.BIRD_SIZE * 0.25,
    position: 'absolute',
  },
  head: {
    width: GAME_CONFIG.BIRD_SIZE * 0.4,
    height: GAME_CONFIG.BIRD_SIZE * 0.4,
    backgroundColor: '#FF4444',
    borderRadius: GAME_CONFIG.BIRD_SIZE * 0.2,
    position: 'absolute',
    top: 0,
    right: 5,
  },
  eye: {
    width: 6,
    height: 6,
    backgroundColor: '#000',
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    right: 6,
  },
  beak: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderLeftColor: '#FF8C00',
    borderTopWidth: 4,
    borderTopColor: 'transparent',
    borderBottomWidth: 4,
    borderBottomColor: 'transparent',
    position: 'absolute',
    top: 12,
    right: -6,
  },
  wing: {
    width: GAME_CONFIG.BIRD_SIZE * 0.35,
    height: GAME_CONFIG.BIRD_SIZE * 0.25,
    backgroundColor: '#CC0000',
    borderRadius: 8,
    position: 'absolute',
    left: 8,
    top: GAME_CONFIG.BIRD_SIZE * 0.25,
  },
  tail: {
    width: 0,
    height: 0,
    borderRightWidth: 12,
    borderRightColor: '#CC0000',
    borderTopWidth: 6,
    borderTopColor: 'transparent',
    borderBottomWidth: 6,
    borderBottomColor: 'transparent',
    position: 'absolute',
    left: -8,
    top: GAME_CONFIG.BIRD_SIZE * 0.35,
  },
});
