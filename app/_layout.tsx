import { CustomModalProvider } from "@/components/shared/CustomModal/CustomModalProvider";
import { toastConfig } from "@/config/toastConfig";
import { store } from "@/store/store";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded, error] = useFonts({
    "Amazon-Ember": require("../assets/fonts/Amazon-Ember.ttf"),
    "Amazon-Ember-Light": require("../assets/fonts/Amazon-Ember-Light.ttf"),
    "Amazon-Ember-Bold": require("../assets/fonts/Amazon-Ember-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 1000);
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <BottomSheetModalProvider>
          <CustomModalProvider>
            <StatusBar style="auto" />
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="(tabs)" />
            </Stack>
          </CustomModalProvider>
        </BottomSheetModalProvider>
        <Toast config={toastConfig} />
      </Provider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
