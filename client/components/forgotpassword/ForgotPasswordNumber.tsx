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

export function ForgotPasswordNumber(){

    return(
        <>
        <view style={styles.outer}>
            <View>
                <View style={styles.inner}>
                <Text style={styles.textTitle}>Forgot Password</Text>
                <Text style={styles.text}>We sent a code to mybuddyrick@gmail.com</Text>

                
                <View style ={styles.inputContainer}>
                    <TextInput style={styles.inputs}  maxLength={1} keyboardType="numeric" />
                    <TextInput style={styles.inputs}  maxLength={1} keyboardType="numeric" />
                    <TextInput style={styles.inputs}  maxLength={1} keyboardType="numeric" />
                    <TextInput style={styles.inputs}  maxLength={1} keyboardType="numeric" />
                </View>

                <View style={styles.button}>
                    {/* <Button  title="Continue"></Button>   */}
                    <Text style={styles.widgetActionButton}>Continue</Text>
                </View>
              

                <Text style={styles.text}>Didn't receive an email? click to resend</Text>

                <View style={styles.backToLogin}>
                    <Text style={styles.loginText}>Back to login </Text>                
                </View>
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

    inner: {
        maxWidth: 450, 
        backgroundColor: "#1c1c1c",
        borderRadius: 20,
        padding: 30,
        alignItems: "center", 
    },


    inputContainer:{
        flexDirection: "row", 
        // justifyContent: "space-between",
        // marginVertical: 20,
        paddingTop: 20,
        paddingBottom: 20
    },

    inputs:{
        borderRadius: 20,
        borderColor: "white",
        borderWidth: 1,           
        width: 70,
        height: 80,
        color: "white", 
        fontSize: 40,
        marginHorizontal: 8,
       textAlign: "center"
    },

    textTitle:{
        color: "white",
        fontSize: 35,
        paddingBottom: 5
    },

    text:{
        color: "gray"
    },


    emailContainer:{
        paddingTop: 40,
        paddingBottom: 30,
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
        width: 330,
        paddingVertical: 8,
        fontSize: 20
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
        height: 35
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
    },

    button:{
        // backgroundColor: "green",
        paddingBottom: 30,
        paddingTop: 20

    }


})

