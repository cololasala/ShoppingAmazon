import DefaultButton from "@/components/shared/DefaultButton";
import DeliveryLocation from "@/components/shared/DeliveryLocation";
import { HeaderTabsProps } from "@/components/shared/header/HeaderTabs";
import HomeCarousel from "@/components/shared/Screen/HomeCarousel";
import HomeSuggestions from "@/components/shared/Screen/HomeSuggestions";
import { deals } from "@/dummy_data/product_deal";
import { Product } from "@/types/product";
import { AmazonEmberBold } from "@/utils/constants/constants";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { router } from "expo-router";
import { useNavigation } from "expo-router/build/exports";
import React, { useEffect } from "react";
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

const Home = () => {
  const navigation = useNavigation();
  const tabBarHeight = useBottomTabBarHeight();
  const userLogged = false;
  const tabs: HeaderTabsProps["tabs"] = [
    {
      title: "Luciano List",
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
  });

  const onProductPress = ({ id }: Product) => {
    router.push(`/product/${id}` as any);
  };

  const onPressSignIn = () => {
    router.push("/(auth)/signIn");
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

      <View style={styles.container}>
        {userLogged ? (
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
                    <Text>{item.name}</Text>
                    <Text>${item.currentPrice.toFixed(2)}</Text>
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
        )}
      </View>
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
