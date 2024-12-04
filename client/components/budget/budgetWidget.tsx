import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Modal, TextInput } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import colorPalette from '@/app/utils/colors';
import { EllipsisVertical } from "lucide-react-native";

type WebPressableCallBackType = {
  hovered?: boolean;
  pressed?: boolean;
};

interface BudgetWidgetProps {
  totalBudget: number;
  currentSavings: number;
  onBudgetUpdate: (newBudget: number) => void;
  // onSavingsUpdate: (newSavings: number) => void; // Add this to props 
}

export default function BudgetWidget({totalBudget, currentSavings, onBudgetUpdate}: BudgetWidgetProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedBudget, setEditedBudget] = useState(totalBudget.toString());
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setEditedBudget(totalBudget.toString());
  }, [totalBudget]);

  const remaining = totalBudget - currentSavings;
  const spentPercentage = (currentSavings / totalBudget) * 100;

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  // Function to handle saving the edited budget
  // Might need to update this to include savings !!!!! for animation when savings update
  const handleSaveBudget = () => {
    const newBudget = parseFloat(editedBudget);
    if (!isNaN(newBudget) && newBudget > 0) {
      onBudgetUpdate(newBudget);
      setIsModalVisible(false);
      // Reset animation for the updated value
      setIsAnimating(false);
      setTimeout(() => setIsAnimating(true), 50);
    }
  };

  // Calculate the SVG arc path for the semi-circle
  const size = 300; // Fixed size that will scale with container
  const strokeWidth = 30; // Reduced from 30
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
            onPress={() => setIsModalVisible(true)}
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
              stroke={colorPalette.light}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            <Path
              d={`M ${strokeWidth / 2},${size / 2} A ${radius},${radius} 0 0,1 ${size - strokeWidth / 2},${size / 2}`}
              fill="none"
              stroke={colorPalette.green}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={isAnimating ? strokeDashoffset : circumference}
              style={{
                transition: 'stroke-dashoffset 1s ease-in-out',
              }}
            />
          </Svg>
          <View style={styles.remainingContainer}>
            <Text style={styles.remainingAmount}>{`$${remaining.toLocaleString()} Remaining`}</Text>
          </View>
        </View>
      </View>
      
      {/* Edit Budget Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Budget</Text>
            <TextInput
              style={styles.input}
              value={editedBudget}
              onChangeText={setEditedBudget}
              keyboardType="numeric"
              placeholder="Enter new budget amount"
              placeholderTextColor={'#979797'}
            />
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.button, styles.cancelButton]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.saveButton]}
                onPress={handleSaveBudget}
              >
                <Text style={styles.buttonText}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colorPalette.medium,
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxWidth: 300,
  },
  modalTitle: {
    color: colorPalette.light,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    color: colorPalette.light,
    padding: 12,
    borderRadius: 10,
    marginVertical: 15,
    marginBottom: 15,
    fontSize: 16,
    outlineStyle: 'none',
    borderColor: '#979797',
    borderWidth: 1,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingHorizontal: 22,
    paddingVertical: 9,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#979797',
  },
  saveButton: {
    backgroundColor: colorPalette.green,
  },
  buttonText: {
    color: colorPalette.light,
    fontSize: 16,
    fontWeight: '500',
  },
});