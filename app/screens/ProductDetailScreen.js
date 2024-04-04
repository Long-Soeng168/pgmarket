import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
    Alert,
    FlatList,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { Modal } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

import { cartContext, favoritesContext } from "../../App";

import ActivityIndicator from "../components/ActivityIndicator";
import Card from "../components/Card";
import ProductColors from "../components/ProductColors";
import ListHeader from "../components/ListHeader";
import colors from "../config/colors";
import ProductSizes from "../components/ProductSizes";
import LineSeparator from "../components/LineSeparator";
import ProductImages from "../components/ProductImages";
import LoadingOverlay from "../components/LoadingOverlay";
import ShopCardComponent from "../components/ShopCardComponent";
import cartStorage from "../localStorage/cartStorage";
import { useTranslation } from "react-i18next";

export default function ProductDetailScreen({ route, navigation }) {
    const item = route.params;
    console.log(JSON.stringify(item, null, 2));

    const [t, i18n] = useTranslation('global');

    const [selectedColor, setSelectedColor] = React.useState("");
    const [selectedSize, setSelectedSize] = React.useState("");
    const [buyerNote, setBuyerNote] = React.useState("");
    const handleColorSelect = (color) => {
        setSelectedColor(color);
    };
    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };
    const handleTextBuyerNote = (text) => {
        setBuyerNote(text);
    };

    // const imageUrl =
    //     "https://pgmarket.online/public/images/product/" +
    //     item.thumbnail;
    const [imageUrl, setImageUrl] = React.useState(
        "https://pgmarket.online/public/images/product/" +
            item.thumbnail
    );
    const handleImageUrlSelect = (url) => {
        setImageUrl(url);
    };

    const title = item.pro_name;
    const descriptionNoHtml = stripHtmlTags(item.description);
    const price = parseFloat(item.price).toFixed(2);
    const discount = parseFloat(item.discount);

    const [isFetching, setIsFetching] = React.useState(true);
    const [loading, setLoading] = React.useState(true);
    const [products, setProducts] = React.useState([]);

    const [productInfo, setProductInfo] = React.useState({});
    const [productColors, setProductColors] = React.useState([]);
    const [productSizes, setProductSizes] = React.useState([]);
    const [productImages, setProductImages] = React.useState([]);
    const [shopInfo, setShopInfo] = React.useState({});
    const [isDiscount, setIsDiscount] = React.useState(false);

    // console.log(JSON.stringify(shopInfo, null, 2));
    // const [relatedProducts, setRelatedProducts] = React.useState([]);

    const [favorites, setFavorites] = React.useContext(favoritesContext);
    const [cartItems, setCartItems] = React.useContext(cartContext);
    // console.log(JSON.stringify(cartItems, null, 2));

    const [modalVisible, setModalVisible] = React.useState(false);
    const [images, setImages] = React.useState([]);

    // =======================Check for discount Available========================
    React.useEffect(() => {
        if (item.discount_date_start && item.discount_date_end) {
            const currentDate = new Date();
            const startString = item.discount_date_start;
            const endString = item.discount_date_end;

            // Parse date strings into year, month, and day components
            const [year1, month1, day1] = startString.split("/").map(Number);
            const [year2, month2, day2] = endString.split("/").map(Number);

            // Construct Date objects
            const startDate = new Date(year1, month1 - 1, day1); // Subtract 1 from month because month indexes start from 0
            const endDate = new Date(year2, month2 - 1, day2);
            console.log(currentDate, startDate, endDate);
            if (currentDate >= startDate && currentDate <= endDate) {
                // console.log('Current date is in middle');
                setIsDiscount(true);
            } else {
                // console.log('Current date is not in middle');
                setIsDiscount(false);
            }
        } else {
            // console.log('no discount');
            setIsDiscount(false);
        }
    }, []);
    // =======================Check for discount Available========================

    const getrelatedproducts = () => {
        fetch(
            "https://pgmarket.online/api/getrelatedproducts/" +
                item.main_cate_id
        )
            .then((rest) => rest.json())
            .then((data) => {
                setProducts(data.data);
            })
            .catch((err) => console.log(err))
            .finally(() => setIsFetching(false));
    };

    const getProductFullDetail = () => {
        fetch(
            "https://pgmarket.online/api/getproductfulldetail/" +
                item.id
        )
            .then((rest) => rest.json())
            .then((data) => {
                // console.log(JSON.stringify(data, null, 2));
                setProductInfo(data.product);
                setProductColors(data.colors);
                setProductSizes(data.sizes);
                setProductImages(data.images);
                setShopInfo(data.shop);
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setLoading(false);
            });
    };
    React.useEffect(() => {
        getProductFullDetail();
    }, []);

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
        // console.log(JSON.stringify("preShopId" + cartItems[0].shop_id, null, 2));
        // console.log(JSON.stringify("newShopId" + item.shop_id, null, 2));
        if (cartItems.length > 0) {
            if (cartItems[0].shop_id === item.shop_id) {
                setCartItems((preCartItems) => [
                    ...preCartItems,
                    {
                        ...item,
                        quantity: 1,
                        color: selectedColor,
                        size: selectedSize,
                        note: buyerNote,
                    },
                ]);
            } else {
                Alert.alert(
                    "Message",
                    "Difference shop cannot add to cart!",
                    [
                        {
                            text: "Close",
                            onPress: () => console.log("Close button pressed"),
                            style: "cancel",
                        },
                    ],
                    { cancelable: false }
                );
            }
        } else {
            setCartItems((preCartItems) => [
                ...preCartItems,
                {
                    ...item,
                    quantity: 1,
                    color: selectedColor,
                    size: selectedSize,
                    note: buyerNote,
                },
            ]);
        }
    };

    // console.log(JSON.stringify(item, null, 2));

    return (
        <ScrollView>
            <LoadingOverlay visible={loading} />
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
            {productImages.length > 1 && (
                <ProductImages
                    imageUrl={imageUrl}
                    imageData={productImages}
                    handleImageUrlSelect={handleImageUrlSelect}
                />
            )}

            <View style={{ backgroundColor: colors.white }}>
                <View style={{ padding: 10 }}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                        <Text
                            style={[
                                styles.price,
                                {
                                    textDecorationLine: isDiscount
                                        ? "line-through"
                                        : "none",
                                    color: isDiscount ? "gray" : "red",
                                },
                            ]}
                        >
                            {" "}
                            $ {price}{" "}
                        </Text>
                        {isDiscount && (
                            <Text style={styles.price}>
                                {" "}
                                $ {(price - (price * discount) / 100).toFixed(2)}
                            </Text>
                        )}
                    </Text>
                    {isDiscount && (
                        <View style={{ alignItems: 'flex-start' }}>
                            <Text style={{
                                fontSize: 16,
                                marginTop: 10,
                                marginBottom: 20,
                                backgroundColor: colors.secondary,
                                padding: 5,
                            }}>
                                {discount || 0}% off
                                {/* ({productInfo.discount_date_start} -{" "}
                                {productInfo.discount_date_end}) */}
                            </Text>
                        </View>
                    )}

                    <View style={{ marginTop: 10 }}>
                        <ProductColors
                            productColors={productColors}
                            selectedColor={selectedColor}
                            handleColorSelect={handleColorSelect}
                        />
                        <ProductSizes
                            productSizes={productSizes}
                            selectedSize={selectedSize}
                            handleSizeSelect={handleSizeSelect}
                        />
                        <View
                            style={{
                                marginBottom: 10,
                            }}
                        >
                            <Text>{ t('buyerNote') }</Text>
                            <TextInput
                                style={{
                                    marginTop: 5,
                                    backgroundColor: "#f0f0f0",
                                    paddingHorizontal: 15,
                                    paddingVertical: 12,
                                    fontSize: 16,
                                    color: "#333",
                                    textAlignVertical: "top",
                                    height: 68,
                                }}
                                maxLength={250}
                                placeholder="Buyer note ..."
                                onChangeText={(text) => handleTextBuyerNote(text)}
                                placeholderTextColor="#999"
                                multiline
                            />
                        </View>
                    </View>
                    {/* Add and Remove from Cart */}
                    {cartItems.some((cartItem) => cartItem.id === item.id) ? (
                        <CartButton
                            title="removeFromCart"
                            bgColor={colors.medium}
                            onPress={removeFromCart}
                        />
                    ) : (
                        <CartButton
                            title="addToCart"
                            bgColor={colors.primary}
                            onPress={addToCart}
                        />
                    )}
                    {/* End Add and Remove from Cart */}

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("ShopScreen", shopInfo);
                        }}
                    >
                        <ShopCardComponent
                            imageURL={
                                "https://pgmarket.online/public/images/shop/" +
                                shopInfo.image
                            }
                            title={shopInfo.shop_name}
                            contact={shopInfo.shop_phone}
                            description={shopInfo.shop_address}
                        />
                    </TouchableOpacity>

                    <View style={{ marginTop: 15, alignItems: "flex-start" }}>
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
                        {/* <LabelValue label="" /> */}
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "500",
                            }}
                        >
                            { t('productDescription') }
                        </Text>
                        <Text style={styles.description}>
                            {descriptionNoHtml}
                        </Text>
                    </View>
                </View>
                <View style={{ marginBottom: 30 }}>
                    <ListHeader
                        title="relateProducts"
                        onPress={() => {
                            navigation.navigate(
                                "SeeMoreScreen",
                                `getrelatedproducts/${item.main_cate_id}`
                            );
                        }}
                    />
                    <ActivityIndicator visibility={isFetching} />
                    {!isFetching && (
                        <FlatList
                            data={products}
                            keyExtractor={(item) => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <Card
                                    item={item}
                                    title={item.pro_name}
                                    imageUrl={
                                        "https://pgmarket.online/public/images/product/" +
                                        item.thumbnail
                                    }
                                    description={item.description}
                                    price={item.price}
                                />
                            )}
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
    const [t, i18n] = useTranslation('global');
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={{
                backgroundColor: bgColor,
                alignItems: "center",
                padding: 10,
                borderRadius: 10,
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
                    { t(title) }
                </Text>
            </View>
        </TouchableOpacity>
    );
}

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
