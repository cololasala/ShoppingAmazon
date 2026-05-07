import { Product } from "@/types/product";
import { AmazonEmber } from "@/utils/constants/constants";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

interface ProductCardProps {
  product: Product;
  onProductPress: () => void;
}

const ProductCard = ({ product, onProductPress }: ProductCardProps) => {
  return (
    <View
      style={{
        marginBottom: 10,
        padding: 8,
      }}
    >
      <Pressable onPress={() => onProductPress()}>
        <Text style={{ fontFamily: AmazonEmber, fontSize: 16 }}>
          {product.name}
        </Text>
        <Text style={{ fontFamily: AmazonEmber, fontSize: 16 }}>
          ${product.currentPrice.toFixed(2)}
        </Text>
        <Image
          source={{ uri: product.imageUrl! }}
          style={{ width: 80, height: 80 }}
        />
      </Pressable>
    </View>
  );
};

export default ProductCard;
