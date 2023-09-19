import React from "react";
import { Image, Text, View } from "react-native";

export default function Category({ item }) {
    return (
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
    );
}
