import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { COLORS, GAME_CONFIG } from '../constants';
import { loadHighScore } from '../utils';

interface HomeScreenProps {
  onPlay: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onPlay }) => {
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    loadHighScore().then(setHighScore);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Background decoration */}
      <View style={styles.cloudLeft} />
      <View style={styles.cloudRight} />
      
      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>🐦 Bird Runner</Text>
        <Text style={styles.subtitle}>Évite les obstacles, collecte la nourriture !</Text>
      </View>
      
      {/* High Score */}
      <View style={styles.highScoreContainer}>
        <Text style={styles.highScoreLabel}>Meilleur Score</Text>
        <Text style={styles.highScoreValue}>{highScore}</Text>
      </View>
      
      {/* Play Button */}
      <TouchableOpacity style={styles.playButton} onPress={onPlay} activeOpacity={0.8}>
        <Text style={styles.playButtonText}>▶ JOUER</Text>
      </TouchableOpacity>
      
      {/* Instructions */}
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsTitle}>Comment jouer :</Text>
        <Text style={styles.instructionsText}>• Boutons GAUCHE / DROITE ou ← →</Text>
        <Text style={styles.instructionsText}>• Évite les arbres 🌲 et oiseaux 🐦</Text>
        <Text style={styles.instructionsText}>• Collecte les pommes 🍎</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SKY,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  cloudLeft: {
    position: 'absolute',
    top: 100,
    left: 30,
    width: 80,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
  },
  cloudRight: {
    position: 'absolute',
    top: 180,
    right: 40,
    width: 60,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 15,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: COLORS.WHITE,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.WHITE,
    marginTop: 10,
    opacity: 0.9,
  },
  highScoreContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 40,
  },
  highScoreLabel: {
    fontSize: 14,
    color: COLORS.WHITE,
    opacity: 0.8,
  },
  highScoreValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.BIRD,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  playButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 60,
    paddingVertical: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 40,
  },
  playButtonText: {
    color: COLORS.WHITE,
    fontSize: 24,
    fontWeight: 'bold',
  },
  instructionsContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    maxWidth: 300,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.WHITE,
    marginBottom: 10,
  },
  instructionsText: {
    fontSize: 14,
    color: COLORS.WHITE,
    opacity: 0.9,
    marginVertical: 3,
  },
});
