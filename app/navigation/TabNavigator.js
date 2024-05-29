import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons";

import HomeNavigator from "./HomeNavigator";
import FavoriteNavigator from "./FavoriteNavigator";
import CartNavigator from "./CartNavigator";
import AccountNavigator from "./AccountNavigator";
// import AllCategoryScreen from "../screens/AllCategoryScreen";
import ShopsNavigator from "./ShopsNavigator";
import { Text, View } from "react-native";
import colors from "../config/colors";
import { cartContext } from "../../App";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    const [cartItems, setCartItems] = React.useContext(cartContext);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "tomato",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarLabel: "Home",
          tabBarStyle: { padding: 5 },
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={size * 1.2}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ShopsNavigator"
        component={ShopsNavigator}
        options={{
          title: "All Category",
          headerTitleAlign: "center",
          tabBarLabel: "Shops",
          tabBarStyle: { padding: 5 },
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "apps-sharp" : "apps-outline"}
              color={color}
              size={size * 1.2}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteNavigator}
        options={{
          tabBarLabel: "Favorite",
          tabBarStyle: { padding: 5 },
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "cards-heart" : "cards-heart-outline"}
              color={color}
              size={size * 1.2}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          tabBarLabel: "Cart",
          tabBarStyle: { padding: 5 },
          tabBarIcon: ({ color, size, focused }) => (
            <View
              style={{
                // backgroundColor: 'tomato',
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                name={focused ? "cart" : "cart-outline"}
                color={color}
                size={size * 1.2}
              />
              <View
                style={{
                  position: "absolute",
                  right: -12,
                  // top: 0,
                  backgroundColor: colors.accent,
                  paddingHorizontal: 4,
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: 'white'
                }}
              >
                <Text
                  style={{
                    color: "white",
                  }}
                >
                  {cartItems.length}
                </Text>
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          tabBarLabel: "Account",
          tabBarStyle: { padding: 5 },
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "account" : "account-outline"}
              color={color}
              size={size * 1.2}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
