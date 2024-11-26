import { View, Text, StyleSheet } from "react-native";
import BudgetWidget from "@/components/budget/budgetWidget";
import colorPalette from "../utils/colors";

const Budget = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentWrapper}>
        <BudgetWidget />
      </View>
    </View>
  );
};

export default Budget;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colorPalette.dark,
  },
  contentWrapper: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {},
});
