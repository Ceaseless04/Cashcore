import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";

const colorPallete = {
  light: "#eeeeee",
  medium: "#323232",
  dark: "#181818",
  green: "#28ce78",
};

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
  const [startingBalance, setStartingBalance] = useState<number>(5000);

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
      <View style={styles.topContainer}>
        <View style={styles.summaryContainers}>
          <View style={styles.accountBalanceContainer}>
            <Text style={styles.accountBalanceText}>Account Balance</Text>
            <Text style={styles.accountBalanceValue}>$5000</Text>
          </View>
          <View style={styles.summaryContainer}>
            <View style={styles.summaryTopContainer}>
              <Text style={styles.summaryContainerText}>Monthly Income:</Text>
              <Text style={styles.summaryContainerPercentage}>+%18</Text>
            </View>

            <Text style={styles.sumamryContainerValue}>$4200</Text>
          </View>
          <View style={styles.summaryContainer}>
            <View style={styles.summaryTopContainer}>
              <Text style={styles.summaryContainerText}>Monthly Income:</Text>
              <Text style={styles.summaryContainerPercentage}>+%18</Text>
            </View>

            <Text style={styles.sumamryContainerValue}>$4200</Text>
          </View>
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
      </View></View>
    </View>
  );
}

interface WidgetProps {
  widgetTitle: string;
  widgetAddButtonTitle: string;
  setWidgetList: React.Dispatch<React.SetStateAction<ListItem[]>>;
  list: ListItem[];
  transactionAnalysis?: boolean;
  showDate?: boolean;
  showAddButton?: boolean;
  showSavings?: boolean;
}

function Widget({
  widgetTitle,
  widgetAddButtonTitle = "Add",
  setWidgetList,
  list,
  transactionAnalysis = false,
  showDate = false,
  showAddButton = false,
  showSavings = false,
}: WidgetProps): JSX.Element {
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newValue, setNewValue] = useState("");

  const handleGenerateDate = (): string => {
    const currentDate = new Date();

    const options = {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const formattedDate = currentDate.toLocaleDateString("en-US", options);

    const finalFormattedTime = formattedDate
      .replace("/^0+/", "")
      .replace(" AM", "am")
      .replace(" PM", "pm");

    return `${finalFormattedTime}`;
  };

  const handleAddToList = (): void => {
    setWidgetList([
      ...list,
      { name: newName, amount: Number(newValue), date: handleGenerateDate() },
    ]);
    setNewName("");
    setNewValue("");
    setIsAdding(false);
  };

  return (
    <View style={styles.widget}>
      <View style={styles.widgetHeader}>
        <Text style={styles.widgetTitle}>{widgetTitle}</Text>

        {!isAdding && showAddButton && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsAdding(true)}
          >
            <Text style={styles.buttonText}>{widgetAddButtonTitle}</Text>
          </TouchableOpacity>
        )}
      </View>

      {isAdding && (
        <View style={styles.inputContainer}>
          <Text style={styles.labelAdd}>Item Name:</Text>
          <TextInput
            style={styles.input}
            value={newName}
            onChangeText={setNewName}
            placeholder="Enter item name"
            placeholderTextColor="grey"
          />

          <Text style={styles.labelAdd}>Amount:</Text>
          <TextInput
            style={styles.input}
            value={newValue}
            onChangeText={setNewValue}
            placeholder="Enter item amount"
            placeholderTextColor="grey"
          />

          <View style={styles.addButtons}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setIsAdding(false);
                setNewName("");
                setNewValue("");
              }}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (newName && newValue) handleAddToList();
                else alert("Insert both values!");
              }}
            >
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <FlatList
        style={styles.widgetList}
        data={list.length >= 5 ? list.slice(0, 5) : list}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.widgetListItems}>
            <View style={styles.itemDescription}>
              <Text style={styles.widgetListItem}>{`${item.name}`}</Text>
              {showDate && <Text style={styles.itemDate}>{item.date}</Text>}
              {showSavings && (
                <Text style={styles.itemDate}>Savings Goal: $5000</Text>
              )}
            </View>
            <View style={styles.itemValue}>
              {showSavings && <Text style={styles.savings}>Savings: </Text>}
              <Text
                style={[
                  styles.widgetListItem,
                  {
                    color:
                      transactionAnalysis && item.amount >= 0
                        ? colorPallete.green
                        : colorPallete.light,
                  },
                ]}
              >
                {transactionAnalysis
                  ? item.amount < 0
                    ? `-$${item.amount * -1}`
                    : `+$${item.amount}`
                  : `$${item.amount}`}{" "}
                {/* Fixed here */}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: colorPallete.dark,
  },
  subContainer: {
    minWidth: "100%",
    justifyContent: "flex-end", 
    alignItems: "center",
    paddingHorizontal: 25, 
    paddingBottom: 25,
    gap: 20
  },
  widgetContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    width: "80%",
    minHeight: "50%",
    maxHeight: "50%",
    marginTop: 10,
    gap: 2,
  },
  widget: {
    minWidth: "30%",
    maxWidth: "30%",
    maxHeight: "100%",
    minHeight: "100%",
    borderRadius: 17,
    padding: 20,
    marginBottom: 20,
    backgroundColor: colorPallete.medium,
  },
  widgetTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  widgetListItems: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
    padding: 10,
    borderRadius: 5,
    backgroundColor: colorPallete.dark,
  },
  widgetListItem: {
    fontSize: 14,
    color: colorPallete.light,
  },
  button: {
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 5,
    backgroundColor: colorPallete.green,
  },
  buttonText: {
    fontSize: 12,
    color: colorPallete.light,
  },
  inputContainer: {
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 5,
    fontSize: 10,
    borderColor: colorPallete.light,
    color: colorPallete.light,
  },
  addButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  widgetList: {},
  accountBalanceContaier: {
    marginBottom: 30,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "80%",
  },
  labelAdd: {
    fontSize: 14,
    marginBottom: 3,
    color: colorPallete.light,
  },
  graphsContainer: {
    padding: 10,
    borderRadius: 4,
    fontSize: 18,
    color: colorPallete.light,
    backgroundColor: colorPallete.medium,
  },
  itemDescription: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  itemDate: {
    fontSize: 12,
    marginTop: 3,
    color: "grey",
  },
  itemValue: {
    justifyContent: "center",
  },
  widgetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    backgroundColor: colorPallete.medium,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  itemValue: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  savings: {
    color: "grey",
  },
  summaryContainer: {
    backgroundColor: colorPallete.medium,
    borderRadius: 10,
    padding: 15,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    minWidth: "80%",
  },
  summaryTopContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "space-between",
    color: colorPallete.light,
  },
  sumamryContainerValue: {
    color: colorPallete.light,
    fontSize: 45,
    fontWeight: "bold"
  },
  summaryContainerText: {
    color: colorPallete.light,
    fontSize: 14,
  },
  summaryContainerPercentage: {
    color: colorPallete.green,
    fontSize: 14,
  }, 
  summaryContainers: {
    flexDirection: "column",
    justifyContent: "flex-start",
    minWidth: "30%",
    gap: 10
  },
  accountBalanceContainer: {
    flexDirection: "column",
  },
  accountBalanceText: {
    color: colorPallete.light,
  },
  accountBalanceValue: {
    color: colorPallete.light,
    fontSize: 45,
    fontWeight: "bold",
  },
  cashFlowContainer: {
    backgroundColor: colorPallete.medium,
    minWidth: "65%",
    maxWidth: "60%",
    borderRadius: 10,
    padding: 15,
    color: colorPallete.light,
  },
  cashFlowText: {
    color: colorPallete.light,
  },
  cashFlowChart: {
    color: colorPallete.light,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%"
  },
  cashFlowChartText: {
    fontSize: 50,
    fontWeight: "bold",
    color: colorPallete.light,
  }
});
