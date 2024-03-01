import React from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert, 
    ScrollView,
    TextInput,
    Modal,
} from "react-native";
import colors from "../../config/colors";
import { cartContext, userContext } from "../../../App";
import LoadingOverlay from "../../components/LoadingOverlay";
import EditInfoModal from "../cart/EditInfoModal";
import HeaderText from "../../components/HeaderText";
import * as ImagePicker from "expo-image-picker";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const UpdateBankAccount = ({ navigation }) => {
    const [selectedBank, setSelectedBank] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [isVisibleModal, setIsVisibleModal] = React.useState(false);

    const [user, setUser] = React.useContext(userContext);
    // console.log(JSON.stringify(user, null, 2));
    const userInfo = user && user.user;

    const [mainBank, setMainBank] = React.useState({});
    const [moreBanks, setMoreBanks] = React.useState([]);
    const [cashOnDelivery, setCashOnDelivery] = React.useState(0);

    const [newPaymentName, setNewPaymentName] = React.useState("");
    const [newPaymentLink, setNewPaymentLink] = React.useState("");
    const [imageUpload, setImageUpload] = React.useState(null);
    const [allfieldsRequired, setAllfieldsRequired] = React.useState(false);
    const [allfieldsMainRequired, setAllfieldsMainRequired] = React.useState(false);

    const [newPaymentModal, setNewPaymentModal] = React.useState(false);
    const [mainPaymentModal, setMainPaymentModal] = React.useState(false);

    const [mainPaymentName, setMainPaymentName] = React.useState("");
    const [mainPaymentLink, setMainPaymentLink] = React.useState("");

    React.useEffect(() => {
        const requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        fetch(
            "https://pgmarket.longsoeng.website/api/get_banks_for_dealer/" + 20,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                // console.log(JSON.stringify(result, null, 2));
                setMainBank(result.mainBank);
                setMoreBanks(result.moreBanks);
                setCashOnDelivery(result.cashOnDelivery);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    const RenderBankItem = ({ item }) => {
        return (
            <View
                style={[
                    styles.bankItem,
                    {
                        paddingRight: 12,
                    },
                ]}
            >
                <Image
                    source={{
                        uri: item.image,
                    }}
                    style={styles.bankLogo}
                />
                <View style={{ flex: 1 }}>
                    <Text style={styles.bankName}>{item.payment_name}</Text>
                    <Text style={{ width: "100%" }} numberOfLines={1}>
                        Link : {item.link}
                    </Text>
                </View>
                <TouchableOpacity
                    style={{ paddingHorizontal: 3 }}
                    onPress={() => {
                        Alert.alert(
                            "Message",
                            "Are you sure for remove this payment?",
                            [
                                { text: "Cancel", style: "cancel" },
                                {
                                    text: "OK",
                                    onPress: () => {
                                        setLoading(true);
                                        handleRemovePayment(item.id);
                                    },
                                },
                            ],
                            { cancelable: true }
                        );
                    }}
                >
                    <FontAwesome5
                        name="trash-alt"
                        size={24}
                        color={colors.danger}
                    />
                </TouchableOpacity>
            </View>
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
                allowsEditing: true,
                aspect: [1, 1],
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
    // ==========End Image Picker===============

    const handleRemovePayment = (id) => {
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", "Bearer " + user.token);

        var requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch(
            `https://pgmarket.longsoeng.website/api/deleteShopPayment/${id}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                Alert.alert(
                    "Message",
                    "Payment remove successfully",
                    [
                        { text: "", style: "" },
                        {
                            text: "OK",
                            onPress: () => {
                                navigation.replace("UpdateBankAccount");
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
                    "Payment unsuccessfully",
                    [
                        { text: "", style: "" },
                        {
                            text: "OK",
                            onPress: () => {
                                navigation.replace("UpdateBankAccount");
                            },
                        },
                    ],
                    { cancelable: false }
                );
            })
            .finally(() => setLoading(false));
    };

    const handleAddNewPayment = () => {
        if (!newPaymentName || !newPaymentLink || !imageUpload) {
            setAllfieldsRequired(true);
            setLoading(false);
            return;
        } else {
            setAllfieldsRequired(false);
        }

        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", "Bearer " + user.token);

        var formdata = new FormData();
        formdata.append("payment_name", newPaymentName);
        formdata.append("link", newPaymentLink);
        if (imageUpload) {
            const filename = imageUpload.split("/").pop(); // Extract filename from URI
            const fileExtension = filename.split(".").pop(); // Extract file extension

            formdata.append("image", {
                uri: imageUpload,
                name: "image.jpg",
                type: `image/${fileExtension}`, // Set correct MIME type
            });
        }

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: "follow",
        };

        fetch(
            "https://pgmarket.longsoeng.website/api/storeShopPayment",
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                Alert.alert(
                    "Message",
                    "New Payment add successfully",
                    [
                        { text: "", style: "" },
                        {
                            text: "OK",
                            onPress: () => {
                                navigation.replace("UpdateBankAccount");
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
                    "New Payment add unsuccessfully",
                    [
                        { text: "", style: "" },
                        {
                            text: "OK",
                            onPress: () => {
                                navigation.replace("UpdateBankAccount");
                            },
                        },
                    ],
                    { cancelable: false }
                );
            })
            .finally(() => setLoading(false));
    };

    const handleUpdateMainBank = () => {
        if (!mainPaymentName || !mainPaymentLink) {
            setAllfieldsMainRequired(true);
            setLoading(false);
            return;
        } else {
            setAllfieldsMainRequired(false);
        }

        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", "Bearer " + user.token);

        var formdata = new FormData();
        formdata.append("payment_name", mainPaymentName);
        formdata.append("link", mainPaymentLink);
        formdata.append("cash_ondelivery", cashOnDelivery);
        if (imageUpload) {
            const filename = imageUpload.split("/").pop(); // Extract filename from URI
            const fileExtension = filename.split(".").pop(); // Extract file extension

            formdata.append("image", {
                uri: imageUpload,
                name: "image.jpg",
                type: `image/${fileExtension}`, // Set correct MIME type
            });
        }

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: "follow",
        };

        fetch(
            "https://pgmarket.longsoeng.website/api/updateMainBank",
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                Alert.alert(
                    "Message",
                    "Main Payment update successfully",
                    [
                        { text: "", style: "" },
                        {
                            text: "OK",
                            onPress: () => {
                                navigation.replace("UpdateBankAccount");
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
                    "Main Payment update unsuccessfully",
                    [
                        { text: "", style: "" },
                        {
                            text: "OK",
                            onPress: () => {
                                navigation.replace("UpdateBankAccount");
                            },
                        },
                    ],
                    { cancelable: false }
                );
            })
            .finally(() => setLoading(false));
    };

    return (
        <>
            <HeaderText title="Shop Payments" />
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

                        <View>
                            <View>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: colors.secondary,
                                        paddingHorizontal: 10,
                                        borderRadius: 10,
                                    }}
                                    onPress={() => {
                                        setMainPaymentModal(true);
                                        setMainPaymentName(
                                            mainBank.payment_name
                                        );
                                        setMainPaymentLink(mainBank.link);
                                    }}
                                >
                                    <Text style={styles.title}>
                                        Main Payment
                                    </Text>
                                    <View
                                        style={{
                                            position: "absolute",
                                            top: 10,
                                            right: 10,
                                            zIndex: 100,
                                        }}
                                    >
                                        <FontAwesome5
                                            name="edit"
                                            size={22}
                                            color="gray"
                                        />
                                    </View>
                                    <View
                                        style={[
                                            styles.bankItem,
                                            { backgroundColor: "white" },
                                        ]}
                                    >
                                        <Image
                                            source={{
                                                uri: mainBank.image,
                                            }}
                                            style={styles.bankLogo}
                                        />
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.bankName}>
                                                {mainBank.payment_name}
                                            </Text>
                                            <Text numberOfLines={1}>
                                                Link : {mainBank.link}
                                            </Text>
                                        </View>
                                    </View>
                                        <View
                                            style={[
                                                styles.bankItem,
                                                { backgroundColor: "white" },
                                            ]}
                                        >
                                            <View
                                                style={[
                                                    styles.bankLogo,
                                                    {
                                                        backgroundColor:
                                                            colors.primary,
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",
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
                                                    Payment Method : On Delivery
                                                </Text>
                                            </View>
                                        </View>
                                </TouchableOpacity>

                                <View style={{ paddingHorizontal: 10 }}>
                                    <Text style={styles.title}>
                                        More Payments
                                    </Text>
                                    {moreBanks.map((item) => (
                                        <RenderBankItem
                                            item={item}
                                            key={item.id.toString()}
                                        />
                                    ))}
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.newPaymentBtn}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setNewPaymentModal(true)}
                    >
                        <Text style={styles.buttonText}>Add More Payment</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Modal add new payment */}
            <Modal
                visible={newPaymentModal}
                transparent={true}
                animationType="slide"
            >
                <View
                    style={{
                        backgroundColor: "#000000c6",
                        padding: 20,
                        flex: 1,
                        justifyContent: "center",
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "white",
                            padding: 20,
                            borderRadius: 10,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#000000c7",
                                // padding: 10,
                                width: 50,
                                height: 50,
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 200,
                                position: "absolute",
                                top: -20,
                                right: -20,
                            }}
                            onPress={() => {
                                setNewPaymentModal(false);
                                setImageUpload(null);
                            }}
                        >
                            <Ionicons name="close" size={28} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.title}>New Payment</Text>
                        <View
                            style={{
                                flexDirection: "column",
                                alignItems: "center",
                                paddingBottom: 30,
                                marginTop: 20,
                            }}
                        >
                            <View style={{ alignItems: "center" }}>
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
                                <Text>
                                    Upload Logo{" "}
                                    <Text style={{ color: "red" }}>*</Text>
                                </Text>
                            </View>
                            <View style={{ width: "100%" }}>
                                <Text style={{ marginBottom: 3 }}>
                                    Payment Name{" "}
                                    <Text style={{ color: "red" }}>*</Text>
                                </Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Name"
                                    onChangeText={(text) =>
                                        setNewPaymentName(text)
                                    }
                                />
                                <Text style={{ marginBottom: 3 }}>
                                    Payment Link{" "}
                                    <Text style={{ color: "red" }}>*</Text>
                                </Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Link"
                                    onChangeText={(text) =>
                                        setNewPaymentLink(text)
                                    }
                                />
                            </View>
                            {allfieldsRequired && (
                                <Text style={{ color: "red" }}>
                                    All Fields required
                                </Text>
                            )}
                        </View>
                        <Button
                            title="Add Payment"
                            onPress={() => {
                                setLoading(true);
                                handleAddNewPayment();
                            }}
                        />
                    </View>
                </View>
            </Modal>

            {/* Modal main payment */}
            <Modal
                visible={mainPaymentModal}
                transparent={true}
                animationType="slide"
            >
                <View
                    style={{
                        backgroundColor: "#000000c6",
                        padding: 20,
                        flex: 1,
                        justifyContent: "center",
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "white",
                            padding: 20,
                            borderRadius: 10,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#000000c7",
                                // padding: 10,
                                width: 50,
                                height: 50,
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 200,
                                position: "absolute",
                                top: -20,
                                right: -20,
                            }}
                            onPress={() => {
                                setMainPaymentModal(false);
                                setImageUpload(null);
                            }}
                        >
                            <Ionicons name="close" size={28} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.title}>Update Main Payment</Text>
                        <View
                            style={{
                                flexDirection: "column",
                                alignItems: "center",
                                paddingBottom: 30,
                                marginTop: 20,
                            }}
                        >
                            <View style={{ alignItems: "center" }}>
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
                                <Text>Upload Logo</Text>
                            </View>
                            <View style={{ width: "100%" }}>
                                <Text style={{ marginBottom: 3 }}>
                                    Payment Name{" "}
                                    <Text style={{ color: "red" }}>*</Text>
                                </Text>
                                <TextInput
                                    value={mainPaymentName}
                                    style={styles.textInput}
                                    placeholder="Name"
                                    onChangeText={(text) =>
                                        setMainPaymentName(text)
                                    }
                                />
                                <Text style={{ marginBottom: 3 }}>
                                    Payment Link{" "}
                                    <Text style={{ color: "red" }}>*</Text>
                                </Text>
                                <TextInput
                                    value={mainPaymentLink}
                                    style={styles.textInput}
                                    placeholder="Link"
                                    onChangeText={(text) =>
                                        setMainPaymentLink(text)
                                    }
                                />

                                <TouchableOpacity 
                                    style={{ 
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginVertical: 10,
                                        padding: 10,
                                        backgroundColor: colors.secondary,
                                        borderRadius: 5,
                                        gap: 10,
                                    }}
                                    onPress={() => setCashOnDelivery((preValue) => {
                                        if(preValue == 0) {
                                            return 1;
                                        }else {
                                            return 0;
                                        }
                                    })}
                                >
                                    <View style={{ 
                                        backgroundColor: 'white'
                                    }}>
                                        {cashOnDelivery ?
                                        <Ionicons name="checkmark-sharp" size={20} color={colors.success} />
                                        : <Ionicons name="close" size={20} color={colors.white} />
                                        }
                                    </View>
                                    <Text >
                                        Available For "
                                        <Text style={{ fontWeight: 'bold' }}> 
                                        Cash On Delivery"
                                        </Text>
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {allfieldsMainRequired && (
                                <Text style={{ color: "red" }}>
                                    Name and Link are required
                                </Text>
                            )}
                        </View>
                        <Button
                            title="Update"
                            onPress={() => {
                                setLoading(true);
                                handleUpdateMainBank();
                            }}
                        />
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    newPaymentBtn: {
        backgroundColor: "white",
        paddingHorizontal: 20,
        borderTopColor: colors.secondary,
        borderTopWidth: 1,
    },
    textInput: {
        borderColor: "lightgray",
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 10,
        width: "100%",
    },
    container: {
        flex: 1,
        // minHeight: Dimensions.get('screen').height,
        // justifyContent: "space-between",
        // alignItems: "center",
        paddingHorizontal: 10,
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
        aspectRatio: 1,
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
        // width: 150,
        height: 150,
        aspectRatio: 1,
        // borderRadius: 100,
        backgroundColor: "lightgray",
        justifyContent: "center",
        alignItems: "center",
        // marginTop: -60,
        // margin: 25,
    },
});

export default UpdateBankAccount;
