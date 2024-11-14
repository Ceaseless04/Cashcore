import React from 'react';
import Svg, { Text as SvgText, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';

interface GradientTextProps {
  text: string;
  text_size: number;
  text_weight: string;
  colors: [string, string]; // Tuple for two gradient colors
}

export default function GradientText({text, colors, text_size, text_weight} : GradientTextProps): JSX.Element {
  
    //react native is so great we need to convert the text into an svg just so we could actually use it as a gradient
    return (   
        <Svg height="100%" width="100%">
        <Defs>
            <SvgLinearGradient id="txt-grad" x1="0" y1="0.5" x2="1" y2="0.5">
            <Stop offset="0%" stopColor={colors[0]} stopOpacity="1" />
            <Stop offset="100%" stopColor={colors[1]} stopOpacity="1" />
            </SvgLinearGradient>
        </Defs>
        <SvgText
            fill="url(#txt-grad)"
            fontFamily='inter'
            fontWeight={text_weight}
            fontSize={text_size}
            x="50%"
            y="50%"
            textAnchor="middle"
        >
            {text}
        </SvgText>
        </Svg>
    );


}



