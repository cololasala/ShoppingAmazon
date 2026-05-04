import Header from "@/components/shared/header/Header";
import {
  HeaderLeftBack,
  HeaderTitle,
} from "@/components/shared/header/HeaderTitleBack";
import { router, Stack } from "expo-router";
import React from "react";

const BuyerZoneLayout = () => {
  const handleBackPress = () => {
    router.back();
  };
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="location"
        options={{
          headerShown: true,
          header: (props) => <Header {...props} />,
          headerLeft: () => <HeaderLeftBack onPress={handleBackPress} />,
          headerTitle: () => <HeaderTitle />,
        }}
      />
      <Stack.Screen
        name="myOrder"
        options={{
          headerShown: true,
          header: (props) => <Header {...props} />,
          headerLeft: () => <HeaderLeftBack onPress={handleBackPress} />,
          headerTitle: () => <HeaderTitle />,
        }}
      />
    </Stack>
  );
};

export default BuyerZoneLayout;
