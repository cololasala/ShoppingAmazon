import CustomActivityIndicator from "@/components/shared/CustomActivityIndicator";
import OrderCard from "@/components/shared/OrderCard";
import { supabase } from "@/lib/supabase";
import { showToastError } from "@/services/toastService";
import { RootState } from "@/store/store";
import { Order } from "@/types/order";
import { AmazonEmber } from "@/utils/constants/constants";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

const MyOrder = () => {
  const userLogged = useSelector((state: RootState) => state.Auth.session);
  const [orders, setOrders] = useState<Order[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getOrders = async () => {
    setLoading(true);
    try {
      const { data = [], error } = await supabase
        .from("orders")
        .select("*")
        .eq("buyer_id", userLogged?.user?.id);
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

  useEffect(() => {
    getOrders();
  }, []);

  if (loading) return <CustomActivityIndicator />;

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.myOrdersText}>My orders</Text>

      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </View>
  );
};

export default MyOrder;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  myOrdersText: {
    fontFamily: AmazonEmber,
    fontSize: 18,
  },
});
