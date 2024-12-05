import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ImageBackground,
  } from "react-native";
  import { ForgotPassword } from "@/components/forgotpassword/ForgotPassword";
  import { ForgotPasswordNumber } from "@/components/forgotpassword/ForgotPasswordNumber";
  import { SetNewPassword } from "@/components/forgotpassword/SetNewPassword";
  import { Success } from "@/components/forgotpassword/Success";
  


  export default function forgotPasswordPage(){
    return(
        <>
        <ImageBackground
            source={require("../../depreciated/assets/images/bg gradient.png")}
            resizeMode="cover"
            style={{ width: "100%" }}
        ></ImageBackground>

        <View 
            style={styles.view}
        >   
            {/* <ForgotPassword></ForgotPassword>  */}
            {/* <ForgotPasswordNumber></ForgotPasswordNumber> */}
            <SetNewPassword> </SetNewPassword>
            {/* <Success> </Success> */}

        </View>


     <View style={styles.view}></View> 
        
        </>
    )



  }    
  
    const styles = StyleSheet.create({
        view: {
            width: "100%",
            flexDirection: "row",
            margin: "auto",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 1,
            textAlign: "center",
            gap: 100,
          },
        

    })
