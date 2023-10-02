import React from "react";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import colors from "../config/colors";

export default function BackButton({ onPress }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                position: "absolute",
                zIndex: 100,
                backgroundColor: colors.dark,
                justifyContent: "center",
                alignItems: "center",
                opacity: 0.65,
                width: 40,
                height: 40,
                top: 10,
                left: 10,
                borderRadius: 5,
            }}
        >
            <Feather name="chevron-left" size={35} color={colors.white} />
        </TouchableOpacity>
    );
}
