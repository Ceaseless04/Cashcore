import React from "react";
import {View, Text, StyleSheet, Dimensions } from "react-native";

const window_height = Dimensions.get("window").height; //an idea would be to have h*w and then have this be the main measurement tool for all containers including text
const window_width = Dimensions.get("window").width;

const master_measure = Math.sqrt(window_height * window_width); 

const s = StyleSheet.create({
    container:{
        width: Math.round(window_width * 0.25) - 1,
        height: Math.round(window_height * 0.5),
        paddingRight: Math.round(master_measure * 0.068) - 1,
        paddingLeft: Math.round(master_measure * 0.068) - 1,
    },
    numba_cont:{

    },
    numba_txt:{
        fontFamily: "inter",
        fontSize: Math.round(master_measure * 0.0791) - 1,
        fontWeight: "bold",
        color: "#ffffff",
        opacity: 0.4,
        marginLeft: Math.round(master_measure * .0195),
    },
    prmpt_cont:{
        width: Math.round(master_measure * 0.2619),
        height: Math.round(master_measure * 0.0980), 
        borderRadius: Math.round(master_measure * 0.0099), 
        backgroundColor: "#222222",
        padding: Math.round(master_measure * 0.02) - 1,
        marginTop: Math.round(master_measure * -0.0256) - 1,
        shadowRadius: Math.round(master_measure * 0.0231) - 1,
        shadowOpacity: 0.35,
    },
    prmpt_title:{
        color: "#4cb086",
        fontFamily: "inter",
        fontSize: Math.round(master_measure * 0.0132),
        paddingBottom: Math.round(master_measure * 0.0055) - 1,
    },
    prmpt_txt:{
        color: "#ffffff",
        fontFamily: "inter",
        fontSize: Math.round(master_measure * 0.0107),
    }
});


export default function Step({ value, prompt_title ,prompt }: { value: number; prompt_title: string; prompt: string}){

    return(
        <View style={s.container}>
            <Text style={s.numba_txt}>{value}</Text>
            <View style={s.prmpt_cont}>
                <Text style={s.prmpt_title}>{prompt_title}</Text>
                <Text style={s.prmpt_txt}>{prompt}</Text>
            </View>
        </View>
    );
    
}