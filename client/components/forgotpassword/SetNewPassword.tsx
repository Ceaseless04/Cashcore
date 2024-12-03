import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ImageBackground,
    Button,
  } from "react-native";
  import colorPalette from "@/app/utils/colors";

import React, { useState } from "react";

export function SetNewPassword(){

    return(
        <>
        <view style={styles.outer}>
            <View>
                <Text style={styles.textTitle}>Set New Password</Text>
                <Text style={styles.text}>Set your new password, must be at least 8 characters </Text>


                <View style={styles.inputsContainer}>
                    <View style={styles.emailContainer}>
                        <Text style={styles.emailheader}>Password</Text> 
                        <TextInput style={styles.input} secureTextEntry={true}/>                     
                    </View>

                    <View style={styles.emailContainer}>
                        <Text style={styles.emailheader}>Confirm Password</Text> 
                        <TextInput style={styles.input} secureTextEntry={true}/>                     
                    </View>
                </View>



                <Text style={styles.widgetActionButton}>Reset Password</Text>

                {/* <Button title="Reset Password "></Button> */}

                <View style={styles.backToLogin}>
                    <Text style={styles.loginText}>Back to login </Text>                
                </View>
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
        borderRadius: 20
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
        color: "gray"
    },


    widgetActionButton: {
        padding: 5,
        borderRadius: 5,
        alignItems: "center",
        marginVertical: 5,
        flex: 1,
        justifyContent: "center",
        backgroundColor: colorPalette.green,
        color: "white",
        paddingVertical: 8,
        fontSize: 20
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

