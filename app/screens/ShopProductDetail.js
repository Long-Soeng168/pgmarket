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
    Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { Modal } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

import { cartContext, favoritesContext, userContext } from "../../App";

import ActivityIndicator from "../components/ActivityIndicator";
import Card from "../components/Card";
import ListHeader from "../components/ListHeader";
import colors from "../config/colors";
import HeaderText from "../components/HeaderText";

export default function ShopProductDetail({ route, navigation }) {
    const item = route.params;
    console.log(JSON.stringify(item, null, 2));

    const [user, setUser] = React.useContext(userContext);
    const userToken = user.token;

    const imageUrl =
        "https://pgmarket.longsoeng.website/public/images/product/" + item.thumbnail;
    const title = item.pro_name;
    const descriptionNoHtml = stripHtmlTags(item.proDesc);
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
        fetch(
            "https://pgmarket.longsoeng.website/api/getrelatedproducts/" +
                item.main_cate_id
        )
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

    const addImages = () => {
        console.log('Adding images');
        navigation.navigate('ProductImagesScreen');
    };

    const DeleteProduct = () => {
        console.log('Delete Product');
        Alert.alert(
            "Delete Order",
            "Are you sure you want to delete Product?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    onPress: () => {
                        console.log(`Delete Order: ${item.id}`);
                        const myHeaders = {
                            Accept: "application/json",
                            Authorization: "Bearer " + userToken,
                        };

                        const requestOptions = {
                            method: "DELETE",
                            headers: myHeaders,
                            redirect: "follow",
                        };

                        fetch(
                            "https://pgmarket.longsoeng.website/api/destroyProduct/" +
                            item.id,
                            requestOptions
                        )
                            .then((response) => response.json())
                            .then((result) => {
                                console.log(JSON.stringify(result, null, 2)); 
                                navigation.pop();
                                navigation.replace('ShopProfile');
                            })
                            .catch((error) => console.log("error", error));
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const UpdateDetails = () => {
        console.log('Update Details');
        navigation.navigate('UpdateProductScreen');
    };

    // console.log(JSON.stringify(item, null, 2));

    return (
        <ScrollView>
            <HeaderText title="Product Detail" />
            <TouchableOpacity>
                <Image
                    style={styles.image}
                    source={{
                        uri: imageUrl,
                    }}
                />
            </TouchableOpacity>
            <View
                style={{
                    flexDirection: "row",
                    gap: 10,
                    padding: 10,
                    backgroundColor: "white",
                }}
            >
                <Button
                    title="Delete Product"
                    bgColor={colors.danger}
                    onPress={DeleteProduct}
                />
                <Button
                    title="Update Details"
                    bgColor={colors.primary}
                    onPress={UpdateDetails}
                />
            </View>
            <View style={{ marginHorizontal: 10 }}>
                <Button
                    
                    title="Add Images"
                    bgColor={colors.medium}
                    onPress={addImages}
                />
            </View>

            <View style={{ backgroundColor: colors.white }}>
                <View style={{ padding: 10 }}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.price}>$ {price}</Text>

                    <LabelValue label="Discount" value={item.discount + '%'} />
                    <LabelValue
                        label="Discount Date"
                        value={item.discount_date_start + ' - ' + item.discount_date_end}
                    />
                    <LabelValue label="Shipping" value={item.shipping ? item.shipping : 'Free Delivery'} />
                    <LabelValue label="Category" value={item.main_cate_name} />
                    <LabelValue label="Sub-Category" value={item.cate_name} />
                    <LabelValue label="Brand" value={item.brand_name} />
                    {/* <LabelValue
                        label="Colors Available"
                        value="White, Black, Red"
                    />
                    <LabelValue label="Sizes Available" value="M, L, XL" /> */}
                    <LabelValue
                        label="Video URL"
                        value={item.video_url}
                    />

                    <View style={{ alignItems: "flex-start" }}>
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

function LabelValue({ label, value }) {
    return (
        <View style={{ flexDirection: "row", gap: 10 }}>
            <Text
                style={{
                    fontSize: 16,
                    fontWeight: "500",
                }}
            >
                {label} :
            </Text>
            <Text style={styles.description}>{value}</Text>
        </View>
    );
}

//Cart Button component
function Button({ title, onPress, bgColor }) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={{
                backgroundColor: bgColor,
                alignItems: "center",
                padding: 10,
                borderRadius: 10,
                flex: 1,
            }}
        >
            <View
                style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
                {/* <FontAwesome
                    name="shopping-cart"
                    size={24}
                    color={colors.white}
                /> */}
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
    if (htmlString) {
        return htmlString
            .replace(/<[^>]*>/g, "") // Remove HTML tags
            .replace(/(\w+)\s*=\s*("[^"]*")/g, "") // Remove attributes
            .replace(/&\w+;/g, ""); // Remove HTML entities
    } else {
        return htmlString;
    }
};
