import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

export default function CategoryComponent({ item }) {
    const navigation = useNavigation();
    const imageUrl = 'https://pgmarket.online/public/images/shopcategory/' + item.image;
    const [t, i18n] = useTranslation('global');
    const title = i18n.language == 'en' ? item.name : item.name_kh;
    // console.log(JSON.stringify(imageUrl, null, 2));
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("ShopCategoryScreen", title)}
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
