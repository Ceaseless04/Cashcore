import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import colorPalette from '../utils/colors';
import React, { useState } from 'react';
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
        <View style={styles.headingTextContainer}>
          <Text style={styles.headingText}>Control</Text>
          <Text style={[styles.headingText, {color: colorPalette.green}]}>Your</Text>
          <Text style={styles.headingText}>Finances</Text>
        </View>
        <View style={styles.signUpContainer}>
          
            <Text style={styles.title}>CashCore</Text>          
            <Text style={styles.subtitle}>Create a New Account </Text>
            <Text style={styles.description}>Let's start your journey.  </Text>

            <View style = {styles.signUpFormContainer}>
                <TextInput 
                    style = {styles.input}
                    placeholder = "Name"
                    value={userName}
                    onChangeText={setUserName}
                />
                <TextInput 
                    style = {styles.input}
                    placeholder = "Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType='email-address'
                />
                <TextInput 
                    style = {styles.input}
                    placeholder = "Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
               <TouchableOpacity style={styles.signUpBtn} onPress={signUp}>
                  <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
              <Text style={styles.haveAccountText}>
              Already have an account? 
              <Text style={{color:"white"}}> Login Here</Text></Text>
            </View>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "black",
      backgroundImage: 
        `radial-gradient(at 28% 6%, hsla(170,79%,36%,0.84) 0px, transparent 50%),
        radial-gradient(at 83% 19%, hsla(124,54%,45%,1) 0px, transparent 50%),
        radial-gradient(at 81% 74%, hsla(180,79%,36%,0.55) 0px, transparent 50%),
        radial-gradient(at 84% 91%, hsla(71,46%,64%,0.59) 0px, transparent 50%),
        radial-gradient(at 54% 46%, hsla(175,79%,31%,1) 0px, transparent 50%),
        radial-gradient(at 12% 76%, hsla(84,66%,48%,0.55) 0px, transparent 50%)`,
    },
    innerContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      width: "80%",
      height: "85%",      
      justifyContent: 'center',
      gap: 80,
    },
    headingTextContainer: {
      alignItems: "center",
    },
    headingText: {
      fontSize: 70,
      fontFamily: "Arial",
      fontWeight: 'bold',
      color: "white",
    },
    signUpContainer: {
      paddingVertical: 20,
      borderRadius: 15,
      minWidth: '45%',
      minHeight: "100%",
      alignItems: 'center',
      backgroundColor: `rgba(70, 70, 70, .64)`,
      boxShadow: "rgba(0, 0, 0, .2) 0px 7px 29px 0px"  
    },
    title: {
      color: 'white', 
      fontSize: 45,
      fontWeight: 'bold',
      marginBottom: 30,
      marginTop: 20,
    },
    subtitle: {
      fontSize: 25,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 20,
    },
    description: {
      color: 'white',
      marginBottom: 30,
      fontSize: 18
    },
    signUpFormContainer: {
      justifyContent: 'center',
      minWidth: "67%"
    },
    header: {
        marginLeft: 10
    },
    input: {
        marginBottom: '6%',
        borderRadius: 4,
        color: "#979797",
        borderColor: "#979797",
        width: '100%',
        borderWidth: 1,    
        padding: 4,
        paddingLeft: 10,
    },
    signUpBtn: {
      backgroundColor: colorPalette.green,
      alignItems: "center",
      borderRadius: 3,
      paddingTop: 3,
      paddingBottom: 6,
      marginBottom: 20,
    },
    buttonText: {
      fontSize: 19,
      color: 'white',
    },
    haveAccountText: {
      color: 'lightgrey',
      fontSize: 14,    
    }
  });