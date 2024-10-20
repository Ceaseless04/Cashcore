import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';

const colorPallete = {
  light: "#eeeeee",
  medium: "#393e46", 
  dark: "#222831",
  blue: "#0092ca",
}; 

const dummyBudget: ListItem[] = [
  { name: 'car', amount: 1000 },
  { name: 'house', amount: 3000 },
  { name: 'groceries', amount: 500 },
  { name: 'horse', amount: 50 },
  { name: 'carrot', amount: 40 },
  { name: 'memo', amount: 0.99 },
];

const dummyMonthlySub: ListItem[] = [
  { name: 'Netflix', amount: -15.99 },
  { name: 'Spotify', amount: -9.99 },
  { name: 'Gym', amount: -30.00 },
];

const dummyTransactions: ListItem[] = [
  { name: 'item', amount: -8000 },
  { name: 'check', amount: 8000 },
  { name: 'item', amount: -8000 },
];

interface ListItem {
  name: string;
  amount: number;
}

export default function Dashboard(): JSX.Element {
  const [budgetList, setBudgetList] = useState<ListItem[]>(dummyBudget);
  const [monthlySubscription, setMonthlySubscription] = useState<ListItem[]>(dummyMonthlySub);
  const [transactions, setTransactions] = useState<ListItem[]>(dummyTransactions);
  const [startingBalance, setStartingBalance] = useState<number>(5000);

  const accountBalance = (): number => {
    const budgetTotal = budgetList.reduce((acc, item) => acc + item.amount, 0);
    const subscriptionTotal = monthlySubscription.reduce((acc, item) => acc + item.amount, 0);
    const transactionTotal = transactions.reduce((acc, item) => acc + item.amount, 0);
    return Number((startingBalance + budgetTotal + subscriptionTotal + transactionTotal).toFixed(2));
  };
  
  return (
    <View style={styles.container}>
      
      <View style={styles.accountBalanceContaier}>
        <Text style={styles.startingBalance}>
          Starting Balance: ${startingBalance.toFixed(2)}
        </Text>
        <Text style={styles.accountBalanceText}>
          Account Balance: ${`${accountBalance()}`}
        </Text>
      </View>

      <View style={styles.widgetContainer}>
        <Widget
          widgetTitle="Budget"
          setWidgetList={setBudgetList}
          list={budgetList} />
        <Widget
          widgetTitle="Monthly Subscription"
          setWidgetList={setMonthlySubscription}
          list={monthlySubscription}
          transactionAnalysis />
        <Widget
          widgetTitle="Transaction"
          setWidgetList={setTransactions}
          list={transactions}
          transactionAnalysis />
      </View>
      
      <View style={styles.graphsContainer}>
        Graph ???
      </View>
    
    </View>
  );
}

interface WidgetProps {
  widgetTitle: string;
  setWidgetList: React.Dispatch<React.SetStateAction<ListItem[]>>;
  list: ListItem[];
  transactionAnalysis?: boolean;
}

function Widget({ widgetTitle, setWidgetList, list, transactionAnalysis=false,}:
  WidgetProps): JSX.Element {
  
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newValue, setNewValue] = useState('');

  const handleAddToList = (): void => {
    setWidgetList([...list, { name: newName, amount: Number(newValue) }]);
    setNewName('');
    setNewValue('');
    setIsAdding(false);
  };

  return (
    <View style={styles.widget}>
      <Text style={styles.widgetTitle}>
        {widgetTitle}
      </Text>

      { 
        !isAdding && 
        ( <TouchableOpacity style={styles.button} onPress={() => setIsAdding(true)}>
            <Text style={styles.buttonText}>
              Add {widgetTitle}
            </Text>
          </TouchableOpacity> )
      }

      {
        isAdding && 
        ( <View style={styles.inputContainer}>
            
            <Text style={styles.labelAdd}>
              Item Name:
            </Text>
            <TextInput
              style={styles.input}
              value={newName}
              onChangeText={setNewName}
              placeholder="Enter item name"
              placeholderTextColor="grey" />
            
            <Text style={styles.labelAdd}>
              Amount:
            </Text>
            <TextInput
              style={styles.input}
              value={newValue}
              onChangeText={setNewValue}
              placeholder="Enter item amount"
              placeholderTextColor="grey" />
          
            <View style={styles.addButtons}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setIsAdding(false);
                  setNewName('');
                  setNewValue('');
                }} >
                <Text style={styles.buttonText}>
                  Cancel
                </Text>
              </TouchableOpacity>
            
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  if (newName && newValue) 
                    handleAddToList();  
                  else 
                    alert('Insert both values!');
                }}>
                <Text style={styles.buttonText}>
                  Add
                </Text>
              </TouchableOpacity>
            
            </View>
          </View> )
      }

      <FlatList
        style={styles.widgetList}
        data={list}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.widgetListItems}>
            <Text style={styles.widgetListItem}>
              {`${item.name}`}
            </Text>
            <Text
              style={[
                styles.widgetListItem,
                { color: transactionAnalysis && item.amount >= 0 ? 
                  'lightgreen' : colorPallete.light },
              ]} >
                { transactionAnalysis ? 
                    item.amount < 0 ? 
                    `-$${item.amount*-1}`:
                    `+$${item.amount}`:
                    `$${item.amount}` }
            </Text>
          </View>
        )} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30, 
    backgroundColor: colorPallete.dark,
  },
  widgetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "flex-start",
    flexWrap: 'wrap',
    width: '80%',
  },
  widget: {
    minWidth: '25%',
    maxWidth: '50%',
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
    gap: 1,
    backgroundColor: colorPallete.medium,
  },
  widgetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  widgetListItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    padding: 5,
    borderRadius: 5,
    backgroundColor: colorPallete.dark,
  },
  widgetListItem: {
    fontSize: 14,
    padding: 3,
    color: colorPallete.light,
  },
  button: {
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: colorPallete.blue,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  widgetList: {
    marginTop: 10,
  },
  accountBalanceContaier: {
    marginBottom: 30,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: "80%"
  },
  accountBalanceText: {
    padding: 10,
    borderRadius: 5,
    color: colorPallete.light,
    backgroundColor: colorPallete.medium,
    fontSize: 20, 
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
  startingBalance: {
    fontSize: 18,
    marginBottom: 10,
    color: colorPallete.light,
  }
});