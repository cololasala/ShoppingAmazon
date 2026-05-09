import { AmazonEmber } from "@/utils/constants/constants";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ThanksBuying = () => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.thanksText}>Thanks for buying!</Text>
      <View style={styles.iconContainer}>
        <AntDesign name="check-circle" size={100} color={"#034e0bff"} />
      </View>

      <Link style={styles.linkText} href="/(tabs)">
        Return home
      </Link>
    </View>
  );
};

export default ThanksBuying;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(19, 243, 30)",
    gap: 15,
  },
  thanksText: {
    fontFamily: AmazonEmber,
    fontSize: 24,
    padding: 25,
    backgroundColor: "#034e0bff",
    borderRadius: 30,
    color: "white",
  },
  iconContainer: {
    backgroundColor: "white",
    borderRadius: 100,
    padding: 5,
  },
  linkText: {
    fontFamily: AmazonEmber,
    fontSize: 18,
    color: "white",
  },
});
