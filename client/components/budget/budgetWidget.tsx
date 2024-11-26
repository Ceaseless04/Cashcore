import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import colorPalette from '@/app/utils/colors';

export default function BudgetWidget() {
  // Calculate the percentage spent (for this example: $778 spent of $2000 = 39%)
  const totalBudget = 2000;
  const remaining = 1222;
  const spent = totalBudget - remaining;
  const spentPercentage = (spent / totalBudget) * 100;

  // Calculate the SVG arc path for the semi-circle
  const size = 300; // Fixed size that will scale with container
  const strokeWidth = 30;
  const radius = (size / 2) - (strokeWidth / 2);
  const circumference = radius * Math.PI;
  const strokeDashoffset = circumference - (spentPercentage / 100) * circumference;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Budget</Text>
          <Text style={styles.subtitle}>Total budget for November 2024.</Text>
        </View>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuIcon}>⋮</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.totalBudget}>${totalBudget.toLocaleString()}</Text>
        <View style={styles.graphContainer}>
          <Svg style={styles.svg} width="100%" height="100%" viewBox={`0 0 ${size} ${size / 2}`}>
            <Path
              d={`M ${strokeWidth / 2},${size / 2} A ${radius},${radius} 0 0,1 ${size - strokeWidth / 2},${size / 2}`}
              fill="none"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            <Path
              d={`M ${strokeWidth / 2},${size / 2} A ${radius},${radius} 0 0,1 ${size - strokeWidth / 2},${size / 2}`}
              fill="none"
              stroke="#10B981"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
            />
          </Svg>
          <View style={styles.remainingContainer}>
            <Text style={styles.remainingAmount}>${remaining.toLocaleString()}</Text>
            <Text style={styles.remainingLabel}>Remaining</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    backgroundColor: colorPalette.medium,
    padding: 20,
    borderRadius: 20,
    // width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    // fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    // fontSize: 14,
    color: '#A1A1AA',
    marginTop: 4,
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    // fontSize: 24,
    color: '#A1A1AA',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  totalBudget: {
    // fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  graphContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    aspectRatio: 2,
  },
  svg: {
    width: '100%',
    height: '100%',
  },
  remainingContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  remainingAmount: {
    // fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  remainingLabel: {
    // fontSize: 14,
    color: '#A1A1AA',
  },
});