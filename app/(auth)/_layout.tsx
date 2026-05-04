import Header from "@/components/shared/header/Header";
import { HeaderLeftBack } from "@/components/shared/header/HeaderTitleBack";
import { HeaderTitle } from "@react-navigation/elements";
import { router, Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
  const onPressBack = () => {
    router.back();
  };
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: (props) => <Header {...props} />,
        headerLeft: () => <HeaderLeftBack onPress={onPressBack} />,
        headerTitle: () => <HeaderTitle />,
      }}
    >
      <Stack.Screen name="signIn"></Stack.Screen>
      <Stack.Screen name="signUp"></Stack.Screen>
    </Stack>
  );
};

export default AuthLayout;
