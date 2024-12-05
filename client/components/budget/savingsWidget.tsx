import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import colorPalette from '@/app/utils/colors';
import { EllipsisVertical } from "lucide-react-native";

type WebPressableCallBackType = {
  hovered?: boolean;
  pressed?: boolean;
};

interface SavingsGoal {
  title: string;
  current: number;
  goal: number;
}

interface SavingsWidgetProps {
  savingsGoals: SavingsGoal[];
}

const SavingsWidget = ({savingsGoals}: SavingsWidgetProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Savings</Text>
          <Pressable 
              style={({ hovered }: WebPressableCallBackType) => [
                styles.menuButton,
                hovered && styles.menuButtonHovered
              ]}
              // onPress={() => setIsModalVisible(true)}
            >
              <EllipsisVertical size={13} color={colorPalette.light} />
            </Pressable>
        </View>
        <Text style={styles.subtitle}>Establish and track your goals.</Text>
      </View>
      
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
                  { 
                    width: isAnimating ? `${(goal.current/goal.goal) * 100}%` : '0%',
                    transition: 'width 1s ease-in-out',
                  }
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
      flex: 1,
      backgroundColor: colorPalette.medium,
      borderRadius: 25,
      padding: 20,
    },
    header: {
      flexDirection: 'column',
      marginBottom: 16,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      color: colorPalette.light,
      fontSize: 16,
      fontWeight: 'bold',
    },
    menuButton: {
      padding: 8,
      borderRadius: 8,
    },
    menuButtonHovered: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    subtitle: {
      color: 'rgba(255, 255, 255, 0.5)',
      fontSize: 13,
      marginBottom: 16,
    },
    goalsList: {
      gap: 12,
    },
    goalItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
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
      backgroundColor: colorPalette.green,
      borderRadius: 4,
    },
  });
  
  export default SavingsWidget;