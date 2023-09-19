import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ListHeader({ title, onPress }) {
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
            }}
        >
            <Text style={{ fontSize: 18, fontWeight: "500" }}>{title}</Text>
            <TouchableOpacity
                onPress={onPress}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Text style={{ fontSize: 18 }}>See more</Text>
                <MaterialCommunityIcons
                    style={{ top: 2 }}
                    name="chevron-double-right"
                    size={28}
                    color="black"
                />
            </TouchableOpacity>
        </View>
    );
}
