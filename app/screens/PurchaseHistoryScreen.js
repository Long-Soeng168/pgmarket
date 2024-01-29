// screens/PurchaseHistoryScreen.js

import React from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import HeaderText from "../components/HeaderText";
import ActivityIndicator from "../components/ActivityIndicator";

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

const PurchaseHistoryScreen = ({ navigation }) => {
    const [isFetching, setIsFetching] = React.useState(true);
    const [orders, setOrders] = React.useState([]);

    const handleViewOrder = (orderId) => {
        // Implement logic to view order details
        console.log(`View Order: ${orderId}`);
        navigation.navigate("OrderDetailScreen");
    };

    React.useEffect(() => {
        const fetchDataAsync = async () => {
            await fetchData("https://pgmarket.online/api/orders/20", setOrders);
            setIsFetching(false);
        };

        fetchDataAsync();
    }, []);

    const handleDeleteOrder = (orderId) => {
        // Implement logic to delete order
        Alert.alert(
            "Delete Order",
            "Are you sure you want to delete this order?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    onPress: () => console.log(`Delete Order: ${orderId}`),
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
                    {item.amount}
                </Text>
                <Text style={styles.orderText}>{item.payment_method}</Text>
                <Text style={styles.orderText}>{item.status_delivery}</Text>
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
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <HeaderText title="Orders" />
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
    },
});

export default PurchaseHistoryScreen;
