import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";

const colorPalette = {
  light: "#eeeeee",
  medium: "#323232",
  dark: "#181818",
  green: "#28ce78",
};

const boxShadowForContainers = " rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"


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
      <View style={styles.contentWrapper}>
        <View style={styles.topContainer}>
          <View style={styles.summaryContainers}>
            <BalanceContainer balance={50000}/>
            <SummaryCard title="Monthly Income:" percentage={.18} value="$4200" />
            <SummaryCard title="Monthly Expenses:" percentage={-.10} value="$690" />
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

interface SummaryCardProps {
  title: string;
  percentage: number;
  value: string;
}

function SummaryCard({ title, percentage, value }: SummaryCardProps): JSX.Element {
  return (
    <View style={styles.accountSummaryCard}>
      <View style={styles.summaryHeader}>
        <Text style={styles.summaryTitleText}>{title}</Text>
        <Text style={[styles.summaryContainerPercentage, {color: percentage < 0 ? "red" : "green"}]}>
          {percentage < 0 ? `-$${percentage*-100}` : `+$${percentage*100}`}
        </Text>
      </View>
      <Text style={styles.sumamryContainerValue}>{value}</Text>
    </View>
  );
}

interface BalanceContainerProps {
  balance: number;
}

function BalanceContainer({ balance }: BalanceContainerProps): JSX.Element {
  return (
    <View style={styles.accountBalanceContainer}>
      <Text style={styles.accountBalanceText}>Account Balance</Text>
      <Text style={styles.accountBalanceValue}>${balance}</Text>
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
    <View style={styles.widgetCard}>
      <WidgetHeader
        widgetTitle={widgetTitle}
        widgetAddButtonTitle={widgetAddButtonTitle}
        isAdding={isAdding}
        setIsAdding={setIsAdding}
        showAddButton={showAddButton}
      />

      {isAdding && (
        <FormInputContainer
          newName={newName}
          setNewName={setNewName}
          newValue={newValue}
          setNewValue={setNewValue}
          handleAddToList={handleAddToList}
          setIsAdding={setIsAdding}
        />
      )}
      <FlatList
        style={styles.widgetList}
        data={list.length >= 5 ? list.slice(0, 5) : list}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            showDate={showDate}
            showSavings={showSavings}
            transactionAnalysis={transactionAnalysis}
          />
        )}
      />
    </View>
  );
}

interface WidgetHeaderProps {
  widgetTitle: string;
  widgetAddButtonTitle?: string;
  isAdding: boolean;
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
  showAddButton: boolean;
}

function WidgetHeader({
  widgetTitle,
  widgetAddButtonTitle = "Add",
  isAdding,
  setIsAdding,
  showAddButton,
}: WidgetHeaderProps): JSX.Element {
  return (
    <View style={styles.widgetHeader}>
      <Text style={styles.widgetTitle}>{widgetTitle}</Text>

      {!isAdding && showAddButton && (
        <TouchableOpacity
          style={styles.widgetActionButton}
          onPress={() => setIsAdding(true)}
        >
          <Text style={styles.widgetActionButtonText}>
            {widgetAddButtonTitle}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

interface FormInputContainerProps {
  newName: string;
  setNewName: React.Dispatch<React.SetStateAction<string>>;
  newValue: string;
  setNewValue: React.Dispatch<React.SetStateAction<string>>;
  handleAddToList: () => void;
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
}

function FormInputContainer({
  newName,
  setNewName,
  newValue,
  setNewValue,
  handleAddToList,
  setIsAdding,
}: FormInputContainerProps): JSX.Element {
  return (
    <View style={styles.widgetInputContainer}>
      <Text style={styles.labelAdd}>Item Name:</Text>
      <TextInput
        style={styles.widgetInputField}
        value={newName}
        onChangeText={setNewName}
        placeholder="Enter item name"
        placeholderTextColor="grey"
      />

      <Text style={styles.labelAdd}>Amount:</Text>
      <TextInput
        style={styles.widgetInputField}
        value={newValue}
        onChangeText={setNewValue}
        placeholder="Enter item amount"
        placeholderTextColor="grey"
      />

      <View style={styles.addButtons}>
        <TouchableOpacity
          style={styles.widgetActionButton}
          onPress={() => {
            setIsAdding(false);
            setNewName("");
            setNewValue("");
          }}
        >
          <Text style={styles.widgetActionButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.widgetActionButton}
          onPress={() => {
            if (newName && newValue) handleAddToList();
            else alert("Insert both values!");
          }}
        >
          <Text style={styles.widgetActionButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

interface ListItemProps {
  item: { name: string; amount: number; date?: string };
  showDate?: boolean;
  showSavings?: boolean;
  transactionAnalysis?: boolean;
}

function ListItem({
  item,
  showDate = false,
  showSavings = false,
  transactionAnalysis = false,
}: ListItemProps): JSX.Element {
  return (
    <View style={styles.widgetListItems}>
      <View style={styles.listItemDescription}>
        <Text style={styles.widgetListItem}>{item.name}</Text>
        {showDate && <Text style={styles.listItemDate}>{item.date}</Text>}
        {showSavings && (
          <Text style={styles.listItemDate}>Savings Goal: $5000</Text>
        )}
      </View>

      <View style={styles.listItemValue}>
        {showSavings && <Text style={styles.savings}>Savings: </Text>}
        <Text
          style={[
            styles.widgetListItem,
            {
              color:
                transactionAnalysis && item.amount >= 0
                  ? colorPalette.green
                  : colorPalette.light,
            },
          ]}
        >
          {transactionAnalysis
            ? item.amount < 0
              ? `-$${item.amount * -1}`
              : `+$${item.amount}`
            : `$${item.amount}`}{" "}
        </Text>
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
    gap:  20,
    backgroundImage: `radial-gradient(circle, rgba(40, 206, 120, .6) 5%, rgba(24, 24, 24, .8) 34%, rgba(24,24,24, .7) 130%)`,
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
  widgetCard: {
    minWidth: "30%",
    maxWidth: "30%",
    maxHeight: "100%",
    minHeight: "100%",
    borderRadius: 17,
    padding: 20,
    marginBottom: 20,
    boxShadow: boxShadowForContainers,
    backgroundColor: `rgba(50, 50, 50, .70)`,
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
    backgroundColor: colorPalette.dark,
  },
  widgetListItem: {
    fontSize: 14,
    color: colorPalette.light,
  },
  widgetActionButton: {
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 5,
    backgroundColor: colorPalette.green,
  },
  widgetActionButtonText: {
    fontSize: 12,
    color: colorPalette.light,
  },
  widgetInputContainer: {
    marginVertical: 10,
  },
  widgetInputField: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 5,
    fontSize: 10,
    borderColor: colorPalette.light,
    color: colorPalette.light,
  },
  addButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  widgetList: {},
  accountBalanceContainer: {
    marginBottom: 30,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "80%",
  },
  labelAdd: {
    fontSize: 14,
    marginBottom: 3,
    color: colorPalette.light,
  },
  graphsContainer: {
    padding: 10,
    borderRadius: 4,
    fontSize: 18,
    color: colorPalette.light,
    backgroundColor: colorPalette.medium,
  },
  listItemDescription: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  listItemDate: {
    fontSize: 12,
    marginTop: 3,
    color: "grey",
  },
  listItemValue: {
    justifyContent: "center",
  },
  widgetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  listItemValue: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  savings: {
    color: "grey",
  },
  accountSummaryCard: {
    backgroundColor: `rgba(50, 50, 50, .85)`,
    boxShadow: boxShadowForContainers,
    borderRadius: 15,
    padding: 15,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    minWidth: "80%",
  },
  summaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "space-between",
    color: colorPalette.light,
  },
  sumamryContainerValue: {
    color: colorPalette.light,
    fontSize: 45,
    fontWeight: "bold",
  },
  summaryTitleText: {
    color: colorPalette.light,
    fontSize: 14,
  },
  summaryContainerPercentage: {
    fontSize: 14,
  },
  summaryContainers: {
    flexDirection: "column",
    justifyContent: "flex-start",
    minWidth: "30%",
    gap: 10,
  },
  accountBalanceContainer: {
    flexDirection: "column",
  },
  accountBalanceText: {
    color: colorPalette.light,
  },
  accountBalanceValue: {
    color: colorPalette.light,
    fontSize: 45,
    fontWeight: "bold",
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
