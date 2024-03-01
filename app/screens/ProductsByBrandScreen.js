import React from "react";
import { Dimensions, FlatList, ScrollView, Text, View } from "react-native";
import Card from "../components/Card";
import colors from "../config/colors";
import ActivityIndicator from "../components/ActivityIndicator";

const width = Dimensions.get("screen").width / 2 - 15;

const fetchData = async (url, setter) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        setter(data);
    } catch (error) {
        console.error(error);
    }
};

export default function ProductByBrandScreen({ route }) {
    const item = route.params;
    // const category = item.title;
    console.log(item);
    const [isFetching, setIsFetching] = React.useState(true);
    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        const fetchDataAsync = async () => {
            await fetchData("https://pgmarket.longsoeng.website/api/getproducts_bybrand/" + item, setProducts); 
            setIsFetching(false);
        };

        fetchDataAsync();
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
                products.length > 0 
                ? 
                <ScrollView>
                    <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                        <FlatList
                            numColumns={2}
                            data={products}
                            scrollEnabled={false}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <Card item={item} width={width} 
                                    title = {item.pro_name}
                                    imageUrl = {"https://pgmarket.longsoeng.website/public/images/product/" + item.thumbnail}
                                    description= {item.description}
                                    price = {item.price}
                                />
                            )}
                            contentContainerStyle={{
                                gap: 10,
                            }}
                            columnWrapperStyle={{
                                justifyContent: "space-between",
                            }}
                        />
                    </View>
                </ScrollView>
                :
                <Text style={{ textAlign: 'center', marginTop: 100 }}>No Product for this brand</Text>
            )}
        </View>
    );
}
