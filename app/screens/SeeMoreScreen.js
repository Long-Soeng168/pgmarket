import React from "react";
import { Dimensions, FlatList, ScrollView, Text, View } from "react-native";
import Card from "../components/Card";
import colors from "../config/colors";
import ActivityIndicator from "../components/ActivityIndicator";
import HomeHeader from "../components/HomeHeader";

const width = Dimensions.get("screen").width / 2 - 20;

const fetchData = async (url, page, setter) => {
    try {
        const response = await fetch(`${url}?page=${page}`);
        const data = await response.json();
        setter((prevData) => [...prevData, ...data.data]); // Append new data to existing data
    } catch (error) {
        console.error(error);
    }
};

export default function SeeMoreScreen({ route }) {
    const item = route.params;
    const [isFetching, setIsFetching] = React.useState(true);
    const [pageLoading, setPageLoading] = React.useState(false);
    const [products, setProducts] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);


    React.useEffect(() => {
        const fetchDataAsync = async () => {
            await fetchData("https://pgmarket.longsoeng.website/api/" + item, currentPage, setProducts);
            setIsFetching(false);
            setPageLoading(false);
        };

        fetchDataAsync();
    }, [currentPage]);

    const handleLoadMore = () => {
        setPageLoading(true);
        setTimeout(() => {
            setCurrentPage((prevPage) => prevPage + 1); // Load next page
        }, 10);
    };
    

    return (
        <View style={{ flex: 1, backgroundColor: colors.white}}>
            <ActivityIndicator visibility={isFetching} />
            {!isFetching && (
                <FlatList
                    numColumns={2}
                    data={products}
                    renderItem={({ item }) => (
                        <Card
                            item={item}
                            width={width}
                            title={item.pro_name}
                            imageUrl={"https://pgmarket.longsoeng.website/public/images/product/thumb/" + item.thumbnail}
                            description={item.description}
                            price={item.price}
                        />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ paddingVertical: 25, gap: 15 }}
                    columnWrapperStyle={{ justifyContent: "space-evenly"}}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.1} // Trigger threshold for reaching the end
                />
                )}
                <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator visibility={pageLoading} />
                </View>

        </View>
    );
}
