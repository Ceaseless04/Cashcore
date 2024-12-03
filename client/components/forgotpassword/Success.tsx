import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ImageBackground,
    Button,
    Image
  } from "react-native";
import colorPalette from "@/app/utils/colors";
import React, { useState } from "react";

export function Success(){

    return(
        <>
        <view style={styles.outer}>
            <View  style={styles.inner}>
                
                <Image
                        source={require("./image.png")} // Image is in the same folder as this file
                        // style={styles.image} // Add style to size the image
                />

                <Text style={styles.textTitle}>Success!</Text>
                <Text style={styles.text}>Your Password has been reset successfully!</Text>                    

                <Text style={styles.widgetActionButton}> Back to Dashboard</Text>

                {/* <Button title="Back to Dashboard"></Button> */}

            </View>

  
        </view>
        </>
    )

}

const styles = StyleSheet.create({
    outer :{
        backgroundColor: "#1c1c1c",
        paddingTop: 40,
        padding: 30,
        alignItems: "center", 
        justifyContent: 'center',  
        width: 450,
        borderRadius: 20,
        paddingBottom: 50
    },

    inner: {
        maxWidth: 450, 
        backgroundColor: "#1c1c1c",
        borderRadius: 20,
        padding: 30,
        alignItems: "center", 
    },

    widgetActionButton: {
        padding: 5,
        borderRadius: 5,
        alignItems: "center",
        marginVertical: 5,
        flex: 1,
        justifyContent: "center",
        backgroundColor: colorPalette.green,
        width: 300,
        color: "white",
        paddingVertical: 8,
        fontSize: 20
      },

    inputsContainer:{
        paddingTop: 20,
        paddingBottom: 50
    },

    textTitle:{
        color: "white",
        fontSize: 35,
        paddingBottom: 5
    },

    text:{
        color: "white",
        marginTop: 1,
        marginBottom: 50
    },


    emailContainer:{
        paddingTop: 10,
        paddingBottom: 10,
    },

    emailheader:{
        color: "white",
        fontSize: 20,
       paddingBottom: 15
    },

    input:{
        borderColor: "white",
        borderRadius: 7,
        borderWidth: 1,           
        height: 35,
        color: "white",
        fontSize: 30
    },

    text2:{
        color: "white"
    },

    backToLogin:{
        paddingTop: 30,
        paddingBottom: 20,
    },

    loginText:{
        color:"white",
        fontSize: 15,
    }


})

