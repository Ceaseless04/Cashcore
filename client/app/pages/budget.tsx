import { View, StyleSheet } from 'react-native';
import BudgetWidget from '@/components/budget/budgetWidget';
import { useState } from 'react';
import colorPalette from "../utils/colors";

export default function Budget() {
  const [totalBudget, setTotalBudget] = useState(4000); //This is just a placeholder value 
  
  const currentSavings = 3020; // This is just a placeholder value replace with API I think, and add useState for this

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
