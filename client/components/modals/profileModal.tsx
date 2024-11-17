import React from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";

interface ProfileModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const ProfileModal = ({
  isVisible,
  onClose,
}: ProfileModalProps): JSX.Element => {
  return (
    <Modal
      style={styles.modalContainer}
      visible={isVisible}
      onRequestClose={onClose}
      animationType="fade"
      transparent={true}
    >
      <View>
        <Text>This is the profile modal!!!!!!!!</Text>
        <Pressable onPress={onClose}>
          <Text>Save</Text>
        </Pressable>
        <Pressable onPress={onClose}>
          <Text>Close</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default ProfileModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
