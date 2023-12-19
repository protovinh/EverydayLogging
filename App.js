import React, { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";

export default function App() {
  const [clickedButton, setClickedButton] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  var storedNumber;
  var animation = useRef(null);

  const handleSubmit = () => {
    setSubmitted(true);
    storedNumber = clickedButton;
    console.log(storedNumber);
    setTimeout(() => {
      animation.current?.play();
    }, 100);
  };

  const handlePress = (number) => {
    setClickedButton((prevClickedButton) =>
      prevClickedButton === number ? null : number
    );
  };

  const renderNumber = (number) => {
    const isBlue = clickedButton === number;
    const textColor = isBlue ? styles.whiteText : styles.darkText;

    return (
      <TouchableOpacity
        style={[
          styles.button,
          isBlue && styles.blueButton,
          clickedButton === number && styles.clickedButton,
        ]}
        onPress={() => handlePress(number)}
        key={number}
      >
        <Text style={[styles.buttonText, textColor]}>{number}</Text>
      </TouchableOpacity>
    );
  };

  const renderSend = (send) => {
    const textColor = styles.whiteText;

    return (
      <TouchableOpacity
        style={[
          styles.button,
          styles.blueButton,
          { opacity: clickedButton === null ? 0.5 : 1 },
        ]}
        onPress={() => clickedButton !== null && handleSubmit()}
        key={send}
        disabled={clickedButton === null}
      >
        <Text style={[styles.buttonText, textColor]}>{send}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>Hvordan går det? 😊</Text>

      <View style={styles.gridContainer}>
        {[1, 2].map((number) => renderNumber(number))}
      </View>

      <View style={styles.gridContainer}>
        {[3, 4].map((number) => renderNumber(number))}
      </View>

      <View style={styles.gridContainer}>
        {[5, 6].map((number) => renderNumber(number))}
      </View>

      <View style={styles.gridContainer}>
        {[7, 8].map((number) => renderNumber(number))}
      </View>

      <View style={styles.gridContainer}>
        {[9, 10].map((number) => renderNumber(number))}
      </View>

      <View style={{ width: "100%" }}>
        {!submitted ? (
          <View style={styles.gridContainer}>
            {["Send"].map((send) => renderSend(send))}
          </View>
        ) : (
          <View style={{ alignItems: "center" }}>
            <LottieView
              source={require("./assets/tick.json")}
              autoPlay={false}
              loop={false}
              ref={animation}
              style={{ flexGrow: 1, width: 150 }}
            />
          </View>
        )}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  gridContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  button: {
    flex: 1,
    width: 140,
    margin: 4,
    padding: 16,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: "#0766AD",
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  blueButton: {
    backgroundColor: "#0766AD",
  },
  clickedButton: {
    backgroundColor: "#0766AD",
  },
  buttonText: {
    fontSize: 18,
  },
  whiteText: {
    color: "#ffffff",
  },
  darkText: {
    color: "#12123B",
  },
});
