import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, FlatList, Alert, Text, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Form from "../files/Form";
import { Section } from "../files/Section";


export default function App() {





  //Form: coffee form
  //Form: coffee form
  const coffeeLabels = [
    'Name', 'Variety', 'Blend or Single-Origin', 'Country of Origin', 'Region/Territory', 'Farm/Cooperative', 'Altitude', 'Roast Date', 'Processing Method'
  ];
  const handleSaveCoffee = (details: Record<string, string>) => {
    setSavedCoffees((prev) => [...prev, details]);
    Alert.alert("Success", "Your coffee has been saved!");
  };
  const coffeeFormNames = {
    alert: 'coffee', 
    saveButton: 'Save Coffee', 
  }
  //Form: coffee form
  //Form: coffee form





  //Form: equipment form
  //Form: equipment form
  const equipmentLabels = [
    'Name', 'Grinder', 'Brew Method', 'Brewer'
  ];
  const handleSaveEquipment = (details: Record<string, string>) => {
    setSavedEquipment((prev) => [...prev, details]);
    Alert.alert("Success", "Your equipment has been saved!");
  };
  const equipmentFormNames = {
    alert: 'equipment', 
    saveButton: 'Save Equipment', 
  }
  //Form: equipment form
  //Form: equipment form



  //State variables
  const [savedCoffees, setSavedCoffees] = useState<Record<string, string>[]>([]);
  const [savedEquipment, setSavedEquipment] = useState<Record<string, string>[]>([]);
  







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








   // Load saved equipment from AsyncStorage on app start
   useEffect(() => {
    const loadEquipment = async () => {
      try {
        const storedEquipment = await AsyncStorage.getItem("equipment");
        if (storedEquipment) {
          setSavedEquipment(JSON.parse(storedEquipment));
        }
      } catch (error) {
        Alert.alert("Error", "Failed to load saved equipment.");
      }
    };
    loadEquipment();
  }, []);
  
  // Save the equipment to AsyncStorage whenever they are updated
  useEffect(() => {
    const saveEquipment = async () => {
      try {
        await AsyncStorage.setItem("equipment", JSON.stringify(savedEquipment));
      } catch (error) {
        Alert.alert("Error", "Failed to save equipment.");
      }
    };
    saveEquipment();
  }, [savedEquipment]);

  






  return (
  //   <KeyboardAvoidingView
  //   style={{ flex: 1 }}
  //   behavior={Platform.OS === "ios" ? "padding" : undefined}
  // >
    //<TouchableWithoutFeedback onPress={Keyboard.dismiss}>


    <View style={styles.outerContainer}>
      <Section title="Add new coffee" backgroundColor="#212121" borderColor="#2E95D3" headerBackgroundColor="#0E3A55"
      >
        {/* content */}
        <Form onSave={handleSaveCoffee} labels={coffeeLabels} names={coffeeFormNames}/>
      </Section>


      <Section title="Add new equipment" backgroundColor="#212121" borderColor="#2E95D3" headerBackgroundColor="#0E3A55"
      >
        {/* content */}
        <Form onSave={handleSaveEquipment} labels={equipmentLabels} names={equipmentFormNames}/>
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
