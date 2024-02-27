import React from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
    Alert,
    Linking,
    Dimensions,
    ScrollView,
} from "react-native";
import colors from "../../config/colors";
import { cartContext, userContext } from "../../../App";
import LoadingOverlay from "../../components/LoadingOverlay";
import EditInfoModal from "./EditInfoModal";
import HeaderText from "../../components/HeaderText";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const CheckoutProcess = ({ navigation }) => {
    const [selectedBank, setSelectedBank] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [isVisibleModal, setIsVisibleModal] = React.useState(false);

    const [cartItems, setCartItems] = React.useContext(cartContext);
    const [user, setUser] = React.useContext(userContext);
    // console.log(JSON.stringify(user, null, 2));
    const userInfo = user && user.user;

    const [banks, setBanks] = React.useState([]);
    const [cashOnDelivery, setCashOnDelivery] = React.useState(null);
    const [invoiceCreatedId, setInvoiceCreateId] = React.useState(null);
    const [imageUpload, setImageUpload] = React.useState(null);

    React.useEffect(() => {
        if (cartItems.length > 0) {
            let shopId = cartItems[0].shop_id;
            const requestOptions = {
                method: "GET",
                redirect: "follow",
            };

            fetch(
                "https://pgmarket.longsoeng.website/api/getshopbanks/" + shopId,
                requestOptions
            )
                .then((response) => response.json())
                .then((result) => {
                    console.log(JSON.stringify(result, null, 2));
                    setBanks(result.banks);
                    setCashOnDelivery(result.cashOnDelivery);
                })
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
        }
    }, []);

    const handleConfirm = () => {
        if (!selectedBank) {
            Alert.alert(
                "Message",
                "Please select bank for pay!",
                [
                    { text: "", style: "" },
                    {
                        text: "OK",
                    },
                ],
                { cancelable: false }
            );
            return;
        }
        setLoading(true);
        setTimeout(() => {
            handleRequestOrder();
        }, 10);
    };

    const handleRequestOrder = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            payment: selectedBank,
            user: userInfo,
            products: cartItems,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch(
            "https://pgmarket.longsoeng.website/api/orderInsert",
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                // console.log(result);
                if (!result.error) {
                    setCartItems([]);
                    // setInvoiceCreateId(result.invoiceId);
                    if (imageUpload) {
                        handleUploadImage(result.invoiceId);
                    } else {
                        Alert.alert(
                            "Message",
                            "Your order submit successfully",
                            [
                                { text: "", style: "" },
                                {
                                    text: "OK",
                                    onPress: () => {
                                        navigation.goBack();
                                    },
                                },
                            ],
                            { cancelable: false }
                        );
                    }
                } else {
                    Alert.alert(
                        "Message",
                        "Your order submit unsuccessfully",
                        [
                            { text: "", style: "" },
                            {
                                text: "OK",
                                onPress: () => {
                                    navigation.goBack();
                                },
                            },
                        ],
                        { cancelable: false }
                    );
                }
            })
            .catch((error) => {
                console.error(error);
                Alert.alert(
                    "Message",
                    "Your order submit unsuccessfully",
                    [
                        { text: "", style: "" },
                        {
                            text: "OK",
                            onPress: () => {
                                navigation.goBack();
                            },
                        },
                    ],
                    { cancelable: false }
                );
            });
        // Alert.alert("Confirmation", "You clicked confirm.");
    };

    const handleSelectBank = (bank, link) => {
        setSelectedBank(bank);
        Linking.openURL(link);
    };

    const RenderBankItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={[
                    styles.bankItem,
                    {
                        backgroundColor:
                            item.payment_name === selectedBank
                                ? colors.secondary
                                : "#f0f0f0",
                    },
                ]}
                onPress={() => handleSelectBank(item.payment_name, item.link)}
            >
                <Image
                    source={{
                        uri: item.image,
                    }}
                    style={styles.bankLogo}
                />
                <View>
                    <Text style={styles.bankName}>{item.payment_name}</Text>
                    <Text>Tap here to pay with {item.payment_name}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    // ==========Image Picker ========================
    React.useEffect(() => {
        (async () => {
            if (Platform.OS !== "web") {
                try {
                    const { status } =
                        await ImagePicker.requestMediaLibraryPermissionsAsync();
                    if (status !== "granted") {
                        alert(
                            "Sorry, we need camera roll permissions to make this work!"
                        );
                    }
                } catch (error) {
                    console.error(
                        "Error requesting media library permissions:",
                        error
                    );
                }
            }
        })();
    }, []);

    const handlePickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
            });

            if (!result.canceled) {
                // Use the first asset in the "assets" array
                const selectedAsset = result.assets[0];
                setImageUpload(selectedAsset.uri);
            }
        } catch (error) {
            console.error("Error picking image:", error);
        }
    };

    const handleUploadImage = (invoiceId) => {
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");

        const formdata = new FormData();
        if (imageUpload) {
            const filename = imageUpload.split("/").pop(); // Extract filename from URI
            const fileExtension = filename.split(".").pop(); // Extract file extension

            formdata.append("image", {
                uri: imageUpload,
                name: "image.jpg",
                type: `image/${fileExtension}`, // Set correct MIME type
            });
        }

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: "follow",
        };
        fetch(
            "https://pgmarket.longsoeng.website/api/uploadTransaction/" +
                invoiceId,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                Alert.alert(
                    "Message",
                    "Your order submit successfully",
                    [
                        { text: "", style: "" },
                        {
                            text: "OK",
                            onPress: () => {
                                navigation.goBack();
                            },
                        },
                    ],
                    { cancelable: false }
                );
            })
            .catch((error) => {
                console.error(error);
                Alert.alert(
                    "Message",
                    "Your order submit unsuccessfully",
                    [
                        { text: "", style: "" },
                        {
                            text: "OK",
                            onPress: () => {
                                navigation.goBack();
                            },
                        },
                    ],
                    { cancelable: false }
                );
            });
    };
    // ==========End Image Picker===============
    return (
        <>
            <HeaderText title="Checkout Process" />
            <View
                style={{
                    flex: 1,
                    // backgroundColor: 'yellow'
                }}
            >
                <ScrollView style={styles.container}>
                    <View
                        style={{
                            justifyContent: "space-between",
                            // backgroundColor: 'red',
                        }}
                    >
                        <LoadingOverlay visible={loading} />
                        <EditInfoModal
                            isVisible={isVisibleModal}
                            setIsVisible={setIsVisibleModal}
                            userInfo={userInfo && userInfo}
                        />

                        <Text style={styles.title}>User Information</Text>
                        <TouchableOpacity
                            onPress={() => setIsVisibleModal(true)}
                            style={styles.userInfo}
                        >
                            <View
                                style={{
                                    position: "absolute",
                                    right: 10,
                                    top: 10,
                                }}
                            >
                                <Feather name="edit" size={24} color="gray" />
                            </View>
                            <Text style={styles.value}>
                                <Text style={styles.label}>Name: </Text>
                                {userInfo && userInfo.name}
                            </Text>
                            <Text style={styles.value}>
                                <Text style={styles.label}>Phone: </Text>
                                {userInfo && userInfo.phone}
                            </Text>
                            <Text style={styles.value}>
                                <Text style={styles.label}>Email: </Text>
                                {userInfo && userInfo.email}
                            </Text>
                            <Text style={styles.value}>
                                <Text style={styles.label}>Address: </Text>
                                {userInfo && userInfo.address}
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.title}>Payment Method</Text>

                        {/* <FlatList
                        data={banks}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderBankItem}
                        style={styles.flatList}
                    /> */}
                        <View>
                            <View>
                                {banks.map((item) => (
                                    <RenderBankItem
                                        item={item}
                                        key={item.id.toString()}
                                    />
                                ))}
                                {cashOnDelivery == 1 && (
                                    <TouchableOpacity
                                        style={[
                                            styles.bankItem,
                                            {
                                                backgroundColor:
                                                    "On Delivery" ===
                                                    selectedBank
                                                        ? colors.secondary
                                                        : "#f0f0f0",
                                            },
                                        ]}
                                        onPress={() =>
                                            setSelectedBank("On Delivery")
                                        }
                                    >
                                        <View
                                            style={[
                                                styles.bankLogo,
                                                {
                                                    backgroundColor:
                                                        colors.primary,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                },
                                            ]}
                                        >
                                            <FontAwesome5
                                                name="hand-holding-usd"
                                                size={35}
                                                color="white"
                                            />
                                        </View>
                                        <View>
                                            <Text style={styles.bankName}>
                                                Cash on delivery
                                            </Text>
                                            <Text>
                                                Tap here to pay on delivery
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            </View>

                            <View
                                style={{
                                    alignItems: "center",
                                    paddingBottom: 30,
                                }}
                            >
                                {imageUpload ? (
                                    <TouchableOpacity onPress={handlePickImage}>
                                        <Image
                                            style={styles.profilePicture}
                                            source={{ uri: imageUpload }}
                                        />
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        style={styles.uploadButton}
                                        onPress={handlePickImage}
                                    >
                                        <Ionicons
                                            name="camera"
                                            size={28}
                                            color="white"
                                        />
                                    </TouchableOpacity>
                                )}
                                <Text>Upload Transaction</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View
                    style={{
                        backgroundColor: "white",
                        paddingHorizontal: 20,
                        borderTopColor: colors.secondary,
                        borderTopWidth: 1,
                    }}
                >
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleConfirm}
                    >
                        <Text style={styles.buttonText}>Checkout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // minHeight: Dimensions.get('screen').height,
        // justifyContent: "space-between",
        // alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: "white",
        paddingTop: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 10,
        textDecorationLine: "underline",
    },
    userInfo: {
        backgroundColor: colors.secondary,
        // backgroundColor: "#f0f0f0",
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        width: "100%",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        // marginBottom: 5,
    },
    value: {
        fontSize: 16,
        marginBottom: 5,
    },
    button: {
        backgroundColor: colors.primary,
        padding: 12,
        borderRadius: 8,
        marginVertical: 16,
        alignItems: "center",
        width: "100%",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    flatList: {
        width: "100%",
    },
    bankItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        backgroundColor: "#f0f0f0",
        padding: 6,
        borderRadius: 10,
    },
    bankLogo: {
        width: 60,
        height: 60,
        resizeMode: "contain",
        marginRight: 10,
        borderRadius: 5,
    },
    bankName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    profilePicture: {
        // width: 120,
        height: 150,
        aspectRatio: 9 / 16,
        // marginTop: -60,
        // borderRadius: 100,
        borderWidth: 1,
        borderColor: "white",
    },
    coverPicture: {
        width: "100%",
        // aspectRatio: 9/16,
        backgroundColor: "lightgray",
        justifyContent: "center",
        alignItems: "center",
    },
    uploadButton: {
        // width: 120,
        height: 150,
        aspectRatio: 9 / 16,
        // borderRadius: 100,
        backgroundColor: "lightgray",
        justifyContent: "center",
        alignItems: "center",
        // marginTop: -60,
        // margin: 25,
    },
});

export default CheckoutProcess;
