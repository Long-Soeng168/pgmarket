import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./app/navigation/TabNavigator";
import ProductDetailScreen from "./app/screens/ProductDetailScreen";

import ShopScreen from "./app/screens/ShopScreen";
import ShopCategoryScreen from "./app/screens/ShopCategoryScreen";
import { SafeAreaView } from "react-native-safe-area-context";

export const favoritesContext = React.createContext();

export default function App() {
    const [favorites, setFavorites] = React.useState([]);
    console.log(JSON.stringify(favorites, null, 2));
    return (
        // <NavigationContainer>
        //     <SafeAreaView>
        //         {/* <ShopScreen /> */}
        //         <ShopCategoryScreen />
        //     </SafeAreaView>
        // </NavigationContainer>

        <favoritesContext.Provider value={[favorites, setFavorites]}>
            <NavigationContainer>
                <SafeAreaView style={{ flex: 1 }}>
                    <TabNavigator />
                </SafeAreaView>
            </NavigationContainer>
        </favoritesContext.Provider>
    );
}
