import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  Modal,
  ScrollView,
} from "react-native";
import colorPalette from "@/app/utils/colors";
import { EllipsisVertical, Plus, Edit, X } from "lucide-react-native";

type WebPressableCallBackType = {
  hovered?: boolean;
  pressed?: boolean;
};

export interface Payment {
  title: string;
  amount: number;
  status: "pending" | "paid";
}

interface PaymentsWidgetProps {
  upcomingPayments: Payment[];
  onAddPayment?: (payment: Payment) => void;
  onDeletePayment?: (index: number) => void;
}

const PaymentsWidget = ({
  upcomingPayments,
  onAddPayment,
  onDeletePayment,
}: PaymentsWidgetProps) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [newPaymentTitle, setNewPaymentTitle] = useState("");
  const [newPaymentAmount, setNewPaymentAmount] = useState("");
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedPaymentIndex, setSelectedPaymentIndex] = useState<
    number | null
  >(null);
  const [editedPaymentTitle, setEditedPaymentTitle] = useState("");
  const [editedPaymentAmount, setEditedPaymentAmount] = useState("");

  const handleDropdownOption = (option: "new" | "edit") => {
    setIsDropdownVisible(false);
    if (option === "new") {
      setIsCreateModalVisible(true);
    }
  };

  const handleAddPayment = () => {
    const amount = parseFloat(newPaymentAmount);
    if (
      newPaymentTitle.trim() &&
      !isNaN(amount) &&
      amount > 0 &&
      onAddPayment
    ) {
      const newPayment: Payment = {
        title: newPaymentTitle.trim(),
        amount: amount,
        status: "pending",
      };
      onAddPayment(newPayment);
      setNewPaymentTitle("");
      setNewPaymentAmount("");
      setIsCreateModalVisible(false);
    }
  };

  const handleEditPayment = (index: number) => {
    setSelectedPaymentIndex(index);
    setEditedPaymentTitle(upcomingPayments[index].title);
    setEditedPaymentAmount(upcomingPayments[index].amount.toString());
    setIsEditModalVisible(true);
  };

  const handleSaveEditPayment = () => {
    const amount = parseFloat(editedPaymentAmount);
    if (
      editedPaymentTitle.trim() &&
      !isNaN(amount) &&
      amount > 0 &&
      selectedPaymentIndex !== null
    ) {
      const updatedPayments = [...upcomingPayments];
      updatedPayments[selectedPaymentIndex] = {
        ...updatedPayments[selectedPaymentIndex],
        title: editedPaymentTitle,
        amount,
      };
      // Logic to update payments with updatedPayments
      setIsEditModalVisible(false);
      setSelectedPaymentIndex(null);
      setEditedPaymentTitle("");
      setEditedPaymentAmount("");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Upcoming Payments</Text>
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
        <Text style={styles.subtitle}>Payments due this month.</Text>
      </View>
      {/* Payments List */}
      <ScrollView style={styles.paymentsList} showsVerticalScrollIndicator={true}>
        {upcomingPayments.map((payment, index) => (
          <View key={index} style={styles.paymentItem}>
            <Pressable onPress={() => handleEditPayment(index)} style={styles.paymentItemContent}>
              <View style={styles.paymentInfo}>
                <View
                  style={[
                    styles.statusIndicator,
                    {
                      backgroundColor:
                        payment.status === "paid" ? "#22C55E" : "#007AFF",
                    },
                  ]}
                />
                <Text style={styles.paymentTitle}>{payment.title}</Text>
              </View>
              <Text style={styles.paymentAmount}>${payment.amount}</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Payment</Text>
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
              value={editedPaymentTitle}
              onChangeText={setEditedPaymentTitle}
              placeholder="Enter payment title"
              placeholderTextColor={"#979797"}
            />
            <TextInput
              style={styles.input}
              value={editedPaymentAmount}
              onChangeText={setEditedPaymentAmount}
              keyboardType="numeric"
              placeholder="Enter payment amount"
              placeholderTextColor={"#979797"}
            />
            <View style={styles.modalButtons}>
              <View style={styles.leftButtons}>
                <Pressable
                  style={[styles.button, styles.deleteButton]}
                  onPress={() => {
                    if (selectedPaymentIndex !== null && onDeletePayment) {
                      onDeletePayment(selectedPaymentIndex);
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
                  onPress={handleSaveEditPayment}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isCreateModalVisible}
        onRequestClose={() => setIsCreateModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create New Payment</Text>
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
              value={newPaymentTitle}
              onChangeText={setNewPaymentTitle}
              placeholder="Enter payment title"
              placeholderTextColor={"#979797"}
            />
            <TextInput
              style={styles.input}
              value={newPaymentAmount}
              onChangeText={setNewPaymentAmount}
              keyboardType="numeric"
              placeholder="Enter payment amount"
              placeholderTextColor={"#979797"}
            />
            <View style={styles.modalButtonsCenter}>
              <Pressable
                style={[styles.button, styles.saveButton]}
                onPress={handleAddPayment}
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
    color: "#FFFFFF",
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
  paymentsList: {
    position: "relative",
    zIndex: 1,
  },
  paymentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  paymentItemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  paymentInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  statusIndicator: {
    width: 4,
    height: 20,
    borderRadius: 999,
  },
  paymentTitle: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  paymentAmount: {
    color: "#FFFFFF",
    fontSize: 14,
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
  dropdownText: {
    color: colorPalette.light,
    fontSize: 14,
  },
  dropdownItemHovered: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
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
  modalTitle: {
    color: colorPalette.light,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
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
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
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
});

export default PaymentsWidget;
