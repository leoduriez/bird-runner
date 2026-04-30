import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { GAME_CONFIG, COLORS } from '../constants';

interface ControlsProps {
  onLeftPress: () => void;
  onLeftRelease: () => void;
  onRightPress: () => void;
  onRightRelease: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  onLeftPress,
  onLeftRelease,
  onRightPress,
  onRightRelease,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPressIn={onLeftPress}
        onPressOut={onLeftRelease}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>◀ GAUCHE</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.button}
        onPressIn={onRightPress}
        onPressOut={onRightRelease}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>DROITE ▶</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: GAME_CONFIG.CONTROL_AREA_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  button: {
    width: GAME_CONFIG.SCREEN_WIDTH * 0.35,
    height: 70,
    backgroundColor: COLORS.BUTTON,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: COLORS.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
