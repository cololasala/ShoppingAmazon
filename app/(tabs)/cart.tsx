import DefaultButton from "@/components/shared/DefaultButton";
import DeliveryLocation from "@/components/shared/DeliveryLocation";
import ProductCartItem from "@/components/shared/ProductCartItem";
import { supabase } from "@/lib/supabase";
import { showToastError, showToastSuccess } from "@/services/toastService";
import { persistor, RootState } from "@/store/newStore";
import { clearCart } from "@/store/slices/cartSlice";
import { AmazonEmber, AmazonEmberBold } from "@/utils/constants/constants";
import { deliveryDate } from "@/utils/deliveryDate";
import { router, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
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
  const navigation = useNavigation();
  const { items: cartItems, subtotal: cartSubtotal } = useSelector(
    (state: RootState) => state.Cart,
  );
  const userLogged = useSelector((state: RootState) => state.Auth.session);
  const dispatch = useDispatch();
  const [address, setAddress] = useState<any | null>(null);

  const onPressSignIn = () => {
    router.push("/(auth)/signIn");
  };

  const onPressCreateAccount = () => {
    router.push("/(auth)/signUp");
  };

  const handleClearCart = () => {
    persistor.purge().then(() => dispatch(clearCart()));
  };

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

  useEffect(() => {
    if (userLogged?.user.id) {
      getInfoLocation();
    }
  }, []);

  const getInfoLocation = async () => {
    try {
      const { data: address, error } = await supabase
        .from("profiles")
        .select("location, full_name")
        .eq("id", userLogged?.user.id)
        .single();

      if (error) {
        showToastError("Error", "Error when obtain address location");
        return;
      }

      if (address) {
        setAddress(address);
      }
    } catch (error) {
      showToastError("Error", "Error when obtain location");
    }
  };

  const handleBuyCartItems = async () => {
    try {
      const formattedItems = cartItems.map((cartItem) => {
        const { product, quantity } = cartItem;
        return {
          product_name: product.name,
          delivery_address: `${address?.full_name} ${address?.location}`,
          image: product.imageUrl,
          buyer_id: userLogged?.user.id,
          current_price: product.currentPrice,
          delivery_date: deliveryDate(Number(product.deliveryInDays), "es-AR"),
          delivery_price: product.deliveryPrice,
          seller_id: product.user_id,
          quantity,
          total: Number(product.deliveryPrice) * Number(quantity),
        };
      });
      const { error } = await supabase
        .from("orders")
        .insert(formattedItems)
        .select();
      if (error) showToastError("Error", "Error when buy cart items");
      if (!error) {
        showToastSuccess("Success", "Product ordered successfully");
        handleClearCart();
        router.push("/(buyer_zone)/thanksBuying");
      }
    } catch (error) {
      showToastError("Error", "Error when buy cart items");
    }
  };

  return (
    <ScrollView
      scrollEnabled={true}
      showsVerticalScrollIndicator={true}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
      style={styles.mainContainer}
    >
      {userLogged ? (
        <>
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
                      <Text
                        style={{ fontFamily: AmazonEmber, color: "#dc2626" }}
                      >
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
                        onPress={handleBuyCartItems}
                      >
                        <Text>
                          {`Process to buy ${cartItems.length}`}
                          {cartItems.length > 1 ? "items" : "item"}
                        </Text>
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
          </View>
        </>
      ) : (
        <View style={styles.authButtonsContainer}>
          <Text style={styles.signInText}>
            Sign in for the best experience!
          </Text>
          <DefaultButton
            variant="primary"
            onPress={onPressSignIn}
            style={{ width: "100%" }}
          >
            <Text>Sign in</Text>
          </DefaultButton>
          <DefaultButton
            variant="secondary"
            onPress={onPressCreateAccount}
            style={{ width: "100%" }}
          >
            <Text>Create account</Text>
          </DefaultButton>
        </View>
      )}
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 10,
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
  signInText: {
    fontFamily: AmazonEmber,
    fontSize: 18,
  },
});
