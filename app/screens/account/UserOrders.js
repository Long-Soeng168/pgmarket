// screens/PurchaseHistoryScreen.js

import React from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Alert,
    SafeAreaView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../config/colors";
import HeaderText from "../../components/HeaderText";
import ActivityIndicator from "../../components/ActivityIndicator";
import { userContext } from "../../../App";

// const orders = [
//   {
//     id: '1',
//     invoiceNumber: 'INV-001',
//     date: '2022-01-22',
//     amount: '$50.00',
//     paymentMethod: 'Credit Card',
//     deliveryStatus: 'Delivered',
//   },
//   {
//     id: '2',
//     invoiceNumber: 'INV-002',
//     date: '2022-01-23',
//     amount: '$30.00',
//     paymentMethod: 'Credit Card',
//     deliveryStatus: 'Delivered',
//   },
//   // Add more orders as needed
// ];

const fetchData = async (url, setter) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        setter(data);
    } catch (error) {
        console.error(error);
    }
};

const UserOrder = ({ navigation }) => {
    const [isFetching, setIsFetching] = React.useState(true);
    const [message, setMessage] = React.useState("");
    const [orders, setOrders] = React.useState([]);
    const [reload, setReload] = React.useState(false);
    console.log(JSON.stringify(orders, null, 2));

    const [user, setUser] = React.useContext(userContext);
    const userToken = user.token;

    const handleViewOrder = (orderId) => {
        // Implement logic to view order details
        console.log(`View Order: ${orderId}`);
        navigation.navigate("OrderDetailScreen", orderId);
    };

    React.useEffect(() => {
        const fetchDataAsync = async () => {
            await fetchData(
                "https://pgmarket.online/api/userorders/" + user.user.id,
                setOrders
            );
            setIsFetching(false);
        };

        fetchDataAsync();
    }, [reload]);

    React.useEffect(() => {
        if (message) {
            setTimeout(() => {
                setMessage(null); // Reset message state to false after 3 seconds
            }, 3000);
        }
    }, [reload]);

    const handleDeleteOrder = (orderId) => {
        // Implement logic to delete order
        Alert.alert(
            "Delete Order",
            "Are you sure you want to delete this order?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    onPress: () => {
                        console.log(`Delete Order: ${orderId}`);
                        const myHeaders = {
                            Accept: "application/json",
                            Authorization: "Bearer " + userToken,
                        };

                        const requestOptions = {
                            method: "GET",
                            headers: myHeaders,
                            redirect: "follow",
                        };

                        fetch(
                            "https://pgmarket.online/api/cancelOrder/" +
                                orderId,
                            requestOptions
                        )
                            .then((response) => response.json())
                            .then((result) => {
                                console.log(JSON.stringify(result, null, 2));
                                setMessage(result.message);
                                setReload((prevReload) => !prevReload);
                            })
                            .catch((error) => console.log("error", error));
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const renderItem = ({ item }) => (
        <View style={styles.orderContainer}>
            <View style={styles.orderColumn}>
                <Text style={styles.headerText}>INV-Number</Text>
                <Text style={styles.headerText}>Date</Text>
                <Text style={styles.headerText}>Amount</Text>
                <Text style={styles.headerText}>Payment Method</Text>
                <Text style={styles.headerText}>Delivery Status</Text>
            </View>
            <View style={styles.orderColumn}>
                <Text style={styles.orderText}>{item.inv_number}</Text>
                <Text style={styles.orderText}>{item.inv_date}</Text>
                <Text style={[styles.orderText, { color: "red" }]}>
                    $ {parseFloat(item.amount).toFixed(2)}
                </Text>
                <Text style={styles.orderText}>{item.payment_method}</Text>
                {
                    item.status_delivery == 1
                    ?
                    <Text style={[styles.orderText, {color: '#06a4d8', fontWeight: 'bold'}]}>Pending</Text>
                    :
                    item.status_delivery == 2 ? 
                        <Text style={[styles.orderText, {color: '#e6a800', fontWeight: 'bold'}]}>Delivery</Text> 
                        : 
                        <Text style={[styles.orderText, {color: 'green', fontWeight: 'bold'}]}>Completed</Text>
                
                }
            </View>
            <View style={styles.optionsContainer}>
                <TouchableOpacity onPress={() => handleViewOrder(item.id)}>
                    <MaterialCommunityIcons
                        name="file-eye-outline"
                        size={28}
                        color={colors.primary}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteOrder(item.id)}>
                    <MaterialCommunityIcons
                        name="delete"
                        size={28}
                        color={colors.danger}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <HeaderText title="Orders" />
                {!orders.length > 0 && !isFetching && <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}> 
                    <Text>No item</Text>
                </View>}
                {message && (
                    <Text
                        style={{
                            color: "red",
                            textAlign: "center",
                            fontSize: 16,
                            backgroundColor: colors.lightGreen,
                            padding: 10,
                        }}
                    >
                        {message}
                    </Text>
                )}
                <ActivityIndicator visibility={isFetching} />
                {!isFetching && (
                    <View style={styles.container}>
                        <FlatList
                            data={orders}
                            keyExtractor={(item) => item.id}
                            renderItem={(item) => renderItem(item)}
                        />
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 16,
        paddingLeft: 15,
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 16,
        color: colors.dark,
    },
    orderContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingVertical: 12,
        marginRight: 10,
    },
    orderColumn: {
        flex: 1,
    },
    orderText: {
        fontSize: 16,
        color: "#555",
    },
    optionsContainer: {
        flexDirection: "row",
        columnGap: 5,
    },
});

export default UserOrder;
