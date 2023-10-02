import React from "react";
import { Image, Text, View } from "react-native";
import { FlatList } from "react-native";

import { cartContext } from "../../App";

import colors from "../config/colors";
import CartItem from "../components/CartItem";

export default function CartScreen() {
    const [cartItems, setCartItems] = React.useContext(cartContext);

    return (
        <View style={{ backgroundColor: colors.white, flex: 1 }}>
            <FlatList
                data={cartItems}
                renderItem={({ item }) => <CartItem item={item} />}
            />
        </View>
    );
}
