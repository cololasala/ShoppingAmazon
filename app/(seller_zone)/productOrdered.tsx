import CustomActivityIndicator from "@/components/shared/CustomActivityIndicator";
import MyOrderedCard from "@/components/shared/MyOrderedCard";
import { supabase } from "@/lib/supabase";
import { showToastError } from "@/services/toastService";
import { RootState } from "@/store/newStore";
import { Order } from "@/types/order";
import { AmazonEmber } from "@/utils/constants/constants";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

const ProductOrdered = () => {
  const userLogged = useSelector((state: RootState) => state.Auth.session);
  const [orders, setOrders] = useState<Order[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getProductOrders = async () => {
    setLoading(true);
    try {
      const { data = [], error } = await supabase
        .from("orders")
        .select("*")
        .eq("seller_id", userLogged?.user?.id)
        .order("created_at", { ascending: false });
      if (error) {
        showToastError("Error", "Error when retrieving orders");
        return;
      }
      setOrders(data as Order[]);
    } catch (error) {
      showToastError("Error", "Error when retrieving orders");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getProductOrders();
    }, []),
  );

  if (loading) return <CustomActivityIndicator />;

  return (
    <View style={styles.mainContainer}>
      {orders.length > 0 ? (
        <>
          <Text style={styles.productsOrderText}>My products order</Text>
          {orders.map((order) => (
            <MyOrderedCard key={order.id} order={order} />
          ))}
        </>
      ) : (
        <Text style={styles.productsOrderText}>No orders at moment</Text>
      )}
    </View>
  );
};

export default ProductOrdered;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  productsOrderText: {
    fontFamily: AmazonEmber,
    fontSize: 18,
  },
});
