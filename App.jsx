import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./app/navigation/TabNavigator";
import ProductDetailScreen from "./app/screens/ProductDetailScreen";

import ShopScreen from "./app/screens/ShopScreen";
import ShopCategoryScreen from "./app/screens/ShopCategoryScreen";
import { SafeAreaView } from "react-native";
import Slider from "./app/components/Slider";
import HomeScreen from "./app/screens/HomeScreen";

export const favoritesContext = React.createContext();
export const cartContext = React.createContext();

export default function App() {
    const [favorites, setFavorites] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    // console.log(JSON.stringify(favorites, null, 2));
    console.log(JSON.stringify(cartItems, null, 2));
    return (
        
        // <NavigationContainer>
            // <SafeAreaView>
            //     {/* <ShopScreen /> */}
            //     {/* <ShopCategoryScreen /> */}
            //     {/* <Slider /> */}
            // </SafeAreaView>
        // </NavigationContainer>

        <favoritesContext.Provider value={[favorites, setFavorites]}>
            <cartContext.Provider value={[cartItems, setCartItems]}>
                <NavigationContainer>
                    <SafeAreaView style={{ flex: 1 }}>
                        <TabNavigator />
                    </SafeAreaView>
                </NavigationContainer>
            </cartContext.Provider>
        </favoritesContext.Provider>
    );
}
