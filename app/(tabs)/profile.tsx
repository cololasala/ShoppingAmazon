import CustomActivityIndicator from "@/components/shared/CustomActivityIndicator";
import CustomBottomSheet from "@/components/shared/CustomBottomSheet";
import DefaultButton from "@/components/shared/DefaultButton";
import { supabase } from "@/lib/supabase";
import { RootState } from "@/store/newStore";
import { setSession } from "@/store/slices/authSlice";
import { AmazonEmber, AmazonEmberBold } from "@/utils/constants/constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import BottomSheet from "@gorhom/bottom-sheet";
import { router, useNavigation } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userLogged = useSelector((state: RootState) => state.Auth.session);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const userEmail = useSelector((state: RootState) => state.Auth.session)?.user
    .email;
  const [isSeller, setIsSeller] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log(userLogged?.user);
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
    router.push("/(seller_zone)/sellerPage");
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

  const onPressSignOut = async () => {
    try {
      await supabase.auth.signOut();
      dispatch(setSession(null));
      bottomSheetRef.current?.close();
    } catch (error) {
      console.warn(error);
    }
  };

  const sellerUser = async () => {
    try {
      setLoading(true);
      let { data, error } = await supabase
        .from("profiles")
        .select("is_seller")
        .eq("id", userLogged?.user.id);
      if (data && data.length > 0) setIsSeller(data[0].is_seller);
    } catch (error) {
      console.warn(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    sellerUser();
  }, []);

  if (loading) return <CustomActivityIndicator />;

  return (
    <>
      {userLogged ? (
        <View style={styles.container}>
          <Pressable
            style={{ flexDirection: "row", justifyContent: "center", gap: 5 }}
            onPress={onPressAccount}
          >
            <Text style={{ fontFamily: AmazonEmber }}>Hello, {userEmail}</Text>
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
              style={{ width: isSeller ? 150 : "100%" }}
            >
              Ordered
            </DefaultButton>
            {isSeller && (
              <DefaultButton
                variant="secondary"
                onPress={onPressSellerZone}
                styleText={{ fontSize: 16 }}
                style={{ width: 150 }}
              >
                Seller Zone
              </DefaultButton>
            )}
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
        snapPoints={["35%"]}
        content={
          <View
            style={{
              justifyContent: "space-between",
              gap: 30,
            }}
          >
            <View>
              <Text style={{ fontFamily: AmazonEmberBold, fontSize: 16 }}>
                Account user info
              </Text>
              <Text style={{ fontFamily: AmazonEmber, fontSize: 16 }}>
                User: {userLogged?.user.email}
              </Text>
              <Text style={{ fontFamily: AmazonEmber, fontSize: 16 }}>
                Role: {isSeller ? "Seller" : "Buyer"}
              </Text>
            </View>
            <DefaultButton
              variant="primary"
              onPress={onPressSignOut}
              style={{
                width: "100%",
              }}
            >
              Sign out
            </DefaultButton>
          </View>
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
