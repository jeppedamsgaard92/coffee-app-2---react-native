import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, Alert, ScrollView, } from "react-native";

type CoffeeFormProps = {
  labels: string[]; // Labels passed from parent
  onSave: (coffee: Record<string, string>) => void; // Callback to save coffee details
};

const CoffeeForm: React.FC<CoffeeFormProps> = ({ labels, onSave }) => {

  //DELETE
  // // Define the labels directly in the component
  // const labels = [
  //   'Name', 'Variety', 'Blend or Single-Origin', 'Country of Origin', 'Region/Territory', 'Farm/Cooperative', 'Altitude', 'Roast Date', 'Processing Method'
  // ];
  //DELETE

  // Initialize state with empty values for each label
  const [coffeeInfo, setCoffeeInfo] = useState(
    labels.reduce((acc, label) => {
      acc[label] = ""; // Set each field to an empty string
      return acc;
    }, {} as Record<string, string>)
  );

  

  const handleInputChange = (key: string, value: string) => {
    setCoffeeInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    if (!coffeeInfo["Name"]?.trim()) {
      Alert.alert("Error", "The 'Name' field is required.");
      return;
    }

    onSave(coffeeInfo); // Pass the filled-out coffee data back to the parent
    setCoffeeInfo(
      labels.reduce((acc, label) => {
        acc[label] = ""; // Reset fields after saving
        return acc;
      }, {} as Record<string, string>)
    );
    Alert.alert("Success", "Your coffee has been saved!");
  };

  return (
    <ScrollView style={styles.container}>
        
      {labels.map((label) => (
        <View key={label} style={styles.fieldContainer}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            style={styles.input}
            placeholder={`Enter ${label}`}
            value={coffeeInfo[label]}
            onChangeText={(text) => handleInputChange(label, text)}
          />
        </View>
      ))}
      <View style={styles.button}>
      <Button title="Save Coffee" onPress={handleSave} />
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

export default CoffeeForm;
