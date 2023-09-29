import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./app/navigation/TabNavigator";
import ProductDetailScreen from "./app/screens/ProductDetailScreen";
import { SafeAreaView } from "react-native";

import ShopScreen from "./app/screens/ShopScreen";

export const favoritesContext = React.createContext();

export default function App() {
    const [favorites, setFavorites] = React.useState([]);
    console.log(JSON.stringify(favorites, null, 2));
    return (
        <NavigationContainer>
            <ShopScreen />
        </NavigationContainer>
        // <favoritesContext.Provider value={[favorites, setFavorites]}>
        //     <NavigationContainer>
        //         <SafeAreaView style={{ flex: 1 }}>
        //             <TabNavigator />
        //         </SafeAreaView>
        //     </NavigationContainer>
        // </favoritesContext.Provider>
    );
}
