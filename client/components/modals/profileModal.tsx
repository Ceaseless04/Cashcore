import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Platform,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

const ProfileModal = (): JSX.Element => {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          visible={modalVisible}
          onRequestClose={hideModal}
          animationType="fade"
          transparent={true}
        >
          <Pressable
            style={[styles.centeredView, styles.outsideView]}
            onPress={hideModal}
          >
            <Pressable
              style={styles.modalContent}
              onPress={(e) => e.stopPropagation()}
            >
              <Text style={[styles.text, styles.titleText]}>Donald Trump</Text>
              <Text style={[styles.text]}>@donaldtrump47</Text>
              <View style={styles.inputContainers}>
                <Text style={styles.text}>Name</Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    gap: 10,
                  }}
                >
                  <TextInput
                    style={[styles.text, styles.shortTextInput]}
                    placeholder="First Name"
                    placeholderTextColor="#D5D5D5"
                  />
                  <TextInput
                    style={[styles.text, styles.shortTextInput]}
                    placeholder="Last Name"
                    placeholderTextColor="#D5D5D5"
                  />
                </View>
              </View>
              <View style={styles.inputContainers}>
                <Text style={styles.text}>Username</Text>
                <TextInput
                  style={[styles.text, styles.longTextInput]}
                  placeholder="greatestpresident"
                  placeholderTextColor="#D5D5D5"
                />
              </View>
              <View style={styles.inputContainers}>
                <Text style={styles.text}>Phone Number</Text>
                <TextInput
                  style={[styles.text, styles.longTextInput]}
                  placeholder="3056994020"
                  placeholderTextColor="#D5D5D5"
                />
              </View>
              <View style={styles.inputContainers}>
                <Text style={styles.text}>Email Address</Text>
                <TextInput
                  style={[styles.text, styles.longTextInput]}
                  placeholder="greatestpresident@gmail.com"
                  placeholderTextColor="#D5D5D5"
                />
              </View>
              <View style={styles.bottomContainer}>
                <Pressable
                  style={[styles.button, styles.cancelButton]}
                  onPress={hideModal}
                >
                  <Text style={styles.text}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={[styles.saveButton, styles.button]}
                  onPress={hideModal}
                >
                  <Text style={styles.text}>Save Changes</Text>
                </Pressable>
              </View>
            </Pressable>
          </Pressable>
        </Modal>
        <Pressable style={styles.button} onPress={showModal}>
          <Text style={styles.text}>Open Modal</Text>
        </Pressable>
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
  outsideView: {
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContent: {
    position: "absolute",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    padding: 20,
    width: "100%",
    height: "auto",
    maxWidth: "40%",
    backgroundColor: "#181818",
  },
  inputContainers: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
  shortTextInput: {
    width: "30%",
    padding: 8,
    borderWidth: 0,
    backgroundColor: "#2C2C2C",
    borderRadius: 10,
  },
  longTextInput: {
    padding: 8,
    width: "58%",
    borderWidth: 0,
    backgroundColor: "#2C2C2C",
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: "#299f62", // TODO: change to theme color
  },
  cancelButton: {
    borderColor: "#979797",
    borderWidth: 1,
  },
  button: {
    borderRadius: 10,
    padding: 8,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  text: {
    color: "white",
  },
});
