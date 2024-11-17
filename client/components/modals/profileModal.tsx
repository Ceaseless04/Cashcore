import React from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

interface ProfileModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const ProfileModal = ({
  isVisible,
  onClose,
}: ProfileModalProps): JSX.Element => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          style={styles.centeredView}
          visible={isVisible}
          onRequestClose={onClose}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalContent}>
            <Text>This is the profile modal!!!!!!!!</Text>
            <Pressable style={styles.saveButton} onPress={onClose}>
              <Text>Save</Text>
            </Pressable>
            <Pressable style={styles.cancelButton} onPress={onClose}>
              <Text>Cancel</Text>
            </Pressable>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ProfileModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "gray", // TODO: change to theme color
    height: "auto",
    maxWidth: 500,
  },
  saveButton: {
    padding: 4,
    backgroundColor: "green", // TODO: change to theme color
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cancelButton: {
    padding: 4,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
