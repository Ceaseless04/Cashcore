import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

//add routing
import { useRouter } from "expo-router"; 

//we are going to add sessions and tokenization now
//we import AsyncStorage which will securely store our token
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function loginPage() {
  const [username, SetUserName] = useState("");
  const [password, SetPassword] = useState("");
  const [errors, setErrors] = useState({username: "", password: ""});

  const router = useRouter();

  const onLoginButtonPress = async () => {

    if (!username) {
      setErrors({username: "Username is required!", password: errors.password}); 
      return
    }
    if (!password) {
      setErrors({username: errors.password, password: "Password is required!"}); 
      return
    }

    const res = await fetch('http://localhost:8000/restapi/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password }) // TODO: Change to current user
    })
    const data = await res.json();
    console.log(data);



    if (data.message == "Login successful!") {
      setErrors({username: data.message, password: ""})
      //get token from json data and store it
      await AsyncStorage.setItem("auth_token", data.token);
      router.replace("/pages/dashboard"); //go to dashboard page
    } else {
      setErrors({username: data.message, password: ""})
    }

  };
  

  return (
    <>
      <ImageBackground
        source={require("../../assets/signup/img/bg_gradient.png")}
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
          <View
            style={{ width: "60%", margin: "auto", justifyContent: "center" }}
          >
            <text style={styles.title}>
              <img
                style={{ maxWidth: 100 }}
                src="https://cdn.britannica.com/06/150806-050-6AE99C98/Proboscis-monkey.jpg"
              />{" "}
              CashCore
            </text>
          </View>

          {/**
           * The h3 tag will have a check for if the use has been on the platform before, if the user has been on before, it will say welcome back, otherwise just say Create a new account
           */}
          <View>
            <h1 style={{ textAlign: "center", paddingTop: "5%" }}>
              Welcome Back!
            </h1>
          </View>

          <View style={styles.linksContainer}>

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
              placeholderTextColor={"#979797"}
              textContentType="password"
              placeholder="Password"
              value={password}
              onChangeText={SetPassword}
              secureTextEntry={true}
            ></TextInput>

            <a
              style={styles.links}
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            >
              Forgot Password?
            </a>

            {/**
                Login Button
              */}

            <TouchableOpacity
              style={styles.Button}
              onPress={onLoginButtonPress}
            >
              <Text style={{ fontSize: 24, color: "white" }}>Log In</Text>
            </TouchableOpacity>

            <a
              style={styles.links}
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            >
              Don't Have an Account?
            </a>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  view: {
    width: "100%",
    flexDirection: "row",
    margin: "auto",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 1,
    textAlign: "center",
    gap: 100,
  },

  bigTextLeft: {
    fontSize: 100,
    margin: "auto",
    textAlign: "center",
    color: "white",
    fontWeight: 700,
  },

  container: {
    flex: 1,
    color: "white",
    textAlign: "center",
    backgroundColor: "#3E3E3E",
    paddingTop: "5%",
    paddingBottom: "10%",
    padding: 0,
    marginRight: "2%",
    maxHeight: "90%",
    width: "20%",
    borderRadius: 20,
    borderWidth: 1,
  },

  title: {
    textAlign: "center",
    fontSize: 56,
    fontWeight: 700,
  },

  inputFields: {
    height: "5%",
    marginVertical: "5%",
    borderRadius: 6,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#979797",
    borderStyle: "solid",
    fontSize: 18,
    paddingLeft: 10,
    paddingVertical: "2%",
  },

  linksContainer: {
    //backgroundColor:"red",
    textAlign: "left",
    width: "60%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: "20%",
  },

  Button: {
    marginVertical: "2%",
    //height:"10%",
    paddingVertical: "1%",
    borderRadius: 6,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    backgroundColor:
      "linear-gradient(86deg, rgba(41,159,98,1) 0%, rgba(77,176,136,1) 100%)",
    alignItems: "center",
  },

  links: {
    color: "#979797",
    marginTop: "5%",
    marginBottom: "5%",
    fontSize: 18,
  },

  error: {
    color: "#CE277D",
    fontSize: 18,
  },
});

