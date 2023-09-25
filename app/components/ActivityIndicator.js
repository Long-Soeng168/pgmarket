import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";

export default function ActivityIndicator({ visibility }) {
    return (
        <>
            {visibility && (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <LottieView
                        autoPlay
                        style={{
                            width: 88,
                            height: 88,
                        }}
                        source={require("../assets/animation/loading_animation.json")}
                    />
                </View>
            )}
        </>
    );
}
