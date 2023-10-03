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

export default function ShopScreen({ navigation }) {
    const [selected, setSelected] = React.useState("Products");

    const [isFetching, setIsFetching] = React.useState(true);
    const [products, setProducts] = React.useState([]);

    const [modalVisible, setModalVisible] = React.useState(false);
    const [images, setImages] = React.useState([]);

    const getData = () => {
        fetch(`https://fakestoreapi.com/products`)
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
                                            url: "https://source.unsplash.com/1024x768/?mountain",
                                        },
                                    ]);
                                }}
                            >
                                <Image
                                    style={styles.coverImage}
                                    source={{
                                        uri: "https://source.unsplash.com/1024x768/?mountain",
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
                                                    url: "https://source.unsplash.com/Y9MoiZi9Rbg",
                                                },
                                            ]);
                                        }}
                                    >
                                        <Image
                                            style={styles.profileImage}
                                            source={{
                                                uri: "https://source.unsplash.com/Y9MoiZi9Rbg",
                                            }}
                                        />
                                    </TouchableOpacity>
                                    <Text style={styles.profileTitle}>
                                        ABC Shop
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
                                <FlatList
                                    numColumns={2}
                                    data={products}
                                    scrollEnabled={false}
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item }) => (
                                        <Card item={item} width={width} />
                                    )}
                                    contentContainerStyle={{
                                        gap: 10,
                                    }}
                                    columnWrapperStyle={{
                                        justifyContent: "space-evenly",
                                    }}
                                />
                            </View>
                        ) : (
                            <View style={{ padding: 10, gap: 15 }}>
                                <AboutItem
                                    title="Address"
                                    detail="st148, PhsarKandal, DounPenh, Phnom Penh, Cambodia "
                                    icon="map-marker"
                                />
                                <AboutItem
                                    title="Phone Number"
                                    detail="096 233 46 84"
                                    icon="mobile-phone"
                                />
                                <AboutItem
                                    title="email"
                                    detail="longsoeng168@gmail.com"
                                    icon="envelope-o"
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
