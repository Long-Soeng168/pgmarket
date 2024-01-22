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

const width = Dimensions.get("screen").width / 2 - 20;

export default function ShopProfile({ navigation, route=12 }) {
    // const shop = route.params;
    const shop = {
        "id": 12,
        "id_link_from_users": 20,
        "shopcategory_id": 26,
        "shop_name": "IDO Technology",
        "shop_email": "ido@gmail.com",
        "shop_address": "Phnom Penh",
        "shop_phone": "010775589",
        "image": "1688884776-IDO Technology.jpg",
        "image_banner": "1694533821.jpg",
        "bank_name": "ABA Bank",
        "bank_id": "Mao Bora",
        "bank_swift_code": "000210919",
        "payment_link_for_url": "https://pay.ababank.com/Xvy23onjzjtB2dkm8",
        "qr_code": "1702955813-IDO Technology.jpg",
        "bank_image": "1703473786-IDO Technology.jpeg",
        "description": "<p>We are selling all type of electronic device.</p>",
        "cash_ondelivery": 1,
        "status_delete": 1,
        "created_at": "2023-06-16T10:00:32.000000Z",
        "updated_at": "2024-01-17T04:25:02.000000Z"
    };
    // console.log(JSON.stringify(shop, null, 2));

    const bannerUrl = "https://pgmarket.online/public/images/shop_banner/" + shop.image_banner;
    const imageUrl = "https://pgmarket.online/public/images/shop/" + shop.image;
    const shopName = shop.shop_name;
    const shopAddress = shop.shop_address;
    const shopNumber = shop.shop_phone;
    const shopEmail = shop.shop_email;
    const shopDescription = stripHtmlTags(shop.description);

    const [selected, setSelected] = React.useState("Products");

    const [isFetching, setIsFetching] = React.useState(true);
    const [products, setProducts] = React.useState([]);

    const [modalVisible, setModalVisible] = React.useState(false);
    const [images, setImages] = React.useState([]);

    const getData = () => {
        fetch(`https://pgmarket.online/api/getproducts_byshop/` + shop.id_link_from_users)
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
    // console.log(JSON.stringify(products, null, 2));
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
                            <View style={{ paddingVertical: 15 }}>
                                <TouchableOpacity style={ styles.AddButton }>
                                    <Text style={ styles.AddButtonText }>
                                        Add Product
                                    </Text>
                                </TouchableOpacity>
                                {
                                    products.length > 0 ?
                                        <FlatList
                                            numColumns={2}
                                            data={products}
                                            scrollEnabled={false}
                                            showsHorizontalScrollIndicator={false}
                                            renderItem={({ item }) => (
                                                <Card item={item} width={width} 
                                                    title = {item.pro_name}
                                                    imageUrl = {"https://pgmarket.online/public/images/product/" + item.thumbnail}
                                                    description= {item.description}
                                                    price = {item.price}
                                                />
                                            )}
                                            contentContainerStyle={{
                                                gap: 10,
                                            }}
                                            columnWrapperStyle={{
                                                justifyContent: "space-evenly",
                                        }}
                                    /> : 
                                    <Text>No Product</Text>
                                }
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
                                <TouchableOpacity style={ [styles.AddButton, {backgroundColor: "tomato"}] }>
                                    <Text style={ styles.AddButtonText }>
                                        Edit Shop Details
                                    </Text>
                                </TouchableOpacity>
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
    AddButton: {
        backgroundColor: colors.primary,
        padding: 12,
        borderRadius: 8,
        marginHorizontal: 15,
        marginBottom: 16,
        // marginTop: 16,
        alignItems: 'center',
      },
    AddButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
});




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