/*
  The page will be organized in the way that each container could be considered as blocks stack on top of one another.
  Each block will take up the space of the screen.
  All blocks are wraped up by a parent container, where its only job is to allign all given blocks

  still having a slight inaccuracy with calculating font sizes
  need to determine with lost or gain value by when rounding

  //working on rotator 

  notes:::::
  //change value of string to number instead from SummaryCard component

  GOTO jumper.tsx TO ADD NEW LINKS TO NEW PAGES FOR FASTER TRAVERSAL

*/

import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView, Dimensions, Animated, Easing, TouchableOpacity } from "react-native";
import { TextInput } from 'react-native-gesture-handler';

import { Svg, Pattern, Rect } from "react-native-svg";

import SvgLogo from "./../assets/homepage/img/final-brand-logo.svg"; //works, but showing as errors/warnings
import GradCapSvg from "./../assets/homepage/img/graduate-cap.svg";
import MailIconSvg from "./../assets/homepage/img/mail-icon.svg";

import Jumper from "./../components/homepage/jumper";
import GradientText from "./../components/homepage/grdnt_txt";
import SignUpStep from "./../components/homepage/sgn_up_steps";
import PulsateCir from "./../components/homepage/pulsate_cir";
import Carousel from "./../components/homepage/carousel";
import BorderGrdntBtn from "./../components/homepage/gradient_border";
import TransactionCard from "./../components/homepage/dashboard_mod/transactions_card";
import SavingsCard from "./../components/homepage/dashboard_mod/savings_card";
import BudgetMeter from "./../components/homepage/dashboard_mod/budget_meter";
import { SummaryCard } from "./../components/homepage/dashboard_mod/summary_card";
import UpcomingPaymentCard from "./../components/homepage/budget_mod/upcoming_payments_card";
import PerformanceCard from "./../components/homepage/budget_mod/monthy_chart";

import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";


//store window height and width
const window_height = Dimensions.get("window").height; //an idea would be to have h*w and then have this be the main measurement tool for all containers including text
const window_width = Dimensions.get("window").width;

const master_measure = Math.sqrt(window_height * window_width); 

//debug
// console.log("Win_H: ", window_height);
// console.log("Win_W: ", window_width);
// console.log("Win_Added: ", window_width * .049);


const parent_styles = StyleSheet.create({
  wrap_all: { //center piece of the page
    flex: 1,
    backgroundColor: "#181818",
    flexDirection: "column",
  },
  centering_all:{
    justifyContent: "center",
    alignItems: "center",
    
  }
});

const h = StyleSheet.create({
  head: {
    width: window_width, 
    height: "auto",
  },
  wrapper: {
    width: window_width,
    height: "auto",
    padding: ratio(20),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    width: Math.round(master_measure * 0.2588),
    height: Math.round(master_measure * 0.0560),
  },
  nav_text_c: {
    width: window_width - (Math.round(master_measure * 0.2588) * 2) - (ratio(20) * 2),
    flexDirection: "row", 
    height: "auto",
    justifyContent: "center",

  },
  nav_text:{
    color: "#ffffff",
    paddingLeft: "2%",
    paddingRight: "2%",
    fontFamily: "inter",
    fontSize: Math.round(master_measure * 0.0132),
  },
  b_c: {
    flexDirection: "row",
    justifyContent: "center",
    width: Math.round(master_measure * 0.2588),
    height: "auto",
  },
  signup_login_text: {
    fontFamily: "inter",
    fontSize: Math.round(master_measure * 0.0132),
    textAlign: "center",
    color: "#ffffff",

  },
  login_btn: {
    paddingRight: Math.round(master_measure * 0.015),
  },
  signup_text: {
    fontFamily: "inter",
  },
}); 

//the first container on top
const block1 = StyleSheet.create({
  wrapper: { //the "Control Your Finances"
    justifyContent: "center",
    alignItems: "center",
    width: window_width,
    height: window_height - (window_height * 0.2),
  },
  //wrap around text and gradient
  c1: {
    width: window_width,
    height: window_height - (window_height * 0.2),
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
    fontSize: Math.round(master_measure * 0.0824),
  },
  c1_g_text: { //the green used within the text
    color: "#27CE78",
    textAlign: "center",
    fontFamily: "spaceGroteskBold",
    fontSize: Math.round(master_measure * 0.0824),
  },
});

const block2 = StyleSheet.create({
  c2:{
    alignItems: "center",
    width: window_width,
    height: window_height,
  },
  mission_c:{
    width: window_width,
    height: window_height * 0.5,
    paddingTop: Math.round(master_measure * 0.1),
    // marginTop: Math.round(master_measure * 0.2026) - 1,
  },
  m_text:{
    color: "#4cb086",
    textAlign: "center",
    fontFamily: "inter",
    fontSize: Math.round(master_measure * 0.0124) - 1,
  },
  ff_text_c:{
    width: window_width,
    height: Math.round(master_measure * 0.074),
    color: "#ffffff",
    fontFamily: "inter",
    fontSize: Math.round(master_measure * 0.0395) - 1,
    fontWeight: "600",
    textAlign: "center",
    alignSelf: "center",
    paddingTop: Math.round(master_measure * 0.0169) - 1,
    paddingBottom: Math.round(master_measure * 0.0067) - 1,
  },
  prpt_text_c:{
    width: Math.round(master_measure * 0.5723),
    height: Math.round(master_measure * 0.0500),
    color: "#ffffff",
    textAlign: "center",
    fontFamily: "inter",
    fontSize: Math.round(master_measure * 0.0124),
    alignSelf: "center",
    // paddingRight: Math.round(master_measure * 0.5855) - 1,
    // paddingLeft: Math.round(master_measure * 0.5855) - 1,
  },


  //set wrapper from the outside to fit into carousel seats
  rotator_object_wrapper:{
    width: Math.round(master_measure * .3162),
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  }
});

// for the "Built with College Students in Mind" strip
//===========repeating background
const mini_block_2_5 = StyleSheet.create({
  container:{
    justifyContent: "center",
    width: window_width,
    height: Math.round(master_measure * 0.2141),
    marginTop: Math.round(master_measure * 0.1519),
    marginBottom: Math.round(master_measure * 0.1519),
    backgroundColor: "#1aa47b"
  },
  bg: {
    ...StyleSheet.absoluteFillObject,
    width: window_width,
    height: Math.round(master_measure * 0.2141),
  },
  title: {
    color: "#ffffff",
    textAlign: "center",
    paddingBottom: Math.round(master_measure * 0.0084),
    fontFamily: "inter",
    fontSize: Math.round(master_measure * 0.0395),
    fontWeight: "600",
    textShadowColor: "rgba(255, 255, 255, 1",
    textShadowOffset: {width: 100, height: 100},
  },
  prompt:{
    width: Math.round(master_measure * 0.4769),
    height: Math.round(master_measure * 0.0652),
    color: "#ffffff",
    textAlign: "center",
    fontFamily: "inter",
    fontSize: Math.round(master_measure * 0.0124),
    alignSelf: "center",
    
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
    paddingTop: Math.round(master_measure * 0.0330),
  },
  plan_title:{
    width: window_width,
    textAlign: "center",
    fontFamily: "inter",
    fontSize: Math.round(master_measure * 0.0107), 
    color: "#ffffff",
    marginTop: Math.round(master_measure * 0.0330),
  },
  plan_cont:{
    flexDirection: "row",
    justifyContent: "center",
    width: window_width,
    height: (window_height * 0.5) - Math.round(master_measure * 0.0107),
  },
  free_block_wrapper:{
    padding: Math.round(master_measure * 0.0247),
  },
  free_block:{
    width: Math.round(master_measure * 0.3516),
    height: Math.round(master_measure * 0.1787),
    borderRadius: Math.round(master_measure * 0.010), 
  },
  paid_block_wrapper:{
    padding: Math.round(master_measure * 0.0247),
  },
  paid_block:{
    width: Math.round(master_measure * 0.3516),
    height: Math.round(master_measure * 0.1787),
    borderRadius: Math.round(master_measure * 0.0100),
  },


  plan_type_text:{
    color: "#ffffff",
    fontFamily: "inter",
    fontSize: Math.round(master_measure * 0.0198),
    paddingBottom: Math.round(master_measure * 0.0058),
  },
  plan_type_desc:{
    color: "#e9e9e9",
    fontFamily: "inter",
    fontSize: Math.round(master_measure * 0.0115),
  },
  plan_cost_text:{
    color: "#ffffff",
    fontFamily: "inter",
    fontSize: Math.round(master_measure * 0.0198),
  },
  dash:{
    color: "#ffffff",
    fontFamily: "inter",
    fontSize: Math.round(master_measure * 0.0198),
    textAlign: "right",
  },
  top_plan_block:{
    width: Math.round(master_measure * 0.3516),
    height: (Math.round(master_measure * 0.1787)) * 0.5,
    padding: Math.round(master_measure * 0.0206),
  },
  bottom_plan_block:{
    width: Math.round(master_measure * 0.3516),
    height: (Math.round(master_measure * 0.1787)) * 0.5,
    padding: Math.round(master_measure * 0.0206),
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
  top_container:{
    width: window_width,
    height: window_height * 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  plus_text:{
    fontFamily: "inter",
    fontSize: ratio(20),
    fontWeight: 500,
    color: "#ffffff",
    marginTop: -ratio(60),
  },


  bottom_container:{
    width: window_width,
    height: window_height * 0.8,
    marginTop: ratio(100),
    flexDirection: "row",
  },
  upcoming_container:{
    width: window_width * 0.5,
    height: window_height * 0.8,
    flexDirection: "row",
    justifyContent: "flex-end",
    left: ratio(200),
  },
  performance_container:{
    width: window_width * 0.5,
    height: window_height * 0.8,
    flexDirection: "row",
    justifyContent: "flex-start",
    top: ratio(70),
    right: ratio(150), 
  },
  title:{
    fontFamily: "inter",
    fontSize: ratio(24), 
    color: "#ffffff",
    paddingLeft: ratio(20),

  },
  subtitle:{
    fontFamily: "inter",
    fontSize: ratio(13), 
    color: "#979797",
    paddingLeft: ratio(20),
  },
  
});

//block 5 final block and the skeleton will be finally done
const block5 = StyleSheet.create({
  container:{
    width: window_width,
    height: window_height,
  },
  bg: {
    ...StyleSheet.absoluteFillObject,
    width: window_width,
    height: window_height,
  },
  cta_wrapper:{
    width: window_width,
    height: window_height * 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  cta_cont:{
    width: Math.round(master_measure * 0.675),
    height: Math.round(master_measure * 0.2165),
    borderRadius: Math.round(master_measure * 0.0132),
    paddingTop: Math.round(master_measure * 0.0330),
    paddingLeft: Math.round(master_measure * 0.065),
    paddingRight: Math.round(master_measure * 0.065),
    paddingBottom: Math.round(master_measure * 0.0330),
  },
  cta_txt1:{
    fontFamily: "inter",
    fontSize: Math.round(master_measure * 0.0131),
    paddingBottom: Math.round(master_measure * 0.0082) - 1,
    color: "#ffffff",
  },
  cta_txt2:{
    fontFamily: "inter",
    fontSize: Math.round(master_measure * 0.038),
    fontWeight: "600",
    color: "#ffffff",
  },
  cta_txt3:{
    fontFamily: "inter",
    fontSize: Math.round(master_measure * 0.0107),
    color: "#ffffff",
  },  
  cta_btn_cont:{
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  start_btn:{
    width: master_measure * 0.0930,
    height: master_measure * 0.0321,
    borderRadius: master_measure * 0.0082,
    backgroundColor: "#ffffff",
    justifyContent: "center",
  },
  start_txt:{
    fontFamily: "inter",
    fontSize: master_measure * 0.0131,
    textAlign: "center",
    color: "#2da167",
  },
  lrn_mo_btn:{
    width: master_measure * 0.0930,
    height: master_measure * 0.0321,
    borderRadius: master_measure * 0.0082,
    borderColor: "#ffffff",
    borderWidth: master_measure * 0.0012,
    justifyContent: "center",
    marginLeft: master_measure * 0.0124, 
  },
  lrn_mo_txt:{
    fontFamily: "inter",
    fontSize: master_measure * 0.0131,
    textAlign: "center",
    color: "#ffffff",
  },
  news_letter_container:{
    width: window_width,
    height: window_height * 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  news_letter_wrapper:{
    width: window_width,
    height: Math.round(master_measure * 0.3203),
    backgroundColor: "#222222",
    justifyContent: "center",
    alignItems: "center",
  },
  news_letter_content_container:{
    width: Math.round(master_measure * 0.3920),
    height: Math.round(master_measure * 0.3203),
  },
  mail_icon:{
    position: "absolute",
    width: Math.round(master_measure * 0.0955),
    height: Math.round(master_measure * 0.0766),
    top: Math.round(master_measure * 0.0766),
    left: Math.round(master_measure * -0.0371),
  },
  news_letter_text_container:{
    width: Math.round(master_measure * 0.3920),
    height: Math.round((master_measure * 0.3203) * 0.55) - 1,
    justifyContent: "flex-end",
  },
  join_text:{
    fontFamily: "inter",
    fontSize: Math.round(master_measure * 0.0296),
    fontWeight: "bold",
    color: "#ffffff",
  },
  subby_wubby_prompt:{
    fontFamily: "inter",
    fontSize: Math.round(master_measure * 0.0115),
    color:"#ffffff",
  },
  sublimal_container:{
    width: Math.round(master_measure * 0.3920),
    height: Math.round((master_measure * 0.3203) * 0.45) - 1,
    paddingTop: Math.round(master_measure * 0.02) - 1,
    flexDirection: "row",
  },
  email_text_box:{
    width: Math.round(master_measure * 0.1878),
    height: Math.round(master_measure * 0.0305),
    borderColor: "#1aa47b",
    borderWidth: Math.round(master_measure * 0.00122),
    borderTopLeftRadius: Math.round(master_measure * 0.0082),
    borderBottomLeftRadius: Math.round(master_measure * 0.0082),
    fontFamily: "inter",
    fontSize: Math.round(master_measure * 0.0115),
    padding: Math.round(master_measure * 0.0107) - 1,
    color: "#dddddddd",
  },
  subscribble_btn:{
    width: Math.round(master_measure * 0.0889),
    height: Math.round(master_measure * 0.0305),
    backgroundColor: "#1aa47b",
    borderTopRightRadius: Math.round(master_measure * 0.0082),
    borderBottomRightRadius: Math.round(master_measure * 0.0082),
    justifyContent: "center",
    alignContent: "center",
  }, 
  slubcrybo_text:{
    fontFamily: "inter",
    fontSize: Math.round(master_measure * 0.0115),
    color: "#ffffff",
    textAlign: "center",
  },
});

const f = StyleSheet.create({
  f_container:{
    width: window_width,
    height: ratio(300),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  links_container:{
    width: ratio(492),
    height: ratio(91),
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center", 

  },
  logo_container:{
    width: ratio(111) + 2,
    height: ratio(29) + 2,
  },
  text:{ 
    fontFamily: "inter",
    color: "#ffffff",
    fontSize: ratio(13),
    textAlign: "center",

  },
  copyright_container:{
    width: ratio(492),
    height: ratio(59),
    justifyContent: "center",
    alignItems: "center",

  },
});
//add navigation to other pages

export default function HomePage() {

  //storing email
  const [email, set_email] = useState<string>("");

  load_fonts();

  //array of items for carousel
  const component_array = [
    <View style={block2.rotator_object_wrapper}>
      <SummaryCard
        title={"Monthly Income"}
        percentage={0}
        value="$2000"
      />
      <SummaryCard
        title={"Monthly Income"}
        percentage={.18}
        value={"$4200"}
      />
      <SummaryCard
        title={"Monthly Expenses"}
        percentage={-.1}
        value={"$690"}
      />
    </View>,

    <View style={block2.rotator_object_wrapper}>
      <TransactionCard/>
    </View>,

    <View style={block2.rotator_object_wrapper}>
      <SavingsCard/>
    </View>,
    <View style={block2.rotator_object_wrapper}>
      <BudgetMeter/>
    </View>,
  ];

  return (
    <ScrollView style={parent_styles.wrap_all}>
    <View style={parent_styles.centering_all}>
      
      <View style={h.head}>
        <View style={h.wrapper}>
          
          <SvgLogo style={h.logo}></SvgLogo>
          
          <View style={h.nav_text_c}>
              <Text style={h.nav_text}>About</Text>
              <Text style={h.nav_text}>Resources</Text>
              <Text style={h.nav_text}>Contact Us</Text>
          </View>

          <View style={h.b_c}>
            <Link href="./pages/loginPage">
              <TouchableOpacity style={h.login_btn} activeOpacity={0.7}>
                <BorderGrdntBtn
                    w={Math.round(master_measure * 0.0618)}
                    h={Math.round(master_measure * 0.0354)}
                    border_radius={Math.round(master_measure * 0.0082)}
                    border_weight={Math.round(master_measure * 0.0012)}
                    color={["#299f62", "#4db088"]}
                    text="Login"
                    text_style={h.signup_login_text}
                    bg_color={parent_styles.wrap_all.backgroundColor}
                  />  
              </TouchableOpacity>
            </Link>
            <Link href="./pages/signup">
              <TouchableOpacity activeOpacity={0.7}>
                <BorderGrdntBtn
                    w={Math.round(master_measure * 0.0758)}
                    h={Math.round(master_measure * 0.0354)}
                    border_radius={Math.round(master_measure * 0.0082)}
                    border_weight={Math.round(master_measure * 0.0012)}
                    color={["#299f62", "#4db088"]}
                    text="Sign Up"
                    text_style={h.signup_login_text}
                    bg_color={"transparent"}
                  />  
              </TouchableOpacity>
            </Link>
          </View>

          
        </View>       
      </View>


      <View style={block1.wrapper}>
        <View style={block1.c1}>
          <PulsateCir win_width={window_width} win_height={window_height}/>
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
        <Carousel
          component_array={component_array}
          carousel_width={window_width}
          carousel_height={block2.c2.height * 0.5}
        />
      </View>


      <View style={mini_block_2_5.container}>
        <Svg style={mini_block_2_5.bg}>
          <Pattern id="grad-pat" x="0" y="0" patternUnits="userSpaceOnUse" width="75" height="67">
            <GradCapSvg/>
          </Pattern>
          <Rect x="0" y="0" width={window_width} height={Math.round(master_measure * 0.2141)} fill="url(#grad-pat)"/>
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
              text_size={Math.round(master_measure * 0.0494)}
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
        <PulsateCir win_width={window_width} win_height={window_height}/>
        
        <View style={block4.top_container}>
          <View style={{width: window_width, height: window_height * .2, marginBottom: 20}}>
            <GradientText
                text="+2,000"
                text_size={ratio(100)}
                colors={["#299f62", "#4db088"]}
                text_weight="600"
              />
            </View>
            <Text style={block4.plus_text}>Students are already using Cash Core to budget better.</Text>
        </View>

        <View style={block4.bottom_container}>
          <View style={block4.upcoming_container}>
            <UpcomingPaymentCard/>
            <View>
              <Text style={block4.title}>Keep Track of any upcoming payments</Text>
              <Text style={block4.subtitle}>Stay on top of payments and steer clear of late fees.</Text>
            </View>
          </View>

          <View style={block4.performance_container}>
            <PerformanceCard/>
            <View>
              <Text style={block4.title}>View your monthly budget</Text>
              <Text style={block4.subtitle}>Get an idea of where you're at for the month.</Text>
            </View>
          </View>
        
        </View>

        
      </View>


      <View style={block5.container}>
        
        <Svg style={block5.bg}>
          <Pattern id="b5-grad-pat" x="0" y="0" patternUnits="userSpaceOnUse" width="75" height="67">
            <GradCapSvg/>
          </Pattern>
          <Rect x="0" y="0" width={window_width} height={window_height} fill="url(#b5-grad-pat)"/>
        </Svg>
        
        <View style={block5.cta_wrapper}>
          <LinearGradient colors={["#299f62", "#4db088"]} start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}} style={block5.cta_cont}>
            <Text style={block5.cta_txt1}>Sign Up Now</Text>
            <Text style={block5.cta_txt2}>Ready to Elevate Your Future?</Text>
            <Text style={block5.cta_txt3}>Join now to start navigating your cash with confidence.</Text>
            <View style={block5.cta_btn_cont}>
                <Link href={"/pages/signup"}>
                  <TouchableOpacity style={block5.start_btn} activeOpacity={0.7}>
                    <Text style={block5.start_txt}>Get Started</Text>
                  </TouchableOpacity>
                </Link>
              <TouchableOpacity style={block5.lrn_mo_btn} activeOpacity={0.7}>
                <Text style={block5.lrn_mo_txt}>Learn More</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        <View style={block5.news_letter_container}>
          <View style={block5.news_letter_wrapper}>
              <View style={block5.news_letter_content_container}>
                <MailIconSvg style={block5.mail_icon}/>
                <View style={block5.news_letter_text_container}>
                  <Text style={block5.join_text}>Join Our Newsletter!</Text>
                  <Text style={block5.subby_wubby_prompt}>Subscribe to receive updates with the latest insights, tips, and alerts.</Text>
                </View>
                <View style={block5.sublimal_container}>
                    <TextInput
                      style={block5.email_text_box}
                      value={email} //something is happening here
                      onChangeText={(text) => set_email(text)}
                      placeholder="Email address" 
                      keyboardType="email-address"
                    />
                    <TouchableOpacity style={block5.subscribble_btn} activeOpacity={0.7} onPress={() => store_email(email)}>
                      <Text style={block5.slubcrybo_text}>Subscribe</Text>
                    </TouchableOpacity>
                </View>
              </View>
          </View>
        </View>

      </View>

      <View style={f.f_container}>
        <View style={f.links_container}>
          <View>
            <SvgLogo style={{width: ratio(111), height: ratio(29)}}/>
          </View>
          
          <Text style={f.text}>Privacy Policy</Text>
          
          <Text style={f.text}>FAQ</Text>
        
          <Text style={f.text}>Contact Us</Text>
          
        </View>

        <View style={f.copyright_container}>
          <Text style={f.text}>©CashCore 2024. All rights reserved.</Text>
        </View> 


      </View>

      <Jumper></Jumper>

    </View>
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

//storing email to be used for backend
function store_email(email: string) {
  console.log(email);
  //here we validate the email 
  //and communicate with the backend

}

//determining size of items dependent on user screen size
function ratio(val: number) : number{

  var result: number = 0;
  var og_ratio: number = Math.sqrt(1440 * 1024);
  result = val / og_ratio;
  result = master_measure * result;
  
  return Math.round(result);

}