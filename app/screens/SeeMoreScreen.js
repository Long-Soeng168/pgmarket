import React from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
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
        setCurrentPage((prevPage) => prevPage + 1); // Load next page
    };

    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
        if (isCloseToBottom && !pageLoading) {
            handleLoadMore();
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.white}}>
            <ActivityIndicator visibility={isFetching} />
            <ScrollView
                contentContainerStyle={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-evenly',
                    paddingVertical: 25,
                    rowGap: 15,
                    // paddingHorizontal: 10,
                }}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {products.map((product, index) => (
                    <Card
                        key={index}
                        item={product}
                        width={width}
                        title={product.pro_name}
                        imageUrl={"https://pgmarket.longsoeng.website/public/images/product/thumb/" + product.thumbnail}
                        description={product.description}
                        price={product.price}
                    />
                ))}
            </ScrollView>
            <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator visibility={pageLoading} />
            </View>
        </View>
    );
}
