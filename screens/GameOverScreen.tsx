import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '../constants';
import { loadHighScore, updateHighScore } from '../utils';

interface GameOverScreenProps {
  score: number;
  onReplay: () => void;
  onHome: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  score,
  onReplay,
  onHome,
}) => {
  const [highScore, setHighScore] = useState(0);
  const [isNewHighScore, setIsNewHighScore] = useState(false);

  useEffect(() => {
    const checkHighScore = async () => {
      const previousHighScore = await loadHighScore();
      const newHighScore = await updateHighScore(score);
      setHighScore(newHighScore);
      setIsNewHighScore(score > previousHighScore && score > 0);
    };
    checkHighScore();
  }, [score]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Game Over Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.gameOverText}>GAME OVER</Text>
        {isNewHighScore && (
          <Text style={styles.newHighScoreText}>🎉 Nouveau Record ! 🎉</Text>
        )}
      </View>
      
      {/* Scores */}
      <View style={styles.scoresContainer}>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>Score</Text>
          <Text style={styles.scoreValue}>{score}</Text>
        </View>
        
        <View style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>Meilleur Score</Text>
          <Text style={[styles.scoreValue, styles.highScoreValue]}>{highScore}</Text>
        </View>
      </View>
      
      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.replayButton]} 
          onPress={onReplay}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>🔄 REJOUER</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.homeButton]} 
          onPress={onHome}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>🏠 ACCUEIL</Text>
        </TouchableOpacity>
      </View>
      
      {/* Stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          Tu as collecté {score} pomme{score !== 1 ? 's' : ''} !
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.OVERLAY,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  gameOverText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FF4444',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  newHighScoreText: {
    fontSize: 20,
    color: COLORS.BIRD,
    marginTop: 15,
    fontWeight: 'bold',
  },
  scoresContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
    gap: 20,
  },
  scoreBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 25,
    paddingVertical: 20,
    borderRadius: 15,
    alignItems: 'center',
    minWidth: 120,
  },
  scoreLabel: {
    fontSize: 14,
    color: COLORS.WHITE,
    opacity: 0.7,
    marginBottom: 5,
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
  highScoreValue: {
    color: COLORS.BIRD,
  },
  buttonsContainer: {
    width: '100%',
    maxWidth: 280,
    gap: 15,
  },
  button: {
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  replayButton: {
    backgroundColor: '#4CAF50',
  },
  homeButton: {
    backgroundColor: COLORS.BUTTON,
  },
  buttonText: {
    color: COLORS.WHITE,
    fontSize: 20,
    fontWeight: 'bold',
  },
  statsContainer: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  statsText: {
    fontSize: 16,
    color: COLORS.WHITE,
    opacity: 0.7,
    textAlign: 'center',
  },
});
