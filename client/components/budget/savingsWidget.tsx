import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";
import colorPalette from "@/app/utils/colors";
import { EllipsisVertical, Plus, Edit, X } from "lucide-react-native";

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
  onAddGoal?: (title: string, goalAmount: number) => void;
  onDeleteGoal?: (index: number) => void;
  onEditGoal?: (index: number, title: string, goalAmount: number) => void;
}

const SavingsWidget = ({
  savingsGoals,
  onAddGoal,
  onDeleteGoal,
  onEditGoal,
}: SavingsWidgetProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedGoalIndex, setSelectedGoalIndex] = useState<number | null>(null);
  const [editedGoalTitle, setEditedGoalTitle] = useState("");
  const [editedGoalAmount, setEditedGoalAmount] = useState("");
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [newGoalAmount, setNewGoalAmount] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  const handleAddGoal = () => {
    const amount = parseFloat(newGoalAmount);
    if (newGoalTitle.trim() && !isNaN(amount) && amount > 0 && onAddGoal) {
      onAddGoal(newGoalTitle.trim(), amount);
      setNewGoalTitle("");
      setNewGoalAmount("");
      setIsCreateModalVisible(false);
    }
  };

  const handleDeleteGoal = (index: number) => {
    if (onDeleteGoal) {
      onDeleteGoal(index);
    }
  };

  const handleEditGoal = (index: number) => {
    setSelectedGoalIndex(index);
    setEditedGoalTitle(savingsGoals[index].title);
    setEditedGoalAmount(savingsGoals[index].goal.toString());
    setIsEditModalVisible(true);
  };

  const handleSaveEditGoal = () => {
    const amount = parseFloat(editedGoalAmount);
    if (
      editedGoalTitle.trim() &&
      !isNaN(amount) &&
      amount > 0 &&
      selectedGoalIndex !== null &&
      onEditGoal
    ) {
      onEditGoal(selectedGoalIndex, editedGoalTitle.trim(), amount);
      setIsEditModalVisible(false);
      setSelectedGoalIndex(null);
      setEditedGoalTitle("");
      setEditedGoalAmount("");
    }
  };

  const handleDropdownOption = (option: "new" | "edit") => {
    setIsDropdownVisible(false);
    if (option === "new") {
      setIsCreateModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Savings</Text>
          <View style={styles.dropdownWrapper}>
            <Pressable
              style={({ hovered }: WebPressableCallBackType) => [
                styles.menuButton,
                hovered && styles.menuButtonHovered,
              ]}
              onPress={() => setIsDropdownVisible(!isDropdownVisible)}
            >
              <EllipsisVertical size={13} color={colorPalette.light} />
            </Pressable>
            {isDropdownVisible && (
              <View style={styles.dropdown}>
                <Pressable
                  style={({ hovered }) => [
                    styles.dropdownItem,
                    hovered && styles.dropdownItemHovered,
                  ]}
                  onPress={() => handleDropdownOption("new")}
                >
                  <Plus size={13} color={colorPalette.light} />
                  <Text style={styles.dropdownText}>Create New</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>
        <Text style={styles.subtitle}>Establish and track your goals.</Text>
      </View>

      {/* Goals List */}
      <ScrollView
        style={styles.goalsListContainer}
        contentContainerStyle={styles.goalsListContent}
      >
        {savingsGoals.map((goal, index) => (
          <View key={index} style={styles.goalItem}>
            <Pressable onPress={() => handleEditGoal(index)} style={styles.goalContent}>
              <View style={styles.goalTitleRow}>
                <View>
                  <Text style={styles.goalTitle}>{goal.title}</Text>
                  <Text style={styles.goalAmount}>${goal.current} / ${goal.goal}</Text>
                </View>
                <View style={styles.progressBarContainer}>
                  <View
                    style={[
                      styles.progressBar,
                      {
                        width: `${(goal.current / goal.goal) * 100}%`,
                      },
                    ]}
                  />
                </View>
              </View>
            </Pressable>
          </View>
        ))}
      </ScrollView>

      {/* Edit Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Goal</Text>
              <Pressable
                style={({ hovered }) => [
                  styles.closeButton,
                  hovered && styles.closeButtonHovered,
                ]}
                onPress={() => setIsEditModalVisible(false)}
              >
                <X size={13} color={colorPalette.light} />
              </Pressable>
            </View>
            <TextInput
              style={styles.input}
              value={editedGoalTitle}
              onChangeText={setEditedGoalTitle}
              placeholder="Enter goal title"
              placeholderTextColor={"#979797"}
            />
            <TextInput
              style={styles.input}
              value={editedGoalAmount}
              onChangeText={setEditedGoalAmount}
              keyboardType="numeric"
              placeholder="Enter goal amount"
              placeholderTextColor={"#979797"}
            />
            <View style={styles.modalButtons}>
              <View style={styles.leftButtons}>
                <Pressable
                  style={[styles.button, styles.deleteButton]}
                  onPress={() => {
                    if (selectedGoalIndex !== null && onDeleteGoal) {
                      onDeleteGoal(selectedGoalIndex);
                      setIsEditModalVisible(false);
                    }
                  }}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </Pressable>
              </View>
              <View style={styles.rightButtons}>
                <Pressable
                  style={[styles.button, styles.saveButton]}
                  onPress={handleSaveEditGoal}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Create Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isCreateModalVisible}
        onRequestClose={() => setIsCreateModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create New Goal</Text>
              <Pressable
                style={({ hovered }) => [
                  styles.closeButton,
                  hovered && styles.closeButtonHovered,
                ]}
                onPress={() => setIsCreateModalVisible(false)}
              >
                <X size={13} color={colorPalette.light} />
              </Pressable>
            </View>
            <TextInput
              style={styles.input}
              value={newGoalTitle}
              onChangeText={setNewGoalTitle}
              placeholder="Enter goal title"
              placeholderTextColor={"#979797"}
            />
            <TextInput
              style={styles.input}
              value={newGoalAmount}
              onChangeText={setNewGoalAmount}
              keyboardType="numeric"
              placeholder="Enter goal amount"
              placeholderTextColor={"#979797"}
            />
            <View style={styles.modalButtonsCenter}>
              <Pressable
                style={[styles.button, styles.saveButton]}
                onPress={handleAddGoal}
              >
                <Text style={styles.buttonText}>Create</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalette.medium,
    borderRadius: 25,
    padding: 20,
  },
  header: {
    flexDirection: "column",
    marginBottom: 16,
    zIndex: 2,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    zIndex: 2,
  },
  title: {
    color: colorPalette.light,
    fontSize: 16,
    fontWeight: "bold",
  },
  menuButton: {
    padding: 8,
    borderRadius: 8,
  },
  menuButtonHovered: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 13,
    marginBottom: 16,
  },
  goalsListContainer: {
    flex: 1,
    position: "relative",
    zIndex: 1,
  },
  goalsListContent: {
    gap: 12,
  },
  goalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.2)",
    borderStyle: "dashed",
    paddingBottom: 4,
  },
  goalContent: {
    width: "100%",
  },
  goalTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  goalTitle: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  goalAmount: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 14,
  },
  progressBarContainer: {
    width: "50%",
    height: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: colorPalette.green,
    borderRadius: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: colorPalette.medium,
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxWidth: 300,
    gap: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  modalTitle: {
    color: colorPalette.light,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    color: colorPalette.light,
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    outlineStyle: "none",
    borderColor: "#979797",
    borderWidth: 1,
  },
  button: {
    paddingHorizontal: 22,
    paddingVertical: 9,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: "#979797",
  },
  saveButton: {
    backgroundColor: colorPalette.green,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalButtonsCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  rightButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  deleteButton: {
    backgroundColor: '#FF4444',
  },
  closeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
  closeButtonHovered: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  dropdownWrapper: {
    position: "relative",
    zIndex: 1000,
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    right: 0,
    backgroundColor: colorPalette.dark,
    borderRadius: 8,
    padding: 4,
    minWidth: 150,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
    opacity: 1,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    gap: 8,
    borderRadius: 4,
  },
  dropdownItemHovered: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  dropdownText: {
    color: colorPalette.light,
    fontSize: 14,
  },
});

export default SavingsWidget;
