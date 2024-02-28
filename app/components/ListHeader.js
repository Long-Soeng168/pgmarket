import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ListHeader({ title, onPress, showBtn = true }) {
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 10,
                paddingHorizontal: 15,
                
            }}
        >
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "tomato" }}>{title}</Text>
            {showBtn && <TouchableOpacity
                onPress={onPress}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Text style={{fontSize: 14, borderBottomColor: 'tomato', borderBottomWidth: 1 }}>See more</Text>
                <MaterialCommunityIcons
                    style={{ top: 1 }}
                    name="chevron-double-right"
                    size={18}
                    color="black"
                />
            </TouchableOpacity>}
        </View>
    );
}
