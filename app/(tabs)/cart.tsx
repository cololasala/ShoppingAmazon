import DefaultButton from "@/components/shared/DefaultButton";
import DeliveryLocation from "@/components/shared/DeliveryLocation";
import ProductCartItem from "@/components/shared/ProductCartItem";
import { persistor, RootState } from "@/store/newStore";
import { clearCart } from "@/store/slices/cartSlice";
import { AmazonEmber, AmazonEmberBold } from "@/utils/constants/constants";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const { items: cartItems, subtotal: cartSubtotal } = useSelector(
    (state: RootState) => state.Cart,
  );
  const userLogged = useSelector((state: RootState) => state.Auth.session);
  const dispatch = useDispatch();

  const onPressSignIn = () => {
    router.push("/(auth)/signIn");
  };

  const onPressCreateAccount = () => {
    router.push("/(auth)/signUp");
  };

  const handleClearCart = () => {
    persistor.purge().then(() => dispatch(clearCart()));
  };

  return (
    <ScrollView
      scrollEnabled={true}
      showsVerticalScrollIndicator={true}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
      style={styles.mainContainer}
    >
      <DeliveryLocation />

      <View style={styles.container}>
        {cartItems.length ? (
          <>
            <View style={{ gap: 20 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.subtotalText}>
                  Subtotal: ${Number(cartSubtotal).toFixed(2)}
                </Text>
                <TouchableOpacity
                  style={styles.clearCartButton}
                  onPress={handleClearCart}
                >
                  <Text style={{ fontFamily: AmazonEmber, color: "#dc2626" }}>
                    Clear cart
                  </Text>
                </TouchableOpacity>
              </View>

              {userLogged ? (
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <DefaultButton
                    variant="primary"
                    style={styles.checkoutButton}
                    onPress={() => {}}
                  >
                    <Text>{`Process to checkout ${cartItems.length} items`}</Text>
                  </DefaultButton>
                </View>
              ) : null}

              {cartItems.map((cartItem) => (
                <ProductCartItem
                  key={cartItem.product.id}
                  product={cartItem.product}
                  quantity={cartItem.quantity}
                />
              ))}
            </View>
          </>
        ) : (
          <>
            <Image
              source={require("@/assets/images/amazon-images/empty-cart.png")}
              style={styles.imageStyle}
            />
            <Text style={styles.emptyText}>Your Amazon cart is empty!</Text>
          </>
        )}

        {!userLogged && (
          <View style={styles.authButtonsContainer}>
            <DefaultButton variant="primary" onPress={onPressSignIn}>
              <Text>Sign in</Text>
            </DefaultButton>
            <DefaultButton variant="secondary" onPress={onPressCreateAccount}>
              <Text>Create account</Text>
            </DefaultButton>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
  },
  container: {
    padding: 20,
    alignItems: "center",
  },
  subtotalText: {
    fontFamily: AmazonEmber,
    fontSize: 24,
  },
  imageStyle: {
    width: 250,
    height: 200,
  },
  emptyText: {
    fontFamily: AmazonEmberBold,
    fontSize: 22,
  },
  authButtonsContainer: {
    marginTop: 20,
    gap: 15,
    width: "100%",
  },
  checkoutButton: {
    width: "80%",
  },
  clearCartButton: {
    backgroundColor: "#fff",
    borderWidth: 3,
    borderColor: "#dc2626",
    borderRadius: 50,
    padding: 15,
  },
});
