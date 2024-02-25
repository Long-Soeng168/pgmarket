import React from 'react';
import { View, Text, Button, Alert, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

const PaymentProcess = () => {
  const banks = [
    { id: 1, name: 'Bank A', logo: 'http://helejance.com/public/images/product/1707874421-.jpg' },
    { id: 2, name: 'Bank B', logo: 'http://helejance.com/public/images/product/1707874421-.jpg' },
    { id: 3, name: 'Bank C', logo: 'http://helejance.com/public/images/product/1707874421-.jpg' },
    // Add more banks as needed
  ];

  const handleConfirm = () => {
    Alert.alert('Confirmation', 'You clicked confirm.');
  };

  const renderBankItem = ({ item }) => (
    <TouchableOpacity style={styles.bankItem}>
      <Image source={{ uri: item.logo }} style={styles.bankLogo} />
      <View>
        <Text style={styles.bankName}>{item.name}</Text>
        <Text>Tap here to pay with Wing {item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={banks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderBankItem}
        style={styles.flatList}
      />
      <Button title="Confirm" onPress={handleConfirm} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  flatList: {
    width: '100%',
  },
  bankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
  },
  bankLogo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 10,
  },
  bankName: {
    fontSize: 16,
  },
});

export default PaymentProcess;
