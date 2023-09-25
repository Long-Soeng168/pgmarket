import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Category({ item }) {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("CategoryScreen", item)}
        >
            <View
                style={{
                    width: 60,
                    margin: 10,
                }}
                key={item.title}
            >
                <Image
                    style={{ width: 60, height: 60, objectFit: "contain" }}
                    source={item.img}
                />
                <Text
                    style={{
                        textAlign: "center",
                        fontSize: 12,
                    }}
                >
                    {item.title}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
