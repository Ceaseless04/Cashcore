import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import colorPalette from "@/app/utils/colors";

import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

const window_height = Dimensions.get("window").height; //an idea would be to have h*w and then have this be the main measurement tool for all containers including text
const window_width = Dimensions.get("window").width; 

// git rid of padding and center with alignContents and justifyContents center

const master_measure = Math.sqrt(window_height * window_width); 

interface SummaryCardProps {
  title: string;
  percentage: number;
  value: string;
}

const styles = StyleSheet.create({
    wrapper:{
        margin: Math.round(master_measure * 0.010),
    },
    account_summary_card: {
        width: Math.round(master_measure * 0.3162),
        height: Math.round(master_measure * 0.0824),
        backgroundColor: "#3e3e3e",
        shadowRadius: Math.round(master_measure * 0.0231) - 1,
        shadowOpacity: 0.35,
        borderRadius: Math.round(master_measure * 0.0206),
        paddingRight: Math.round(master_measure * 0.0365),
        paddingLeft: Math.round(master_measure * 0.0365),
        paddingTop: Math.round(master_measure * 0.0124),
        paddingBottom: Math.round(master_measure * 0.0124),
    },
    summaryHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        color: colorPalette.light,
    },
    summary_title_text: {
        fontFamily: "space-grotesk-bold", 
        color: "#ffffff",
        fontSize: Math.round(master_measure * 0.0107) + 0.31,
    },
    summary_container_percentage: {
        fontFamily: "space-grotesk-bold", 
        fontSize: Math.round(master_measure * 0.0107) + 0.31,
    },
    summaryContainers: {
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    accountBalanceContainer: {
        flexDirection: "column",
    },
    sumamryContainerValue: {
        fontFamily: "space-grotesk-bold", 
        color: "#ffffff", //had colorPallete utility before // good idea - change later to that 
        fontSize: Math.round(master_measure * 0.0346) + 0.01,
        fontWeight: "bold",
      },
    
  });
  

export function SummaryCard({ title, percentage, value }: SummaryCardProps): JSX.Element {

    load_fonts();

    return (
        <View style={styles.wrapper}>
            <View style={styles.account_summary_card}>
                <View style={styles.summaryHeader}>
                    <Text style={styles.summary_title_text}>{title}</Text>
                    <Text
                    style={[
                        styles.summary_container_percentage,
                        { color: percentage < 0 ? "red" : "green" },
                    ]}
                    > 
                    {percentage == 0 ? '' : percentage < 0 ? `-%${percentage * -100}` : `+%${percentage * 100}`} 
                    </Text>
                </View>
                <Text style={styles.sumamryContainerValue}>{value}</Text>
            </View>
        </View>
    );
}


function load_fonts() {
    const [font_loaded] = useFonts({
      "space-grotesk-bold": require("./../../../assets/fonts/SpaceGrotesk-Bold.otf"),
    });
  
    if (!font_loaded){
      return <AppLoading/> //some tag, ================look up definition=================
    } else {
      return font_loaded;
    }
  
  }