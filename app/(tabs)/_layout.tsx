import Headers from "@/components/shared/header/Header";
import MCIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";

interface ITabs {
  name: string;
  icon: "home-outline" | "account-outline" | "cart-check";
}

const TabLayout = () => {
  const tabs: ITabs[] = [
    { name: "index", icon: "home-outline" },
    { name: "profile", icon: "account-outline" },
    { name: "cart", icon: "cart-check" },
  ];
  const cartItems = [1, 2, 3]; // Example cart items
  return (
    <Tabs>
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            tabBarStyle: {
              borderTopWidth: 1,
              borderTopColor: "lightgray",
            },
            header: (props) => <Headers {...props} />,
            tabBarLabel: () => null,
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

                <MCIcon
                  name={tab.icon}
                  size={30}
                  color={focused ? "#238db0" : "black"}
                />
              </View>
            ),
            tabBarBadge:
              tab.name === "cart" && cartItems.length > 0
                ? cartItems.length
                : undefined,
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabLayout;
