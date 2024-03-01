import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountScreen from "../screens/AccountScreen";
import LoginScreen from "../screens/account/LoginScreen";
import RegisterScreen from "../screens/account/RegisterScreen";
import ProfileScreen from "../screens/account/ProfileScreen";
import ShopProfile from "../screens/account/ShopProfile";
import UpdateBankAccount from "../screens/account/UpdateBankAccount";

import DealerOrdersScreen from "../screens/DealerOrdersScreen";
import AccountDetailScreen from "../screens/AccountDetailScreen";
import AddProductScreen from "../screens/AddProductScreen";
import OrderDetailScreen from "../screens/OrderDetailScreen";
import UpdateShopDetail from "../screens/UpdateShopDetail";
import ShopProductDetail from "../screens/ShopProductDetail";
import ProductImagesScreen from "../screens/ProductImagesScreen";
import UpdateProductScreen from "../screens/UpdateProductScreen";
import { userContext } from "../../App";
import UserOrders from "../screens/account/UserOrders";

const Stack = createNativeStackNavigator();

export default function AccountNavigator() {
    const [user, setUser] = React.useContext(userContext);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'white' }, }}>
                {
                    user ? 
                    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
                    :
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                }
                {/* <Stack.Screen name="AccountScreen" component={AccountScreen} /> */}

            <Stack.Screen name="DealerOrdersScreen" component={DealerOrdersScreen} />
            <Stack.Screen name="AccountDetailScreen" component={AccountDetailScreen} />
            <Stack.Screen name="ShopProfile" component={ShopProfile} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="AddProductScreen" component={AddProductScreen} />
            <Stack.Screen name="OrderDetailScreen" component={OrderDetailScreen} />
            <Stack.Screen name="UpdateShopDetail" component={UpdateShopDetail} />
            <Stack.Screen name="UpdateBankAccount" component={UpdateBankAccount} />
            <Stack.Screen name="ShopProductDetail" component={ShopProductDetail} />
            <Stack.Screen name="ProductImagesScreen" component={ProductImagesScreen} />
            <Stack.Screen name="UpdateProductScreen" component={UpdateProductScreen} />
            <Stack.Screen name="UserOrders" component={UserOrders} />
        </Stack.Navigator>
    );
} 