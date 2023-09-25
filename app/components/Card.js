import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";

export default function Card({ item }) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => navigation.push("ProductDetailScreen", item)}
        >
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={{
                        uri: item.image,
                    }}
                />
                <View style={styles.textContainer}>
                    <Text numberOfLines={1} style={styles.title}>
                        {item.title}
                    </Text>
                    <Text numberOfLines={1} style={styles.description}>
                        {item.description}
                    </Text>
                    <Text numberOfLines={1} style={styles.price}>
                        $ {item.price}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 160,
        borderRadius: 15,
        overflow: "hidden",
        backgroundColor: colors.light,
        padding: 5,
    },
    image: {
        aspectRatio: 1,
        borderRadius: 10,
        objectFit: "contain",
    },
    textContainer: { padding: 10, gap: 3 },
    title: { fontSize: 20, fontWeight: "500" },
    description: { fontSize: 14, color: colors.medium },
    price: {
        fontSize: 18,
        fontWeight: "500",
        color: colors.danger,
    },
});
