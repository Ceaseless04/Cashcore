import React, { useRef, useEffect } from "react";
import { Animated, View, StyleSheet, Dimensions } from "react-native";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

const window_height = Dimensions.get("window").height; //an idea would be to have h*w and then have this be the main measurement tool for all containers including text
const window_width = Dimensions.get("window").width; 

// git rid of padding and center with alignContents and justifyContents center

const master_measure = Math.sqrt(window_height * window_width); 

interface Props {
    component_array: React.ReactNode[]; //generic components array
    carousel_width: number;
    carousel_height: number;
}

const s = StyleSheet.create({
    rotator_container:{
        flexDirection: "row",
      },
      rotator_object_container:{ //division by 4 as that is the amount of objects in rotation
        width: window_width * .25,
        height: Math.round(window_height * 0.5) - 1,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
      },
      rotator_object_wrapper:{
        width: Math.round(master_measure * .3162),
        height: "100%",
      }
});

type Horsee = [Animated.AnimatedInterpolation<number>, Animated.AnimatedInterpolation<number>]; //pretending this is a struct

export default function Carousel({component_array, carousel_width, carousel_height} : Props) {

    const comp_arr_size: number = component_array.length;
    
    
    
    var curr_opcaity: number[] = [0, 0.5, 1, 0.5];

    let horsee_arr: Horsee[] = Array.from({length: comp_arr_size}, ()=> [new Animated.Value(0), new Animated.Value(0)]);

    //get the return of the two animations (for opcaity and right) and make curr_pos = new_pos
    var relative_pos = carousel_width - (s.rotator_object_container.width);
    var coeffiecent: number = -0.5; 
    for(var i: number = 0; i < horsee_arr.length; ++i){
        //determine initial opacity
        var start_opacity: number = 0;
        if(i < curr_opcaity.length){
            start_opacity = curr_opcaity[i];
        }

        //determine initial position
        var start_pos: number = relative_pos * coeffiecent;

        horsee_arr[i] = move(start_pos, start_opacity, comp_arr_size);
        coeffiecent += 0.5;
    }

    //for debugging
    // let colors: string[] = ["#dd2020", "#2020dd", "#dddd20", "#20dd20"];

    //build animated views
    let animated_views: React.ReactNode[] = Array.from({length: comp_arr_size}, ()=> <Animated.View/>);
    for(var i: number = 0; i < animated_views.length; ++i){
        animated_views[i] =  <Animated.View key={i} style={[s.rotator_object_container, {right: horsee_arr[i][0]}, {opacity: horsee_arr[i][1]}]}>{component_array[i]}</Animated.View>;
    }

    return (
        <View style={[s.rotator_container, {width: carousel_width, height: carousel_height}]}>      
            {animated_views}  
        </View>
    );
    

    
    
}

//call function to get new pos() for animation
//call function to get new opacity () for opacity

//we will make right = this
function move(initial_pos: number, initial_opacity: number, comp_arr_size: number){
    
    //get center and outsides
    const outside_left = (window_width - (window_width * .25)) * 1.5;
    const center = (window_width - (window_width * .25)) * 0.5;
    const outside_right = (window_width - (window_width * .25)) * -0.5;

    var curr_pos: number = initial_pos;
    var curr_opacity: number = initial_opacity;
    //helper function determining positions
    
    function get_new_pos() {
        curr_pos += center;
        
        return curr_pos;
    }

    function reallign() {
        if (curr_pos >= outside_left + (center * (comp_arr_size - 4) / 2)){ //resizable, will add one more slot to the end
            return curr_pos = outside_right;
        }

        return curr_pos
    }

    

    //helper functions determining opacities
    function get_new_opacity(){
        if (curr_pos == center) {
            curr_opacity = 1; 
        } else if ((curr_pos < center && curr_pos > outside_right) || (curr_pos > center && curr_pos < outside_left)){
            curr_opacity = 0.5;
        } else {
            curr_opacity = 0;
        }

        return curr_opacity;
    }
    
    //pass in animation objects as references to increase lifetimes when creating animations within loop
    const new_anim_move = useRef(new Animated.Value(curr_pos)).current;
    const new_anim_opacity = useRef(new Animated.Value(curr_opacity)).current;

    //build our sequence
    let anim_sequence: Animated.CompositeAnimation[] = Array.from({length: comp_arr_size * 2}, ()=> Animated.delay(1000));

    for(var i: number = 0; i < (comp_arr_size * 2) - 1; ++i){
        if((i + 2) % 2 == 0){
            anim_sequence[i] =  Animated.parallel([
                                    Animated.timing((new_anim_move), { //part of parallel array
                                        toValue: get_new_pos(), 
                                        duration: 2000,
                                        useNativeDriver: false,
                                    }),
                                    Animated.timing((new_anim_opacity), {
                                        toValue: get_new_opacity(),
                                        duration: 2000,
                                        useNativeDriver: false,
                                    }),
                                ]);
            console.log("I: move", i);
        } else {
            anim_sequence[i] = Animated.timing((new_anim_move), {
                                toValue: reallign(),
                                duration: 1000,
                                useNativeDriver: false,
                              });

            console.log("I: delay", i);                
        }
    }
    console.log("This is running");

    //curr_pos middle, opacity is 1 
    //curr_pos not in middle but is between 1 and 4 opcaity is 0.5
    //curr_pos < 1 or curr_pos > 4 opacity is 0
    
    //wrapping in useEffect means...
    useEffect(() => {Animated.loop(Animated.sequence(anim_sequence)).start()}, [anim_sequence]); //... making sure this is called per parent (move()) function call
    
    //inserting 
    return ([
        new_anim_move.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        }),
        new_anim_opacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        }),
    ]) as Horsee;

  }
