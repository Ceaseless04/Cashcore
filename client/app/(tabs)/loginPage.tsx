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

        <h2 style={styles.title}>Login</h2>

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

        /**
          The container for the remember me checkbox and Forgot password link
         */
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

        /**
          Login Button
         */
        <Button
          title="Log In"
          accessibilityLabel="Log into this Cashcore with youre account"
          onPress={onLoginButtonPress}
        />

        /**
          Container that holds the "Dont have an account?" link
         */
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
    width: "50%",
    maxWidth: 750,
    color: "#979797",
    margin: "auto",
    alignItems: "center",
    backgroundColor: "#3E3E3E",
    borderRadius: 10,
    padding: 10,
  },

  title: {
    textAlign: "center",
  },

  inputFields: {
    alignContent: "center",
    width: "80%",
    display: "flex",
    margin: "10%",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#979797",
    borderStyle: "solid",
  },

  linksContainer: {
    marginTop: 20,
    marginBottom: 20,
  },

  links: {
    alignContent: "center",
    color: "#979797",
  },
});
