import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, Alert, ScrollView, } from "react-native";

type FormProps = {
  labels: string[]; // Labels passed from parent
  onSave: (details: Record<string, string>) => void; // Callback to save details
  names: {
    alert: string;
    saveButton: string;
  };
};

const Form: React.FC<FormProps> = ({ labels, onSave, names }) => {

  // Initialize state with empty values for each label
  const [info, setInfo] = useState(
    labels.reduce((acc, label) => {
      acc[label] = ""; // Set each field to an empty string
      return acc;
    }, {} as Record<string, string>)
  );

  

  const handleInputChange = (key: string, value: string) => {
    setInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    if (!info["Name"]?.trim()) {
      Alert.alert("Error", "The 'Name' field is required.");
      return;
    }

    onSave(info); // Pass the filled-out coffee data back to the parent
    setInfo(
      labels.reduce((acc, label) => {
        acc[label] = ""; // Reset fields after saving
        return acc;
      }, {} as Record<string, string>)
    );
    Alert.alert("Success", `Your ${names.alert} has been saved!`);
  };

  return (
    <ScrollView style={styles.container}>
        
      {labels.map((label) => (
        <View key={label} style={styles.fieldContainer}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            style={styles.input}
            placeholder={`Enter ${label}`}
            value={info[label]}
            onChangeText={(text) => handleInputChange(label, text)}
          />
        </View>
      ))}
      <View style={styles.button}>
      <Button title={names.saveButton} onPress={handleSave} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#303030",
    borderRadius: 10,
    flexGrow: 1,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: "#ECECEC",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#404040",
    color: "#ECECEC",
    padding: 10,
    borderRadius: 5,
  },
  button: {
    marginBottom: 50,
  }
 
});

export default Form;
