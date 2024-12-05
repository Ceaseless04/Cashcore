import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import BudgetWidget from '@/components/budget/budgetWidget';
import SavingsWidget from '@/components/budget/savingsWidget';
import PaymentsWidget, { Payment } from '@/components/budget/paymentsWidget';
import PerformanceWidget, { performanceData } from '@/components/budget/performanceWidget';
import colorPalette from "../utils/colors";

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
  ];

  const performanceData: performanceData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Income',
        data: [2000, 2500, 2000, 2800, 2200, 1800, 2400, 3000, 1800, 2200, 2600, 2400],
        backgroundColor: '#27CE78',
        borderRadius: 5,
      },
      {
        label: 'Expense',
        data: [-1500, -1800, -2200, -1900, -1600, -1500, -2000, -2200, -1400, -1800, -1900, -1600],
        backgroundColor: '#4DD0E1',
        borderRadius: 5,
      },
    ],
  };

  const handleBudgetUpdate = (newBudget: number) => {
    setTotalBudget(newBudget);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.widgetContainer}>
        <BudgetWidget 
          totalBudget={totalBudget}
          currentSavings={currentSavings} 
          onBudgetUpdate={handleBudgetUpdate}
        />
      </View>
      <View style={styles.widgetContainer}>
        <SavingsWidget savingsGoals={savingsGoals}/>
      </View>
      <View style={styles.widgetContainer}>
        <PaymentsWidget upcomingPayments={upcomingPayments}/>
      </View>
      <View style={styles.widgetContainer}>
        <PerformanceWidget performanceData={performanceData} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "flex-start",
    backgroundColor: colorPalette.dark,
    gap: 20,
  },
  widgetContainer: {
    width: '45%',
    maxWidth: 340,
    aspectRatio: 1,
  },
  text: {},
});
