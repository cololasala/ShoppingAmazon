import CustomActivityIndicator from "@/components/shared/CustomActivityIndicator";
import DefaultButton from "@/components/shared/DefaultButton";
import SellerProductCard from "@/components/shared/SellerProductCard";
import { supabase } from "@/lib/supabase";
import { RootState } from "@/store/newStore";
import { Product } from "@/types/product";
import { AmazonEmber } from "@/utils/constants/constants";
import { productMapper, ProductResponse } from "@/utils/mappers/productMapper";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

const SellerPage = () => {
  const [products, setProducts] = useState<Product[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const userLogged = useSelector((state: RootState) => state.Auth.session);

  const onPressCreateProduct = () => {
    router.push("/(create_product)/createProduct");
  };

  const getProducts = async () => {
    setLoading(true);
    try {
      const { data = [] } = await supabase
        .from("products")
        .select("*")
        .eq("user_id", userLogged?.user.id)
        .order("created_at", { ascending: false });
      const dataMapped = productMapper(data as ProductResponse[]);
      setProducts(dataMapped);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getProducts();
    }, []),
  );

  return (
    <View style={{ padding: 20 }}>
      <DefaultButton variant="primary" onPress={onPressCreateProduct}>
        Create a product
      </DefaultButton>
      <View>
        {!loading ? (
          products.length > 0 ? (
            <>
              <Text style={styles.title}>My products</Text>
              {products.map((product) => (
                <SellerProductCard
                  key={product.id}
                  product={product}
                  onDeleteProduct={getProducts}
                />
              ))}
            </>
          ) : null
        ) : (
          <CustomActivityIndicator />
        )}
      </View>
    </View>
  );
};

export default SellerPage;

const styles = StyleSheet.create({
  title: {
    fontFamily: AmazonEmber,
    fontSize: 18,
    marginVertical: 10,
  },
});
