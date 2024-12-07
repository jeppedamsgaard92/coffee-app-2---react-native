import React, { useState, useEffect } from "react";
import { View, FlatList, Text, StyleSheet, Alert, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LibraryScreen() {
  const [savedCoffees, setSavedCoffees] = useState<Record<string, string>[]>([]);

  // Load saved coffees from AsyncStorage
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

  // Clear saved coffees
    // const clearAllData = async () => {
    //   try {
    //     await AsyncStorage.clear();
    //     Alert.alert("Success", "All data has been cleared.");
    //   } catch (error) {
    //     Alert.alert("Error", "Failed to clear data.");
    //   }
    // };

  return (
    <View style={styles.container}>
      {/* FlatList for Saved Coffees */}
      <FlatList
        data={savedCoffees}
        keyExtractor={(item, index) => `${item.Name}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.savedCoffee}>
            <Text style={styles.savedTitle}>{item.Name}</Text>
            {Object.entries(item).map(
              ([key, value]) =>
                key !== "Name" &&
                value && (
                  <Text key={key} style={styles.savedText}>
                    {key}: {value}
                  </Text>
                )
            )}
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No coffees saved yet. Add some to see them here!</Text>
        }
      />
  {/* <Button title="Clear All Data" onPress={clearAllData} />;     */}
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#212121",
  },
  savedCoffee: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#303030",
    borderRadius: 10,
  },
  savedTitle: {
    fontSize: 18,
    color: "#ECECEC",
    fontWeight: "bold",
    marginBottom: 10,
  },
  savedText: {
    fontSize: 14,
    color: "#AFAFAF",
  },
  emptyText: {
    fontSize: 16,
    color: "#AFAFAF",
    textAlign: "center",
    marginTop: 20,
  },
});
