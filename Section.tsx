import React, { useState, useRef, useEffect, ReactNode } from "react";
import { Text, View, StyleSheet, Animated, TouchableOpacity, Keyboard } from "react-native";
import FontAwesome from "react-native-vector-icons/Feather";

interface SectionProps { //fucking typescript
  title: string;
  backgroundColor: string;
  borderColor: string;
  headerBackgroundColor: string;
  children: ReactNode; // Allows passing JSX elements as children
}

export const Section: React.FC<SectionProps> = ({
  title,
  backgroundColor,
  borderColor,
  headerBackgroundColor,
  children,
}) => {
  const [isTall, setIsTall] = useState(false); // State to toggle height
  const [dynamicHeight, setDynamicHeight] = useState<number | null>(null); // Dynamic height
  const rotation = useRef(new Animated.Value(0)).current; // Animation for chevron rotation


  // Chevron rotation animation
  useEffect(() => {
    Animated.timing(rotation, {
      toValue: isTall ? 1 : 0, // Rotate when toggled
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [isTall]);
  
 // Keyboard listeners
 useEffect(() => {
  const handleKeyboardShow = (e: any) => {
    const keyboardHeight = e.endCoordinates.height;
    setDynamicHeight(keyboardHeight + 50); // Adjust height dynamically
  };

  const handleKeyboardHide = () => {
    setDynamicHeight(null); // Reset height
  };

  const showListener = Keyboard.addListener("keyboardDidShow", handleKeyboardShow);
  const hideListener = Keyboard.addListener("keyboardDidHide", handleKeyboardHide);

  return () => {
    showListener.remove();
    hideListener.remove();
  };
}, []);

  // Interpolated rotation value
  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });



  return (
    <View style={[styles.section, { backgroundColor, borderColor, height: dynamicHeight ? dynamicHeight : isTall ? null : 50, }, ]}> 
      
      <TouchableOpacity activeOpacity={0.5} style={[styles.sectionHeader, { backgroundColor: headerBackgroundColor }, ]}
        onPress={() => {
          Keyboard.dismiss(); // Dismiss the keyboard
          setIsTall((prev) => !prev)}
        }
        accessibilityRole="button"
        accessibilityLabel={`Toggle section: ${title}`}
        accessibilityHint="Toggles the visibility of the section content"
      >
        <Text style={styles.h1}>{title}</Text>
        <Animated.View style={[styles.chevron, { transform: [{ rotate }] }]}>
          <FontAwesome name="chevron-up" size={30} color="#ECECEC" />
        </Animated.View>
      </TouchableOpacity>

      {/* Content */}
      <View style={styles.contentContainer}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    width: "100%",
    borderWidth: 1,
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 10,
  },
  sectionHeader: {
    position: 'relative',
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  h1: {
    fontSize: 20,
    color: "#ECECEC",
  },
  chevron: {
    position: "absolute",
    right: 10,
  },
  contentContainer: {
    width: "100%",
    padding: 10, // Add padding for content
  },
});
