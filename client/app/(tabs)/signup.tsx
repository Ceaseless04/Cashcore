import { Image, StyleSheet, Platform, Button,TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import colorPalette from '../utils/colors';
import { red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

export default function SignUpScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.headingTextContainer}>
          <Text style={styles.headingText}>Control</Text>
          <Text style={[styles.headingText, {color: "green"}]}>Your</Text>
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
                />

                <TextInput 
                    style = {styles.input}
                    placeholder = "Email"
                />

                <TextInput 
                    style = {styles.input}
                    placeholder = "Password"
                />

                {/* <TextInput 
                    style = {styles.input}
                    placeholder = "Phone"
                /> */}
               <TouchableOpacity style={styles.signUpBtn} onPress={() => alert('Button Pressed')}>
                  <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            <Text style={{color: "grey"}}>Already have an account? <Text style={{color:"white"}}>Login Here</Text></Text>
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
      backgroundColor: "green"
    },
    innerContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: "red",
      width: "80%",
      height: "80%",      justifyContent: 'center',
      gap: 50,
    },
    headingTextContainer: {
      backgroundColor: "orange",
      alignItems: "center",
    },
    headingText: {
      fontSize: 50,
      fontWeight: 'bold',
      color: "white",
    },
    signUpContainer: {
      backgroundColor: colorPalette.medium,
      paddingVertical: 20,
      borderRadius: 10,
      minWidth: '40%',
      minHeight: "100%",
      // justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      color: 'white', 
      fontSize: 40,
      fontWeight: 'bold',
      marginBottom: 30,
    },
    subtitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 20,
    },
    description: {
      color: 'white',
      marginBottom: 30
    },

    signUpFormContainer: {
        // paddingHorizontal: '20%',
        // marginTop: '5%',
        // borderWidth: 1,    
        // borderRadius: 5,  
        // paddingTop: '10%',
        // paddingBottom: '20%',
        // flex: 1,
      justifyContent: 'center',
      // alignItems: 'center',
      // backgroundColor: "yellow",
      minWidth: "70%"

    },

    header: {
        marginLeft: 10
    },

    input: {
        // backgroundColor: ,
        marginBottom: '6%',
        borderRadius: 4,
        color: 'grey',
        borderColor: "grey",
        width: '100%',
        borderWidth: 1,    
        padding: 3,
        paddingLeft: 10,
    },
    signUpBtn: {
      backgroundColor: "lightgreen",
      alignItems: "center",
      borderRadius: 3,
      padding: 3,
      marginBottom: 20,
    },
    buttonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
    }
  });

