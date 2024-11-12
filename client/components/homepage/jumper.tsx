import React, { useState, useRef } from 'react';
import { View, Text, PanResponder, Animated, StyleSheet } from 'react-native';

import { Link } from "expo-router";

export default function DebugRouter() {

  return (
    <View style={styles.container}>
      <View style={styles.inner_wrapper}>
        <Text style={styles.text}>Links to Other Files:</Text>
        <Link href="/pages/loginPage"> Login Page </Link>
        <Link href="/pages/signup"> Sign Up Page </Link>
        <Link href="/pages/dashboard"> Dash Board</Link>
      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: "relative",
  },
  inner_wrapper: {
    width: 200,
    height: 200,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

