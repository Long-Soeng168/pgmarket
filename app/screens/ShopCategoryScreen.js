import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function ShopCategoryScreen({ navigation }) {
    const shops = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
        <View style={{ padding: 10 }}>
            <View
                style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: 20,
                }}
            >
                {shops.map((shop) => (
                    <ShopItem
                        onPress={() => navigation.navigate("ShopScreen")}
                        key={shop}
                    />
                ))}
            </View>
        </View>
    );
}

function ShopItem({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={{ width: "20%" }}>
            <View
                style={{
                    width: "100%",
                    alignItems: "center",
                }}
            >
                <Image
                    style={{
                        width: "100%",
                        aspectRatio: 1,
                        borderRadius: 100,
                    }}
                    source={{
                        uri: "https://source.unsplash.com/1024x768/?mountain",
                    }}
                />
                <Text
                    numberOfLines={3}
                    style={{ textAlign: "center", fontSize: 14 }}
                >
                    Hello Shop
                </Text>
            </View>
        </TouchableOpacity>
    );
}
