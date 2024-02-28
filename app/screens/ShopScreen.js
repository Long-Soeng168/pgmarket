import React from "react";
import { Dimensions, FlatList, ScrollView, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import { Modal } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

import Card from "../components/Card";
import colors from "../config/colors";
import ActivityIndicator from "../components/ActivityIndicator";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import BackButton from "../components/BackButton";
import { selectTextOnFocus } from "deprecated-react-native-prop-types/DeprecatedTextInputPropTypes";

const width = Dimensions.get("screen").width / 2 - 15;

export default function ShopScreen({ navigation, route }) {
    const shop = route.params;
    // console.log(JSON.stringify(shop, null, 2));

    const bannerUrl =
        "https://pgmarket.longsoeng.website/public/images/shop_banner/" +
        shop.image_banner;
    const imageUrl =
        "https://pgmarket.longsoeng.website/public/images/shop/" + shop.image;
    const shopName = shop.shop_name;
    const shopAddress = shop.shop_address;
    const shopNumber = shop.shop_phone;
    const shopEmail = shop.shop_email;
    const shopDescription = stripHtmlTags(shop.description);

    const [selected, setSelected] = React.useState("Products");

    const [isFetching, setIsFetching] = React.useState(true);
    const [products, setProducts] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [noMoreProduct, setNoMoreProduct] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const [modalVisible, setModalVisible] = React.useState(false);
    const [images, setImages] = React.useState([]);

    const getData = () => {
        fetch(
            `https://pgmarket.longsoeng.website/api/getproducts_byshop/` +
                shop.id_link_from_users +
                "?page=" +
                currentPage
        )
            .then((rest) => rest.json())
            .then((result) => {
                // console.log(result);
                if (!result.data.length > 0) {
                    setNoMoreProduct(true);
                }
                setProducts((preProducts) => [...preProducts, ...result.data]);
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setIsFetching(false);
                setLoading(false);
            });
    };
    React.useEffect(() => {
        getData();
    }, [currentPage]);
    // console.log(JSON.stringify(products, null, 2));

    const handlePageLoad = () => {
        setLoading(true);
        setCurrentPage((preValue) => preValue + 1);
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colors.white,
            }}
        >
            <View style={{ flex: 1 }}>
                <ActivityIndicator visibility={isFetching} />
                {!isFetching && (
                    <ScrollView>
                        <BackButton
                            onPress={() => {
                                navigation.goBack();
                            }}
                        />
                        {/* Shop Profile */}
                        <View style={{ marginBottom: 100 }}>
                            {/* Cover */}
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    setModalVisible(true);
                                    setImages([
                                        {
                                            url: bannerUrl,
                                        },
                                    ]);
                                }}
                            >
                                <Image
                                    style={styles.coverImage}
                                    source={{
                                        uri: bannerUrl,
                                    }}
                                />
                            </TouchableOpacity>
                            <View>
                                <View style={styles.profile}>
                                    {/* Profile Image */}
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={() => {
                                            setModalVisible(true);
                                            setImages([
                                                {
                                                    url: imageUrl,
                                                },
                                            ]);
                                        }}
                                    >
                                        <Image
                                            style={styles.profileImage}
                                            source={{
                                                uri: imageUrl,
                                            }}
                                        />
                                    </TouchableOpacity>
                                    <Text style={styles.profileTitle}>
                                        {shopName}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Selection */}
                        <View style={styles.selectionContainer}>
                            <ShopSelection
                                title="Products"
                                icon="appstore-o"
                                selected={selected}
                                onPress={() => setSelected("Products")}
                            />
                            <ShopSelection
                                title="About"
                                icon="bars"
                                selected={selected}
                                onPress={() => setSelected("About")}
                            />
                        </View>

                        {/* List Item */}
                        {selected === "Products" ? (
                            <View
                                style={{
                                    paddingVertical: 10,
                                    paddingHorizontal: 10,
                                }}
                            >
                                {products.length > 0 ? (
                                    <FlatList
                                        numColumns={2}
                                        data={products}
                                        scrollEnabled={false}
                                        keyExtractor={(item) => item.id.toString()}
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={({ item }) => (
                                            <Card
                                                key={item.id.toString()}
                                                item={item}
                                                width={width}
                                                title={item.pro_name}
                                                imageUrl={
                                                    "https://pgmarket.longsoeng.website/public/images/product/" +
                                                    item.thumbnail
                                                }
                                                description={item.description}
                                                price={item.price}
                                            />
                                        )}
                                        contentContainerStyle={{
                                            gap: 10,
                                        }}
                                        columnWrapperStyle={{
                                            justifyContent: "space-between",
                                        }}
                                    />
                                ) : (
                                    <Text>No Product</Text>
                                )}
                                <ActivityIndicator visibility={loading} />
                                {!noMoreProduct && (
                                    <TouchableOpacity
                                        style={{
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            paddingTop: 15,
                                            paddingBottom: 5,
                                        }}
                                        onPress={handlePageLoad}
                                    >
                                        <Text
                                            style={{
                                                textDecorationLine: "underline",
                                                fontWeight: "bold",
                                                color: "tomato",
                                            }}
                                        >
                                            More Products
                                        </Text>
                                        <FontAwesome
                                            name="angle-double-down"
                                            size={28}
                                            color="tomato"
                                        />
                                    </TouchableOpacity>
                                )}
                            </View>
                        ) : (
                            <View style={{ padding: 10, gap: 15 }}>
                                <AboutItem
                                    title="Address"
                                    detail={shopAddress}
                                    icon="map-marker"
                                />
                                <AboutItem
                                    title="Phone Number"
                                    detail={shopNumber}
                                    icon="mobile-phone"
                                />
                                <AboutItem
                                    title="email"
                                    detail={shopEmail}
                                    icon="envelope-o"
                                />
                                <AboutItem
                                    title="Description"
                                    detail={shopDescription}
                                    icon="navicon"
                                />
                            </View>
                        )}
                    </ScrollView>
                )}
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
        </View>
    );
}

// Shop Selection
function ShopSelection({ title, icon, selected, onPress }) {
    const isSelected = title === selected;
    return (
        <TouchableOpacity
            opacity={0.8}
            onPress={onPress}
            style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                padding: 10,
                backgroundColor: isSelected ? colors.mdLight : colors.white,
                borderBottomWidth: isSelected ? 2 : 1,
                borderColor: isSelected ? colors.primary : colors.mdLight,
                top: 1,
            }}
        >
            <AntDesign
                name={icon} //appstore-o, bars
                size={19}
                color={isSelected ? colors.dark : colors.medium}
            />
            <Text
                style={{
                    fontSize: 16,
                    color: isSelected ? colors.dark : colors.medium,
                }}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}

// About Item component
function AboutItem({ title, detail, icon }) {
    return (
        <View
            style={{
                flexDirection: "row",
                gap: 5,
                alignItem: "center",
            }}
        >
            <View
                style={{
                    width: 30,
                }}
            >
                <FontAwesome
                    style={{ alignSelf: "center" }}
                    name={icon}
                    size={24}
                    color="black"
                />
            </View>
            <Text style={{ fontSize: 18, fontWeight: "500" }}>{title} :</Text>
            <Text style={{ fontSize: 18, flex: 1 }}>{detail}</Text>
        </View>
    );
}

// Style Sheet
const styles = StyleSheet.create({
    coverImage: { width: "100%", height: 200 },
    profile: {
        position: "absolute",
        top: -50,
        alignSelf: "center",
        gap: 5,
    },
    profileImage: {
        borderWidth: 3,
        borderColor: colors.white,
        width: 100,
        height: 100,
        borderRadius: 100,
        alignSelf: "center",
    },
    profileTitle: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "500",
    },
    selectionContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        borderBottomWidth: 1,
        borderColor: "lightgrey",
        margin: 10,
    },
});

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
