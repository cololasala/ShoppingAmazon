import CustomActivityIndicator from "@/components/shared/CustomActivityIndicator";
import DefaultButton from "@/components/shared/DefaultButton";
import DeliveryLocation from "@/components/shared/DeliveryLocation";
import { HeaderTabsProps } from "@/components/shared/header/HeaderTabs";
import HomeCarousel from "@/components/shared/Screen/HomeCarousel";
import HomeSuggestions from "@/components/shared/Screen/HomeSuggestions";
import { supabase } from "@/lib/supabase";
import { showToastError } from "@/services/toastService";
import { RootState } from "@/store/store";
import { Product } from "@/types/product";
import { AmazonEmber, AmazonEmberBold } from "@/utils/constants/constants";
import { productMapper, ProductResponse } from "@/utils/mappers/productMapper";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { router } from "expo-router";
import { useNavigation } from "expo-router/build/exports";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";

const Home = () => {
  const navigation = useNavigation();
  const tabBarHeight = useBottomTabBarHeight();
  const userLogged = useSelector((state: RootState) => state.Auth.session);
  const [deals, setDeals] = useState<Product[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const tabs: HeaderTabsProps["tabs"] = [
    {
      title: "List",
      onPress: () => Alert.alert("Tab 1 pressed"),
      active: true,
    },
    {
      title: "Prime",
      onPress: () => Alert.alert("Tab 2 pressed"),
      active: false,
    },
    {
      title: "Video",
      onPress: () => Alert.alert("Tab 3 pressed"),
      active: false,
    },
  ];

  useEffect(() => {
    navigation.setOptions({
      headerSearchShown: true,
      headerTabsProps: { tabs },
    });
  }, []);

  useEffect(() => {
    getProductsDeals();
  }, []);

  const onProductPress = ({ id }: Product) => {
    router.push(`/product/${id}`);
  };

  const onPressSignIn = () => {
    router.push("/(auth)/signIn");
  };

  const getProductsDeals = async () => {
    setLoading(true);
    try {
      const { data = [] } = await supabase.from("products").select("*");
      const dataMapped = productMapper(data as ProductResponse[]);
      setDeals(dataMapped);
    } catch (error) {
      showToastError("Error", "Error obtain deals");
    } finally {
      setLoading(false);
    }
  };

  const dealsContent = () => {
    if (loading) return <CustomActivityIndicator size={34} />;

    if (userLogged) {
      return deals.length > 0 ? (
        <>
          <Text style={styles.containerText}>Deals for you</Text>
          <FlatList
            data={deals}
            numColumns={3}
            scrollEnabled={false}
            contentContainerStyle={{
              marginTop: 10,
              width: "100%",
            }}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  marginBottom: 10,
                  padding: 8,
                }}
              >
                <Pressable onPress={() => onProductPress(item)}>
                  <Text style={{ fontFamily: AmazonEmber, fontSize: 16 }}>
                    {item.name}
                  </Text>
                  <Text style={{ fontFamily: AmazonEmber, fontSize: 16 }}>
                    ${item.currentPrice.toFixed(2)}
                  </Text>
                  <Image
                    source={{ uri: item.imageUrl! }}
                    style={{ width: 80, height: 80 }}
                  />
                </Pressable>
              </View>
            )}
          />
        </>
      ) : (
        <Text
          style={{
            fontSize: 16,
            fontFamily: AmazonEmber,
            textAlign: "center",
          }}
        >
          Not deals at the moment
        </Text>
      );
    } else {
      return (
        <>
          <Text
            style={[
              styles.containerText,
              { textAlign: "center", paddingBottom: 12 },
            ]}
          >
            Sign in to see personalized recommendations
          </Text>
          <DefaultButton variant="primary" onPress={onPressSignIn}>
            Sign In
          </DefaultButton>
        </>
      );
    }
  };

  return (
    <ScrollView
      scrollEnabled={true}
      showsVerticalScrollIndicator={true}
      contentContainerStyle={{
        paddingBottom: tabBarHeight,
      }}
    >
      <DeliveryLocation />
      <HomeCarousel />
      <HomeSuggestions />

      <View style={styles.container}>{dealsContent()}</View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    marginTop: "55%",
    backgroundColor: "white",
    width: "100%",
    padding: 20,
  },
  containerText: { fontFamily: AmazonEmberBold, fontSize: 18 },
});
