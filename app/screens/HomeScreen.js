import React from "react";
import {
    FlatList,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    View,
    Platform,
} from "react-native";

import ListHeader from "../components/ListHeader";
import ImagesSlider from "../components/ImagesSlider";
import categories from "../config/categories";
import Card from "../components/Card";
import CategoryComponent from "../components/CategoryComponent";
import ActivityIndicator from "../components/ActivityIndicator";
import HomeHeader from "../components/HomeHeader";
import colors from "../config/colors";

export default function HomeScreen({ navigation }) {
    const [isFetching, setIsFetching] = React.useState(true);
    const [products, setProducts] = React.useState([]);

    const [images, setImages] = React.useState([
        "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?tree",
        "https://source.unsplash.com/1024x768/?mountain",
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
                        <ImagesSlider images={images} />
                        {/* Categories */}
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
                            {/* New Arrival */}
                            <View style={{ marginBottom: 30 }}>
                                <ListHeader
                                    title="New Arrival"
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
                                        gap: 20,
                                        paddingHorizontal: 10,
                                    }}
                                />
                            </View>
                            {/* All Product */}
                            <View>
                                <ListHeader
                                    title="All Product"
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
                                        gap: 20,
                                        paddingHorizontal: 10,
                                    }}
                                />
                            </View>
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
