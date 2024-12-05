import { 
  SpaceGrotesk_700Bold,
  useFonts as useSpaceGroteskFonts 
} from '@expo-google-fonts/space-grotesk';
import {
  Inter_400Regular, 
  Inter_500Medium, 
  Inter_700Bold,
  Inter_300Light,
  useFonts as useInterFonts
} from '@expo-google-fonts/inter';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import SvgLogo from "../../assets/homepage/img/signup-login-logo.svg";

export default function loginPage() {
  const [username, SetUserName] = useState("");
  const [password, SetPassword] = useState("");
  const [errors, setErrors] = useState({});

  const onLoginButtonPress = () => {
    let errors = {};

    if (!username) errors.username = "Username is required!";
    if (!password) errors.password = "Password is required!";

    //validation here

    setErrors(errors); //if invalid user login attempt

    return Object.keys(errors).length === 0;
  };

  const [spaceGroteskLoaded] = useSpaceGroteskFonts({
    SpaceGrotesk_700Bold,
  });

  const [interLoaded] = useInterFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
    Inter_300Light,
  });

  return (
    <>
      <View style ={StyleSheet.absoluteFillObject}>
        <BackGround></BackGround>
      </View>
      
      <View style={styles.view}>
        
      

        {/**
         * fancy text thing on the left container
         */}
        <View style={{ flex: 1 }}>
          <Text style={styles.bigTextLeft}>
            Control <br />
            <Text style={{ color: "#27CE78" }}>Your</Text>
            <br />
            Finances
            <br />
          </Text>
        </View>
        

        {/**
         * Log In page View container
         */}
        <View style={styles.container}>

            <View style={styles.title}>
              <SvgLogo></SvgLogo>
            </View>

          {/**
           * The h3 tag will have a check for if the use has been on the platform before, if the user has been on before, it will say welcome back, otherwise just say Create a new account
           */}
          <View >
            <Text style = {styles.welcomeBack}>
              Welcome Back!
            </Text>
          </View>

          <View style={styles.inputContainer}>

            {
              //indication of error for username TextInput
              errors.username ? (
                <Text style={styles.error}>{errors.username}</Text>
              ) : null
            }
            <TextInput
              style={styles.inputFields}
              placeholderTextColor={"#979797"}
              textContentType="username"
              placeholder="UserName"
              value={username}
              onChangeText={SetUserName}
            ></TextInput>

            {
              //error indication for password TextInput
              errors.password ? (
                <Text style={styles.error}>{errors.password}</Text>
              ) : null
            }
            <TextInput
              style={styles.inputFields}
              placeholderTextColor="#979797"
              textContentType="password"
              placeholder="Password"
              value={password}
              onChangeText={SetPassword}
              secureTextEntry={true}
            ></TextInput>
            <View style={styles.links}>
              <a
                style={{color: "#979797"}}
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              >
                Forgot Password?
              </a>
            </View>

            {/**
                Login Button
              */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.Button}
                onPress={onLoginButtonPress}
              >
                <Text style={{ fontSize: 24, color: "white" }}>Log In</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.links}>
              <Text
              style={{color: "#979797", 
                fontSize: 18,}}>
                Don't have an account?
                </Text>
            <a
              style={{color: "#979797"}}
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            >
              Sign up now
            </a>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  outerContainer:{ 
    backgroundColor:"#181818",
    flex:1,
  },

  view: {
    flexDirection: "row",
    margin: "auto",
    justifyContent: "center",
    width: "80%",
    height: "85%",      
    flexShrink: 0,
    textAlign: "center",
    gap: 80,
  },

  bigTextLeft: {
    fontSize: 70,
    margin: "auto",
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontFamily:"SpaceGrotesk_700Bold",
  },

  container: {
    flex: 1,
    flexShrink: 0,
    color: "white",
    textAlign: "center",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: "rgba(70, 70, 70, .64)",
    paddingVertical: "15%",
    padding: 0,
    marginRight: "5%",
    minWidth:"45%",
    borderRadius: 20,
    shadowColor:"#171717",
    shadowOpacity:0.2,
    shadowOffset:{width: 2, height: 2},
    shadowRadius:9,
  },

  title: {
    color:"white",
    textAlign: "center",
    fontSize: 56,
    fontWeight: 700,
    //paddingTop:"5%",
  },

  welcomeBack:{
    color:"white",
    fontSize:32,
    paddingTop:"15%",
    fontFamily:"Inter_700Bold",
    // shadowColor:"#171717",
    // shadowOpacity:0.5,
    // shadowOffset:{width: 0, height: 2},
    // shadowRadius:9,
    // textAlign: "center", 
    // paddingTop: "5%",
  },

  inputFields: {
    height: "5%",
    width: "100%",
    color:"#979797",
    marginVertical: "5%",
    borderRadius: 4,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#979797",
    borderStyle: "solid",
    fontSize: 18,
    fontFamily:"Inter_400Regular",
    paddingLeft: 10,
    paddingVertical: "4%",
  },

  links: {
    marginTop: "5%",
    marginBottom: "5%",
    fontSize: 18,
    width:"100%",
    alignItems:"flex-start",
    fontFamily:"Inter_300Light"
  },

  inputContainer: {
    //backgroundColor:"red",
    width: "60%",
    justifyContent:"center",
    alignItems:"center",
    //paddingBottom: "20%",
  },

  buttonContainer:{
    width:"100%",
  },

  Button: {
    fontFamily:"Inter_500Medium",
    marginVertical: "2%",
    paddingVertical: "1%",
    borderRadius: 4,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    backgroundColor:
      "linear-gradient(86deg, rgba(41,159,98,1) 0%, rgba(77,176,136,1) 100%)",
    alignItems: "center",
    shadowColor:"#171717",
    shadowOpacity:0.2,
    shadowOffset:{width: 2, height: 2},
    shadowRadius:9,
  },

  error: {
    color: "#CE277D",
    fontSize: 18,
  },
});

const BackGround = () =>(

  <svg width="100%" height="100%" viewBox="0 0 100% 100%" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_480_38)">
            <g clipPath="url(#clip0_480_38)">
              <rect width="120%" height="100%" fill="#181818" />
              <g filter="url(#filter1_f_480_38)">
                <path fillRule="evenodd" clipRule="evenodd" d="M284.269 482.418C367.391 470.71 466.694 473.31 520.016 538.133C571.916 601.228 518.76 692.328 523.997 773.853C529.986 867.077 614.349 972.025 552.383 1041.94C490.758 1111.46 377.152 1046.61 284.269 1044.32C195.715 1042.13 94.8747 1088.32 29.0998 1028.99C-37.5565 968.873 -31.452 862.2 -15.5975 773.853C-2.40257 700.326 53.169 648.412 106.742 596.346C159.158 545.403 211.886 492.613 284.269 482.418Z" fill="#6DB154" />
              </g>
              <g filter="url(#filter2_f_480_38)">
                <path fillRule="evenodd" clipRule="evenodd" d="M898.555 172.25C959.164 237.398 899.737 341.113 917.656 428.252C934.615 510.725 1023.04 576.992 998.333 657.465C970.503 748.094 883.92 813.641 792.073 837.218C698.408 861.261 588.856 847.222 518.766 780.568C455.058 719.983 476.669 619.21 470.626 531.528C466.02 464.705 465.237 401.921 488.335 339.06C519.867 253.249 539.703 147.48 624.401 113.039C714.41 76.438 832.352 101.091 898.555 172.25Z" fill="#5AA8A9" />
              </g>
              <g filter="url(#filter3_f_480_38)">
                <path fillRule="evenodd" clipRule="evenodd" d="M1164.62 -59.9858C1248.61 -60.6757 1331.86 -36.191 1392.94 21.554C1455.73 80.9149 1496.54 163.823 1492.76 250.218C1489.11 333.646 1432.29 400.197 1373.77 459.681C1314.65 519.772 1248.77 580.081 1164.62 583.745C1077.68 587.531 987.98 548.943 936.448 478.723C889.501 414.751 919.229 329.607 919.851 250.218C920.465 171.959 891.554 86.6775 940.004 25.2737C991.61 -40.1301 1081.38 -59.3023 1164.62 -59.9858Z" fill="#299F62" />
              </g>
              <g filter="url(#filter4_f_480_38)">
                <path fillRule="evenodd" clipRule="evenodd" d="M1139.04 560.369C1204.72 550.331 1268.57 573.251 1324.48 609.156C1399.68 657.453 1497.12 705.46 1503.76 794.592C1510.5 885.151 1424.41 952.139 1354.31 1009.86C1292.39 1060.84 1219.09 1099.88 1139.04 1094.88C1063.07 1090.13 1007.4 1033.48 949.089 984.544C881.799 928.075 766.95 881.271 781.213 794.592C795.848 705.655 927.355 707.684 1002.77 658.321C1051.43 626.471 1081.55 569.154 1139.04 560.369Z" fill="#4DB088" />
              </g>
              <g filter="url(#filter5_f_480_38)">
                <path fillRule="evenodd" clipRule="evenodd" d="M370.347 -58.3704C449.521 -65.5294 528.93 -49.5133 592.761 -2.13066C667.867 53.6205 764.075 128.557 745.719 220.271C727.275 312.424 591.162 308.788 518.583 368.498C460.1 416.61 444.679 514.587 370.347 529.079C289.644 544.814 212.249 494.365 150.304 440.3C83.0777 381.624 8.96806 309.178 16.5349 220.271C23.8951 133.792 116.632 88.4561 184.82 34.7555C241.332 -9.74988 298.704 -51.8925 370.347 -58.3704Z" fill="#328A68" />
              </g>
            </g>
            <rect x="0.5" y="0.5" width="110%" height="1024" stroke="black" />
          </g>
          <defs>
            <filter id="filter0_d_480_38" x="-4" y="0" width="110%" height="1032" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_480_38" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_480_38" result="shape" />
            </filter>
            <filter id="filter1_f_480_38" x="-426" y="77" width="110%" height="1397" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="200" result="effect1_foregroundBlur_480_38" />
            </filter>
            <filter id="filter2_f_480_38" x="68.0352" y="-303.78" width="110%" height="1551.96" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="200" result="effect1_foregroundBlur_480_38" />
            </filter>
            <filter id="filter3_f_480_38" x="510" y="-460" width="110%" height="1444" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="200" result="effect1_foregroundBlur_480_38" />
            </filter>
            <filter id="filter4_f_480_38" x="380" y="158" width="110%" height="1337.31" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="200" result="effect1_foregroundBlur_480_38" />
            </filter>
            <filter id="filter5_f_480_38" x="-384" y="-460" width="110%" height="1392" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="200" result="effect1_foregroundBlur_480_38" />
            </filter>
            <clipPath id="clip0_480_38">
              <rect width="100%" height="1024" fill="white" />
            </clipPath>
          </defs>
        </svg>

);