import { persistor } from "@/store/newStore";
import { addCartItem, removeCartItem } from "@/store/slices/cartSlice";
import { Product } from "@/types/product";
import { AmazonEmber, AmazonEmberBold } from "@/utils/constants/constants";
import MIcon from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

interface ProductCartItemProps {
  product: Product;
  quantity: number;
}
const ProductCartItem = ({ product, quantity }: ProductCartItemProps) => {
  const dispatch = useDispatch();

  const handleAddItem = (product: Product, quantity: number) => {
    persistor.purge().then(() => dispatch(addCartItem({ product, quantity })));
  };

  const handleDeleteItem = (product: Product, quantity: number) => {
    persistor
      .purge()
      .then(() => dispatch(removeCartItem({ product, quantity })));
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Image style={styles.imageStyle} source={{ uri: product.imageUrl! }} />
        <View style={{ width: "50%", padding: 20, gap: 5 }}>
          <Text
            numberOfLines={4}
            ellipsizeMode="tail"
            style={{ fontFamily: AmazonEmber, fontSize: 16, marginBottom: 5 }}
          >
            {product.name}
          </Text>
          <Text style={{ fontFamily: AmazonEmberBold, fontSize: 24 }}>
            ${product.currentPrice.toFixed(2)}
          </Text>
          <Text style={{ fontFamily: AmazonEmberBold, color: "#333" }}>
            {product.deliveryPrice === 0
              ? "Free"
              : `$${product.deliveryPrice.toFixed(2)} (D.P)`}
          </Text>
          {product.isAmazonChoice && (
            <Image
              source={require("@/assets/images/amazon-images/prime-label.png")}
              style={{ height: 30, width: 70, marginVertical: 5 }}
            />
          )}
        </View>
      </View>

      <View style={{ flexDirection: "row", gap: 14 }}>
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => handleAddItem(product, 1)}
        >
          <Text style={{ fontFamily: AmazonEmber }}>{quantity}</Text>
          <MIcon name="plus" size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteItem(product, 1)}
        >
          <Text style={{ fontFamily: AmazonEmber }}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductCartItem;

const styles = StyleSheet.create({
  mainContainer: {
    gap: 20,
    marginBottom: 10,
  },
  container: {
    flexDirection: "row",
    minHeight: 140,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    overflow: "hidden",
  },
  imageStyle: {
    height: "100%",
    width: "50%",
    backgroundColor: "#ccc",
    padding: 10,
  },
  plusButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#f1b023",
    paddingVertical: 12,
    paddingHorizontal: 10,
    gap: 8,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#999",
    backgroundColor: "#ffff",
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
});
