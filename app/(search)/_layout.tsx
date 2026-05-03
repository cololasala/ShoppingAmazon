import Header, { StackHeaderProps } from "@/components/shared/header/Header";
import { Stack } from "expo-router";
import React from "react";

const SearchLayout = () => {
  return (
    <Stack
      screenOptions={
        {
          header: (props) => <Header {...props} />,
          headerSearchShown: true,
        } as StackHeaderProps["options"]
      }
    >
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default SearchLayout;
