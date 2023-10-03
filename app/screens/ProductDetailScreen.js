import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { Modal } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

import { cartContext, favoritesContext } from "../../App";

import ActivityIndicator from "../components/ActivityIndicator";
import Card from "../components/Card";
import ListHeader from "../components/ListHeader";
import colors from "../config/colors";

export default function ProductDetailScreen({ route }) {
    const item = route.params;
    const category = item.category;
    const [isFetching, setIsFetching] = React.useState(true);
    const [isError, setIsError] = React.useState(false);
    const [products, setProducts] = React.useState([]);

    const [favorites, setFavorites] = React.useContext(favoritesContext);
    const [cartItems, setCartItems] = React.useContext(cartContext);

    const [modalVisible, setModalVisible] = React.useState(false);
    const [images, setImages] = React.useState([]);

    const getData = () => {
        fetch(`https://fakestoreapi.com/products/category/${category}`)
            .then((rest) => rest.json())
            .then((data) => {
                const relateProduct = data.filter((data) => data.id != item.id);
                setProducts(relateProduct);
                setIsError(false);
            })
            .catch((err) => setIsError(true))
            .finally(() => setIsFetching(false));
    };
    React.useEffect(() => {
        getData();
    }, []);

    const removeFromFavorite = () => {
        setFavorites((preFavorites) =>
            preFavorites.filter((data) => data.id !== item.id)
        );
    };

    const addToFavorite = () => {
        setFavorites([...favorites, item]);
    };

    const removeFromCart = () => {
        setCartItems((preCartItems) =>
            preCartItems.filter((preCartItem) => preCartItem.id !== item.id)
        );
    };

    const addToCart = () => {
        setCartItems((preCartItems) => [
            ...preCartItems,
            { ...item, quantity: 1 },
        ]);
    };

    return (
        <ScrollView>
            {/* Add and Remove to Favorite */}
            {favorites.some((favorite) => favorite.id === item.id) ? (
                <FavoriteButton
                    onPress={removeFromFavorite}
                    color={colors.accent}
                />
            ) : (
                <FavoriteButton onPress={addToFavorite} color={colors.medium} />
            )}
            {/* End Add to favorite */}

            <TouchableOpacity
                onPress={() => {
                    setModalVisible(true);
                    setImages([{ url: item.image }]);
                }}
            >
                <Image
                    style={styles.image}
                    source={{
                        uri: item.image,
                    }}
                />
            </TouchableOpacity>

            <View style={{ backgroundColor: colors.white }}>
                <View style={{ padding: 10 }}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.price}>$ {item.price}</Text>
                    {/* Add and Remove from Cart */}
                    {cartItems.some((cartItem) => cartItem.id === item.id) ? (
                        <CartButton
                            title="REMOVE FROM CART"
                            bgColor={colors.medium}
                            onPress={removeFromCart}
                        />
                    ) : (
                        <CartButton
                            title="ADD TO CART"
                            bgColor={colors.primary}
                            onPress={addToCart}
                        />
                    )}
                    {/* End Add and Remove from Cart */}

                    <View style={{ marginTop: 25, alignItems: "flex-start" }}>
                        {/* Video Play */}
                        <View
                            style={{
                                backgroundColor: colors.secondary,
                                borderRadius: 5,
                                flexDirection: "row",
                                alignItems: "center",
                                padding: 10,
                                marginBottom: 10,
                            }}
                        >
                            <Feather
                                name="play"
                                size={24}
                                color={colors.dark}
                            />
                            <Text
                                style={{
                                    color: colors.dark,
                                    textAlign: "center",
                                    fontSize: 16,
                                }}
                            >
                                Video
                            </Text>
                        </View>
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "500",
                            }}
                        >
                            Description :
                        </Text>
                        <Text style={styles.description}>
                            {item.description}
                        </Text>
                    </View>
                </View>
                <View style={{ marginBottom: 30 }}>
                    <ListHeader title="Relate Product" onPress={() => {}} />
                    <ActivityIndicator visibility={isFetching} />
                    {!isFetching && (
                        <FlatList
                            data={products}
                            keyExtractor={(item) => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => <Card item={item} />}
                            contentContainerStyle={{
                                gap: 20,
                                paddingHorizontal: 10,
                            }}
                        />
                    )}
                </View>
            </View>
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
            >
                <ImageViewer
                    enableSwipeDown={true}
                    onSwipeDown={() => setModalVisible(false)}
                    imageUrls={images}
                />
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 300,
        objectFit: "contain",
        backgroundColor: colors.white,
    },
    title: { fontSize: 20, fontWeight: "500" },
    price: {
        fontSize: 24,
        color: colors.danger,
        marginVertical: 15,
    },
    description: {
        fontSize: 18,
        marginBottom: 15,
    },
});

//Favorite Button component
function FavoriteButton({ color, onPress }) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={{
                position: "absolute",
                zIndex: 100,
                right: 10,
                top: 10,
            }}
        >
            <FontAwesome name="heart" size={35} color={color} />
        </TouchableOpacity>
    );
}

//Cart Button component
function CartButton({ title, onPress, bgColor }) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={{
                backgroundColor: bgColor,
                alignItems: "center",
                padding: 10,
                borderRadius: 100,
            }}
        >
            <View
                style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
                <FontAwesome
                    name="shopping-cart"
                    size={24}
                    color={colors.white}
                />
                <Text
                    style={{
                        color: colors.white,
                        fontSize: 16,
                        fontWeight: "500",
                    }}
                >
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
