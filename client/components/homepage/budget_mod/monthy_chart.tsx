import React, {} from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { Svg, Rect, LinearGradient, Defs, Stop } from "react-native-svg";

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
    },
    title_container:{
        width: ratio(390),
        height: ratio(50),
    },
    title:{
        width: Math.round(master_measure * 0.3014),
        height: Math.round(master_measure * 0.07),
        paddingTop: ratio(20),
        justifyContent: "center",
        alignContent: "center",
        marginLeft: ratio(20),
        fontFamily: "inter",
        fontSize: ratio(16),
        fontWeight: 600,
        color: "#ffffff",
    },
    sub_title:{
        fontFamily: "inter",
        fontSize: ratio(13),
        color: "#979797",
        marginLeft: ratio(20),
    },
    data_container:{
        width: ratio(390),
        height: ratio(340),
        flexDirection: "row",     
    },
    left:{
        width: ratio(390) * 0.35,
        height: ratio(340),
        justifyContent: "center",
     
    },
    keys_container:{
        width: ratio(100),
        height: ratio(100),
        flexDirection: "column",
        gap: ratio(14),
        marginLeft: ratio(20),
        marginBottom: ratio(50),
        justifyContent: "center",
    },
    key_wrapper:{
        flexDirection: "row",
    },
    keys_text:{
        fontFamily: "inter",
        fontSize: ratio(13),
        color: "#ffffff",
    },

    right:{
        width: ratio(390) * 0.65,
        height: ratio(340),
        flexDirection: "row",
    },

    amount_container:{
        width: ratio(390) * 0.15,
        height: ratio(340),
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: ratio(50),
        paddingBottom: ratio(50),
    },
    charts_wrapper:{
        width: ratio(390) * 0.5, 
        height: ratio(340),
        paddingTop: ratio(50),
        paddingBottom: ratio(50),
        flexDirection: "row",
    },
    chart_segment:{
        width: ratio(390) * 0.2,
        height: ratio(240),
    }, 
    chart_container:{
        width: ratio(390) * 0.2,
        height: ratio(340) * 0.35,
        borderWidth: ratio(2), 
        borderColor: "#5a5a5a",
    }, 
});

//: JSX.Element is the return type
export default function PerformanceCard(): JSX.Element{
    
    load_fonts();

    return (
        <View style={s.container}>
            <View style={s.title_container}>
                <Text style={s.title}>Performance</Text>
                <Text style={s.sub_title}>Your budget performance so far this year.</Text>
            </View>

            

            <View style={s.data_container}>
                <View style={s.left}>
                    <View style={s.keys_container}>
                        <View style={s.key_wrapper}> 
                            <Svg style={{width: ratio(18),height: ratio(18)}}>
                                <Defs>
                                    <LinearGradient id="green-grad" x1="0" y1="0" x2="1" y2="0">
                                        <Stop offset="0%" stopColor="#4db088" stopOpacity="1" />
                                        <Stop offset="100%" stopColor="#299f62" stopOpacity="1" />
                                    </LinearGradient>
                                </Defs>
                                <Rect x="0" y="0" width={ratio(18)} height={ratio(18)} strokeWidth="2" fill="url(#green-grad)"/>
                            </Svg>
                            <Text style={[s.keys_text, {paddingLeft: ratio(10)}]}>Income</Text>
                        </View>
                        <View style={s.key_wrapper}> 
                            <Svg style={{width: ratio(18),height: ratio(18)}}>                                
                                <Defs>
                                    <LinearGradient id="blue-grad" x1="0" y1="0" x2="1" y2="0">
                                        <Stop offset="0%" stopColor="#58bdc9" stopOpacity="1" />
                                        <Stop offset="100%" stopColor="#228293" stopOpacity="1" />
                                    </LinearGradient>
                                </Defs>
                                <Rect x="0" y="0" width={ratio(18)} height={ratio(18)} strokeWidth="2" fill="url(#blue-grad)"/>
                            </Svg>
                            <Text style={[s.keys_text, {paddingLeft: ratio(10)}]}>Expense</Text>
                        </View>
                    </View>
                </View>

                <View style={s.right}>
                    <View style={s.amount_container}>
                        <Text style={s.keys_text}>$3,000</Text>
                        <Text style={s.keys_text}>$0</Text>
                        <Text style={s.keys_text}>$3,000</Text>
                    </View>

                    <View style={s.charts_wrapper}>

                        <View style={s.chart_segment}>
                            <View style={s.chart_container}>
                                <Svg>
                                    <Rect x={(s.chart_container.width - ratio(30)) / 2} y={s.chart_container.height - ratio(65)} width={ratio(30)} height={ratio(65)} strokeWidth={ratio(2)} fill="url(#green-grad)" stroke={"#5a5a5a"}/>
                                </Svg>
                            </View>
                            <View style={s.chart_container}>
                                <Svg>
                                    <Rect x={(s.chart_container.width - ratio(30)) / 2} y="0" width={ratio(30)} height={ratio(80)} strokeWidth={ratio(2)} fill="url(#blue-grad)" stroke={"#5a5a5a"}/>
                                </Svg>
                            </View>
                            <Text style={[s.keys_text, {textAlign:"center"}]}>Jan</Text>
                        </View>

                        <View style={s.chart_segment}>
                            <View style={s.chart_container}>
                                <Svg>
                                    <Rect x={(s.chart_container.width - ratio(30)) / 2} y={s.chart_container.height - ratio(90)} width={ratio(30)} height={ratio(90)} strokeWidth={ratio(2)} fill="url(#green-grad)" stroke={"#5a5a5a"}/>
                                </Svg>
                            </View>
                            <View style={s.chart_container}>
                                <Svg>
                                    <Rect x={(s.chart_container.width - ratio(30)) / 2} y="0" width={ratio(30)} height={ratio(50)} strokeWidth={ratio(2)} fill="url(#blue-grad)" stroke={"#5a5a5a"}/>
                                </Svg>
                            </View>
                            <Text style={[s.keys_text, {textAlign:"center"}]}>Feb</Text>
                        </View>

                    
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

