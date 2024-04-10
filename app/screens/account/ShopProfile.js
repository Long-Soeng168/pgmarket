import React from "react";
import { Dimensions, FlatList, ScrollView, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import { Modal } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { useNavigation } from "@react-navigation/native";

import Card from "../../components/Card";
import colors from "../../config/colors";
import ActivityIndicator from "../../components/ActivityIndicator";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import BackButton from "../../components/BackButton";
import { userContext } from "../../../App";
import { useTranslation } from "react-i18next";

const width = Dimensions.get("screen").width / 2 - 15;

const fetchData = async (url, setter) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        setter(data);
    } catch (error) {
        console.error(error);
    }
};

export default function ShopProfile({ navigation, route }) {
    // const shop = route.params;

    const [user, setUser] = React.useContext(userContext);
    const [selected, setSelected] = React.useState("Products");
    const [t, i18n] = useTranslation('global');

    const [products, setProducts] = React.useState([]);

    const [modalVisible, setModalVisible] = React.useState(false);
    const [images, setImages] = React.useState([]);

    const [isFetching, setIsFetching] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [noMoreProduct, setNoMoreProduct] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [shop, setShop] = React.useState([]);

    const handlePageLoad = () => {
        setLoading(true);
        setCurrentPage((preValue) => preValue + 1);
    };

    const getData = () => {
        fetch(
            `https://pgmarket.online/api/getproducts_byshop/` +
                user.user.id +
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

    React.useEffect(() => {
        const fetchDataAsync = async () => {
            await fetchData(
                "https://pgmarket.online/api/shopview/" +
                    user.user.id,
                setShop
            );
            setIsFetching(false);
        };

        fetchDataAsync();
    }, []);
    // console.log(JSON.stringify(shop, null, 2));

    const bannerUrl =
        shop &&
        "https://pgmarket.online/public/images/shop_banner/" +
            shop.image_banner;
    const imageUrl =
        shop &&
        "https://pgmarket.online/public/images/shop/" + shop.image;
    const shopName = shop && shop.shop_name;
    const shopAddress = shop && shop.shop_address;
    const shopNumber = shop && shop.shop_phone;
    const shopEmail = shop && shop.shop_email;
    const shopDescription = shop && stripHtmlTags(shop.description);

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
                                title="Detail"
                                icon="bars"
                                selected={selected}
                                onPress={() => setSelected("Detail")}
                            />
                        </View>

                        {/* List Item */}
                        {selected === "Products" ? (
                            <View style={{ paddingVertical: 15 }}>
                                <TouchableOpacity
                                    style={styles.AddButton}
                                    onPress={() =>
                                        navigation.navigate("AddProductScreen")
                                    }
                                >
                                    <Text style={styles.AddButtonText}>
                                        {t('addProduct')}
                                    </Text>
                                </TouchableOpacity>
                                {products.length > 0 ? (
                                    <View style={{ paddingHorizontal: 10 }}>
                                        <FlatList
                                            numColumns={2}
                                            data={products}
                                            scrollEnabled={false}
                                            showsHorizontalScrollIndicator={
                                                false
                                            }
                                            renderItem={({ item }) => (
                                                <TouchableOpacity
                                                    key={item.pro_id}
                                                    onPress={() =>
                                                        navigation.push(
                                                            "ShopProductDetail",
                                                            item
                                                        )
                                                    }
                                                >
                                                    <CardProduct
                                                        item={item}
                                                        width={width}
                                                        title={item.pro_name}
                                                        imageUrl={
                                                            "https://pgmarket.online/public/images/product/thumb/" +
                                                            item.thumbnail
                                                        }
                                                        description={
                                                            item.description
                                                        }
                                                        price={item.price}
                                                    />
                                                </TouchableOpacity>
                                            )}
                                            contentContainerStyle={{
                                                gap: 10,
                                            }}
                                            columnWrapperStyle={{
                                                justifyContent: "space-between",
                                            }}
                                        />
                                        <ActivityIndicator
                                            visibility={loading}
                                        />
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
                                                        textDecorationLine:
                                                            "underline",
                                                        fontWeight: "bold",
                                                        color: "tomato",
                                                    }}
                                                >
                                                    {t("moreProducts")}
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
                                    <Text>{t('noItem')}</Text>
                                )}
                            </View>
                        ) : (
                            <View style={{ padding: 10, gap: 15 }}>
                                <AboutItem
                                    title="address"
                                    detail={shopAddress}
                                    icon="map-marker"
                                />
                                <AboutItem
                                    title="phone"
                                    detail={shopNumber}
                                    icon="mobile-phone"
                                />
                                <AboutItem
                                    title="email"
                                    detail={shopEmail}
                                    icon="envelope-o"
                                />
                                <AboutItem
                                    title="description"
                                    detail={shopDescription}
                                    icon="navicon"
                                />
                                <View style={{ flexDirection: "row", gap: 10 }}>
                                    <TouchableOpacity
                                        style={[
                                            styles.AddButton,
                                            { backgroundColor: colors.medium },
                                        ]}
                                        onPress={() =>
                                            navigation.navigate(
                                                "UpdateBankAccount"
                                            )
                                        }
                                    >
                                        <Text style={styles.AddButtonText}>
                                            {t('paymentMethod')}
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[
                                            styles.AddButton,
                                            { backgroundColor: "tomato" },
                                        ]}
                                        onPress={() =>
                                            navigation.navigate(
                                                "UpdateShopDetail"
                                            )
                                        }
                                    >
                                        <Text style={styles.AddButtonText}>
                                            {t('updateDetails')}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
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
    const [t, i18n] = useTranslation('global');
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
                {t(title)}
            </Text>
        </TouchableOpacity>
    );
}

// About Item component
function AboutItem({ title, detail, icon }) {
    const [t, i18n] = useTranslation('global');
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
            <Text style={{ fontSize: 18, fontWeight: "500" }}>{t(title)} :</Text>
            <Text style={{ fontSize: 18, flex: 1 }}>{detail}</Text>
        </View>
    );
}

const CardProduct = ({
    item,
    width = 170,
    title,
    description,
    imageUrl,
    price,
}) => {
    const navigation = useNavigation();

    const descriptionNoHtml = stripHtmlTags(description);
    return (
        <View style={[styles.container, { width: width }]}>
            <Image
                style={styles.image}
                source={{
                    uri: imageUrl,
                }}
            />
            <View style={styles.textContainer}>
                <Text numberOfLines={2} style={styles.title}>
                    {title}
                </Text>
                <Text numberOfLines={2} style={styles.description}>
                    {descriptionNoHtml}
                </Text>
                <Text numberOfLines={1} style={styles.price}>
                    $ {parseFloat(price).toFixed(2)}
                </Text>
            </View>
        </View>
    );
};

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
    AddButton: {
        flex: 1,
        backgroundColor: colors.primary,
        padding: 12,
        borderRadius: 8,
        marginHorizontal: 15,
        marginBottom: 16,
        // marginTop: 16,
        alignItems: "center",
    },
    AddButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    image: {
        backgroundColor: colors.white,
        aspectRatio: 1,
        borderRadius: 10,
        objectFit: "cover",
    },
    container: {
        // width: 160,
        borderRadius: 15,
        overflow: "hidden",
        backgroundColor: colors.light,
        padding: 5,
    },
    textContainer: { padding: 10, gap: 3 },
    title: { fontSize: 12, fontWeight: "500" },
    description: { fontSize: 10, color: colors.medium },
    price: {
        fontSize: 14,
        fontWeight: "500",
        color: colors.danger,
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
