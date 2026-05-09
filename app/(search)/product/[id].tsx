import CustomActivityIndicator from "@/components/shared/CustomActivityIndicator";
import { useCustomModal } from "@/components/shared/CustomModal/useCustomModal";
import DefaultButton from "@/components/shared/DefaultButton";
import { supabase } from "@/lib/supabase";
import { showToastError } from "@/services/toastService";
import { Product } from "@/types/product";
import { AmazonEmber, AmazonEmberBold } from "@/utils/constants/constants";
import { deliveryDate } from "@/utils/deliveryDate";
import { productMapper, ProductResponse } from "@/utils/mappers/productMapper";
import { offPercentage } from "@/utils/offPercentage";
import MIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ProductPage = () => {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const { showModal, hideModal } = useCustomModal();

  const getProduct = async () => {
    setLoading(true);
    try {
      const { data } = await supabase.from("products").select("*").eq("id", id);
      const dataMapped = productMapper(data as ProductResponse[]);
      setProduct(dataMapped[0]);
    } catch (error) {
      showToastError("Error", "Error obtain deals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const onSelectQuantity = (quantity: number) => {
    setQuantity(quantity);
    hideModal();
  };

  const openModalQuantity = () => {
    //Array based in quantity
    const availableQuantity = Array.from(
      { length: product?.amountInStock! },
      (_, index) => (index + 1).toString(),
    );
    showModal(
      "Select quantity",
      <ScrollView
        scrollEnabled={true}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ maxHeight: 250 }}
      >
        <View>
          {availableQuantity.map((quantity: any) => (
            <TouchableOpacity
              key={quantity}
              style={{
                borderColor: "gray",
                backgroundColor: "lightgray",
                borderRadius: 8,
                borderWidth: 1,
                marginVertical: 4,
                padding: 10,
              }}
              onPress={() => onSelectQuantity(quantity)}
            >
              <Text
                style={{
                  fontFamily: AmazonEmber,
                  fontSize: 16,
                  textAlign: "center",
                }}
              >
                {quantity}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>,
    );
  };

  if (loading) return <CustomActivityIndicator />;

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      {product && (
        <>
          <Text style={styles.title}>Product {product.name}</Text>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: product?.imageUrl! }}
              style={{ width: 250, height: 250 }}
            />
          </View>
          <View style={styles.productContainer}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              {product.previousPrice > product.currentPrice && (
                <Text style={styles.percentagText}>
                  -{offPercentage(product.currentPrice, product.previousPrice)}%
                </Text>
              )}
              <Text style={{ fontSize: 30 }}>
                <Text style={{ fontSize: 25 }}>$</Text>
                {product.currentPrice.toFixed(2)}
              </Text>
            </View>
            <Text
              style={{
                textDecorationLine: "line-through",
                color: "gray",
                fontSize: 14,
                marginBottom: 20,
              }}
            >
              Previous Price: ${product.previousPrice.toFixed(2)}
            </Text>
            {product.isAmazonChoice && (
              <Image
                source={require("@/assets/images/amazon-images/prime-label.png")}
                style={{ height: 30, width: 70 }}
              />
            )}
            <Text>
              The prices of products sold on Amazon include GST. Depending on
              your delivery address, GST may vary at the checkout.
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginVertical: 20 }}>
            <Text>
              {product.deliveryPrice === 0
                ? "FREE"
                : `$${product.deliveryPrice}`}{" "}
              Delivery{" "}
            </Text>
            <Text style={{ fontWeight: "bold" }}>
              {deliveryDate(product.deliveryInDays, "es-AR")}
            </Text>
          </View>

          <View style={styles.stockContainer}>
            <Text style={styles.stockText}>
              {product.amountInStock} in Stock
            </Text>
            <TouchableOpacity
              style={styles.selectQuantity}
              onPress={openModalQuantity}
            >
              <Text>Quantity: {quantity}</Text>
              <MIcon name="chevron-down" size={22} />
            </TouchableOpacity>

            <DefaultButton variant="primary" onPress={() => {}}>
              Add to basket
            </DefaultButton>
            <DefaultButton
              style={{ backgroundColor: "#f97316" }}
              onPress={() => {
                router.push({
                  pathname: "/(buyer_zone)/buyHere",
                  params: {
                    name: product.name,
                    quantity: quantity,
                    deliveryInDays: product.deliveryInDays,
                    productImage: product.imageUrl,
                    deliveryCharge:
                      product.deliveryPrice - product.currentPrice,
                    currentPrice: product.currentPrice,
                    achoice: String(product.isAmazonChoice),
                    deliveryPrice: product.deliveryPrice,
                    sellerId: product.user_id,
                  },
                });
              }}
            >
              Buy now
            </DefaultButton>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default ProductPage;

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "white",
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "rgba(216, 225, 225, 0.84)",
    padding: 20,
  },
  productContainer: {
    marginTop: 10,
  },
  title: { fontFamily: AmazonEmberBold, fontSize: 18, marginBottom: 10 },
  percentagText: { color: "#dc2626", fontSize: 30 },
  stockText: { color: "#dc2626", fontSize: 19 },
  selectQuantity: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#eee",
    padding: 15,
    borderRadius: 8,
  },
  stockContainer: {
    gap: 15,
  },
});
