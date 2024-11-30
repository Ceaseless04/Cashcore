import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

function deleteaccount() {
  const [password, setPassword] = useState("");
  return (
    <>
      <View style={StyleSheet.absoluteFillObject}>
        <DeleteBackground/>
      </View>
      <View style={styles.container}>
        <View>
          <Text style={styles.headingText}>Delete Account</Text>
        </View>
        <View style={styles.deleteContainer}>
          <Text
            style={[
              styles.text,
              { fontWeight: "800", marginBottom: "10%", fontSize: 15, marginTop: "3%" },
            ]}
          >
            Are you sure you want to delete your account?
          </Text>
          <Text style={[styles.text]}>
            This action will result in all your data being permanently deleted.
          </Text>
          <Text style={[styles.text, { marginBottom: "6%" }]}>
            There will be no way to recover it!
          </Text>
          <Text style={[styles.text, { marginBottom: "18%" }]}>
            All of your expenses, income and associated transactions will be
            deleted. You will no longer have access to your insights, account or
            any related information.{" "}
          </Text>
          <Text
            style={[
              styles.text,
              { textDecorationLine: "underline", marginBottom: "2%", fontWeight: "500" },
            ]}
          >
            This action is final and cannot be undone.
          </Text>
          <Text style={[styles.text, { marginBottom: "6%" }]}>
            Enter your password to confirm the deletion of your account.
          </Text>
          <View style={[styles.form]}>
            <TextInput
              style={[styles.input, {marginBottom: "18%"}]}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter password"
              placeholderTextColor="#D9D9D9"
              secureTextEntry={true} // This will mask the text with dots
            />
            <TouchableOpacity style={[styles.btn, { marginBottom: "5%" }]}>
              <Text style={[{ color: "white", fontWeight: "600" }]}>Yes, Delete Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: "#979797", marginBottom: "5%" }]}
            >
              <Text style={[{ color: "white", fontWeight: "600"}]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 17,
    height: "100%",
  },
  headingText: {
    color: "white",
    fontSize: 38,
    fontWeight: "600",
  },
  deleteContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "33%",
    paddingHorizontal: "4%",
    paddingVertical: "2%",
    borderRadius: 8,
    alignContent: "center",
    flexWrap: "wrap",
    backgroundColor: 'rgba(24, 24, 24, 0.50)',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 3 }, 
    shadowOpacity: 0.4, 
    shadowRadius: 7, 
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 13,
    fontWeight: "400",
  },
  form: {
    width: "70%",
  },
  btn: {
    alignItems: "center",
    backgroundColor: "#9F2929",
    width: "100%",
    paddingVertical: "4%",
    paddingHorizontal: "4%",
    borderRadius: 9,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 4,
  },
  gradient: {
    borderRadius: 5,
    overflow: "hidden",
  },

  input: {
    width: "100%",
    borderColor: "#979797",
    borderWidth: 1,
    borderRadius: 9,
    paddingHorizontal: "6%",
    paddingVertical: "2.5%",
    color: "#fff",
  },
});

const DeleteBackground = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 100% 100%"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_847_757)">
      <rect width="100%" height="1024" fill="#181818" />
      <g filter="url(#filter0_f_847_757)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M284.269 482.418C367.391 470.71 466.694 473.31 520.016 538.133C571.916 601.228 518.76 692.328 523.997 773.853C529.986 867.077 614.349 972.025 552.383 1041.94C490.758 1111.46 377.152 1046.61 284.269 1044.32C195.715 1042.13 94.8747 1088.32 29.0998 1028.99C-37.5565 968.873 -31.452 862.2 -15.5975 773.853C-2.40257 700.326 53.169 648.412 106.742 596.346C159.158 545.403 211.886 492.613 284.269 482.418Z"
          fill="#793E1C"
        />
      </g>
      <g filter="url(#filter1_f_847_757)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M898.555 172.25C959.164 237.398 899.737 341.113 917.656 428.252C934.615 510.725 1023.04 576.992 998.333 657.465C970.503 748.094 883.92 813.641 792.073 837.218C698.408 861.261 588.856 847.222 518.766 780.568C455.058 719.983 476.669 619.21 470.626 531.528C466.02 464.705 465.237 401.921 488.335 339.06C519.867 253.249 539.703 147.48 624.401 113.039C714.41 76.438 832.352 101.091 898.555 172.25Z"
          fill="#A96E5A"
        />
      </g>
      <g filter="url(#filter2_f_847_757)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1164.62 -59.9858C1248.61 -60.6757 1331.86 -36.191 1392.94 21.554C1455.73 80.9149 1496.54 163.823 1492.76 250.218C1489.11 333.646 1432.29 400.197 1373.77 459.681C1314.65 519.772 1248.77 580.081 1164.62 583.745C1077.68 587.531 987.98 548.943 936.448 478.723C889.501 414.751 919.229 329.607 919.851 250.218C920.465 171.959 891.554 86.6775 940.004 25.2737C991.61 -40.1301 1081.38 -59.3023 1164.62 -59.9858Z"
          fill="#A83B48"
        />
      </g>
      <g filter="url(#filter3_f_847_757)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1139.04 560.369C1204.72 550.331 1268.57 573.251 1324.48 609.156C1399.68 657.453 1497.12 705.46 1503.76 794.592C1510.5 885.151 1424.41 952.139 1354.31 1009.86C1292.39 1060.84 1219.09 1099.88 1139.04 1094.88C1063.07 1090.13 1007.4 1033.48 949.089 984.544C881.799 928.075 766.95 881.271 781.213 794.592C795.848 705.655 927.355 707.684 1002.77 658.321C1051.43 626.471 1081.55 569.154 1139.04 560.369Z"
          fill="#B60A09"
        />
      </g>
      <g filter="url(#filter4_f_847_757)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M370.347 -58.3704C449.521 -65.5294 528.93 -49.5133 592.761 -2.13066C667.867 53.6205 764.075 128.557 745.719 220.271C727.275 312.424 591.162 308.788 518.583 368.498C460.1 416.61 444.679 514.587 370.347 529.079C289.644 544.814 212.249 494.365 150.304 440.3C83.0777 381.624 8.96806 309.178 16.5349 220.271C23.8951 133.792 116.632 88.4561 184.82 34.7555C241.332 -9.74988 298.704 -51.8925 370.347 -58.3704Z"
          fill="#6B1815"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_f_847_757"
        x="-426"
        y="77"
        width="1401"
        height="1397"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="200"
          result="effect1_foregroundBlur_847_757"
        />
      </filter>
      <filter
        id="filter1_f_847_757"
        x="68.0352"
        y="-303.78"
        width="1334.63"
        height="1551.96"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="200"
          result="effect1_foregroundBlur_847_757"
        />
      </filter>
      <filter
        id="filter2_f_847_757"
        x="510"
        y="-460"
        width="1383"
        height="1444"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="200"
          result="effect1_foregroundBlur_847_757"
        />
      </filter>
      <filter
        id="filter3_f_847_757"
        x="380"
        y="158"
        width="1524.13"
        height="1337.31"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="200"
          result="effect1_foregroundBlur_847_757"
        />
      </filter>
      <filter
        id="filter4_f_847_757"
        x="-384"
        y="-460"
        width="1532"
        height="1392"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="200"
          result="effect1_foregroundBlur_847_757"
        />
      </filter>
      <clipPath id="clip0_847_757">
        <rect width="100%" height="1024" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default deleteaccount;
