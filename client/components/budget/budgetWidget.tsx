import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import colorPalette from '@/app/utils/colors';
import { EllipsisVertical } from "lucide-react-native";

type WebPressableCallBackType = {
  hovered?: boolean;
  pressed?: boolean;
};

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
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Budget</Text>
          <Pressable 
            style={({ hovered }: WebPressableCallBackType) => [
              styles.menuButton,
              hovered && styles.menuButtonHovered
            ]}
            onHoverIn={() => {}}
            onHoverOut={() => {}}
          >
            <EllipsisVertical size={13} color={colorPalette.light} />
          </Pressable>
        </View>
        <Text style={styles.subtitle}>Total budget for November 2024.</Text>
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
            <Text style={styles.remainingAmount}>{`${remaining.toLocaleString()} Remaining`}</Text>
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
    flexDirection: 'column',
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colorPalette.light,
  },
  subtitle: {
    fontSize: 13,
    color: '#A1A1AA',
  },
  menuButton: {
    padding: 8,
    borderRadius: 8,
  },
  menuButtonHovered: {
    backgroundColor: '#A1A1AA',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  totalBudget: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colorPalette.light,
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
    fontSize: 13,
    // fontWeight: 'bold',
    color: colorPalette.light,
  },
});