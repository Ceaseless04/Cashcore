import React, {useRef, useEffect} from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import { Svg, Defs, RadialGradient, Stop, Circle } from "react-native-svg";



interface CirProps{
    win_width: number;
    win_height: number;
}

const s = StyleSheet.create({
    grad_wrapper:{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        position: "absolute",
    },
    grad_cont:{
        width: "100%", 
        height: "100%",
    },
});

export default function PulsateCir({win_width, win_height} : CirProps){

    const cir_size = get_cir_size(win_width, win_height);

    return (
        <Animated.View style={[s.grad_wrapper, {opacity: pulsate_gradiant()}]}>
          <Svg style={s.grad_cont}>
            <Defs>
              <RadialGradient id="grad" cx="50%" cy="50%" rx="50%" ry="50%" fx="50%" fy="50%">
                <Stop offset="0%" stopColor="#307D55"/>
                <Stop offset="100%" stopColor="#181818"/>
              </RadialGradient>
            </Defs>
            <Circle cx="50%" cy="50%" r={cir_size} fill="url(#grad)"/> 
          </Svg>  
        </Animated.View>
    );
}



function get_cir_size(ww: number, wh: number){
    if ((wh * 0.8) > (ww * 0.4)) {
        return (ww * 0.4)/2;
      } else {
        return (wh * 0.8)/2;
      }
}

function pulsate_gradiant() {
    //useRef = mutable reference 
    // Animated.Value(0) = gives the value of 0 tp be interpolated through later 
    //current = unwraps the refernce and gets the new object inside
    const pulse_animate = useRef(new Animated.Value(0)).current;
  
    //attributes for the animation
    useEffect(() => {
      Animated.loop(
        //loop takes array sequence as an args
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
      ).start(); //start loop
    }, [pulse_animate]);
  
    //insertion of animation through opacity change
    return pulse_animate.interpolate({
      inputRange: [0, 0.4],
      outputRange: [0, 0.4]
    });
  }