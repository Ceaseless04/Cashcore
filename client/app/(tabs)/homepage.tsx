import { Text, View, StyleSheet, ScrollView, Dimensions } from "react-native";


const window_height = Dimensions.get("window").height;


const styles = StyleSheet.create({
  wrap_all: { //center piece of the page
    flex: 1,
    backgroundColor: "#181818",
    flexDirection: "column",
  },
  container_1: { //the "Control Your Finances"
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: window_height,
  },
  container_2:{
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: window_height,
  },
  w_text: { //form white text
    color: "#ffffff",
  },
  g_text: { //the green used within the text
    color: "#27CE78"
  },
});


export default function Index() {
  return (
    <ScrollView style={styles.wrap_all} pagingEnabled>
      <View style={styles.container_1}>
        <Text style={styles.w_text}>Control</Text>
        <Text style={styles.g_text}>Your</Text>
        <Text style={styles.w_text}>Finances</Text>
      </View>
      <View style={styles.container_2}>
        <Text style={styles.w_text}>Testing Text</Text>
      </View>
    </ScrollView>
  );
}
