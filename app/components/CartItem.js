import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

import colors from "../config/colors";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import ActivityIndicator from "../components/ActivityIndicator";

export default function CartItem({ item }) {
    return (
        <View>
            <View style={styles.container}>
                <View style={styles.deleteBtn}>
                    <Feather
                        style={styles.deleteIcon}
                        name="x"
                        size={25}
                        color={colors.danger}
                    />
                </View>
                <Image
                    style={styles.image}
                    source={{
                        uri: item.image,
                    }}
                />
                <View style={styles.rightSideContainer}>
                    <View style={styles.textContainer}>
                        <Text numberOfLines={1} style={styles.title}>
                            {item.title}
                        </Text>
                        <Text numberOfLines={1} style={styles.description}>
                            {item.description}
                        </Text>
                        <Text numberOfLines={1} style={styles.pricePerUnit}>
                            $ {item.price}
                        </Text>
                    </View>
                    <View style={styles.updateContainer}>
                        <View style={styles.updateQty}>
                            <FontAwesome
                                style={styles.decreaseQty}
                                name="minus"
                                size={20}
                                color={colors.dark}
                            />
                            <Text style={styles.Qty}>{item.quantity}</Text>
                            <FontAwesome
                                style={styles.increaseQty}
                                name="plus"
                                size={20}
                                color={colors.dark}
                            />
                        </View>
                        <Text numberOfLines={1} style={styles.totalPrice}>
                            $ {item.quantity * item.price}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
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
        objectFit: "contain",
    },
    rightSideContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        marginLeft: 10,
        flex: 1,
        height: "100%",
    },
    textContainer: {
        justifyContent: "flex-start",
    },

    title: { fontSize: 16, fontWeight: "500" },
    description: { fontSize: 14, color: colors.medium },
    pricePerUnit: { fontSize: 14, color: colors.dark },

    updateContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginRight: 5,
        padding: 5,
    },

    updateQty: {
        flexDirection: "row",
        height: "100%",
        alignItems: "center",
        gap: 10,
    },
    increaseQty: {
        backgroundColor: colors.secondary,
        padding: 3,
        borderRadius: 5,
    },
    Qty: { fontSize: 16, fontWeight: "500" },
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
