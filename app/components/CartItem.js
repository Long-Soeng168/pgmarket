import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { cartContext } from "../../App";

import colors from "../config/colors";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import ActivityIndicator from "../components/ActivityIndicator";
import { TouchableWithoutFeedback } from "react-native";
import { useTranslation } from "react-i18next";

export default function CartItem({ item, title, buyerNote, imageUrl, price, color, size }) {

    const buyerNoteNoHtml = stripHtmlTags(buyerNote);
    const [t, i18n] = useTranslation("global");
    const [cartItems, setCartItems] = React.useContext(cartContext);

    let proPrice = parseFloat(item.price).toFixed(2);
    let discountPrice = item.discount_data ? parseFloat(item.discount_data).toFixed(2) : 0;

    const removeFromCart = () => {
        setCartItems((preCartItems) =>
            preCartItems.filter((preCartItem) => preCartItem.id !== item.id)
        );
    };

    const decreaseQty = () => {
        setCartItems((preCartItems) =>
            preCartItems.map((preCartItem) => {
                if (preCartItem.id === item.id) {
                    if (item.quantity === 1) return preCartItem;
                    else {
                        const newItem = {
                            ...item,
                            quantity: item.quantity - 1,
                        };
                        return newItem;
                    }
                } else return preCartItem;
            })
        );
    };

    const increaseQty = () => {
        setCartItems((preCartItems) =>
            preCartItems.map((preCartItem) => {
                if (preCartItem.id === item.id) {
                    const newItem = {
                        ...item,
                        quantity: item.quantity + 1,
                    };
                    return newItem;
                } else return preCartItem;
            })
        );
    };

    return (
        <View>
            <View style={styles.container}>
                {/* Remove Button */}
                <RemoveButton onPress={removeFromCart} />

                <Image
                    style={styles.image}
                    source={{
                        uri: imageUrl,
                    }}
                />
                <View style={styles.rightSideContainer}>
                    <View style={styles.textContainer}>
                        <Text numberOfLines={1} style={styles.title}>
                            {title}
                        </Text>
                        <Text numberOfLines={1} style={styles.buyerNote}>
                            {t('note')}: {buyerNoteNoHtml}
                        </Text>
                        <Text numberOfLines={1} style={styles.pricePerUnit}>
                            <Text
                                style={{ 
                                    textDecorationLine: discountPrice > 0 ? 'line-through' : 'none',
                                 }}
                            >$ {proPrice}</Text>  
                            {discountPrice > 0 && <Text> $ {(proPrice - discountPrice).toFixed(2)}  </Text>} 
                            {/* {color && ` (${t('color')}: ${color})` }  */}
                            {color && ` (${color})` } 
                            {/* {size && ` (${t('size')}: ${size})`} */}
                            {size && ` (${size})`}
                        </Text>
                    </View>
                    <View style={styles.updateContainer}>
                        {/* Quantity */}
                        <View style={styles.updateQty}>
                            <QtyButton icon="minus" onPress={decreaseQty} />
                            <Text style={styles.Qty}>{item.quantity}</Text>
                            <QtyButton icon="plus" onPress={increaseQty} />
                        </View>
                        {/* End Quantity */}
                        <Text numberOfLines={1} style={styles.totalPrice}>
                            $ {(item.quantity * (proPrice - discountPrice)).toFixed(2)}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

//Remove Button
function RemoveButton({ onPress }) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.deleteBtn}
            onPress={onPress}
        >
            <Feather
                style={styles.deleteIcon}
                name="x"
                size={25}
                color={colors.danger}
            />
        </TouchableOpacity>
    );
}

//Quantity Button
function QtyButton({ onPress, icon }) {
    return (
        <TouchableWithoutFeedback activeOpacity={0.8} onPress={onPress}>
            <FontAwesome
                style={styles.decreaseQty}
                name={icon}
                size={20}
                color={colors.dark}
            />
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    deleteBtn: {
        position: "absolute",
        zIndex: 100,
        right: -5,
        top: -5,
    },
    deleteIcon: { backgroundColor: colors.white, borderRadius: 100 },

    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.mdLight,
        height: 110,
        margin: 10,
        marginBottom: 0,
        padding: 5,
        borderRadius: 10,
    },
    image: {
        backgroundColor: colors.white,
        aspectRatio: 1,
        height: "100%",
        borderRadius: 5,
        objectFit: "cover",
    },
    rightSideContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        // backgroundColor: 'red',
        marginLeft: 10,
        flex: 1,
        height: "100%",
    },
    textContainer: {
        justifyContent: "flex-start",
    },

    title: { fontSize: 16, fontWeight: "500" },
    buyerNote: { fontSize: 14, color: colors.medium },
    pricePerUnit: { fontSize: 14, color: colors.dark },

    updateContainer: {
        // flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // marginRight: 5,
        // padding: 5,
        // backgroundColor: 'yellow'
    },

    updateQty: {
        maxWidth: 130,
        flexDirection: "row",
        // height: "100%",
        alignItems: "center",
        gap: 10,
        // backgroundColor: 'green'
    },
    increaseQty: {
        backgroundColor: colors.secondary,
        padding: 3,
        borderRadius: 5,
    },
    Qty: { fontSize: 16, fontWeight: "500", textAlign: "center", minWidth: 22 },
    decreaseQty: {
        backgroundColor: colors.secondary,
        padding: 3,
        borderRadius: 5,
    },
    totalPrice: {
        fontSize: 20,
        color: colors.danger,
        fontWeight: "500",
    },
});


const stripHtmlTags = (htmlString) => {
    // Remove HTML tags, attributes, and entities using regular expressions
    if(htmlString) {
        return htmlString
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/(\w+)\s*=\s*("[^"]*")/g, '') // Remove attributes
        .replace(/&\w+;/g, ''); // Remove HTML entities
    }else {
        return htmlString;
    };
}