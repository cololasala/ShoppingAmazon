import CustomActivityIndicator from "@/components/shared/CustomActivityIndicator";
import ProductCard from "@/components/shared/ProductCard";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types/product";
import { AmazonEmber } from "@/utils/constants/constants";
import { productMapper, ProductResponse } from "@/utils/mappers/productMapper";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const Search = () => {
  const { query } = useLocalSearchParams();
  const [products, setProducts] = useState<Product[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getProducts = async () => {
    if (!query || query.length < 3) return setProducts([]);
    setLoading(true);
    try {
      const { data = [] } = await supabase
        .from("products")
        .select("*")
        .ilike("name", `%${query}%`);
      const dataMapped = productMapper(data as ProductResponse[]);
      setProducts(dataMapped);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [query]);

  const onProductPress = (idProduct: string) => {
    router.push(`/product/${idProduct}`);
  };

  return (
    <View style={styles.mainContainer}>
      {loading ? (
        <CustomActivityIndicator size={22} />
      ) : (
        <FlatList
          ListEmptyComponent={
            query?.length >= 3 && products.length === 0 ? (
              <Text style={styles.noFoundText}>Products not found...</Text>
            ) : null
          }
          data={products}
          numColumns={3}
          scrollEnabled={false}
          contentContainerStyle={{
            marginTop: 10,
            width: "100%",
            padding: 20,
          }}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }: any) => (
            <ProductCard
              product={item}
              onProductPress={() => onProductPress(item.id)}
            />
          )}
        />
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  noFoundText: {
    fontFamily: AmazonEmber,
    fontSize: 16,
    textAlign: "center",
  },
});
