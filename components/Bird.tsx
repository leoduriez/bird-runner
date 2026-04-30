import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { GAME_CONFIG } from '../constants';

interface BirdProps {
  x: number;
  y: number;
}

// Images des frames d'animation
const BIRD_FRAMES = [
  require('../assets/images/bird_frame_1.png'),
  require('../assets/images/bird_frame_2.png'),
  require('../assets/images/bird_frame_3.png'),
  require('../assets/images/bird_frame_4.png'),
];

const ANIMATION_SPEED = 100; // ms entre chaque frame

export const Bird: React.FC<BirdProps> = ({ x, y }) => {
  const [currentFrame, setCurrentFrame] = useState(0);

  // Animation de vol - cycle à travers les frames
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % BIRD_FRAMES.length);
    }, ANIMATION_SPEED);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={[styles.bird, { left: x, top: y }]}>
      <Image
        source={BIRD_FRAMES[currentFrame]}
        style={styles.birdImage}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bird: {
    position: 'absolute',
    width: GAME_CONFIG.BIRD_SIZE,
    height: GAME_CONFIG.BIRD_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  birdImage: {
    width: '100%',
    height: '100%',
  },
});
