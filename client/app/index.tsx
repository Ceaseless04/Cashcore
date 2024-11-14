/*
  The page will be organized in the way that each container could be considered as blocks stack on top of one another.
  Each block will take up the space of the screen.
  All blocks are wraped up by a parent container, where its only job is to allign all given blocks

  Tomorrow: Work on Block 2

*/

import React, { useRef, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, Dimensions, Animated, Easing, TouchableOpacity } from "react-native";




import { Svg, RadialGradient, Defs, Stop, Circle, Pattern, Rect } from "react-native-svg";
import SvgLogo from "./../assets/homepage/img/final-brand-logo.svg"; //works, but showing as errors on VSCode
import SignUpBtnSvg from "./../assets/homepage/img/get-started.svg"; //works, but showing as errors on VSCode
import LogInBtnSvg from "./../assets/homepage/img/login.svg";
import GradCapSvg from "./../assets/homepage/img/graduate-cap.svg";

import Jumper from "./../components/homepage/jumper";
import GradientText from "./../components/homepage/grdnt_txt";
import SignUpStep from "./../components/homepage/sgn_up_steps";

import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";


//store window height and width
const window_height = Dimensions.get("window").height; //an idea would be to have h*w and then have this be the main measurement tool for all containers including text
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
    fontFamily: "inter",
    fontSize: 18,
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
    fontSize: 100,
  },
  c1_g_text: { //the green used within the text
    color: "#27CE78",
    textAlign: "center",
    fontFamily: "spaceGroteskBold",
    fontSize: 100,
  },
});

const block2 = StyleSheet.create({
  c2:{
    alignItems: "center",
    width: "100%",
    height: window_height,
  },
  mission_c:{
    paddingTop: window_width * 0.06,
    paddingLeft: window_width * 0.04,
    paddingRight: window_width * 0.04,
    paddingBottom: window_width * 0.02,
    marginTop: window_width * 0.06,
    width: window_width,
    height: window_height/2,
  },
  m_text:{
    color: "#4cb086",
    textAlign: "center",
    fontFamily: "inter",
    fontSize: 15,
  },
  ff_text_c:{
    color: "#ffffff",
    textAlign: "center",
    fontFamily: "inter",
    fontSize: 48,
    fontWeight: "600",
    paddingLeft: window_width * 0.01,
    paddingRight: window_width * 0.01,
    paddingTop: window_width * 0.01,
    paddingBottom: window_width * 0.004,
  },
  prpt_text_c:{
    color: "#ffffff",
    textAlign: "center",
    fontFamily: "inter",
    fontSize: 15,
    paddingRight: window_width * 0.3,
    paddingLeft: window_width * 0.3,
  },
  rotator_c:{
  }
});

// for the "Built with College Students in Mind" strip
//===========repeating background
const mini_block_2_5 = StyleSheet.create({
  container:{
    justifyContent: "center",
    width: window_width,
    height: window_height * 0.26,
    marginTop: window_width * 0.09,
    marginBottom: window_width * 0.09,
    padding: window_width * 0.03,
    backgroundColor: "#1aa47b"
  },
  bg: {
    ...StyleSheet.absoluteFillObject,
    width: window_width,
    height: window_height * 0.26,
  },
  title: {
    color: "#ffffff",
    textAlign: "center",
    paddingBottom: window_width * 0.005,
    fontFamily: "inter",
    fontSize: 48,
    fontWeight: "600",
    textShadowColor: "rgba(255, 255, 255, 1",
    textShadowOffset: {width: 100, height: 100},
  },
  prompt:{
    color: "#ffffff",
    textAlign: "center",
    fontFamily: "inter",
    fontSize: 15,
    paddingLeft: window_width * 0.33,
    paddingRight: window_width * 0.33,
  }
});

const block3 = StyleSheet.create({
  container:{
    width: window_width,
    height: window_height,
    justifyContent: "center",
  },
  steps_cont:{
    width: window_width,
    height: window_height * 0.5, 

  },
  title:{
    width: window_width,
    height: window_height * 0.2,
    justifyContent: "center",
  },
  number_cont:{
    flexDirection: "row",
  },
  plans_wrapper:{
    width: window_width,
    height: (window_height * 0.5),
    justifyContent: "center", 
    paddingTop: 40,
  },
  plan_title:{
    width: window_width,
    textAlign: "center",
    fontFamily: "inter",
    fontSize: 13, 
    color: "#ffffff",
    marginTop: 40,
  },
  plan_cont:{
    flexDirection: "row",
    justifyContent: "center",
    width: window_width,
    height: (window_height * 0.5) - 13,
  },
  free_block_wrapper:{
    padding: 20,
  },
  free_block:{
    width: window_width * 0.2085,
    height: (window_height * 0.24) - 13,
    borderRadius: 12, 
  },
  paid_block_wrapper:{
    padding: 20,
  },
  paid_block:{
    width: window_width * 0.2085,
    height: (window_height * 0.24) - 13,
    borderRadius: 12,
  },


  plan_type_text:{
    color: "#ffffff",
    fontFamily: "inter",
    fontSize: 24,
    paddingBottom: 7,
  },
  plan_type_desc:{
    color: "#e9e9e9",
    fontFamily: "inter",
    fontSize: 14,
  },
  plan_cost_text:{
    color: "#ffffff",
    fontFamily: "inter",
    fontSize: 24,
  },
  dash:{
    color: "#ffffff",
    fontFamily: "inter",
    fontSize: 24,
    textAlign: "right",
  },
  top_plan_block:{
    width: window_width * 0.2085,
    height: ((window_height * 0.24) - 13) * 0.5,
    padding: 25,
  },
  bottom_plan_block:{
    width: window_width * 0.2085,
    height: ((window_height * 0.24) - 13) * 0.5,
    padding: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});

//block 4
const block4 = StyleSheet.create({
  container:{
    width: window_width,
    height: window_height,
  },
});

//block 5 final block and the skeleton will be finally done

//add navigation to other pages

export default function HomePage() {

  load_fonts();
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
            <Circle cx="50%" cy="50%" r={circle_size} fill="url(#grad)"/> 
          </Svg>  
          </Animated.View>
          <Text style={block1.c1_w_text}>Control</Text>
          <Text style={block1.c1_g_text}>Your</Text>
          <Text style={block1.c1_w_text}>Finances</Text>
        </View>
      </View>


      <View style={block2.c2}>
        <View style={block2.mission_c}>
            <Text style={block2.m_text}>Our Mission</Text>
            <Text style={block2.ff_text_c}>Financial Freedom Starts Here!</Text>
            <Text style={block2.prpt_text_c}>We believe money management is a crucial topic that is not covered enough in our schools, leaving individuals uninformed.  
              We aim to offer the tools needed for you to successfully manage personal finances.
            </Text>
        </View>
        <View style={block2.rotator_c}>
          <Text style={block1.c1_g_text}>Rotate Objects Here</Text>
        </View>
      </View>


      <View style={mini_block_2_5.container}>
        <Svg style={mini_block_2_5.bg}>
          <Pattern id="grad-pat" x="0" y="0" patternUnits="userSpaceOnUse" width="75" height="67">
            <GradCapSvg/>
          </Pattern>
          <Rect x="0" y="0" width={window_width} height={window_height * 0.26} fill="url(#grad-pat)"/>
        </Svg>
        <Text style={mini_block_2_5.title}>Built with College Students in Mind</Text>
        <Text style={mini_block_2_5.prompt}>
          We understand that managing finances in college can be overwhelming, 
          which is why we created Cash Core. Our tools and resources are tailored to meet the unique challenges of student life, 
          enabling you to take control of your finances and build a secure future!
        </Text>
      </View>


      <View style={block3.container}>
        <View style={block3.steps_cont}>
          <View style={block3.title}>
            <GradientText
              text="Ready to Invest in Your Success?"
              text_size={60}
              colors={["#299f62", "#4db088"]}
              text_weight="600"
            />
          </View>
          <View style={block3.number_cont}>
            <SignUpStep
              value={1}
              prompt_title="Sign up"
              prompt="Create an account to gain access to our tools!"
            />
            <SignUpStep
              value={2}
              prompt_title="Link your bank"
              prompt="Connect your bank account so we can provide accurate analytics."
            />
            <SignUpStep
              value={3}
              prompt_title="Choose a plan"
              prompt="Select a plan to unlock analytics that empower you to make informed decisions."
            />
            <SignUpStep
              value={4}
              prompt_title="Own your financial future"
              prompt="Take charge of your journey with personalized tools to achieve your goals!"
            />
          </View>
        </View>        
        <View style={block3.plans_wrapper}>
          <Text style={block3.plan_title}>CHOOSE YOUR PLAN:</Text>
          <View style={block3.plan_cont}>
            <View style={block3.free_block_wrapper}>
              <LinearGradient colors={["#7e7e7e", "#a6a2a2"]} start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}} style={block3.free_block}>
                <View style={block3.top_plan_block}>
                  <Text style={block3.plan_type_text}>Free</Text>
                  <Text style={block3.plan_type_desc}>Gain access to the basic insights and tools.</Text>
                </View>
                <View style={block3.bottom_plan_block}>
                  <Text style={block3.plan_cost_text}>$0/month</Text>
                  <Text style={block3.dash}>&gt;</Text>
                </View>
              </LinearGradient>
            </View>
            <View style={block3.paid_block_wrapper}>
              <LinearGradient colors={["#299f62", "#4db088"]} start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}} style={block3.paid_block}>
                <View style={block3.top_plan_block}>
                  <Text style={block3.plan_type_text}>Premium</Text>
                  <Text style={block3.plan_type_desc}>Unlock all the features and insights</Text>
                </View>
                <View style={block3.bottom_plan_block}>
                  <Text style={block3.plan_cost_text}>$6.99/month</Text>
                  <Text style={block3.dash}>&gt;</Text>
                </View>
              </LinearGradient>
            </View>
          </View>
        </View>
      </View>


      <View style={block4.container}>
        <Text style={block1.c1_g_text}>Block4 Start</Text>
      </View>

      <Jumper></Jumper>
    </ScrollView>

    
  );
}

//loading fonts to be used on the hompage
function load_fonts() {
  const [font_loaded] = useFonts({
    "inter": require("./../assets/fonts/InterVariable.ttf"),
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
          duration: 2560,
          easing: Easing.inOut(Easing.ease), 
          useNativeDriver: true,
        }),
        Animated.timing(pulse_animate, {
          toValue: 0,
          duration: 2560,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true, 
        }),
      ])
    ).start();
  }, [pulse_animate]);

  //insertion of animation through opacity change
  return pulse_animate.interpolate({
    inputRange: [0, .4],
    outputRange: [0, .4]
  });
}

function get_circle_size() {
  if ((window_height * 0.8) > (window_width * 0.4)) {
    return (window_width * 0.4)/2;
  } else {
    return (window_height * 0.8)/2;
  }
}


//debug button css