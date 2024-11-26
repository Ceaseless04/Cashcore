import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface Props { 
    w: number;
    h: number;
    border_radius: number,
    border_weight: number, 
    color: [string, string];
    text: string;
    text_style: any;
    bg_color: string;
}


export default function BorderGrdntBtn({w, h, border_radius, border_weight, color, text, text_style, bg_color} : Props) {

    //get inside size to give an illusion of of border size
    const inner_view_border_rad = border_radius - border_weight;
    const inner_view_border_h = h - (border_weight * 2);
    const inner_view_broder_w = w - (border_weight * 2); 

    const s = StyleSheet.create({
        outer: {
            width: w,
            height: h,
            borderRadius: border_radius, 
            justifyContent: "center",
            alignItems: "center",
        },
        inner: {
            width: inner_view_broder_w,
            height: inner_view_border_h,
            borderRadius: inner_view_border_rad,
            backgroundColor: bg_color,
            justifyContent: "center",
            alignItems: "center",
        },
    });

    return (
        <LinearGradient 
        colors={[color[0], color[1]]}
        start={{x: 0.5, y: 0}}
        end={{x: 1, y: 0}} 
        style={s.outer}>
            <View style={s.inner}>
                <Text style={text_style}>{text}</Text>
            </View>
        </LinearGradient>
    );

}


