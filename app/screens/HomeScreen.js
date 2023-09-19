import React from "react";
import {
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

export default function HomeScreen() {
    const [isFetching, setIsFetching] = React.useState(true);
    const [products, setProducts] = React.useState([]);

    let newArrival = [];
    if (!isFetching) {
        newArrival = products.slice(0, 5);
    }
    React.useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((rest) => rest.json())
            .then((data) => {
                setProducts(data);
            })
            .catch((err) => console.log(err))
            .finally(() => setIsFetching(false));
    }, []);

    const [images, setImages] = React.useState([
        "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?tree",
        "https://source.unsplash.com/1024x768/?mountain",
    ]);

    return (
        <ScrollView>
            <SafeAreaView>
                <View style={styles.body}>
                    <Header />
                    <ImagesSlider images={images} />

                    {/* Categories */}
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={categories}
                        renderItem={({ item }) => <Category item={item} />}
                        contentContainerStyle={{
                            padding: 10,
                        }}
                    />

                    {/* List items */}
                    <View style={styles.listContainer}>
                        <View style={{ marginBottom: 30 }}>
                            <ListHeader
                                title="New Arrival"
                                onPress={() => {}}
                            />
                            <FlatList
                                data={newArrival}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item }) => <Card item={item} />}
                                contentContainerStyle={{
                                    gap: 20,
                                    paddingHorizontal: 10,
                                }}
                            />
                        </View>

                        <View>
                            <ListHeader
                                title="All Product"
                                onPress={() => {}}
                            />
                            <FlatList
                                data={products}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item }) => <Card item={item} />}
                                contentContainerStyle={{
                                    gap: 20,
                                    paddingHorizontal: 10,
                                }}
                            />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
            <StatusBar />
        </ScrollView>
    );
}

//HomeScreen Style
const styles = StyleSheet.create({
    body: {
        // backgroundColor: "grey",
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
                // backgroundColor: "grey",
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Image
                    style={{ width: 40, height: 40, bottom: 3 }}
                    source={require("../assets/images/logo.png")}
                />
                <Text style={{ fontSize: 20, fontWeight: "500" }}>
                    PG Market
                </Text>
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
