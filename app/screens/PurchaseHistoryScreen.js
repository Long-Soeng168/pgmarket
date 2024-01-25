// screens/PurchaseHistoryScreen.js

import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../config/colors';
import HeaderText from '../components/HeaderText';

const orders = [
  {
    id: '1',
    invoiceNumber: 'INV-001',
    date: '2022-01-22',
    amount: '$50.00',
    paymentMethod: 'Credit Card',
    deliveryStatus: 'Delivered',
  },
  {
    id: '2',
    invoiceNumber: 'INV-002',
    date: '2022-01-23',
    amount: '$30.00',
    paymentMethod: 'Credit Card',
    deliveryStatus: 'Delivered',
  },
  // Add more orders as needed
];

const PurchaseHistoryScreen = ({ navigation }) => {
  const handleViewOrder = (orderId) => {
    // Implement logic to view order details
    console.log(`View Order: ${orderId}`);
  };

  const handleDeleteOrder = (orderId) => {
    // Implement logic to delete order
    Alert.alert(
      'Delete Order',
      'Are you sure you want to delete this order?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => console.log(`Delete Order: ${orderId}`) },
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
        <Text style={styles.orderText}>{item.invoiceNumber}</Text>
        <Text style={styles.orderText}>{item.date}</Text>
        <Text style={styles.orderText}>{item.amount}</Text>
        <Text style={styles.orderText}>{item.paymentMethod}</Text>
        <Text style={styles.orderText}>{item.deliveryStatus}</Text>
      </View>
      <View style={styles.optionsContainer}>
        <TouchableOpacity onPress={() => handleViewOrder(item.id)}>
          <MaterialCommunityIcons name="file-eye-outline" size={28} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteOrder(item.id)}>
          <MaterialCommunityIcons name="delete" size={28} color={colors.danger} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
        <HeaderText title='Orders'/>
        <View style={styles.container}>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.dark,
  },
  orderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 12,
  },
  orderColumn: {
    flex: 1,
  },
  orderText: {
    fontSize: 16,
    color: '#555',
  },
  optionsContainer: {
    flexDirection: 'row',
  },
});

export default PurchaseHistoryScreen;
