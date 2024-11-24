/*
  The page will be organized in the way that each container could be considered as blocks stack on top of one another.
  Each block will take up the space of the screen.
  All blocks are wraped up by a parent container, where its only job is to allign all given blocks

  Tomorrow: Work on Block 2

*/

import React, { useRef, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, Dimensions, Animated, Easing, TouchableOpacity } from "react-native";


import { Svg, RadialGradient, Defs, Stop, Circle } from "react-native-svg";
import SvgLogo from "./../assets/homepage/img/final-brand-logo.svg"; //works, but showing as errors on VSCode
import SignUpBtnSvg from "./../assets/homepage/img/get-started.svg"; //works, but showing as errors on VSCode
import LogInBtnSvg from "./../assets/homepage/img/login.svg";

import Jumper from "./../components/homepage/jumper";

import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { Link } from "expo-router";


//store window height and width
const window_height = Dimensions.get("window").height;
const window_width = Dimensions.get("window").width;

//debug
console.log("Win_H: ", window_height);
console.log("Win_W: ", window_width);
console.log("Win_Added: ", window_width * .049);


const parent_styles = StyleSheet.create({
  wrap_all: { //center piece of the page
    flex: 1,
    backgroundColor: "#181818",
    flexDirection: "column",
  },
});

const h = StyleSheet.create({
  head: {
    width: "100%", 
    height: "auto",
  },
  wrapper: {
    width: "100%",
    height: "auto",
    padding: "1%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    width: "18%",
  },
  nav_text_c: {
    width: "60%",
    flexDirection: "row", 
    height: "auto",
    justifyContent: "center",

  },
  nav_text:{
    color: "#ffffff",
    paddingLeft: "2%",
    paddingRight: "2%",
  },
  b_c: {
    flexDirection: "row",
    justifyContent: "center",
    width: "18%",
    height: "auto",
  },
  b1: {
    width: 100,
    marginRight: 30,
  },
  b2: {
    width: 100,
  }
}); 

//the first container on top
const block1 = StyleSheet.create({
  wrapper: { //the "Control Your Finances"
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: window_height - (window_height * 0.2),
  },
  //wrap around text and gradient
  c1: { 
    width: "40%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  //wrap around gradient
  gradient_container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    position: "absolute",
  },
  gradient: { 
    width: "100%", 
    height: "100%",
  },

  //text
  c1_w_text: { //form white text
    color: "#ffffff",
    textAlign: "center",
    fontFamily: "spaceGroteskBold",
    fontSize: 80,
  },
  c1_g_text: { //the green used within the text
    color: "#27CE78",
    textAlign: "center",
    fontFamily: "spaceGroteskBold",
    fontSize: 80,
  },
});

const block2 = StyleSheet.create({
  c2:{
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: window_height,
  },
});

//add navigation to other pages

export default function HomePage() {

  

  loadFonts();
  const circle_size = get_circle_size()

  return (
    <ScrollView style={parent_styles.wrap_all}>
      
      <header style={h.head}>
        <View style={h.wrapper}>
          
          <SvgLogo style={h.logo}></SvgLogo>
          
          <View style={h.nav_text_c}>
              <Text style={h.nav_text}>About</Text>
              <Text style={h.nav_text}>Resources</Text>
              <Text style={h.nav_text}>Contact Us</Text>
          </View>

          <View style={h.b_c}>
            <TouchableOpacity activeOpacity={0.7}>
              <Link href="./pages/loginPage">
                <LogInBtnSvg style={h.b2}/>
              </Link>
            </TouchableOpacity>
            <TouchableOpacity onPress={SignUpBtnSvg.onPress} activeOpacity={0.7}>
              <Link href="./pages/signup">
                <SignUpBtnSvg style={h.b1}/>
              </Link>
            </TouchableOpacity>
          </View>

          
        </View>       
      </header>


      <View style={block1.wrapper}>
        <View style={block1.c1}>
          <Animated.View style={[block1.gradient_container, {opacity: pulsate_gradiant()}]}>
          <Svg style={block1.gradient}>
            <Defs>
              <RadialGradient id="grad" cx="50%" cy="50%" rx="50%" ry="50%" fx="50%" fy="50%">
                <Stop offset="0%" stopColor="#307D55"/>
                <Stop offset="100%" stopColor="#181818"/>
              </RadialGradient>
            </Defs>
            <Circle cx="50%" cy="50%" r = {circle_size} fill="url(#grad)"/> 
          </Svg>  
          </Animated.View>
          <Text style={block1.c1_w_text}>Control</Text>
          <Text style={block1.c1_g_text}>Your</Text>
          <Text style={block1.c1_w_text}>Finances</Text>
        </View>
      </View>


      <View style={block2.c2}>
        <Text style={block1.c1_g_text}>Testing Text</Text>
      </View>

      <Jumper></Jumper>
    </ScrollView>

    
  );
}

//loading fonts to be used on the hompage
function loadFonts() {
  const [font_loaded] = useFonts({
    "spaceGroteskBold": require("./../assets/fonts/SpaceGrotesk-Bold.otf"),
  });

  if (!font_loaded){
    return <AppLoading/> //some tag, ================look up definition=================
  } else {
    return font_loaded;
  }

}

//animates through changing opacity
function pulsate_gradiant() {
  const pulse_animate = useRef(new Animated.Value(0)).current;

  //attributes for the animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse_animate, {
          toValue: 1,
          duration: 2500,
          easing: Easing.inOut(Easing.ease), 
          useNativeDriver: true,
        }),
        Animated.timing(pulse_animate, {
          toValue: 0,
          duration: 2500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true, 
        }),
      ])
    ).start();
  }, [pulse_animate]);

  //insertion of animation through opacity change
  return pulse_animate.interpolate({
    inputRange: [0, .4],
    outputRange: [0.1, .4]
  });
}

function get_circle_size() {
  if (window_height > window_width) {
    return (window_width * 0.4)/2;
  } else {
    return (window_height * 0.8)/2;
  }
}


//debug button css