import React from "react";
import { Dimensions, FlatList, ScrollView, Text, View } from "react-native";
import Card from "../components/Card";
import colors from "../config/colors";
import ActivityIndicator from "../components/ActivityIndicator";
import { favoritesContext } from "../../App";

const width = Dimensions.get("screen").width / 2 - 25;

export default function FavoriteScreen() {
    const [favorites, setFavorites] = React.useContext(favoritesContext);
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colors.white,
            }}
        >
            <ScrollView>
                <View style={{ paddingVertical: 25, alignItems: "center" }}>
                    <FlatList
                        numColumns={2}
                        data={favorites}
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                            <Card item={item} width={width} />
                        )}
                        contentContainerStyle={{
                            gap: 15,
                        }}
                        columnWrapperStyle={{ gap: 15 }}
                    />
                </View>
            </ScrollView>
        </View>
    );
}
