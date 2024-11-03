import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import colorPalette from "@/app/utils/colors";

interface WidgetHeaderProps {
  widgetTitle: string;
  widgetAddButtonTitle?: string;
  isAdding: boolean;
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
  showAddButton: boolean;
}

export function WidgetHeader({
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

const styles = StyleSheet.create({
  widgetTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
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
  widgetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 10,
    alignItems: "center",
  },
});
