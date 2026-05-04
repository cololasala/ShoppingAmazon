import DefaultButton from "@/components/shared/DefaultButton";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";

const SellerPage = () => {
  const onPressCreateProduct = () => {
    router.push("/(create_product)/createProduct");
  };
  return (
    <View style={{ padding: 20 }}>
      <DefaultButton variant="primary" onPress={onPressCreateProduct}>
        Create a product
      </DefaultButton>
    </View>
  );
};

export default SellerPage;
