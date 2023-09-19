import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";

export default function Card({ item }) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => navigation.push("ProductDetailScreen")}
        >
            <View
                style={{
                    width: 160,
                    borderRadius: 15,
                    overflow: "hidden",
                    backgroundColor: colors.white,
                }}
            >
                <Image
                    style={{
                        aspectRatio: 1,
                        borderRadius: 15,
                        objectFit: "contain",
                    }}
                    source={{
                        uri: item.image,
                    }}
                />
                <View style={{ padding: 10, gap: 3 }}>
                    <Text
                        numberOfLines={1}
                        style={{ fontSize: 20, fontWeight: "500" }}
                    >
                        {item.title}
                    </Text>
                    <Text
                        numberOfLines={1}
                        style={{ fontSize: 14, color: colors.medium }}
                    >
                        {item.description}
                    </Text>
                    <Text
                        numberOfLines={1}
                        style={{
                            fontSize: 18,
                            fontWeight: "500",
                            color: colors.danger,
                        }}
                    >
                        $ 168
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
