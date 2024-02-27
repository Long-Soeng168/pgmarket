import React from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native";

import { cartContext, userContext } from "../../App";

import colors from "../config/colors";
import CartItem from "../components/CartItem";
import HeaderText from "../components/HeaderText";

export default function CartScreen({navigation}) {
    const [cartItems, setCartItems] = React.useContext(cartContext);
    console.log(JSON.stringify(cartItems, null, 2));
    const [user, setUser] = React.useContext(userContext);

    let totalPrice = 0;
    cartItems.forEach((cartItem) => {
        totalPrice =
            (totalPrice * 100 + cartItem.quantity * (cartItem.price * 100)) /
            100;
    });
    console.log(totalPrice);

    const handleCheckout = () => {
        if(user) {
            user.user.type_roles === "customer" 
            ? 
            navigation.navigate('CheckoutProcess')
            :
            Alert.alert('Message', 'Dealer account cannot buy!')
            

        }else {
            navigation.navigate('LoginScreenCart')
        }
    }

    return (
        <View style={{ backgroundColor: colors.white, flex: 1 }}>
            <HeaderText title="Cart" showBackBtn={false}/>
            {cartItems.length < 1 
              &&
              <View
                style={{ 
                    justifyContent: 'center',
                    alignItems: 'center',
                    // backgroundColor: 'red',
                    height: '100%'
                 }}
              >
                  <Text>No Item</Text> 
              </View> 
            }
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <CartItem item={item} 
                        title = {item.pro_name}
                        imageUrl = {"https://pgmarket.longsoeng.website/public/images/product/" + item.thumbnail}
                        buyerNote= {item.note}
                        price = {item.price}
                        color = {item.color}
                        size = {item.size}
                    />
                )}
            />
            {cartItems.length > 0 && <View
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
                    onPress={() => handleCheckout()}
                >
                    <Text style={{ color: colors.white, fontSize: 16 }}>
                        Checkout
                    </Text>
                </TouchableOpacity>
            </View>}
        </View>
    );
}
