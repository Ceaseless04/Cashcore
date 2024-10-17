import { Image, StyleSheet, Platform, Button } from 'react-native';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function SignUpScreen() {
  return (
    <View style={styles.container}>
 
        <View style={styles.innerContainer}>
            <Text style={styles.title}> Sign Up </Text>
            <Text> Some text about signign up and stuff idk, play NiGHTS into dreams pls  </Text>

            <View style = {styles.signUpContainer}>
                <Text> First Name </Text>
                <TextInput 
                    style = {styles.input}
                    placeholder = "first name"
                />

                <Text> Email </Text>
                <TextInput 
                    style = {styles.input}
                    placeholder = "email"
                />

                <Text> Passsword  </Text>
                <TextInput 
                    style = {styles.input}
                    placeholder = "Password"
                />

            <Text style = {styles.header}> Phone  </Text>
                <TextInput 
                    style = {styles.input}
                    placeholder = "Phone"
                />

                <Button title={"clikc on me lol"}>
                    CLick on me lol
                </Button>

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
    },
    innerContainer: {
      alignItems: 'center',
    },
    title: {
      color: 'blue', 
      fontSize: 40
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

    header: {
        marginLeft: 10
    },

    input: {
        backgroundColor: 'white',
        marginBottom: '10%',
        borderRadius: 10,
        width: '180%',
        borderWidth: 1,    
        padding: 0.8
    }

  });

