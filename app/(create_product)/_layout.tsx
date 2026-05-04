import Header from "@/components/shared/header/Header";
import {
    HeaderLeftBack,
    HeaderTitle,
} from "@/components/shared/header/HeaderTitleBack";
import { router, Stack } from "expo-router";
import React from "react";

const CreateProductLayout = () => {
  const onBack = () => {
    router.back();
  };
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="createProduct"
        options={{
          headerShown: true,
          header: (props) => <Header {...props} />,
          headerLeft: () => <HeaderLeftBack onPress={onBack} />,
          headerTitle: () => <HeaderTitle />,
        }}
      />
    </Stack>
  );
};

export default CreateProductLayout;
