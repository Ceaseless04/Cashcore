import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";
import colorPalette from "@/app/utils/colors";

interface BalanceContainerProps {
    balance: number;
}

export function BalanceContainer({ balance }: BalanceContainerProps): JSX.Element {
    return (
      <View style={styles.accountBalanceContainer}>
        <Text style={styles.accountBalanceText}>Account Balance</Text>
        <Text style={styles.accountBalanceValue}>${balance}</Text>
      </View>
    );
}
   
const styles = StyleSheet.create({
    accountBalanceContainer: {
      alignItems: "flex-start",
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
  });