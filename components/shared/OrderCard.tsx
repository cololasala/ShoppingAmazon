import { Order } from "@/types/order";
import { AmazonEmber, AmazonEmberBold } from "@/utils/constants/constants";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <View style={styles.mainContainer}>
      <Image
        source={{ uri: order?.image! }}
        style={{ width: 90, height: 90, borderRadius: 8 }}
      />
      <View>
        <Text style={[styles.orderText, { fontFamily: AmazonEmberBold }]}>
          {order.product_name}
        </Text>
        <Text style={styles.orderText}>Total: ${order.total.toFixed(2)}</Text>
        <Text style={styles.orderText}>Quantity: {order.quantity}</Text>
        <Text style={styles.orderText}>
          Delivery date: {order.delivery_date}
        </Text>
        {order.is_shipped ? (
          <Text style={[styles.orderText, { color: "green" }]}>
            Product shipped
          </Text>
        ) : (
          <Text style={[styles.orderText, { color: "orange" }]}>
            Order pending...
          </Text>
        )}
      </View>
    </View>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    marginVertical: 10,
    gap: 15,
  },
  orderText: {
    fontFamily: AmazonEmber,
    fontSize: 14,
  },
});
