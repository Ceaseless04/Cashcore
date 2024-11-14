import React from "react";
import {View, Text, StyleSheet } from "react-native";



const s = StyleSheet.create({
    container:{
        width: "25%",
        height: "auto",
        paddingRight: "4%",
        paddingLeft: "4%",
    },
    numba_cont:{

    },
    numba_txt:{
        fontFamily: "inter",
        fontSize: 96,
        fontWeight: "bold",
        color: "#ffffff",
        opacity: 0.4,
        marginLeft: "8%",
    },
    prmpt_cont:{
        borderRadius: 12, 
        backgroundColor: "#222222",
        padding: "10%",
        marginTop: "-8.8%",
        shadowRadius: 28,
        shadowOpacity: 0.35,
    },
    prmpt_title:{
        color: "#4cb086",
        fontFamily: "inter",
        fontSize: 16,
        paddingBottom: "2%",
    },
    prmpt_txt:{
        color: "#ffffff",
        fontFamily: "inter",
        fontSize: 13,
    }
});


export default function Step({ value, prompt_title ,prompt }: {value: number; prompt_title: string; prompt: string}){

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