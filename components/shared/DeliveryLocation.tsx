import { AmazonEmber } from "@/utils/constants/constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const DeliveryLocation = () => {
  return (
    <TouchableOpacity onPress={() => router.push("/(buyer_zone)/location")}>
      <View
        style={{
          backgroundColor: "#c7e8f0",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          padding: 15,
        }}
      >
        <Ionicons name="location-outline" size={24} color="black" />
        <Text
          style={{
            fontSize: 16,
            color: "black",
            textAlign: "center",
            fontWeight: "normal",
            fontFamily: AmazonEmber,
            marginLeft: 10,
          }}
        >
          Deliver to -
          <Text
            style={{
              fontSize: 16,
              color: "black",
              fontWeight: "bold",
              fontFamily: AmazonEmber,
            }}
          >
            Select Location
          </Text>
        </Text>
        <Ionicons
          name="chevron-down"
          size={18}
          color="black"
          style={{ top: 1 }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default DeliveryLocation;
