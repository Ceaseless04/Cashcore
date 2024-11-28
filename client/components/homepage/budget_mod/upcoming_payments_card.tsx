import React, {} from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { Svg, Line, Circle } from "react-native-svg";

import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

const window_height = Dimensions.get("window").height; //an idea would be to have h*w and then have this be the main measurement tool for all containers including text
const window_width = Dimensions.get("window").width; 

// git rid of padding and center with alignContents and justifyContents center

const master_measure = Math.sqrt(window_height * window_width); 

const s = StyleSheet.create({
    container:{
        width: ratio(390),
        height: ratio(390),
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
    list_wrapper:{
        width: Math.round(master_measure * 0.3212),
        height: Math.round(master_measure * 0.3212) - Math.round(master_measure * 0.07),
        alignContent: "center",
        gap: Math.round(master_measure * 0.0039),
    },
    item_container:{
        width: ratio(346),
        marginRight: ratio(22),
        marginLeft: ratio(22),
        height: ratio(58),
        backgroundColor: "#3a3a3a",
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: ratio(2),
        borderBottomColor: "#626262",
        borderStyle: "dotted",
    },
    info_and_bar:{
        flexDirection: "row",
        justifyContent: "center",
    },
    desc_container:{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    desc_text:{
        fontFamily: "inter",
        fontSize: ratio(13),
        alignSelf: "flex-start",
    },
    bar_container:{
        width: ratio(20),
        height: ratio(58),
        justifyContent: "center",

    },
    cir_container:{
        width: ratio(58),
        height: ratio(58),
        justifyContent: "center",
    }
});

//: JSX.Element is the return type
export default function UpcomingPaymentCard() : JSX.Element{
    
    load_fonts();

    return (
        <View style={s.container}>
            <View style={s.title}>
                <Text style={s.title_text}>Upcoming Payments</Text>
                <Text style={[s.desc_text, {color: "#979797"}]}>Payments due this month.</Text>
            </View>
            <View style={s.list_wrapper}>
                
                <View style={s.item_container}>
                    <View style={s.info_and_bar}>
                        <View style={s.bar_container}>
                            <Svg>
                                <Line x1={s.bar_container.width * 0.5} y1={ratio(10)} x2={s.bar_container.width * 0.5} y2={s.bar_container.height - ratio(10)} strokeWidth={ratio(4)} stroke={"#ffc573"} strokeLinecap="round"/>
                            </Svg>
                        </View>
                        <View style={s.desc_container}>
                            <Text style={[s.desc_text, {color: "#ffffff"}]}>Wifi</Text>
                            <Text style={[s.desc_text, {color: "#979797"}]}>$65</Text>
                        </View> 
                    </View>
                    <View style={s.cir_container}>
                        <Svg>
                          <Circle cx={s.cir_container.width * 0.5} cy={s.cir_container.height * 0.5} r={ratio(12)} stroke={"#626262"} fill={"#3a3a3a"} strokeWidth={ratio(2)}/> 
                        </Svg>
                    </View>
                </View>

                <View style={s.item_container}>
                    <View style={s.info_and_bar}>
                        <View style={s.bar_container}>
                            <Svg>
                                <Line x1={s.bar_container.width * 0.5} y1={ratio(10)} x2={s.bar_container.width * 0.5} y2={s.bar_container.height - ratio(10)} strokeWidth={ratio(4)} stroke={"#c36dc7"} strokeLinecap="round"/>
                            </Svg>
                        </View>
                        <View style={s.desc_container}>
                            <Text style={[s.desc_text, {color: "#ffffff"}]}>Rent</Text>
                            <Text style={[s.desc_text, {color: "#979797"}]}>$1,750</Text>
                        </View> 
                    </View>
                    <View style={s.cir_container}>
                        <Svg>
                          <Circle cx={s.cir_container.width * 0.5} cy={s.cir_container.height * 0.5} r={ratio(12)} stroke={"#626262"} fill={"#3a3a3a"} strokeWidth={ratio(2)}/> 
                        </Svg>
                    </View>
                </View>

                <View style={s.item_container}>
                    <View style={s.info_and_bar}>
                        <View style={s.bar_container}>
                            <Svg>
                                <Line x1={s.bar_container.width * 0.5} y1={ratio(10)} x2={s.bar_container.width * 0.5} y2={s.bar_container.height - ratio(10)} strokeWidth={ratio(4)} stroke={"#626262"} strokeLinecap="round"/>
                            </Svg>
                        </View>
                        <View style={s.desc_container}>
                            <Text style={[s.desc_text, {color: "#626262", textDecorationLine: "line-through"}]}>Utlities</Text>
                            <Text style={[s.desc_text, {color: "#626262", textDecorationLine: "line-through"}]}>$200</Text>
                        </View> 
                    </View>
                    <View style={s.cir_container}>
                        <Svg>
                            <Circle cx={s.cir_container.width * 0.5} cy={s.cir_container.height * 0.5} r={ratio(12)} stroke={"#1aa47b"} fill={"#1aa47b"} strokeWidth={ratio(2)}/> 
                            <Line x1={s.cir_container.width * 0.4} y1={s.cir_container.height * 0.51} x2={s.cir_container.width * 0.48} y2={s.cir_container.height * 0.58} strokeWidth={ratio(2)} stroke={"#3a3a3a"}/>
                            <Line x1={s.cir_container.width * 0.47} y1={s.cir_container.height * 0.59} strokeWidth={ratio(2)} x2={s.cir_container.width * 0.63} y2={s.cir_container.height * 0.42} stroke={"#3a3a3a"}/>
                        </Svg>
                    </View>
                </View>

                <View style={s.item_container}>
                    <View style={s.info_and_bar}>
                        <View style={s.bar_container}>
                            <Svg>
                                <Line x1={s.bar_container.width * 0.5} y1={ratio(10)} x2={s.bar_container.width * 0.5} y2={s.bar_container.height - ratio(10)} strokeWidth={ratio(4)} stroke={"#7398ff"} strokeLinecap="round"/>
                            </Svg>
                        </View>
                        <View style={s.desc_container}>
                            <Text style={[s.desc_text, {color: "#ffffff"}]}>Gym Membership</Text>
                            <Text style={[s.desc_text, {color: "#979797"}]}>$45</Text>
                        </View> 
                    </View>
                    <View style={s.cir_container}>
                        <Svg>
                          <Circle cx={s.cir_container.width * 0.5} cy={s.cir_container.height * 0.5} r={ratio(12)} stroke={"#626262"} fill={"#3a3a3a"} strokeWidth={ratio(2)}/> 
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

