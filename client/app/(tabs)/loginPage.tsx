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

  return (
    <>
      <ImageBackground
        source={require("../../assets/images/bg gradient.png")}
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
