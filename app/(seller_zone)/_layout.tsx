import Header from "@/components/shared/header/Header";
import {
    HeaderLeftBack,
    HeaderTitle,
} from "@/components/shared/header/HeaderTitleBack";
import Icon from "@expo/vector-icons/Entypo";
import { router, Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";

interface Tab {
  name: string;
  icon: "add-to-list" | "archive";
}

const SellerZoneLayout = () => {
  const tabs: Tab[] = [
    {
      name: "sellerPage",
      icon: "add-to-list",
    },
    {
      name: "productOrdered",
      icon: "archive",
    },
  ];
  const onBack = () => {
    router.push("/(tabs)/profile");
  };
  return (
    <Tabs>
      {tabs.map((tab) => (
        <Tabs.Screen
          name={tab.name}
          key={tab.name}
          options={{
            tabBarStyle: {
              borderTopWidth: 1,
              borderTopColor: "lightgray",
            },
            headerShown: true,
            tabBarLabel: () => null,
            header: (props) => <Header {...props} />,
            headerTitle: () => <HeaderTitle />,
            headerLeft: () => <HeaderLeftBack onPress={onBack} />,
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  flex: 1,
                  gap: 5,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    width: 50,
                    borderRadius: 25,
                    height: 4,
                    backgroundColor: focused ? "#238db0" : "transparent",
                  }}
                />
                <Icon
                  name={tab.icon as any}
                  size={30}
                  color={focused ? "#238db0" : "black"}
                />
              </View>
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default SellerZoneLayout;
