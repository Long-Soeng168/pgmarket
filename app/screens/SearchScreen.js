import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import colors from "../config/colors";

export default function SearchScreen() {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: 10,
                    marginRight: 10,
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        // backgroundColor: "tomato",
                        width: 40,
                        height: 40,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <MaterialCommunityIcons
                        name="chevron-left"
                        size={35}
                        color="black"
                    />
                </TouchableOpacity>
                <View
                    style={{
                        backgroundColor: colors.mdLight,
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderRadius: 100,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                    }}
                >
                    <TextInput
                        placeholder="Search"
                        style={{
                            fontSize: 20,
                            flex: 1,
                        }}
                    />
                    <TouchableOpacity>
                        <Feather
                            name="search"
                            size={30}
                            color={colors.medium}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
