import React from "react";
import { FlatList } from "react-native";
import Card from "./Card";

export default function ListCard({ data }) {
    return (
        <FlatList
            data={data}
            renderItem={({ item }) => <Card />}
            horizontal
            contentContainerStyle={{
                gap: 20,
                paddingHorizontal: 10,
            }}
            showsHorizontalScrollIndicator={false}
        />
    );
}
