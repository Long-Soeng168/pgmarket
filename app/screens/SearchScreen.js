import React from "react";
import { Dimensions, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Card from "../components/Card";
import colors from "../config/colors";
import ActivityIndicator from "../components/ActivityIndicator";
import HomeHeader from "../components/HomeHeader";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const width = Dimensions.get("screen").width / 2 - 15;

const fetchData = async (url, page, setter) => {
    try {
        const response = await fetch(`${url}&page=${page}`);
        const data = await response.json();
        setter((prevData) => [...prevData, ...data.data]); // Append new data to existing data
    } catch (error) {
        console.error(error);
    }
};

export default function SearchScreen({ route, navigation }) {
    const item = route.params;
    const [isFetching, setIsFetching] = React.useState(false);
    const [pageLoading, setPageLoading] = React.useState(false);
    const [products, setProducts] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [search, setSearch] = React.useState("");
    const [searching, setSearching] = React.useState(false);

    React.useEffect(() => {
        
        const fetchDataAsync = async () => {
            await fetchData("https://pgmarket.online/api/productSearch?search=" + search, currentPage, setProducts);
            setIsFetching(false);
            setPageLoading(false);
        };

        search && fetchDataAsync();
    }, [currentPage, searching]);

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

    const handleSearchSubmit = () => {
        console.log('Enter key pressed. Search term:', search);
        if(search){
            setProducts([]);
            setCurrentPage(1);
            setIsFetching(true);
            setSearching(preValue => !preValue);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.white}}>
            
            {/* ==============Search============== */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: 10,
                    marginRight: 10,
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        // backgroundColor: "tomato",
                        width: 40,
                        height: 40,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <MaterialCommunityIcons
                        name="chevron-left"
                        size={35}
                        color="black"
                    />
                </TouchableOpacity>
                <View
                    style={{
                        backgroundColor: colors.mdLight,
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderRadius: 100,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                    }}
                >
                    <TextInput
                        placeholder="Search"
                        style={{
                            fontSize: 20,
                            flex: 1,
                        }}
                        onChangeText={(text)=>setSearch(text)}
                        onSubmitEditing={handleSearchSubmit}
                    />
                    <TouchableOpacity
                        onPress={handleSearchSubmit}
                    >
                        <Feather
                            name="search"
                            size={30}
                            color={colors.medium}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            {/* =============End Search================ */}
            <ActivityIndicator visibility={isFetching} />
            <ScrollView
                contentContainerStyle={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                    rowGap: 10,
                    paddingHorizontal: 10,
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
                        imageUrl={"https://pgmarket.online/public/images/product/thumb/" + product.thumbnail}
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
