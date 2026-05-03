import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";

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
    <View style={{ flex: 1, padding: 20, gap: 15 }}>
      <View>
        <Text style={{ fontSize: 16, fontFamily: "AmazonEmberBold" }}>
          Name
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 4,
            padding: 10,
            marginTop: 5,
          }}
          value={location}
          placeholder="Name"
          onChangeText={handleLocationChange}
        />
      </View>
      <View>
        <Text style={{ fontSize: 16, fontFamily: "AmazonEmberBold" }}>
          Give delivery address
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 4,
            padding: 10,
            marginTop: 5,
          }}
          value={deliveryAddress}
          placeholder="Enter delivery address"
          onChangeText={handleDeliveryAddressChange}
        />
      </View>
    </View>
  );
};

export default Location;
