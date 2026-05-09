import { supabase } from "@/lib/supabase";
import { showToastError } from "@/services/toastService";
import { RootState } from "@/store/store";
import { Order } from "@/types/order";
import { AmazonEmber, AmazonEmberBold } from "@/utils/constants/constants";
import { Checkbox } from "expo-checkbox";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

interface MyOrderCardProps {
  order: Order;
}

const MyOrderCard = ({ order }: MyOrderCardProps) => {
  const userLogged = useSelector((state: RootState) => state.Auth.session);
  const [isShipped, setIsShipped] = useState<boolean>(false);

  const onShippedProduct = async (isShipped: boolean) => {
    setIsShipped(isShipped);
    try {
      const { data, error } = await supabase
        .from("orders")
        .update({ isShipped: isShipped })
        .eq("seller_id", userLogged?.user?.id);

      if (error) {
        showToastError("Error", "Error updating shipped product");
      }
    } catch (error) {
      showToastError("Error", "Error updating shipped product");
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Image
        source={{ uri: order?.image! }}
        style={{ width: 90, height: 90, borderRadius: 8 }}
      />
      <View style={styles.container}>
        <View style={styles.textWrapper}>
          <Text style={[styles.orderText, { fontFamily: AmazonEmberBold }]}>
            {order.product_name}
          </Text>
          <Text style={styles.orderText}>
            Current price: ${order.current_price.toFixed(2)}
          </Text>
        </View>
        <Checkbox
          value={isShipped}
          onValueChange={onShippedProduct}
          color={true ? "#f1b023ff" : undefined}
        />
        <Text style={[styles.orderText, { marginLeft: 5 }]}>Shipped</Text>
      </View>
    </View>
  );
};

export default MyOrderCard;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    marginVertical: 10,
    gap: 15,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textWrapper: {
    flex: 1,
  },
  orderText: {
    fontFamily: AmazonEmber,
    fontSize: 14,
  },
});
