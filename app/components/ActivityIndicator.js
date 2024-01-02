import React from "react";
import { ActivityIndicator as ActivityInd, View } from "react-native"; 

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
                    <ActivityInd size="large" color="#0000ff" />
                </View>
            )}
        </>
    );
}
