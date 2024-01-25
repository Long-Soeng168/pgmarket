import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
    FlatList,
    Image,
    KeyboardAvoidingView,
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

export default function ProductDetailScreen({ route, navigation }) {
    const item = route.params;

    const imageUrl = "https://pgmarket.online/public/images/product/" + item.thumbnail;
    const title = item.pro_name;
    const descriptionNoHtml = stripHtmlTags(item.description);
    const price = parseFloat(item.price).toFixed(2);

    const category = item.category;
    const [isFetching, setIsFetching] = React.useState(true);
    const [isError, setIsError] = React.useState(false);
    const [products, setProducts] = React.useState([]);
    // const [relatedProducts, setRelatedProducts] = React.useState([]);

    const [favorites, setFavorites] = React.useContext(favoritesContext);
    const [cartItems, setCartItems] = React.useContext(cartContext);

    const [modalVisible, setModalVisible] = React.useState(false);
    const [images, setImages] = React.useState([]);


    const getrelatedproducts = () => {
        fetch("https://pgmarket.online/api/getrelatedproducts/" + item.main_cate_id)
            .then((rest) => rest.json())
            .then((data) => {
                setProducts(data);
            })
            .catch((err) => console.log(err))
            .finally(() => setIsFetching(false));
    };
    React.useEffect(() => {
        getrelatedproducts();
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

    // console.log(JSON.stringify(item, null, 2));

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
                    setImages([{ url: imageUrl }]);
                }}
            >
                <Image
                    style={styles.image}
                    source={{
                        uri: imageUrl,
                    }}
                />
            </TouchableOpacity>

            <View style={{ backgroundColor: colors.white }}>
                <View style={{ padding: 10 }}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.price}>$ {price}</Text>
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
                        {/* <View
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
                        </View> */}
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "500",
                            }}
                        >
                            Description :
                        </Text>
                        <Text style={styles.description}>
                            {descriptionNoHtml}
                        </Text>
                    </View>
                    
                </View>
                <View style={{ marginBottom: 30 }}>
                    <ListHeader title="Relate Product" 
                        onPress={() => {
                            navigation.navigate("SeeMoreScreen", `getrelatedproducts/${item.main_cate_id}`);
                        }} 
                    />
                    <ActivityIndicator visibility={isFetching} />
                    {!isFetching && (
                        <FlatList
                            data={products}
                            keyExtractor={(item) => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => <Card 
                                item={item} 
                                title = {item.pro_name}
                                imageUrl = {"https://pgmarket.online/public/images/product/" + item.thumbnail}
                                description= {item.description}
                                price = {item.price}
                            />}
                            contentContainerStyle={{
                                gap: 10,
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
    title: { fontSize: 18, fontWeight: "500" },
    price: {
        fontSize: 24,
        color: colors.danger,
        marginVertical: 15,
    },
    description: {
        fontSize: 16,
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



const stripHtmlTags = (htmlString) => {
    // Remove HTML tags, attributes, and entities using regular expressions
    if(htmlString) {
        return htmlString
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/(\w+)\s*=\s*("[^"]*")/g, '') // Remove attributes
        .replace(/&\w+;/g, ''); // Remove HTML entities
    }else {
        return htmlString;
    };
}