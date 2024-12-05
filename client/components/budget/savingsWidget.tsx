import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface SavingsGoal {
  title: string;
  current: number;
  goal: number;
}

interface SavingsWidgetProps {
  savingsGoals: SavingsGoal[];
}

const SavingsWidget = ({savingsGoals}: SavingsWidgetProps) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Savings</Text>
        <TouchableOpacity>
          <Text style={styles.menuButton}>•••</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.subtitle}>Establish and track your goals.</Text>
      
      {/* Goals List */}
      <View style={styles.goalsList}>
        {savingsGoals.map((goal, index) => (
          <View key={index} style={styles.goalItem}>
            <View style={styles.goalInfo}>
              <Text style={styles.goalTitle}>{goal.title}</Text>
              <Text style={styles.goalAmount}>${goal.current} / ${goal.goal}</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View 
                style={[
                  styles.progressBar, 
                  { width: `${(goal.current/goal.goal) * 100}%` }
                ]} 
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'rgba(243, 244, 246, 0.7)',
      borderRadius: 24,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '600',
    },
    menuButton: {
      color: 'rgba(255, 255, 255, 0.5)',
      fontSize: 16,
    },
    subtitle: {
      color: 'rgba(255, 255, 255, 0.5)',
      fontSize: 14,
      marginBottom: 24,
    },
    goalsList: {
      gap: 12,
    },
    goalItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255, 255, 255, 0.2)',
      borderStyle: 'dashed',
      paddingBottom: 4,
    },
    goalInfo: {
      width: '50%',
      flexDirection: 'column',
      marginBottom: 4,
    },
    goalTitle: {
      color: '#FFFFFF',
      fontSize: 14,
    },
    goalAmount: {
      color: 'rgba(255, 255, 255, 0.5)',
      fontSize: 14,
    },
    progressBarContainer: {
      width: '50%',
      height: 8,
      backgroundColor: '#FFFFFF',
      borderRadius: 999,
      overflow: 'hidden',
    },
    progressBar: {
      height: '100%',
      backgroundColor: '#22C55E', // primary-green
      borderRadius: 999,
    },
  });
  
  export default SavingsWidget;