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

import global_en from "./app/translations/en/global.json";
import global_kh from "./app/translations/kh/global.json";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

i18next.init({
    compatibilityJSON: 'v3',
    interpolation: {escapeValue: false},
    lng: 'en',
    resources: {
        en: {
            global: global_en,
        },
        kh: {
            global: global_kh,
        },
    }
})


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
        console.log(JSON.stringify(token, null, 2));
        if(!token) return;
        if(token.token) {
            const myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");
            myHeaders.append("Authorization", "Bearer " + token.token);

            const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
            };

            fetch("https://pgmarket.online/api/user", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if(result.message == 'Unauthenticated.') return;
                setUser({
                    'token': token.token,
                    'user': result
                })
                // console.log(JSON.stringify(result, null, 2));
            })
            .catch((error) => console.error(error));
        }
        
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
                    <I18nextProvider i18n={i18next}>
                        <NavigationContainer>
                            <SafeAreaView style={{ flex: 1 }}>
                                <TabNavigator />
                            </SafeAreaView>
                        </NavigationContainer>
                    </I18nextProvider>
                </userContext.Provider>
            </cartContext.Provider>
        </favoritesContext.Provider>
    );
}
