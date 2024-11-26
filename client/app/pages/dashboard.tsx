import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { BalanceContainer } from "@/components/dashboard/BalanceContainer";
import { Widget } from "@/components/dashboard/Widget";
import colorPalette from "../utils/colors";
import { boxShadowForContainers } from "../utils/dashboardContainerBoxShadow";
import ProfileModal from "@/components/modals/profileModal";

const dummyBudget: ListItem[] = [{ name: "House Down Payment", amount: 2281 }];

const dummyMonthlySub: ListItem[] = [
  { name: "Spotify", amount: 5.99, date: "Oct 16, 2:00pm" },
];

const dummyTransactions: ListItem[] = [
  { name: "Check", amount: 8000, date: "Oct 16, 2:00pm" },
  { name: "Chick-Fil-A", amount: -22.68, date: "Oct 19, 7:48pm" },
  { name: "Check", amount: 8000, date: "Oct 16, 2:00pm" },
  { name: "Check", amount: 8000, date: "Oct 16, 2:00pm" },
  { name: "Check", amount: 8000, date: "Oct 16, 2:00pm" },
];

interface ListItem {
  name: string;
  amount: number;
  date?: string;
}

export default function Dashboard(): JSX.Element {
  const [budgetList, setBudgetList] = useState<ListItem[]>(dummyBudget);
  const [monthlySubscription, setMonthlySubscription] =
    useState<ListItem[]>(dummyMonthlySub);
  const [transactions, setTransactions] =
    useState<ListItem[]>(dummyTransactions);

  return (
    <View style={styles.dashboardContainer}>
      <View style={styles.navContainer}>
        {/*temporary delete this later*/}
        <ProfileModal firstName="Pepe" lastName="The Frog" username="donaldtrump47" phoneNumber="3056994020" email="greatestPresident@gmail.com"/>
      </View>
      <View style={styles.contentWrapper}>
        <View style={styles.topContainer}>
          <View style={styles.summaryContainers}>
            <BalanceContainer balance={50000} />
            <SummaryCard
              title="Monthly Income:"
              percentage={0.18}
              value="$4200"
            />
            <SummaryCard
              title="Monthly Expenses:"
              percentage={-0.1}
              value="$690"
            />
          </View>

          <View style={styles.cashFlowContainer}>
            <Text style={styles.cashFlowText}>Cash Flow</Text>
            <View style={styles.cashFlowChart}>
              <Text style={styles.cashFlowChartText}>Cash Flow Chart</Text>
            </View>
          </View>
        </View>

        <View style={styles.widgetContainer}>
          <Widget
            widgetTitle="Budgets"
            widgetAddButtonTitle="Add Budget"
            setWidgetList={setBudgetList}
            list={budgetList}
            showAddButton
            showSavings
          />
          <Widget
            widgetTitle="Monthly Subscriptions"
            setWidgetList={setMonthlySubscription}
            list={monthlySubscription}
            showDate
          />
          <Widget
            widgetTitle="Transactions"
            setWidgetList={setTransactions}
            list={transactions}
            transactionAnalysis
            showDate
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dashboardContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: colorPalette.dark,
  },
  contentWrapper: {
    minWidth: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingBottom: 25,
    gap: 20,
    //backgroundImage: `radial-gradient(circle, rgba(40, 206, 120, .6) 5%, rgba(24, 24, 24, .8) 34%, rgba(24,24,24, .7) 130%)`,
  },
  navContainer: {
    // Temporary until Navbar is implemented
    flex: 1,
    alignItems: "center",
  },
  navButton: {
    // Temporary Delete this later.
    backgroundColor: "grey",
    borderRadius: 10,
    padding: 4,
  },
  navText: {
    // Temporary Delete this later.
    color: colorPalette.light,
    fontSize: 20,
  },
  widgetContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    width: "80%",
    minHeight: "50%",
    maxHeight: "50%",
    marginTop: 5, // this is was at 10 before I changed it.
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    minWidth: "80%",
  },
  summaryContainers: {
    flexDirection: "column",
    justifyContent: "flex-start",
    minWidth: "30%",
    gap: 10,
  },
  cashFlowContainer: {
    backgroundColor: `rgba(50, 50, 50, .70)`,
    boxShadow: boxShadowForContainers,
    minWidth: "65%",
    maxWidth: "60%",
    borderRadius: 10,
    padding: 15,
  },
  cashFlowText: {
    color: colorPalette.light,
  },
  cashFlowChart: {
    color: colorPalette.light,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  cashFlowChartText: {
    fontSize: 50,
    fontWeight: "bold",
    color: colorPalette.light,
  },
});
