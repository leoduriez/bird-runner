import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GAME_CONFIG, COLORS } from '../constants';

interface BackgroundProps {
  offset: number;
}

export const Background: React.FC<BackgroundProps> = ({ offset }) => {
  // Create clouds for parallax effect - répartis sur toute la largeur
  const clouds = [
    { xPercent: 10, y: 80, size: 60 },
    { xPercent: 55, y: 150, size: 45 },
    { xPercent: 25, y: 250, size: 55 },
    { xPercent: 75, y: 320, size: 40 },
    { xPercent: 40, y: 400, size: 50 },
    { xPercent: 85, y: 480, size: 55 },
    { xPercent: 5, y: 550, size: 45 },
    { xPercent: 65, y: 620, size: 60 },
    { xPercent: 30, y: 700, size: 40 },
    { xPercent: 90, y: 50, size: 50 },
    { xPercent: 50, y: 180, size: 48 },
    { xPercent: 15, y: 360, size: 52 },
    { xPercent: 70, y: 100, size: 45 },
    { xPercent: 35, y: 520, size: 58 },
    { xPercent: 80, y: 280, size: 42 },
    { xPercent: 20, y: 650, size: 50 },
  ];

  return (
    <View style={styles.container}>
      {/* Sky gradient effect */}
      <View style={styles.skyTop} />
      <View style={styles.skyBottom} />
      
      {/* Clouds with parallax */}
      {clouds.map((cloud, index) => (
        <View
          key={index}
          style={[
            styles.cloud,
            {
              left: (GAME_CONFIG.SCREEN_WIDTH * cloud.xPercent) / 100,
              top: (cloud.y + offset * 0.1) % (GAME_CONFIG.SCREEN_HEIGHT * 0.5),
              width: cloud.size,
              height: cloud.size * 0.5,
            },
          ]}
        />
      ))}
      
      {/* Lane dividers - 4 lignes pour 5 lanes */}
      <View style={styles.laneContainer}>
        {[1, 2, 3, 4].map((i) => (
          <View
            key={i}
            style={[
              styles.laneDivider,
              { left: (GAME_CONFIG.SCREEN_WIDTH / 5) * i }
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  skyTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '30%',
    backgroundColor: '#5BA3D9',
  },
  skyBottom: {
    position: 'absolute',
    top: '30%',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.SKY,
  },
  cloud: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 30,
  },
  laneContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  laneDivider: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});
