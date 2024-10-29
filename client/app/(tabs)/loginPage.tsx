import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { useState } from "react";

export default function loginPage() {
  const [username, SetUserName] = useState("");
  const [password, SetPassword] = useState("");
  const [rememberMe, SetRememberMe] = useState(0);
  const [errors, setErrors] = useState({});

  const onLoginButtonPress = () => {
    let errors = {};

    if (!username) errors.username = "Username is required!";
    if (!password) errors.password = "Password is required!";
    if (rememberMe == 1) {
      //enable cookies to remember login information
    }

    //validation here

    setErrors(errors);//if invalid user login attempt

    return Object.keys(errors).length === 0;
  };

  return (
    <View style={styles.container}>

        <div style={styles.titleContainer}>
          
          <p style={styles.title}><img style={styles.titleImage} src="https://cdn.britannica.com/06/150806-050-6AE99C98/Proboscis-monkey.jpg"></img>Login</p>
        </div>

        {/**
         * The h3 tag will have a check for if the use has been on the platform before, if the user has been on before, it will say welcome back, otherwise just say Create a new account
         */}
        <div>
          <h3> Welcome Back!!!!</h3>
        </div>

        <TextInput
          style={styles.inputFields}
          placeholderTextColor={"#979797"}
          textContentType="username"
          placeholder="UserName"
          value={username}
          onChangeText={SetUserName}
        ></TextInput>

        {
          //indication of error for username TextInput
          errors.username ? <Text>{errors.username}</Text> : null
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

        {
          //error indication for password TextInput
          errors.password ? <Text>{errors.password}</Text> : null
        }

        {/**
          The container for the remember me checkbox and Forgot password link
         */}
        <div style={styles.linksContainer}>

          <div>
            <input id="rememberMeBox" value={rememberMe} type="checkbox" />
            Remember Me?
          </div>

          <div>
            <a
              style={styles.links}
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            >
              Forgot Password?
            </a>
          </div>

        </div>

        {/**
          Login Button
         */}
        <Button
          title="Log In"
          accessibilityLabel="Log into this Cashcore with youre account"
          onPress={onLoginButtonPress}
        />

        {/* /**
          Container that holds the "Dont have an account?" link
         */}
        <div style={styles.linksContainer}>

          <a
            style={styles.links}
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          >
            Don't Have an Account?
          </a>

        </div>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "90%",
    width: "50%",
    maxWidth: 750,
    color: "white",
    marginVertical: "auto",
    marginLeft: "50%",
    marginRight: "5%",
    alignItems: "center",
    backgroundColor: "#3E3E3E",
    borderRadius: 20,
    paddingHorizontal: 10,
  },

  titleContainer:{
    margin:"2%",
    flexDirection: "row",
    padding: 0,
  },

  title: {
    justifyContent: "space-evenly",
    textAlign:"center",
    fontSize: 100,
  },

  titleImage:{
    flex:1,
    maxWidth:100
  },

  inputFields: {
    alignContent: "center",
    width: "80%",
    margin: "2%",
    borderRadius: 5,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#979797",
    borderStyle: "solid",
  },

  linksContainer: {
    direction: "ltr",
    marginTop: 20,
    marginBottom: 20,
  },

  links: {
    alignContent: "center",
    color: "#979797",
  },
});
