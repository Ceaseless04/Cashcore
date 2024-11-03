import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { boxShadowForContainers } from "@/app/utils/dashboardContainerBoxShadow";
import { WidgetHeader } from "./WidgetHeader";
import { FormInputContainer } from "./FormInputContainer";
import { ListItem } from "./ListItem";

interface ListItem {
  name: string;
  amount: number;
  date?: string;
}

interface WidgetProps {
  widgetTitle: string;
  widgetAddButtonTitle?: string;
  setWidgetList: React.Dispatch<React.SetStateAction<ListItem[]>>;
  list: ListItem[];
  transactionAnalysis?: boolean;
  showDate?: boolean;
  showAddButton?: boolean;
  showSavings?: boolean;
}

export function Widget({
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

const styles = StyleSheet.create({
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
});
