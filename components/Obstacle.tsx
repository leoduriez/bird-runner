import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GAME_CONFIG, COLORS } from '../constants';

interface ObstacleProps {
  x: number;
  y: number;
}

export const Obstacle: React.FC<ObstacleProps> = ({ x, y }) => {
  return (
    <View style={[styles.obstacle, { left: x, top: y }]}>
      {/* Tree trunk */}
      <View style={styles.trunk} />
      {/* Tree crown */}
      <View style={styles.crown} />
      <View style={styles.crownBottom} />
    </View>
  );
};

const styles = StyleSheet.create({
  obstacle: {
    position: 'absolute',
    width: GAME_CONFIG.OBSTACLE_WIDTH,
    height: GAME_CONFIG.OBSTACLE_HEIGHT,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  trunk: {
    width: 12,
    height: GAME_CONFIG.OBSTACLE_HEIGHT * 0.4,
    backgroundColor: COLORS.OBSTACLE,
    position: 'absolute',
    bottom: 0,
  },
  crown: {
    width: 0,
    height: 0,
    borderLeftWidth: GAME_CONFIG.OBSTACLE_WIDTH / 2,
    borderLeftColor: 'transparent',
    borderRightWidth: GAME_CONFIG.OBSTACLE_WIDTH / 2,
    borderRightColor: 'transparent',
    borderBottomWidth: GAME_CONFIG.OBSTACLE_HEIGHT * 0.4,
    borderBottomColor: '#228B22',
    position: 'absolute',
    top: 0,
  },
  crownBottom: {
    width: 0,
    height: 0,
    borderLeftWidth: GAME_CONFIG.OBSTACLE_WIDTH * 0.4,
    borderLeftColor: 'transparent',
    borderRightWidth: GAME_CONFIG.OBSTACLE_WIDTH * 0.4,
    borderRightColor: 'transparent',
    borderBottomWidth: GAME_CONFIG.OBSTACLE_HEIGHT * 0.3,
    borderBottomColor: '#2E8B2E',
    position: 'absolute',
    top: GAME_CONFIG.OBSTACLE_HEIGHT * 0.3,
  },
});
