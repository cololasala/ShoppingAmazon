import DefaultButton from "@/components/shared/DefaultButton";
import { supabase } from "@/lib/supabase";
import { showToastError, showToastSuccess } from "@/services/toastService";
import { RootState } from "@/store/newStore";
import { AmazonEmber } from "@/utils/constants/constants";
import { deliveryDate } from "@/utils/deliveryDate";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

const BuyHere = () => {
  const userLogged = useSelector((state: RootState) => state.Auth.session);
  const [address, setAddress] = useState<any | null>(null);
  const {
    name,
    quantity,
    deliveryInDays,
    productImage,
    deliveryCharge,
    currentPrice,
    achoice,
    deliveryPrice,
    sellerId,
  } = useLocalSearchParams();

  const imageUrl = Array.isArray(productImage)
    ? productImage[0]
    : (productImage ?? "");

  const getUserProduct = async () => {
    try {
      const { data: address, error: err } = await supabase
        .from("profiles")
        .select("full_name, location")
        .eq("id", userLogged?.user.id)
        .single();
      setAddress(address);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getUserProduct();
  }, [address]);

  const onOrderProduct = async () => {
    try {
      const { error } = await supabase
        .from("orders")
        .insert([
          {
            product_name: name,
            delivery_address: `${address?.full_name} ${address?.location}`,
            image: productImage,
            buyer_id: userLogged?.user.id,
            current_price: currentPrice,
            delivery_date: deliveryDate(Number(deliveryInDays), "es-AR"),
            delivery_price: deliveryPrice,
            seller_id: sellerId,
            quantity,
            total: Number(deliveryPrice) * Number(quantity),
          },
        ])
        .select();
      if (!error) {
        showToastSuccess("Success", "Product ordered successfully");
        router.push("/(buyer_zone)/thanksBuying");
      }
    } catch (error) {
      showToastError("Error", "Error when order product");
    }
  };

  return (
    <View style={styles.mainContainer}>
      {address?.location ? (
        <>
          <Text
            style={styles.deliveryText}
          >{`Delivering to ${address.full_name}`}</Text>
          <Text style={styles.deliveryLocation}>{address.location}</Text>
          <TouchableOpacity
            onPress={() => router.push("/(buyer_zone)/location")}
          >
            <Text style={styles.changeAddressText}>Change address</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity onPress={() => router.push("/(buyer_zone)/location")}>
          <Text
            style={{
              textDecorationLine: "underline",
              color: "rgb(17, 159, 211)",
              fontFamily: AmazonEmber,
            }}
          >
            Add an address
          </Text>
        </TouchableOpacity>
      )}
      <View
        style={{
          width: "100%",
          height: 2,
          backgroundColor: "#b1b1b1ff",
          marginTop: 10,
        }}
      />
      <Text
        style={{ fontFamily: AmazonEmber, fontSize: 18, marginTop: 6 }}
      >{`Arriving at ${deliveryDate(Number(deliveryInDays), "es-AR")}`}</Text>
      <Text style={{ fontFamily: AmazonEmber, fontSize: 14 }}>
        if you order in the next 10 hours and 48 minutes
      </Text>
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 20,
          backgroundColor: "#e5e5e5ff",
          height: 205,
          borderRadius: 20,
        }}
      >
        <Image
          source={{ uri: imageUrl }}
          style={{
            height: 150,
            resizeMode: "contain",
            width: 130,
            backgroundColor: "#f8f8f8",
          }}
        />
        <View style={{ marginHorizontal: 10 }}>
          <Text style={{ fontSize: 20 }}>{name}</Text>
          <Text
            style={{ fontSize: 16, marginTop: 10 }}
          >{`Quantity:${quantity}`}</Text>
          <Text
            style={{ fontSize: 15, marginTop: 10 }}
          >{`$ ${Number(currentPrice).toFixed(2)}`}</Text>
          <Text>{`Delivery Charges: $${Number(deliveryCharge).toFixed(2)}`}</Text>
          <Text style={{ fontSize: 15, marginTop: 10 }}>{`Sub Total: $${(
            Number(deliveryPrice) * Number(quantity)
          ).toFixed(2)}`}</Text>
          {achoice === "true" && (
            <Image
              source={require("@/assets/images/amazon-images/prime-label.png")}
              style={{
                height: 50,
                resizeMode: "contain",
                width: 60,
              }}
            />
          )}
        </View>
      </View>
      <DefaultButton onPress={onOrderProduct} style={{ marginTop: 20 }}>
        Pay with cash on delivery
      </DefaultButton>
    </View>
  );
};

export default BuyHere;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 14,
  },
  deliveryText: { fontFamily: AmazonEmber, fontSize: 18, marginTop: 10 },
  deliveryLocation: { fontFamily: AmazonEmber, fontSize: 18, marginTop: 6 },
  changeAddressText: {
    textDecorationLine: "underline",
    color: "rgb(17, 159, 211)",
    fontFamily: AmazonEmber,
    marginTop: 8,
  },
});
