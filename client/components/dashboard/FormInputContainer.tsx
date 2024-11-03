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

interface FormInputContainerProps {
  newName: string;
  setNewName: React.Dispatch<React.SetStateAction<string>>;
  newValue: string;
  setNewValue: React.Dispatch<React.SetStateAction<string>>;
  handleAddToList: () => void;
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
}

export function FormInputContainer({
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

const styles = StyleSheet.create({
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
  labelAdd: {
    fontSize: 14,
    marginBottom: 3,
    color: colorPalette.light,
  },
});
