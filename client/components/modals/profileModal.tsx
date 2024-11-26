import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import { Link } from "expo-router";
// import fonts and import icons for settings and logout
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Settings, LogOut } from "lucide-react-native";

interface ProfileModalProps {
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  email: string;
}

const ProfileModal = ({firstName, lastName, username, phoneNumber, email}: ProfileModalProps): JSX.Element => {
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
              <View style={styles.profileCircle}>
                <Image
                  source={require("../../assets/homepage/img/pepe.jpeg")}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
              </View>
              <Text style={[styles.text, styles.titleText]}>{firstName}</Text>
              <Text style={{ color: "#D5D5D5" }}>@{username}</Text>
              <View style={styles.inputContainers}>
                <Text style={styles.text}>Name</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={[styles.text, styles.shortTextInput]}
                    placeholder={firstName}
                    placeholderTextColor="#D5D5D5"
                  />
                  <TextInput
                    style={[styles.text, styles.shortTextInput]}
                    placeholder={lastName}
                    placeholderTextColor="#D5D5D5"
                  />
                </View>
              </View>
              <View style={styles.inputContainers}>
                <Text style={styles.text}>Username</Text>
                <TextInput
                  style={[styles.text, styles.longTextInput]}
                  placeholder={username}
                  placeholderTextColor="#D5D5D5"
                />
              </View>
              <View style={styles.inputContainers}>
                <Text style={styles.text}>Phone Number</Text>
                <TextInput
                  style={[styles.text, styles.longTextInput]}
                  placeholder={phoneNumber}
                  placeholderTextColor="#D5D5D5"
                />
              </View>
              <View style={styles.inputContainers}>
                <Text style={styles.text}>Email Address</Text>
                <TextInput
                  style={[styles.text, styles.longTextInput]}
                  placeholder={email}
                  placeholderTextColor="#D5D5D5"
                />
              </View>
              <View // create styles for line
                style={{
                  width: "100%",
                  backgroundColor: "#979797",
                  height: 1,
                  marginTop: 20,
                }}
              />
              <View style={styles.bottomContainer}>
                <View>
                  <Link href="/pages/loginPage">
                    <View style={styles.pageLinks}>
                      <Settings color="#D5D5D5"/>
                      <Text style={{color: "#D5D5D5"}}>Settings</Text>
                    </View>
                  </Link>
                  <Link href="/pages/signup">
                    <View style={styles.pageLinks}>
                      <LogOut color="#D5D5D5"/>
                      <Text style={{color: "#D5D5D5"}}>Logout</Text>
                    </View>
                  </Link>
                </View>
                <View style={styles.bottomContainer2}>
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
    maxWidth: "50%",
    backgroundColor: "#181818",
  },
  profileCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#D5D5D5",
    alignSelf: "center",
    position: "absolute",
    top: -50,
  },
  inputContainers: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  inputWrapper: {
    width: '65%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  shortTextInput: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: "#979797",
    borderRadius: 10,
    outlineStyle: "none",
  },
  longTextInput: {
    padding: 8,
    width: '65%',
    borderWidth: 1,
    borderColor: "#979797",
    borderRadius: 10,
    outlineStyle: "none",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  bottomContainer2: {
    flexDirection: "row",
    gap: 10,
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
    marginTop: 40,
  },
  pageLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 5,
  },
  text: {
    color: "white",
  },
});
