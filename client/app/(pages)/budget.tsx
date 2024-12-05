import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import BudgetWidget from '@/components/budget/budgetWidget';
import SavingsWidget from '@/components/budget/savingsWidget';
import PaymentsWidget from '@/components/budget/paymentsWidget';
import colorPalette from "../utils/colors";
import { Payment } from '@/components/budget/budgetWidget';

export default function Budget() {
  const [totalBudget, setTotalBudget] = useState(4000); //This is just a placeholder value 
  const currentSavings = 3020; // This is just a placeholder value replace with API I think, and add useState for this

  const savingsGoals =  [
    { title: 'House Downpayment', current: 3200, goal: 5000 },
    { title: 'Emergency Fund', current: 24, goal: 75 },
    { title: 'New laptop', current: 253, goal: 2000 },
    { title: 'Investments', current: 45, goal: 150 },
  ];

  const upcomingPayments: Payment[] = [
    { title: 'Wifi', amount: 65, status: 'pending' },
    { title: 'Rent', amount: 1750, status: 'pending' },
    { title: 'Utilities', amount: 200, status: 'paid' },
    { title: 'Gym Membership', amount: 45, status: 'pending' },
  ]

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
        <SavingsWidget savingsGoals={savingsGoals}/>
        <PaymentsWidget upcomingPayments={upcomingPayments}/>
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
