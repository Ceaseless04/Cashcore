import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Link } from "expo-router";

function deleteaccount() {
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const goToHome = () => {
    navigation.navigate("index"); // Replace 'Home' with your homepage screen name
  };

  return (
    <>
      <View style={StyleSheet.absoluteFillObject}>
        <DeleteBackground />
      </View>
      <View style={styles.container}>
        <View>
          <Text style={styles.headingText}>Account Deleted</Text>
        </View>
        <View style={styles.deleteContainer}>
          <CheckMark />
          <Text style={styles.innerTitle}>We’re sad to see you go!</Text>
          <Text style={styles.text}>
            Your CashCore account and all your data have been permanently
            deleted.{" "}
          </Text>
          <View style={[styles.form]}>
            <TouchableOpacity style={[styles.btn]}>
              <Text
                onPress={goToHome}
                style={[{ color: "white", fontWeight: "600" }]}
              >
                Homepage
              </Text>
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
    gap: 27,
    height: "100%",
  },
  headingText: {
    color: "white",
    fontSize: 45,
    fontWeight: "600",
  },
  deleteContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    paddingHorizontal: "4%",
    paddingVertical: "2%",
    borderRadius: 8,
    alignContent: "center",
    flexWrap: "wrap",
    backgroundColor: "rgba(24, 24, 24, 0.50)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 7,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 13,
    fontWeight: "400",
    marginBottom: "15%",
  },
  form: {
    width: "85%",
  },
  btn: {
    alignItems: "center",
    width: "100%",
    paddingVertical: "4%",
    paddingHorizontal: "4%",
    borderRadius: 9,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    backgroundColor: "#979797",
    marginBottom: "30%",
  },
  gradient: {
    borderRadius: 5,
    overflow: "hidden",
  },
  checkmark: {
    marginTop: "15%",
    marginBottom: "10%",
  },
  innerTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: "6%",
    color: "white",
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

const CheckMark = () => (
  <svg
    style={styles.checkmark}
    width="112"
    height="112"
    viewBox="0 0 112 112"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M56 0C70.8521 0 85.0959 5.89998 95.598 16.402C106.1 26.9041 112 41.1479 112 56C112 70.8521 106.1 85.0959 95.598 95.598C85.0959 106.1 70.8521 112 56 112C41.1479 112 26.9041 106.1 16.402 95.598C5.89998 85.0959 0 70.8521 0 56C0 41.1479 5.89998 26.9041 16.402 16.402C26.9041 5.89998 41.1479 0 56 0ZM49.024 67.048L36.584 54.6C36.138 54.154 35.6086 53.8003 35.0259 53.5589C34.4432 53.3176 33.8187 53.1933 33.188 53.1933C32.5573 53.1933 31.9328 53.3176 31.3501 53.5589C30.7674 53.8003 30.238 54.154 29.792 54.6C28.8913 55.5007 28.3853 56.7223 28.3853 57.996C28.3853 59.2697 28.8913 60.4913 29.792 61.392L45.632 77.232C46.0767 77.6802 46.6057 78.036 47.1886 78.2788C47.7714 78.5216 48.3966 78.6466 49.028 78.6466C49.6594 78.6466 50.2846 78.5216 50.8674 78.2788C51.4503 78.036 51.9793 77.6802 52.424 77.232L85.224 44.424C85.6759 43.9799 86.0355 43.4507 86.2818 42.8669C86.5282 42.2832 86.6566 41.6564 86.6595 41.0228C86.6625 40.3892 86.5399 39.7612 86.299 39.1752C86.0581 38.5892 85.7035 38.0566 85.2557 37.6083C84.8079 37.16 84.2758 36.8048 83.6901 36.5632C83.1043 36.3215 82.4765 36.1983 81.8429 36.2005C81.2093 36.2027 80.5824 36.3303 79.9983 36.576C79.4143 36.8217 78.8847 37.1806 78.44 37.632L49.024 67.048Z"
      fill="white"
    />
  </svg>
);

export default deleteaccount;