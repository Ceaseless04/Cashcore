import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import colorPalette from "@/app/utils/colors";
import { boxShadowForContainers } from "@/app/utils/dashboardContainerBoxShadow";

interface ListItemProps {
  item: { name: string; amount: number; date?: string };
  showDate?: boolean;
  showSavings?: boolean;
  transactionAnalysis?: boolean;
}

export function ListItem({
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
  savings: {
    color: "grey",
  },
});
