import React from "react";
import {
    FlatList,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    View,
    Platform,
    Text,
    Image,
} from "react-native";

import ListHeader from "../components/ListHeader";
import categories from "../config/categories";
import Card from "../components/Card";
import CategoryComponent from "../components/CategoryComponent";
import ActivityIndicator from "../components/ActivityIndicator";
import HomeHeader from "../components/HomeHeader";
import colors from "../config/colors";
import Slider from "../components/Slider";

const fetchData = async (url, setter) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        setter(data);
    } catch (error) {
        console.error(error);
    }
};

export default function HomeScreen({ navigation }) {
    const [isFetching, setIsFetching] = React.useState(true);
    const [newProducts, setNewProducts] = React.useState([]);
    const [bestSellingProducts, setBestSellingProducts] = React.useState([]);
    const [categories, setCategories] = React.useState([]);

    const [slides, setSlides] = React.useState([]);
    const [banners, setBanners] = React.useState([]);

   React.useEffect(() => {
        const fetchDataAsync = async () => {
            await fetchData("https://pgmarket.online/api/toprecommendshops", setCategories);
            await fetchData("https://pgmarket.online/api/getnewproducts", setNewProducts);
            await fetchData("https://pgmarket.online/api/getbestselling", setBestSellingProducts);
            await fetchData("https://pgmarket.online/api/getslides", setSlides);
            await fetchData("https://pgmarket.online/api/getbanners", setBanners);
            
            setIsFetching(false);
        };

        fetchDataAsync();
    }, []);
    // End Get New Product 
        
        // console.log(JSON.stringify(categories, null, 2));
        // console.log(JSON.stringify(banners, null, 2));

    return (
        <View style={{ flex: 1 }}>
            <ActivityIndicator visibility={isFetching} />
            {!isFetching && (
                <ScrollView>
                    <View style={[styles.body]}>
                        <HomeHeader />
                        <Slider 
                            addStyle={{ borderRadius: 10, width: '96%', aspectRatio: 16/9 }}
                            images={slides} endPoint="https://pgmarket.online/public/images/slide/" />
                        {/* Categories */}
                        <Text
                            style={{
                                marginLeft: 10,
                                marginBottom: -5,
                                marginTop: 15,
                                fontSize: 14,
                                fontWeight: "500",
                                color: 'tomato'
                            }}
                        >
                            Digital Market
                        </Text>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={categories}
                            renderItem={({ item }) => (
                                <CategoryComponent item={item} />
                            )}
                            contentContainerStyle={{
                                padding: 10,
                            }}
                        />
                        {/* List items */}
                        <View style={styles.listContainer}>
                            {/* New Products */}
                            <View style={{ marginBottom: 30 }}>
                                <ListHeader
                                    title="New Products"
                                    onPress={() => {
                                        navigation.navigate("SeeMoreScreen");
                                    }}
                                />
                                <FlatList
                                    data={newProducts}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item }) => (
                                        <Card item={item} 
                                            title = {item.pro_name}
                                            imageUrl = {"https://pgmarket.online/public/images/product/" + item.thumbnail}
                                            description= {item.description}
                                            price = {item.price}
                                        />
                                    )}
                                    contentContainerStyle={{
                                        gap: 10,
                                        paddingHorizontal: 10,
                                    }}
                                />
                            </View>
                            {/* Banner 1 */}
                            {/* <BannerComponent /> */}
                             
                            <Slider 
                                addStyle={{ borderRadius: 10, width: '96%', aspectRatio: 13/3 }}  
                                images={banners} 
                                endPoint="https://pgmarket.online/public/images/banner/" 
                            />
                            
                            {/* Best Selling */}
                            <View>
                                <ListHeader
                                    title="Best Selling"
                                    onPress={() => {
                                        navigation.navigate("SeeMoreScreen");
                                    }}
                                />
                                <FlatList
                                    data={bestSellingProducts}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item }) => (
                                        <Card item={item} 
                                            title = {item.pro_name}
                                            imageUrl = {"https://pgmarket.online/public/images/product/" + item.thumbnail}
                                            description= {item.description}
                                            price = {item.price}
                                        />
                                    )}
                                    contentContainerStyle={{
                                        gap: 10,
                                        paddingHorizontal: 10,
                                    }}
                                />
                            </View>
                            {/* Banner 2 */}
                        </View>
                    </View>
                    
                </ScrollView>
            )}

            <StatusBar />
        </View>
    );
}

//HomeScreen Style
const styles = StyleSheet.create({
    body: {
        backgroundColor: colors.white,
        paddingBottom: 30,
    },
    listContainer: {
        // paddingHorizontal: 10,
        // paddingTop: 20,
    },
});


// Banner Component
function BannerComponent() {
    return (
        <View
            style={{
                padding: 10,
                marginBottom: 10,
            }}
        >
            <Image
                source={{ uri: "https://source.unsplash.com/2cFZ_FB08UM" }}
                style={{
                    width: "100%",
                    height: 70,
                    objectFit: "cover",
                    borderRadius: 10,
                }}
            />
        </View>
    );
}