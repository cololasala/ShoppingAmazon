import DefaultButton from "@/components/shared/DefaultButton";
import { supabase } from "@/lib/supabase";
import { showToastError, showToastSuccess } from "@/services/toastService";
import { RootState } from "@/store/newStore";
import { AmazonEmber } from "@/utils/constants/constants";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useSelector } from "react-redux";

const Location = () => {
  const [location, setLocation] = useState<string>("");
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const userLogged = useSelector((state: RootState) => state.Auth.session);

  const handleLocationChange = (text: string) => {
    setLocation(text);
  };

  const handleDeliveryAddressChange = (text: string) => {
    setDeliveryAddress(text);
  };

  const getInfoLocation = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("location, full_name")
        .eq("id", userLogged?.user.id)
        .single();

      if (error) {
        showToastError("Error", "Error when obtain location");
        return;
      }

      if (data) {
        const { full_name, location } = data;
        setLocation(location);
        setDeliveryAddress(full_name);
      }
    } catch (error) {
      showToastError("Error", "Error when obtain location");
    }
  };

  useFocusEffect(
    useCallback(() => {
      getInfoLocation();
    }, []),
  );

  const onPressSave = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.from("profiles").upsert({
        id: userLogged?.user.id,
        location: location,
        full_name: deliveryAddress,
      });
      if (error) {
        showToastError("Error", "Error when save changes");
        return;
      }
      showToastSuccess("Success", "Changes applied successfully");
    } catch (error) {
      showToastError("Error", "Error when save changes");
    } finally {
      setLoading(false);
    }
  };

  const disabled = () => {
    return (
      !location ||
      location.length < 5 ||
      !deliveryAddress ||
      deliveryAddress.length < 5 ||
      loading
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.textLabel}>Location name</Text>
        <TextInput
          maxLength={70}
          style={styles.inputStyle}
          value={location}
          placeholder="Location name"
          onChangeText={handleLocationChange}
        />
      </View>
      <View>
        <Text style={styles.textLabel}>Give delivery address</Text>
        <TextInput
          maxLength={150}
          numberOfLines={4}
          textAlignVertical="top"
          multiline={true}
          style={[styles.inputStyle, { height: 120 }]}
          value={deliveryAddress}
          placeholder="Enter delivery address"
          onChangeText={handleDeliveryAddressChange}
        />
      </View>

      <DefaultButton
        variant="primary"
        onPress={onPressSave}
        disabled={disabled()}
        styleText={{ fontSize: 16 }}
        style={{ width: "100%" }}
      >
        {loading ? "Pleas wait..." : " Save Changes"}
      </DefaultButton>
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
