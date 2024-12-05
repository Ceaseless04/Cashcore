import React, {} from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";


const window_height = Dimensions.get("window").height; //an idea would be to have h*w and then have this be the main measurement tool for all containers including text
const window_width = Dimensions.get("window").width; 

// git rid of padding and center with alignContents and justifyContents center

const master_measure = Math.sqrt(window_height * window_width); 

const s = StyleSheet.create({
    container:{
        width: Math.round(master_measure * 0.3212),
        height: Math.round(master_measure * 0.3212),
        backgroundColor: "#323232",
        borderRadius: Math.round(master_measure * 0.0206),
        flexDirection: "column",
        alignItems: "center", 
    },
    title:{
        width: Math.round(master_measure * 0.3014),
        height: Math.round(master_measure * 0.0497),
        justifyContent: "center",
        alignContent: "center",
        marginLeft: Math.round(master_measure * 0.0354),
    },
    title_text:{
        fontFamily: "space-grotesk-bold",
        fontSize: Math.round(master_measure * 0.0107) + 0.31,
        color: "#ffffff",
    },
    transacts_wrapper:{
        gap: Math.round(master_measure * 0.0039),
    },
    transact_container:{
        width: Math.round(master_measure * 0.3014),
        height: Math.round(master_measure * 0.0478),
        backgroundColor: "#181818",
        borderRadius: Math.round(master_measure * 0.0082),
        flexDirection: "row",
        justifyContent: "space-between",
    },
    transact_type_date_container:{
        paddingLeft: Math.round(master_measure * 0.0182),
        justifyContent: "center",
    },
    date_type_text:{
        fontFamily: "space-grotesk-bold",
        fontSize: Math.round(master_measure * 0.0107) + 0.31,
    },
    transact_amount_container:{
        paddingRight: Math.round(master_measure * 0.0182),
        justifyContent: "center",
    },
    amount_text:{
        fontFamily: "space-grotesk-bold",
        fontSize: Math.round(master_measure * 0.0107) + 0.31,
    },
});





export default function TransactionCard() : JSX.Element{


    load_fonts();

    return ( 
        <View style={s.container}>
            <View style={s.title}>
                <Text style={s.title_text}>Transactions</Text>
            </View>
            <View style={s.transacts_wrapper}>
                
                <View style={s.transact_container}>
                    <View style={s.transact_type_date_container}>
                        <Text style={[s.date_type_text, {color: "#ffffff"}]}>Check</Text>
                        <Text style={[s.date_type_text, {color: "#6e6e6e"}]}>Oct 16, 2:00pm</Text> 
                    </View>
                    <View style={s.transact_amount_container}>
                        <Text style={[s.amount_text, {color: "#27CE78"}]}>+8000</Text>
                    </View>
                </View>

                <View style={s.transact_container}>
                    <View style={s.transact_type_date_container}>
                        <Text style={[s.date_type_text, {color: "#ffffff"}]}>Chick-Fil-A</Text>
                        <Text style={[s.date_type_text, {color: "#6e6e6e"}]}>Oct 10, 7:48pm</Text> 
                    </View>
                    <View style={s.transact_amount_container}>
                        <Text style={[s.amount_text, {color: "#ffffff"}]}>$22</Text>
                    </View>
                </View>

                <View style={s.transact_container}>
                    <View style={s.transact_type_date_container}>
                        <Text style={[s.date_type_text, {color: "#ffffff"}]}>Sprouts</Text>
                        <Text style={[s.date_type_text, {color: "#6e6e6e"}]}>Sep 27, 10:00am</Text> 
                    </View>
                    <View style={s.transact_amount_container}>
                        <Text style={[s.amount_text, {color: "#ffffff"}]}>$80.68</Text>
                    </View>
                </View>

                <View style={s.transact_container}>
                    <View style={s.transact_type_date_container}>
                        <Text style={[s.date_type_text, {color: "#ffffff"}]}>Robinhood</Text>
                        <Text style={[s.date_type_text, {color: "#6e6e6e"}]}>Sep 20, 9:00am</Text> 
                    </View>
                    <View style={s.transact_amount_container}>
                        <Text style={[s.amount_text, {color: "#ffffff"}]}>$200.00</Text>
                    </View>
                </View>

                <View style={s.transact_container}>
                    <View style={s.transact_type_date_container}>
                        <Text style={[s.date_type_text, {color: "#ffffff"}]}>Check</Text>
                        <Text style={[s.date_type_text, {color: "#6e6e6e"}]}>Oct 16, 2:00pm</Text> 
                    </View>
                    <View style={s.transact_amount_container}>
                        <Text style={[s.amount_text, {color: "#27CE78"}]}>+8000</Text>
                    </View>
                </View>
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