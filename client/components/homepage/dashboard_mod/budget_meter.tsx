import React, {} from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Svg, Path, Defs, LinearGradient, Stop, Line } from "react-native-svg";

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
    title_container:{
      width: ratio(390),
      height: ratio(80),
      justifyContent: "center",
      
    },
    title_text:{
      marginLeft: ratio(30),
      fontFamily: "inter",
    }, 
    amount_text_container:{
      width: ratio(390),
      height: ratio(70),
      alignContent: "center",
      justifyContent: "center",
    },
    amount_text:{
      fontFamily: "inter",
      fontSize: ratio(32),
      fontWeight: 600,
      textAlign: "center",
      color: "#ffffff",
    }, 
    meter_wrapper:{
      width: ratio(390),
      height: ratio(390) - (ratio(70) + ratio(80)),
      alignItems: "center",
      justifyContent: "center",
    },
    meter_container:{
      width: ratio(390),
      height: ratio(390) - (ratio(70) + ratio(80)),
      position: "absolute",
    }, 
    remianing_container:{
      width: ratio(390),
      height: ratio(20),
      position: "absolute",
    },
    remaining_text:{
      fontFamily: "inter",
      fontSize: ratio(13),
      textAlign: "center",
      color: "#ffffff",
    },
});

//add a stroke line that updates positions depending on where the green fill bar end point is
//for instance if fill is at endpoint(0) this means one point will be at the center of the circle, would be 

export default function BudgetMeter() : JSX.Element {

    load_fonts();

    return (
        <View style={s.container}>

            <View style={s.title_container}>
              <Text style={[s.title_text, {fontSize: ratio(16), fontWeight: 600, color: "#ffffff"}]}>Budget</Text>
              <Text style={[s.title_text, {fontSize: ratio(13), color: "#979797"}]}>Total budget for December 2024.</Text>
            </View>
            
            <View style={s.amount_text_container}>
              <Text style={s.amount_text}>$2,000</Text>
            </View>

            <View style={s.meter_wrapper}>
              <View style={s.meter_container}>
                <Svg style={s.meter_container}>

                  <Defs>
                    <LinearGradient id="stroke-grad" x1="0" y1="0" x2="1" y2="0">
                        <Stop offset="0%" stopColor="#299f62" stopOpacity="1" />
                        <Stop offset="100%" stopColor="#4db088" stopOpacity="1" />
                    </LinearGradient>
                  </Defs>

                  <Path d={describe_arc(s.meter_container.width/2, s.meter_container.height/2 + ratio(20), ratio(115), -130, 130)} fill="none" stroke="#ffffff" strokeWidth={ratio(30)}/>
                  <Path d={describe_arc(s.meter_container.width/2, s.meter_container.height/2 + ratio(20), ratio(115), -130, get_meter_fill(2000, 1222))} fill="none" stroke="url(#stroke-grad)" strokeWidth={ratio(30.5)}/>
                  <Line x1={s.meter_container.width/2} y1={s.meter_container.height/2 + ratio(20)} x2={get_x_on_circle(ratio(115), get_meter_fill(2000, 1222), s.meter_container.width/2)} y2={get_y_on_circle(ratio(115), get_meter_fill(2000, 1222), s.meter_container.height/2 + ratio(20))}
                        stroke={s.container.backgroundColor} strokeWidth={ratio(20)}/>

                </Svg> 
              
              </View>

              <View style={s.remianing_container}>
                <Text style={s.remaining_text}>$1,222 Remaining</Text>
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
      return <AppLoading/> 
    } else {
      return font_loaded;
    }
  
}

//determining size of items dependent on user screen size
function ratio(val: number){

  var result: number = 0;
  var og_ratio: number = Math.sqrt(1440 * 1024);
  result = val / og_ratio;
  result = master_measure * result;
  
  return Math.round(result);

}

function polar_to_cartesian(center_x: number, center_y: number, radius: number, angle_in_degrees: number) {
  var angle_in_radians: number = (angle_in_degrees-90) * Math.PI / 180.0;

  return {
    x: center_x + (radius * Math.cos(angle_in_radians)),
    y: center_y + (radius * Math.sin(angle_in_radians))
  };
}

function describe_arc(x: number, y: number, radius: number, start_angle: number, end_angle: number){

    var start = polar_to_cartesian(x, y, radius, end_angle);
    var end = polar_to_cartesian(x, y, radius, start_angle);

    var large_arc_flag: string = "???";

    if((end_angle - start_angle) <= 180) { 
      large_arc_flag = "0"
    } else { 
      large_arc_flag = "1"
    }

    var d: string = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, large_arc_flag, 0, end.x, end.y
    ].join(" ");

    return d;       
}

function get_meter_fill(budget_total: number, remaining: number){

  //get ratio of meter fill
  var result: number = (remaining / budget_total) - 1; //subtract by 1 as actual ratio is actually opposite of division
  result = 130 * result; //get ratio of fill needed
  result *= 2; //will need to multiply by two as our range is 260
  result = 130 + result; //subtract from endpoint of arc //we add as first step will always be negative (cept for 0)


  //return final position 
  return Math.round(result);

}

//retrieving x,y on circle
function get_x_on_circle(radius: number, angle: number, center_x: number){ 
  //we need to convert the angle properly
  var rad: number = to_radians(angle);

  return center_x + (Math.cos(rad) * radius) * 1.2;
}

//retrieving x,y on circle
function get_y_on_circle(radius: number, angle: number, center_y: number){

  //we need to convert the angle properly
  var rad: number = to_radians(angle);

  return center_y + (Math.sin(rad) * radius) * 1.2;
}

function to_radians(angle: number){
  var result: number = (Math.PI * (angle - 90)) / 180;

  return result;
}