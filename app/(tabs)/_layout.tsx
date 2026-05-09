import Headers from "@/components/shared/header/Header";
import { setShippedCount } from "@/store/slices/shippedCountSlice";
import { RootState } from "@/store/store";
import { getUnshippedCount } from "@/utils/getUnshippedCount";
import MCIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

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
  const userLogged = useSelector((state: RootState) => state.Auth.session);
  const dispatch = useDispatch();

  const getShippedCount = async () => {
    try {
      const count = await getUnshippedCount(userLogged?.user.id);
      if (count !== null) {
        dispatch(setShippedCount(count));
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    if (userLogged) {
      getShippedCount();
    }
  }, [userLogged?.user.id]);

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
