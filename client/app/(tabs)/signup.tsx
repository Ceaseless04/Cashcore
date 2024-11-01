import { Image, StyleSheet, Platform, Button,TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import colorPalette from '../utils/colors';
import { red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import { boxShadowForContainers } from '../utils/dashboardContainerBoxShadow';

export default function SignUpScreen() {
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
                />

                <TextInput 
                    style = {styles.input}
                    placeholder = "Email"
                />

                <TextInput 
                    style = {styles.input}
                    placeholder = "Password"
                />
               <TouchableOpacity style={styles.signUpBtn} onPress={() => alert('Button Pressed')}>
                  <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.haveAccountText}>Already have an account? <Text style={{color:"white"}}>Login Here</Text></Text>
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
      // backgroundImage: "radial-gradient(#f69d3c, #3f87a6)",
      // backgroundColor: "grey",
      // fontFamily: "Inter"
      // backgroundColor:"hsla(22,0%,0%,1)",
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
      // backgroundColor: "red",
      width: "80%",
      height: "80%",      
      justifyContent: 'center',
      gap: 80,
    },
    headingTextContainer: {
      // backgroundColor: "orange",
      alignItems: "center",
    },
    headingText: {
      fontSize: 70,
      fontFamily: "Space Grotesk Light",
      fontWeight: 'bold',
      color: "white",
    },
    signUpContainer: {
      backgroundColor: colorPalette.medium,
      paddingVertical: 20,
      borderRadius: 15,
      minWidth: '45%',
      minHeight: "100%",
      alignItems: 'center',
      backgroundColor: `rgba(70, 70, 70, .62)`,
      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
      
    },
    title: {
      color: 'white', 
      fontSize: 40,
      fontWeight: 'bold',
      marginBottom: 30,
      // fontFamily: "Inter Thin",
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
      minWidth: "67%"

    },

    header: {
        marginLeft: 10
    },

    input: {
        // backgroundColor: ,
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
      color: 'grey',
      fontSize: 13,    
    }
  });

  

