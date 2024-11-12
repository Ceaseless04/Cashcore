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
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function loginPage() {
  const [username, SetUserName] = useState("");
  const [password, SetPassword] = useState("");
  const [errors, setErrors] = useState({});

  const onLoginButtonPress = () => {
    let errors = {};

    if (!username) errors.username = "Username is required!";
    if (!password) errors.password = "Password is required!";

    //validation here

    setErrors(errors); //if invalid user login attempt

    return Object.keys(errors).length === 0;
  };

  const [spaceGroteskLoaded] = useSpaceGroteskFonts({
    SpaceGrotesk_700Bold,
  });

  const [interLoaded] = useInterFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
    Inter_300Light,
  });

  return (
    <View style={styles.outerContainer}>
      <ImageBackground
        source={require("../../depreciated/assets/images/bg gradient.png")}
        resizeMode="cover"
        style={{ width: "100%" }}
      ></ImageBackground>
      <View style={styles.view}>


        {/**
         * fancy text thing on the left container
         */}
        <View style={{ flex: 1 }}>
          <Text style={styles.bigTextLeft}>
            Control <br />
            <Text style={{ color: "#27CE78" }}>Your</Text>
            <br />
            Finances
            <br />
          </Text>
        </View>
        

        {/**
         * Log In page View container
         */}
        <View style={styles.container}>

            <Text style={styles.title}>
              CashCore
            </Text>

          {/**
           * The h3 tag will have a check for if the use has been on the platform before, if the user has been on before, it will say welcome back, otherwise just say Create a new account
           */}
          <View >
            <Text style = {styles.welcomeBack}>
              Welcome Back!
            </Text>
          </View>

          <View style={styles.inputContainer}>

            {
              //indication of error for username TextInput
              errors.username ? (
                <Text style={styles.error}>{errors.username}</Text>
              ) : null
            }
            <TextInput
              style={styles.inputFields}
              placeholderTextColor={"#979797"}
              textContentType="username"
              placeholder="UserName"
              value={username}
              onChangeText={SetUserName}
            ></TextInput>

            {
              //error indication for password TextInput
              errors.password ? (
                <Text style={styles.error}>{errors.password}</Text>
              ) : null
            }
            <TextInput
              style={styles.inputFields}
              placeholderTextColor="#979797"
              textContentType="password"
              placeholder="Password"
              value={password}
              onChangeText={SetPassword}
              secureTextEntry={true}
            ></TextInput>
            <View style={styles.links}>
              <a
                style={{color: "#979797"}}
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              >
                Forgot Password?
              </a>
            </View>

            {/**
                Login Button
              */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.Button}
                onPress={onLoginButtonPress}
              >
                <Text style={{ fontSize: 24, color: "white" }}>Log In</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.links}>
              <Text
              style={{color: "#979797", 
                fontSize: 18,}}>
                Don't have an account?
                </Text>
            <a
              style={{color: "#979797"}}
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            >
              Sign up now
            </a>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer:{ 
    flex:1,
  },

  view: {
    flexDirection: "row",
    margin: "auto",
    justifyContent: "center",
    width: "80%",
    height: "85%",      
    flexShrink: 0,
    textAlign: "center",
    gap: 80,
  },

  bigTextLeft: {
    fontSize: 70,
    margin: "auto",
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontFamily:"SpaceGrotesk_700Bold",
  },

  container: {
    flex: 1,
    flexShrink: 0,
    color: "white",
    textAlign: "center",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: "rgba(70, 70, 70, .64)",
    paddingBottom: "15%",
    padding: 0,
    marginRight: "5%",
    minWidth:"45%",
    borderRadius: 20,
    shadowColor:"#171717",
    shadowOpacity:0.2,
    shadowOffset:{width: 2, height: 2},
    shadowRadius:9,
  },

  title: {
    color:"white",
    textAlign: "center",
    fontSize: 56,
    fontWeight: 700,
    //paddingTop:"5%",
  },

  welcomeBack:{
    color:"white",
    fontSize:32,
    paddingTop:"15%",
    fontFamily:"Inter_700Bold",
    // shadowColor:"#171717",
    // shadowOpacity:0.5,
    // shadowOffset:{width: 0, height: 2},
    // shadowRadius:9,
    // textAlign: "center", 
    // paddingTop: "5%",
  },

  inputFields: {
    height: "5%",
    width: "100%",
    color:"#979797",
    marginVertical: "5%",
    borderRadius: 4,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#979797",
    borderStyle: "solid",
    fontSize: 18,
    fontFamily:"Inter_400Regular",
    paddingLeft: 10,
    paddingVertical: "4%",
  },

  links: {
    marginTop: "5%",
    marginBottom: "5%",
    fontSize: 18,
    width:"100%",
    alignItems:"flex-start",
    fontFamily:"Inter_300Light"
  },

  inputContainer: {
    //backgroundColor:"red",
    width: "60%",
    justifyContent:"center",
    alignItems:"center",
    //paddingBottom: "20%",
  },

  buttonContainer:{
    width:"100%",
  },

  Button: {
    fontFamily:"Inter_500Medium",
    marginVertical: "2%",
    paddingVertical: "1%",
    borderRadius: 4,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    backgroundColor:
      "linear-gradient(86deg, rgba(41,159,98,1) 0%, rgba(77,176,136,1) 100%)",
    alignItems: "center",
    shadowColor:"#171717",
    shadowOpacity:0.2,
    shadowOffset:{width: 2, height: 2},
    shadowRadius:9,
  },

  error: {
    color: "#CE277D",
    fontSize: 18,
  },
});
