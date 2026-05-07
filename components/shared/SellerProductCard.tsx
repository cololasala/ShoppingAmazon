import { supabase } from "@/lib/supabase";
import { showToastError, showToastSuccess } from "@/services/toastService";
import { Product } from "@/types/product";
import { AmazonEmber } from "@/utils/constants/constants";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useCustomModal } from "./CustomModal/useCustomModal";
import DefaultButton from "./DefaultButton";

interface SellerProductCardProps {
  product: Product;
  onDeleteProduct: () => void;
}

const SellerProductCard = ({
  product,
  onDeleteProduct,
}: SellerProductCardProps) => {
  const { showModal, hideModal } = useCustomModal();
  const formatName = (name: string) => {
    return name.length > 18 ? name.slice(0, 18) + "..." : name;
  };

  const onAcceptDelete = async () => {
    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", product.id);
      if (error) {
        showToastError("Error", "Error trying to delete product");
        return;
      }
      showToastSuccess("Success", "Product deleted successfully");
      hideModal();
      onDeleteProduct();
    } catch (error) {
      showToastError("Error", "Error trying to delete product");
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Image
          source={{ uri: product.imageUrl! }}
          style={{ width: 55, height: 55 }}
        />
        <Text
          style={[
            styles.descriptionText,
            { flexShrink: 1, flexWrap: "wrap", lineHeight: 18 },
          ]}
          numberOfLines={2}
        >
          {formatName(product.name)}
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.descriptionText}>
          C.P ${product.currentPrice.toFixed(2)}
        </Text>
        <Text style={styles.descriptionText}>
          D. P ${product.deliveryPrice.toFixed(2)}
        </Text>
        <Pressable
          onPress={() =>
            showModal(
              `Are you sure you want to delete this product? "${product.name}"`,
              <View style={{ marginTop: 5, gap: 10 }}>
                <DefaultButton variant="primary" onPress={onAcceptDelete}>
                  <Text>Accept</Text>
                </DefaultButton>
                <DefaultButton variant="secondary" onPress={hideModal}>
                  <Text>Cancel</Text>
                </DefaultButton>
              </View>,
            )
          }
        >
          <FontAwesome name="trash-o" size={22} color="red" />
        </Pressable>
      </View>
    </View>
  );
};

export default SellerProductCard;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    backgroundColor: "lightgray",
    width: "100%",
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "gray",
    borderWidth: 1,
  },
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    width: "50%",
  },
  descriptionText: {
    fontFamily: AmazonEmber,
    fontSize: 16,
  },
});
