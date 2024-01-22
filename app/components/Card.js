import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";

export default function Card({ item, width = 170, title, description, imageUrl, price }) {
    const navigation = useNavigation();

    const descriptionNoHtml = stripHtmlTags(description);
    return (
        <TouchableOpacity
            onPress={() => navigation.push("ProductDetailScreen", item)}
        >
            <View style={[styles.container, { width: width }]}>
                <Image
                    style={styles.image}
                    source={{
                        uri: imageUrl,
                    }}
                />
                <View style={styles.textContainer}>
                    <Text numberOfLines={2} style={styles.title}>
                        {title}
                    </Text>
                    <Text numberOfLines={2} style={styles.description}>
                        {descriptionNoHtml}
                    </Text>
                    <Text numberOfLines={1} style={styles.price}>
                        $ {parseFloat(price).toFixed(2)}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        // width: 160,
        borderRadius: 15,
        overflow: "hidden",
        backgroundColor: colors.light,
        padding: 5,
    },
    image: {
        backgroundColor: colors.white,
        aspectRatio: 1,
        borderRadius: 10,
        objectFit: "cover",
    },
    textContainer: { padding: 10, gap: 3 },
    title: { fontSize: 12, fontWeight: "500" },
    description: { fontSize: 10, color: colors.medium },
    price: {
        fontSize: 14,
        fontWeight: "500",
        color: colors.danger,
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

// const stripHtmlTags = (htmlString) => {
//     // Remove HTML tags using a regular expression
//     return htmlString.replace(/<[^>]*>/g, '');
//   };



