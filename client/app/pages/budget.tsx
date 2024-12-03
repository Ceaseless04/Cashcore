import { View, StyleSheet } from 'react-native';
import BudgetWidget from '@/components/budget/budgetWidget';
import { useState } from 'react';
import colorPalette from "../utils/colors";

export default function Budget() {
  const [totalBudget, setTotalBudget] = useState(4000);
  const currentSavings = 3020;

  const handleBudgetUpdate = (newBudget: number) => {
    setTotalBudget(newBudget);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentWrapper}>
        <BudgetWidget 
          totalBudget={totalBudget} 
          currentSavings={currentSavings} 
          onBudgetUpdate={handleBudgetUpdate}
        />
      </View>
    </View>
  );
}

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
