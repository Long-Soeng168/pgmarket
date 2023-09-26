import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import HomeNavigator from "./HomeNavigator";
import FavoriteNavigator from "./FavoriteNavigator";
import CartNavigator from "./CartNavigator";
import AccountNavigator from "./AccountNavigator";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}
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
                            size={size * 1.1}
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
                            name={
                                focused ? "cards-heart" : "cards-heart-outline"
                            }
                            color={color}
                            size={size * 1.1}
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
                        <MaterialCommunityIcons
                            name={focused ? "cart" : "cart-outline"}
                            color={color}
                            size={size * 1.1}
                        />
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
                            size={size * 1.1}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
