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
import ImagesSlider from "../components/ImagesSlider";
import categories from "../config/categories";
import Card from "../components/Card";
import CategoryComponent from "../components/CategoryComponent";
import ActivityIndicator from "../components/ActivityIndicator";
import HomeHeader from "../components/HomeHeader";
import colors from "../config/colors";
import Slider from "../components/Slider";

export default function HomeScreen({ navigation }) {
    const [isFetching, setIsFetching] = React.useState(true);
    const [products, setProducts] = React.useState([]);

    const [images, setImages] = React.useState([
        "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?tree",
        "https://source.unsplash.com/1024x768/?mountain",
        "https://source.unsplash.com/1024x768/?river",
        "https://source.unsplash.com/1024x768/?clothes",
    ]);

    let newArrival = [];
    if (!isFetching) {
        newArrival = products.slice(2, 10);
    }

    const getData = () => {
        fetch("https://fakestoreapi.com/products")
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
        <View style={{ flex: 1 }}>
            <ActivityIndicator visibility={isFetching} />
            {!isFetching && (
                <ScrollView>
                    <View style={[styles.body]}>
                        <HomeHeader />
                        <Slider images={images} />
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
                            Top Recommend Shops
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
                                    data={newArrival}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item }) => (
                                        <Card item={item} />
                                    )}
                                    contentContainerStyle={{
                                        gap: 10,
                                        paddingHorizontal: 10,
                                    }}
                                />
                            </View>
                            {/* Banner 1 */}
                            <BannerComponent />
                            {/* Best Selling */}
                            <View>
                                <ListHeader
                                    title="Best Selling"
                                    onPress={() => {
                                        navigation.navigate("SeeMoreScreen");
                                    }}
                                />
                                <FlatList
                                    data={products}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item }) => (
                                        <Card item={item} />
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