import React from "react";
import { Dimensions, FlatList, ScrollView, Text, View } from "react-native";
import Card from "../components/Card";
import colors from "../config/colors";
import ActivityIndicator from "../components/ActivityIndicator";

const width = Dimensions.get("screen").width / 2 - 20;

export default function CategoryScreen({ route }) {
    const item = route.params;
    const category = item.title;
    console.log(category);
    const [isFetching, setIsFetching] = React.useState(true);
    const [products, setProducts] = React.useState([]);

    const getData = () => {
        fetch(`https://fakestoreapi.com/products/category/${category}`)
            .then((rest) => rest.json())
            .then((data) => {
                setProducts(data);
            })
            .catch((err) => console.log(err))
            .finally(() => setIsFetching(false));
    };
    React.useEffect(() => {
        getData();
    }, []);
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colors.white,
            }}
        >
            <ActivityIndicator visibility={isFetching} />
            {!isFetching && (
                <ScrollView>
                    <View style={{ paddingVertical: 25 }}>
                        <FlatList
                            numColumns={2}
                            data={products}
                            scrollEnabled={false}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <Card item={item} width={width} />
                            )}
                            contentContainerStyle={{
                                gap: 10,
                            }}
                            columnWrapperStyle={{
                                justifyContent: "space-evenly",
                            }}
                        />
                    </View>
                </ScrollView>
            )}
        </View>
    );
}
