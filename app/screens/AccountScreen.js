import React from "react";
import { TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import colors from "../config/colors";

export default function AccountScreen({ navigation }) {
    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <View
                style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate("LoginScreen")}
                    activeOpacity={0.8}
                    style={{
                        backgroundColor: colors.primary,
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        borderRadius: 10,
                    }}
                >
                    <Text
                        style={{
                            color: colors.white,
                            fontSize: 20,
                            fontWeight: "500",
                        }}
                    >
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
