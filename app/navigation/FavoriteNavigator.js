import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavoriteScreen from "../screens/FavoriteScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";

const Stack = createNativeStackNavigator();

export default function FavoriteNavigator() {
    return (
        <Stack.Navigator >
            <Stack.Screen
                
                name="FavoriteScreen"
                component={FavoriteScreen}
                options={{ title: "Favorite", headerTitleAlign: "center", headerShown: false }}
            />
            <Stack.Screen
                name="ProductDetailScreen"
                
                options={{ 
                    title: "Product Detail", 
                    headerTitleAlign: "center" ,
                    headerTitleStyle: {color: "tomato"},
                }}

                component={ProductDetailScreen}
            />
        </Stack.Navigator>
    );
}
