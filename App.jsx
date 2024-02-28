import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./app/navigation/TabNavigator";
import ProductDetailScreen from "./app/screens/ProductDetailScreen";

import ShopScreen from "./app/screens/ShopScreen";
import ShopCategoryScreen from "./app/screens/ShopCategoryScreen";
import { SafeAreaView } from "react-native";
import Slider from "./app/components/Slider";
import HomeScreen from "./app/screens/HomeScreen";
import storage from "./app/localStorage/storage";
import cartStorage from "./app/localStorage/cartStorage";
import favoriteStorage from "./app/localStorage/favoriteStorage";

export const favoritesContext = React.createContext();
export const cartContext = React.createContext();
export const userContext = React.createContext();

export default function App() {
    const [favorites, setFavorites] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [user, setUser] = React.useState(null);
    // console.log(JSON.stringify(user, null, 2));
    // console.log(JSON.stringify(favorites, null, 2));
    // console.log(JSON.stringify(cartItems, null, 2));

    const restoreToken = async () => {
        const tokenString = await storage.getToken("authToken");
        const token = JSON.parse(tokenString);
        if(!token) return;
        // console.log(JSON.stringify(token, null, 2));
        setUser(token);
    }

    const restoreCartItems = async () => {
        const cartItemsString = await cartStorage.getCartItems("cartItems");
        const cartItems = JSON.parse(cartItemsString);
        if(!cartItems) {
            console.log('no cart items');
            return;
        }else {
            // console.log(JSON.stringify(cartItems, null, 2));
            setCartItems(cartItems);
        }
    }

    const restoreFavorites = async () => {
        const favoritesString = await favoriteStorage.getFavorites("favorites");
        const favorites = JSON.parse(favoritesString);
        if(!favorites) {
            console.log('no favorites');
            return;
        }else {
            // console.log(JSON.stringify(cartItems, null, 2));
            setFavorites(favorites);
        }
    }

    React.useEffect(() => {
        restoreToken();
        restoreCartItems();
        restoreFavorites();
    }, [])

    React.useEffect(() => {
        cartStorage.storeCartItems(JSON.stringify(cartItems));
    }, [cartItems])

    React.useEffect(() => {
        favoriteStorage.storeFavorites(JSON.stringify(favorites));
    }, [favorites])

    
   
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
                <userContext.Provider value={[user, setUser]} >
                    <NavigationContainer>
                        <SafeAreaView style={{ flex: 1 }}>
                            <TabNavigator />
                        </SafeAreaView>
                    </NavigationContainer>
                </userContext.Provider>
            </cartContext.Provider>
        </favoritesContext.Provider>
    );
}
