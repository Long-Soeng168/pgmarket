import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native";

import { cartContext } from "../../App";

import colors from "../config/colors";
import CartItem from "../components/CartItem";
import { rows } from "deprecated-react-native-prop-types/DeprecatedTextInputPropTypes";

export default function CartScreen() {
    const [cartItems, setCartItems] = React.useContext(cartContext);

    let totalPrice = 0;
    cartItems.forEach((cartItem) => {
        totalPrice =
            (totalPrice * 100 + cartItem.quantity * (cartItem.price * 100)) /
            100;
    });
    console.log(totalPrice);

    return (
        <View style={{ backgroundColor: colors.white, flex: 1 }}>
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <CartItem item={item} />}
            />
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: colors.secondary,
                    padding: 10,
                    bottom: 10,
                    marginHorizontal: 10,
                    borderRadius: 15,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                    }}
                >
                    <Text style={{ fontSize: 18, color: colors.dark }}>
                        Total Price :
                    </Text>
                    <Text
                        style={{
                            fontSize: 24,
                            color: colors.danger,
                            fontWeight: "500",
                        }}
                    >
                        $ {totalPrice}
                    </Text>
                </View>
                <TouchableOpacity
                    style={{
                        backgroundColor: colors.primary,
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 10,
                        borderRadius: 10,
                    }}
                >
                    <Text style={{ color: colors.white, fontSize: 16 }}>
                        Checkout
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
