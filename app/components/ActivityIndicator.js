import React from "react";
import { ActivityIndicator as ActivityInd, View } from "react-native"; 

export default function ActivityIndicator({ visibility, addStyle }) {
    return (
        <>
            {visibility && (
                <View
                    style={[
                        {
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        },
                        addStyle,
                    ]}
                > 
                    <ActivityInd size="large" color="#0000ff" />
                </View>
            )}
        </>
    );
}
