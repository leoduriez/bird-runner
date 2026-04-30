import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants';

interface HUDProps {
  score: number;
}

export const HUD: React.FC<HUDProps> = ({ score }) => {
  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreLabel}>SCORE</Text>
        <Text style={styles.scoreValue}>{score}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    zIndex: 100,
  },
  scoreContainer: {
    backgroundColor: COLORS.HUD_BG,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 15,
    alignItems: 'center',
  },
  scoreLabel: {
    color: COLORS.WHITE,
    fontSize: 12,
    fontWeight: '600',
    opacity: 0.8,
  },
  scoreValue: {
    color: COLORS.WHITE,
    fontSize: 28,
    fontWeight: 'bold',
  },
});
