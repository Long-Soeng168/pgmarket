import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../config/colors";

export default function HomeHeader({showSearch = true}) {
    const navigation = useNavigation();
    return (
        <View
            style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 10,
                backgroundColor: colors.white,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Image
                    style={{
                        width: 170,
                        height: 40,
                        marginLeft: -5,
                        bottom: 3,
                        // objectFit: "contain",
                    }}
                    source={require("../assets/images/pgmarket.jpg")}
                />
                {/* <Text style={{ fontSize: 20, fontWeight: "500" }}>
                            PG Market
                        </Text> */}
            </View>
            {showSearch && <TouchableOpacity
                onPress={() => navigation.navigate("SearchScreen")}
            >
                <Feather
                    style={{ paddingRight: 10 }}
                    name="search"
                    size={30}
                    color="black"
                />
            </TouchableOpacity>}
        </View>
    );
}
