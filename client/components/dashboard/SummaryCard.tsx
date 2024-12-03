import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import colorPalette from "@/app/utils/colors";

interface SummaryCardProps {
  title: string;
  percentage: number;
  value: string;
}

export function SummaryCard({
  title,
  percentage,
  value,
}: SummaryCardProps): JSX.Element {
  return (
    <View style={styles.accountSummaryCard}>
      <View style={styles.summaryHeader}>
        <Text style={styles.summaryTitleText}>{title}</Text>
        <Text
          style={[
            styles.summaryContainerPercentage,
            { color: percentage < 0 ? "red" : "green" },
          ]}
        >
          {percentage < 0 ? `-%${percentage * -100}` : `+%${percentage * 100}`}
        </Text>
      </View>
      <Text style={styles.sumamryContainerValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  accountSummaryCard: {
    backgroundColor: "rgba(50, 50, 50, .85)",
    boxShadow:"rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
    borderRadius: 15,
    padding: 15,
  },
});
