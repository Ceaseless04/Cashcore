/*
  The page will be organized in the way that each container could be considered as blocks stack on top of one another.
  Each block will take up the space of the screen.
  All blocks are wraped up by a parent container, where its only job is to allign all given blocks



*/

import React from "react";
import { Text, View, StyleSheet, ScrollView, Dimensions } from "react-native";

import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";


//store window height and width
const window_height = Dimensions.get("window").height;

const parent_styles = StyleSheet.create({
  wrap_all: { //center piece of the page
    flex: 1,
    backgroundColor: "#181818",
    flexDirection: "column",
  },
});

//the first container on top
const block1 = StyleSheet.create({
  wrapper: { //the "Control Your Finances"
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: window_height,
  },
  c1: { //should hold the text
    width: "50%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
  }, 
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

export default function HomePage() {

  const loaded_fonts = loadFonts();

  return (
    <ScrollView style={parent_styles.wrap_all} pagingEnabled>
      
      <View style={block1.wrapper}>
        <View style={block1.c1}>
          <Text style={block1.c1_w_text}>Control</Text>
          <Text style={block1.c1_g_text}>Your</Text>
          <Text style={block1.c1_w_text}>Finances</Text>
        </View>
      </View>

      <View style={block2.c2}>
        <Text style={block1.c1_g_text}>Testing Text</Text>
      </View>

    </ScrollView>
  );
}

//loading fonts to be used on the hompage
function loadFonts() {
  const [font_loaded] = useFonts({
    "spaceGroteskBold": require("./../../assets/fonts/SpaceGrotesk-Bold.otf"),
  });

  if (!font_loaded){
    return <AppLoading/> //some tag, ================look it up later=================
  } else {
    return font_loaded;
  }

}