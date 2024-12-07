import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, FlatList, Alert, Text, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CoffeeForm from "../files/CoffeeForm";
import { Section } from "../files/Section";


export default function App() {
  const coffeeLabels = [
    'Name', 'Variety', 'Blend or Single-Origin', 'Country of Origin', 'Region/Territory', 'Farm/Cooperative', 'Altitude', 'Roast Date', 'Processing Method'
  ];
  const [savedCoffees, setSavedCoffees] = useState<Record<string, string>[]>([]);
  
  // Load saved coffees from AsyncStorage on app start
  useEffect(() => {
    const loadCoffees = async () => {
      try {
        const storedCoffees = await AsyncStorage.getItem("coffees");
        if (storedCoffees) {
          setSavedCoffees(JSON.parse(storedCoffees));
        }
      } catch (error) {
        Alert.alert("Error", "Failed to load saved coffees.");
      }
    };
    loadCoffees();
  }, []);

  // Save the coffees to AsyncStorage whenever they are updated
  useEffect(() => {
    const saveCoffees = async () => {
      try {
        await AsyncStorage.setItem("coffees", JSON.stringify(savedCoffees));
      } catch (error) {
        Alert.alert("Error", "Failed to save coffees.");
      }
    };
    saveCoffees();
  }, [savedCoffees]);

  // Handle saving a new coffee
  const handleSaveCoffee = (coffee: Record<string, string>) => {
    setSavedCoffees((prev) => [...prev, coffee]);
    Alert.alert("Success", "Your coffee has been saved!");
  };


  return (
  //   <KeyboardAvoidingView
  //   style={{ flex: 1 }}
  //   behavior={Platform.OS === "ios" ? "padding" : undefined}
  // >
    //<TouchableWithoutFeedback onPress={Keyboard.dismiss}>


    <View style={styles.outerContainer}>
      <Section title="Add new coffee or equipment" backgroundColor="#212121" borderColor="#2E95D3" headerBackgroundColor="#0E3A55"
      >
        {/* content */}
        <CoffeeForm onSave={handleSaveCoffee} labels={coffeeLabels} />
      </Section>




      <Section title="Add new brew notes" backgroundColor="#0D0D0D" borderColor="#05A57E" headerBackgroundColor="#024E3C"
      >
        {/* content */}
      </Section>





      <Section title="My brews" backgroundColor="#303030" borderColor="#F22D3D" headerBackgroundColor="#7F151E">
        {/* content */}
        
      </Section>
      </View>
     // </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
    
   
   
  );
}

const styles = StyleSheet.create({
 
  outerContainer: {
    flex: 1,
    backgroundColor: "#212121",
    padding: 10,
    paddingBottom: 50,
    
    justifyContent: "flex-start",
    alignItems: "center",
    
    gap: 20,
  },
  // container:{
  //   padding: 10,
  //   paddingBottom: 50,
    
  //   justifyContent: "flex-start",
  //   alignItems: "center",
    
  //   gap: 20,
  // },
  sectionText: { // Add this
    color: '#ECECEC',
    fontSize: 16,
    marginBottom: 10,
  },
  
});
