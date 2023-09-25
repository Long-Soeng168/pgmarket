import React from "react";
import {
    Button,
    FlatList,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ListCard from "../components/ListCard";
import ListHeader from "../components/ListHeader";
import ImagesSlider from "../components/ImagesSlider";
import categories from "../config/categories";
import Card from "../components/Card";
import Category from "../components/Category";
import ActivityIndicator from "../components/ActivityIndicator";
import colors from "../config/colors";

export default function HomeScreen() {
    const [isFetching, setIsFetching] = React.useState(true);
    const [isError, setIsError] = React.useState(false);
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
                setIsError(false);
            })
            .catch((err) => setIsError(true))
            .finally(() => setIsFetching(false));
    };
    React.useEffect(() => {
        getData();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <ActivityIndicator visibility={isFetching} />
            {isError ? (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text>Cannot get data please retry again</Text>
                </View>
            ) : (
                !isFetching && (
                    <ScrollView>
                        <View style={styles.body}>
                            <Header />
                            <ImagesSlider images={images} />
                            {/* Categories */}
                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                data={categories}
                                renderItem={({ item }) => (
                                    <Category item={item} />
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
                                        onPress={() => {}}
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
                                    <View>
                                        <Text>Last component</Text>
                                    </View>
                                </View>
                                {/* All Product */}
                                <View>
                                    <ListHeader
                                        title="All Product"
                                        onPress={() => {}}
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
                )
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

//Header component
function Header() {
    return (
        <View
            style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 10,
                backgroundColor: colors.white,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Image
                    style={{
                        width: 140,
                        height: 40,
                        bottom: 3,
                        objectFit: "contain",
                    }}
                    source={require("../assets/images/pgmarketLogo.jpg")}
                />
                {/* <Text style={{ fontSize: 20, fontWeight: "500" }}>
                    PG Market
                </Text> */}
            </View>
            <TouchableOpacity>
                <Feather
                    style={{ paddingRight: 10 }}
                    name="search"
                    size={30}
                    color="black"
                />
            </TouchableOpacity>
        </View>
    );
}
