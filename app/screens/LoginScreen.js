import React from "react";
import { Image, KeyboardAvoidingView, TextInput, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "../config/colors";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";

export default function LoginScreen() {
    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: colors.white }}
        >
            <View style={{ padding: 10, alignItems: "center" }}>
                <Image
                    style={{
                        width: 100,
                        height: 100,
                        objectFit: "contain",
                        margin: 25,
                    }}
                    source={require("../assets/images/pgmarketLogo.png")}
                />
                <View style={{ gap: 20 }}>
                    <View style={styles.inputBox}>
                        <Feather name="user" size={20} color={colors.medium} />
                        <TextInput
                            keyboardType="email-address"
                            textContentType="emailAddress"
                            style={{
                                flex: 1,
                                fontSize: 18,
                            }}
                            placeholder="Username"
                        />
                    </View>
                    <View style={styles.inputBox}>
                        <Feather name="lock" size={20} color={colors.medium} />
                        <TextInput
                            textContentType="password"
                            secureTextEntry
                            style={{
                                flex: 1,
                                fontSize: 18,
                            }}
                            placeholder="Password"
                        />
                    </View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: colors.primary,
                            padding: 12,
                            borderRadius: 10,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                color: colors.white,
                                width: "auto",
                                textAlign: "center",
                            }}
                        >
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    inputBox: {
        backgroundColor: colors.mdLight,
        width: 300,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderRadius: 10,
    },
});
