import react from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  Image,
  Button,
  StyleSheet,
} from "react-native";

interface ProfileModalProps {
  modalVisible: boolean;
  hideModal: () => void;
}

const ProfileModal = ({ modalVisible, hideModal }: ProfileModalProps) => {
  if (!modalVisible) return null;
  return (
    <Modal
      visible={modalVisible}
      onRequestClose={hideModal}
      animationType="slide"
      transparent={true}
    >
      <View>
        <Text>This is the profile modal!!!!!!!!</Text>
      </View>
      <Pressable onPress={hideModal}>
        <Text>Close</Text>
      </Pressable>
    </Modal>
  );
};

export default ProfileModal;
