import { StyleSheet, TouchableOpacity, View, Text, ImageBackground } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import colorPalette from '../utils/colors';
import React, { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import * as Font from 'expo-font';
import { 
  SpaceGrotesk_700Bold,
  useFonts as useSpaceGroteskFonts 
} from '@expo-google-fonts/space-grotesk';
import {
  Inter_400Regular, 
  Inter_500Medium, 
  Inter_700Bold,
  Inter_300Light,
  useFonts as useInterFonts  
} from '@expo-google-fonts/inter'; 

interface FontLoadingState {
  isLoading: boolean;
  error: Error | null;
}

export default function SignUpScreen() {
  
  const [spaceGroteskLoaded] = useSpaceGroteskFonts({
    SpaceGrotesk_700Bold,
  });

  const [interLoaded] = useInterFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
    Inter_300Light,
  });

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
    <>
      <ImageBackground
        source={require("../../assets/images/bg gradient.png")}
        resizeMode="cover"
        style={{width: "100%"}}>
      </ImageBackground>
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
              <Text style={styles.description}>Let's start your journey.</Text>

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
          <Toast/>
        </View>
      </>
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
      fontSize: 75,
      fontFamily: "SpaceGrotesk_700Bold",
      fontWeight: 'bold',
      color: "white",
    },
    signUpContainer: {
      paddingVertical: 20,
      borderRadius: 15,
      minWidth: '45%',
      minHeight: "100%",
      alignItems: 'center',
      backgroundColor: `rgba(70, 70, 70, .60)`,
      shadowColor: '#171717',
      shadowOffset: {width: 2, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 9, 
    },
    title: {
      color: 'white', 
      fontSize: 45,
      fontWeight: 'bold',
      marginBottom: 50,
      marginTop: 20,
      fontFamily: "SpaceGrotesk_700Bold",

    },
    subtitle: {
      fontSize: 25,
      fontFamily: "Inter_700Bold",
      color: 'white',
      marginBottom: 20,
    },
    description: {
      color: 'white',
      marginBottom: 25,
      fontSize: 16,
      fontFamily: "Inter_400Regular",
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
        padding: 6,
        paddingLeft: 10,
        fontFamily: "Inter_400Regular",
    },
    signUpBtn: {
      backgroundColor: colorPalette.green,
      alignItems: "center",
      borderRadius: 4,
      paddingTop: 3,
      paddingBottom: 6,
      marginBottom: 20,
      shadowColor: '#171717',
      shadowOffset: {width: 1, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: 6, 
    },
    buttonText: {
      fontSize: 19,
      paddingTop: 3,
      color: 'white',
      fontFamily: "Inter_500Medium",
    },
    haveAccountText: {
      color: 'lightgrey',
      fontSize: 14,    
      fontFamily: "Inter_300Light",
    }
  });