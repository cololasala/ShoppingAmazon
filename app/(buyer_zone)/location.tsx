import { AmazonEmber } from "@/utils/constants/constants";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const Location = () => {
  const [location, setLocation] = useState<string>("");
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");

  const handleLocationChange = (text: string) => {
    setLocation(text);
  };

  const handleDeliveryAddressChange = (text: string) => {
    setDeliveryAddress(text);
  };

  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.textLabel}>Name</Text>
        <TextInput
          style={styles.inputStyle}
          value={location}
          placeholder="Name"
          onChangeText={handleLocationChange}
        />
      </View>
      <View>
        <Text style={styles.textLabel}>Give delivery address</Text>
        <TextInput
          style={styles.inputStyle}
          value={deliveryAddress}
          placeholder="Enter delivery address"
          onChangeText={handleDeliveryAddressChange}
        />
      </View>
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, padding: 20, gap: 15 },
  textLabel: {
    fontFamily: AmazonEmber,
    fontSize: 16,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    padding: 10,
    marginTop: 5,
  },
});
