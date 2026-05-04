import CustomBottomSheet from "@/components/shared/CustomBottomSheet";
import DefaultButton from "@/components/shared/DefaultButton";
import { AmazonEmber } from "@/utils/constants/constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import BottomSheet from "@gorhom/bottom-sheet";
import { router, useNavigation } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const Profile = () => {
  const navigation = useNavigation();
  const userLogged = false;
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    navigation.setOptions({
      headerSearchShown: Boolean(userLogged),
      headerLeft: userLogged
        ? () => (
            <Image
              source={require("@/assets/images/amazon-images/amazon-logo.png")}
              style={{ width: 100, height: 30 }}
            />
          )
        : null,
    });
  }, []);

  const onPressOrdered = () => {
    router.push("/(buyer_zone)/myOrder");
  };

  const onPressSellerZone = () => {
    router.push("/(seller_zone)/sellerPage" as any);
  };

  const onPressSignIn = () => {
    router.push("/(auth)/signIn");
  };

  const onPressCreateAccount = () => {
    router.push("/(auth)/signUp");
  };

  const onPressAccount = () => {
    bottomSheetRef.current?.expand();
  };

  return (
    <>
      {userLogged ? (
        <View style={styles.container}>
          <Pressable
            style={{ flexDirection: "row", justifyContent: "center", gap: 5 }}
            onPress={onPressAccount}
          >
            <Text style={{ fontFamily: AmazonEmber }}>
              Hello, luciano.lasala12@hotmail.com
            </Text>
            <Ionicons
              name="chevron-down"
              size={18}
              color="black"
              style={{ top: 1 }}
            />
          </Pressable>
          <View
            style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}
          >
            <DefaultButton
              variant="secondary"
              onPress={onPressOrdered}
              styleText={{ fontSize: 16 }}
              style={{ width: 150 }}
            >
              Ordered
            </DefaultButton>
            <DefaultButton
              variant="secondary"
              onPress={onPressSellerZone}
              styleText={{ fontSize: 16 }}
              style={{ width: 150 }}
            >
              Seller Zone
            </DefaultButton>
          </View>
        </View>
      ) : (
        <View style={styles.noLogged}>
          <Text style={styles.signInText}>
            Sign in for the best experience!
          </Text>
          <DefaultButton
            variant="primary"
            onPress={onPressSignIn}
            style={{ width: "100%" }}
          >
            Sing In
          </DefaultButton>
          <DefaultButton
            variant="secondary"
            onPress={onPressCreateAccount}
            style={{ width: "100%" }}
          >
            Create account
          </DefaultButton>
        </View>
      )}

      <CustomBottomSheet
        ref={bottomSheetRef}
        title={"My account"}
        panDownClose={false}
        content={
          <>
            <Text style={{ fontFamily: AmazonEmber }}>Account</Text>
            <DefaultButton
              variant="primary"
              onPress={() => {}}
              style={{ width: "100%" }}
            >
              Sing out
            </DefaultButton>
          </>
        }
      />
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
    gap: 20,
  },
  noLogged: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
    gap: 10,
  },
  signInText: {
    fontFamily: AmazonEmber,
    fontSize: 18,
  },
});
