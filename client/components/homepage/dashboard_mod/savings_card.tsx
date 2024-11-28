import React, {} from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { Svg, Line } from "react-native-svg";

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
        backgroundColor: "#3a3a3a",
        borderRadius: Math.round(master_measure * 0.0206),
        flexDirection: "column",
        alignItems: "center", 
    },
    title:{
        width: Math.round(master_measure * 0.3014),
        height: Math.round(master_measure * 0.07),
        justifyContent: "center",
        alignContent: "center",
        marginLeft: Math.round(master_measure * 0.0182),
    },
    title_text:{
        fontFamily: "inter",
        fontSize: Math.round(master_measure * 0.0131),
        color: "#ffffff",
    },
    savings_wrapper:{
        width: Math.round(master_measure * 0.3212),
        height: Math.round(master_measure * 0.3212) - Math.round(master_measure * 0.07),
        alignContent: "center",
        gap: Math.round(master_measure * 0.0039),
    },
    savings_container:{
        width: Math.round(master_measure * 0.3212),
        height: Math.round(master_measure * 0.0478),
        backgroundColor: "#3a3a3a",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    savings_type_container:{
        paddingLeft: Math.round(master_measure * 0.0182),
        justifyContent: "center",
    },
    type_text:{
        fontFamily: "inter",
        fontSize: Math.round(master_measure * 0.0107), //13
    },
    bar_container:{
        width: Math.round((master_measure * 0.3212) * 0.5),
        height: Math.round(master_measure * 0.0478),
        justifyContent: "center",

    },
    bar:{
        width: Math.round((master_measure * 0.3212) * 0.5),
        height: Math.round(master_measure * 0.0478),
        position: "absolute",
    },
});

//: JSX.Element is the return type
export default function SavingsCard() : JSX.Element{
    
    load_fonts();

    return (
        <View style={s.container}>
            <View style={s.title}>
                <Text style={s.title_text}>Savings</Text>
                <Text style={[s.type_text, {color: "#979797"}]}>Establish and track your goals.</Text>
            </View>
            <View style={s.savings_wrapper}>
                
                <View style={s.savings_container}>
                    <View style={s.savings_type_container}>
                        <Text style={[s.type_text, {color: "#ffffff"}]}>Housing Downpayment</Text>
                        <Text style={[s.type_text, {color: "#979797"}]}>$540 / $5000</Text> 
                    </View>
                    <View style={s.bar_container}>
                        <Svg style={s.bar}>
                            <Line x1={ratio(20)} y1={s.bar.height/2} x2={ratio(170)} y2={s.bar.height/2} strokeWidth={10} stroke={"#ffffff"} strokeLinecap="round"/>
                            <Line x1={ratio(20)} y1={s.bar.height/2} x2={get_fill(540, 5000, ratio(170))} y2={s.bar.height/2} strokeWidth={10} stroke={"#1aa47b"} strokeLinecap="round"/>
                            <Line></Line>
                        </Svg>
                    </View>
                </View>

                <View style={s.savings_container}>
                    <View style={s.savings_type_container}>
                        <Text style={[s.type_text, {color: "#ffffff"}]}>Emergency Fund</Text>
                        <Text style={[s.type_text, {color: "#979797"}]}>$75 / $75</Text> 
                    </View>
                    <View style={s.bar_container}>
                        <Svg style={s.bar}>
                            <Line x1={ratio(20)} y1={s.bar.height/2} x2={ratio(170)} y2={s.bar.height/2} strokeWidth={10} stroke={"#ffffff"} strokeLinecap="round"/>
                            <Line x1={ratio(20)} y1={s.bar.height/2} x2={get_fill(75, 75, ratio(170))} y2={s.bar.height/2} strokeWidth={10} stroke={"#1aa47b"} strokeLinecap="round"/>
                            <Line></Line>
                        </Svg>
                    </View>
                </View>

                <View style={s.savings_container}>
                    <View style={s.savings_type_container}>
                        <Text style={[s.type_text, {color: "#ffffff"}]}>New Laptop</Text>
                        <Text style={[s.type_text, {color: "#979797"}]}>$1000 / $2,000</Text> 
                    </View>
                    <View style={s.bar_container}>
                        <Svg style={s.bar}>
                            <Line x1={ratio(20)} y1={s.bar.height/2} x2={ratio(170)} y2={s.bar.height/2} strokeWidth={10} stroke={"#ffffff"} strokeLinecap="round"/>
                            <Line x1={ratio(20)} y1={s.bar.height/2} x2={get_fill(1000, 2000, ratio(170))} y2={s.bar.height/2} strokeWidth={10} stroke={"#1aa47b"} strokeLinecap="round"/>
                            <Line></Line>
                        </Svg>
                    </View>
                </View>

                <View style={s.savings_container}>
                    <View style={s.savings_type_container}>
                        <Text style={[s.type_text, {color: "#ffffff"}]}>Investments</Text>
                        <Text style={[s.type_text, {color: "#979797"}]}>$100 / $150</Text> 
                    </View>
                    <View style={s.bar_container}>
                        <Svg style={s.bar}>
                            <Line x1={ratio(20)} y1={s.bar.height/2} x2={ratio(170)} y2={s.bar.height/2} strokeWidth={10} stroke={"#ffffff"} strokeLinecap="round"/>
                            <Line x1={ratio(20)} y1={s.bar.height/2} x2={get_fill(100, 150, ratio(170))} y2={s.bar.height/2} strokeWidth={10} stroke={"#1aa47b"} strokeLinecap="round"/>
                            <Line></Line>
                        </Svg>
                    </View>
                </View>

            </View> 
        </View>
    );
}


function load_fonts() {
    const [font_loaded] = useFonts({
      "inter": require("./../../../assets/fonts/InterVariable.ttf"),
    });
  
    if (!font_loaded){
      return <AppLoading/> //some tag, ================look up definition=================
    } else {
      return font_loaded;
    }
  
}

//determining size of items dependent on user screen size
function ratio(val: number) : number{

    var result: number = 0;
    var og_ratio: number = Math.sqrt(1440 * 1024);
    result = val / og_ratio;
    result = master_measure * result;
    
    return Math.round(result);
  
}

//we get the size of meter and then get the ratio of the amount saved and we compare both to see how full the meter must be
//called by the green line
function get_fill(current: number, goal: number, x2:number) : number{
    
    var amount_ratio: number = current/goal;

    return amount_ratio * x2;


}


