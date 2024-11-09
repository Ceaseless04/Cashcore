import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

export default function SignUpScreen() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = async () => {
    try {
      const response = await fetch('http://localhost:8000/restapi/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userName, // Or use email as username?
          email: email,
          first_name: userName,
          password: password,
        }),
      });

      if (response.ok || response.status === 201) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'You have signed up successfully!',
        });
      } else {
        const errorData = await response.json();
        let errorMessage = 'Sign-up failed';

        // Parse error message based on potential structure
        if (errorData.detail) {
          errorMessage = errorData.detail;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        } else if (typeof errorData === 'object') {
          const firstErrorKey = Object.keys(errorData)[0];
          errorMessage = errorData[firstErrorKey][0] || errorMessage;
        }

        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: errorMessage,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An error occurred during sign-up',
      });
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Sign Up</Text>
        <Text>Some text about signing up and stuff idk, play NiGHTS into dreams pls</Text>

        <View style={styles.signUpContainer}>
          <Text>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={userName}
            onChangeText={setUserName}
          />

          <Text>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Text>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Button title="Sign Up" onPress={signUp} />
        </View>
      </View>

      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    alignItems: 'center',
  },
  title: {
    color: 'blue',
    fontSize: 40,
  },
  signUpContainer: {
    paddingHorizontal: '20%',
    marginTop: '5%',
    borderWidth: 1,
    borderRadius: 5,
    paddingTop: '10%',
    paddingBottom: '20%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    marginBottom: '10%',
    borderRadius: 10,
    width: '180%',
    borderWidth: 1,
    padding: 8,
  },
});
