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
} from "react-native";
import colors from "../../config/colors";
import { cartContext, userContext } from "../../../App";
import LoadingOverlay from "../../components/LoadingOverlay";
import EditInfoModal from "./EditInfoModal";
import HeaderText from "../../components/HeaderText";
import { Feather } from '@expo/vector-icons';

const UserInfo = ({ navigation }) => {
    const [selectedBank, setSelectedBank] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [isVisibleModal, setIsVisibleModal] = React.useState(false);

    const [cartItems, setCartItems] = React.useContext(cartContext);
    const [user, setUser] = React.useContext(userContext);
    // console.log(JSON.stringify(user, null, 2));
    const userInfo = user && user.user;

    const [banks, setBanks] = React.useState([]);

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
                    setBanks(result);
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
                console.log(result);
                if (!result.error) {
                    setCartItems([]);
                    Alert.alert(
                        "Message",
                        "Your order request successfully",
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
                } else {
                    Alert.alert(
                        "Message",
                        "Your order request unsuccessfully",
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
            .catch((error) => console.error(error));
        // Alert.alert("Confirmation", "You clicked confirm.");
    };

    const handleSelectBank = (bank, link) => {
        setSelectedBank(bank);
        Linking.openURL(link);
    };

    const renderBankItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.bankItem,
                {
                    backgroundColor:
                        item.payment_name === selectedBank
                            ? "#ffc4b9"
                            : "#f0f0f0",
                },
            ]}
            onPress={() => handleSelectBank(item.payment_name, item.link)}
        >
            <Image
                source={{
                    uri:
                        "https://pgmarket.longsoeng.website/public/images/shop/thumb/" +
                        item.image,
                }}
                style={styles.bankLogo}
            />
            <View>
                <Text style={styles.bankName}>{item.payment_name}</Text>
                <Text>Tap here to pay with {item.payment_name}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <>
            <HeaderText title="Checkout Process" />
            <View style={styles.container}>
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
                            position: 'absolute',
                            right: 10,
                            top: 10,
                         }}
                    >
                        <Feather name="edit" size={24} color="gray" />
                    </View>
                    <Text style={styles.label}>Username:</Text>
                    <Text style={styles.value}>{userInfo && userInfo.name}</Text>
                    <Text style={styles.label}>Phone:</Text>
                    <Text style={styles.value}>{userInfo && userInfo.phone}</Text>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.value}>{userInfo && userInfo.email}</Text>
                    <Text style={styles.label}>Address:</Text>
                    <Text style={styles.value}>{userInfo && userInfo.address}</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Payment Method</Text>
                <FlatList
                    data={banks}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderBankItem}
                    style={styles.flatList}
                />
                <TouchableOpacity style={styles.button} onPress={handleConfirm}>
                    <Text style={styles.buttonText}>Checkout</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: "white",
        paddingTop: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 10,
        textDecorationLine: 'underline',
    },
    userInfo: {
        backgroundColor: "#f0f0f0",
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
        marginBottom: 10,
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
        marginBottom: 20,
        backgroundColor: "#f0f0f0",
        padding: 5,
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
});

export default UserInfo;
