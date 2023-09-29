import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import CategoryScreen from "../screens/CategoryScreen";
import SearchScreen from "../screens/SearchScreen";
import SeeMoreScreen from "../screens/SeeMoreScreen";
import ShopScreen from "../screens/ShopScreen";

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ProductDetailScreen"
                component={ProductDetailScreen}
                options={{
                    title: "Product Detail",
                    headerTitleAlign: "center",
                }}
            />
            <Stack.Screen
                name="CategoryScreen"
                component={CategoryScreen}
                options={({ route }) => ({
                    title: route.params.title,
                    headerTitleAlign: "center",
                })}
            />
            <Stack.Screen
                name="SeeMoreScreen"
                component={SeeMoreScreen}
                options={{
                    // headerShown: false
                    title: "All Product",
                    headerTitleAlign: "center",
                }}
            />
            <Stack.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ShopScreen"
                component={ShopScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
