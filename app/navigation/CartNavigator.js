import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartScreen from "../screens/CartScreen";
import CheckoutProcess from "../screens/cart/CheckoutPrecess";
import PaymentProcess from "../screens/cart/PaymentProcess";
import LoginScreenCart from "../screens/cart/LoginScreenCart";
import RegisterScreenCart from "../screens/cart/RegisterScreenCart";

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="CartScreen"
                component={CartScreen}
                options={{
                    title: "Cart",
                    headerTitleAlign: "center",
                }}
            />
            <Stack.Screen
                name="CheckoutProcess"
                component={CheckoutProcess}
                options={{
                    headerShown: false,
                    // title: "Checkout Process",
                    // headerTitleAlign: "center",
                }}
            />
            <Stack.Screen
                name="LoginScreenCart"
                component={LoginScreenCart}
                options={{
                    headerShown: false,
                    // title: "Checkout Process",
                    // headerTitleAlign: "center",
                }}
            />
            <Stack.Screen
                name="RegisterScreenCart"
                component={RegisterScreenCart}
                options={{
                    headerShown: false,
                    // title: "Checkout Process",
                    // headerTitleAlign: "center",
                }}
            />
            
        </Stack.Navigator>
    );
}
