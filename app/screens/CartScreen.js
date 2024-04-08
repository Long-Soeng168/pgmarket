import React from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native";

import { cartContext, userContext } from "../../App";

import colors from "../config/colors";
import CartItem from "../components/CartItem";
import HeaderText from "../components/HeaderText";
import { useTranslation } from "react-i18next";

export default function CartScreen({navigation}) {
    const [cartItems, setCartItems] = React.useContext(cartContext);
    console.log(JSON.stringify(cartItems, null, 2));
    const [user, setUser] = React.useContext(userContext);
    
    const [t, i18n] = useTranslation('global');

    let totalPrice = 0;
    cartItems.forEach((cartItem) => {
        
            let discountPrice = cartItem.discount_data ? parseFloat(cartItem.discount_data).toFixed(2) : 0;
            let price = cartItem.price - discountPrice;

            totalPrice =
                (totalPrice * 100 + cartItem.quantity * (price * 100)) /
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
            <HeaderText title="cart" showBackBtn={false}/>
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
                  <Text>{ t('noItem') }</Text> 
              </View> 
            }
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <CartItem item={item} 
                        title = {item.pro_name}
                        imageUrl = {"https://pgmarket.online/public/images/product/" + item.thumbnail}
                        buyerNote= {item.note}
                        price = {item.price}
                        color = {item.color}
                        size = {item.size}
                    />
                )}
                contentContainerStyle={{ paddingBottom: 20 }}
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
                        {t('totalPrice')} :
                    </Text>
                    <Text
                        style={{
                            fontSize: 24,
                            color: colors.danger,
                            fontWeight: "500",
                        }}
                    >
                        $ {totalPrice.toFixed(2)}
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
                        {t('checkout')}
                    </Text>
                </TouchableOpacity>
            </View>}
        </View>
    );
}
