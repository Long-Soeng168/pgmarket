import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CategoryComponent({ item }) {
    const navigation = useNavigation();
    const imageUrl = 'https://pgmarket.online/public/images/shopcategory/' + item.image;
    const title = item.name;
    // console.log(JSON.stringify(imageUrl, null, 2));

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("ShopCategoryScreen", item)}
        >
            <View
                style={{
                    width: 100,
                    // backgroundColor: "green",
                    // margin: 5,
                }}
                key={item.title}
            >
                <Image
                    style={{ width: 100, height: 100, objectFit: "contain" }}
                    source={{ uri: imageUrl }}
                />
                <Text
                    style={{
                        textAlign: "center",
                        fontSize: 10,
                    }}
                >
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
