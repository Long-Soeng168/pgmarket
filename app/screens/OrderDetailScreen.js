import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native'; 
import colors from "../config/colors";
import HeaderText from '../components/HeaderText';

const OrderDetailScreen = ({ route }) => {
//   const { product } = route.params;

const products = [
    {
        id: 1,
        image: 'https://pgmarket.online/public/images/product/1688531508-.png',
        name: 'Foscam HT2 1080p Outdoor 2.4/5gHz WiFi PTZ Security Camera4X Optical Zoom for More Details 350° horizontal and 90° vertical rotation, almost covering',
        price: 29.99,
        size: 'Medium',
        quantity: 2,
        total: 59.98,
    },
    {
        id: 2,
        image: 'https://pgmarket.online/public/images/product/1688531508-.png',
        name: 'Foscam HT2 1080p Outdoor 2.4/5gHz WiFi PTZ Security Camera4X Optical Zoom for More Details 350° horizontal and 90° vertical rotation, almost covering',
        price: 29.99,
        size: 'Medium',
        quantity: 2,
        total: 59.98,
    }
];

  return (
    <View style={styles.container}>
        <View style={{ zIndex: 100 }}>
            <HeaderText title="Order Detail" />
        </View>
      <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ItemComponents qty = {item.quantity} title={item.name} imageUrl={item.image} price={item.price} />
                )}
            />
    </View>
  );
};

const ItemComponents = ({ qty, title, imageUrl, price }) => {
    return (
        <View style={styles.productContainer}>
            {/* Remove Button */}
            <Image
                style={styles.image}
                source={{
                    uri: imageUrl,
                }}
            />
            <View style={styles.rightSideContainer}>
                <View style={styles.textContainer}>
                    <Text numberOfLines={2} style={styles.title}>
                        {title}
                    </Text>
                    <Text numberOfLines={2}>
                        <Text style={{ color: 'tomato' }}>Note</Text> : { 'I want it in 3 days, And I want you to setup for me.'}
                    </Text>
                    <Text numberOfLines={1}>
                        <Text style={{ color: 'tomato' }}>Size</Text> : { 'XL'}
                    </Text>
                    <Text numberOfLines={1}>
                        <Text style={{ color: 'tomato' }}>Color</Text> : { 'White'}
                    </Text>
                </View>
               
                <View style={styles.priceContainer}>
                    <Text numberOfLines={1} style={styles.pricePerUnit}>
                        $ {price}
                    </Text>
                    <Text style={styles.Qty}>X {qty}</Text>
                    <Text numberOfLines={1} style={styles.totalPrice}>
                        $ {(qty * (price * 100)) / 100}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
  
    },
    productContainer: {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: 'white',
          height: 168,
          margin: 10,
          marginBottom: 0,
          padding: 5,
          borderRadius: 10,
    },
 
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    price: {
      fontSize: 16,
      marginBottom: 5,
    },
    size: {
      fontSize: 16,
      marginBottom: 5,
    },
    quantity: {
      fontSize: 16,
      marginBottom: 5,
    },
    total: {
      fontSize: 16,
      marginBottom: 5,
    },
    image: {
        backgroundColor: colors.white,
        aspectRatio: 1,
        height: "100%",
        borderRadius: 5,
        objectFit: "cover", 
    },
    rightSideContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        paddingLeft: 10,
        flex: 1,
        height: "100%",
        borderLeftColor: colors.secondary,
        borderLeftWidth: 1,
    },
    textContainer: {
        justifyContent: "flex-start",
    },

    title: { fontSize: 14, fontWeight: "500" },
    pricePerUnit: { fontSize: 14, color: colors.dark },
    totalPrice: { fontSize: 16, color: colors.danger },

    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
    }
  });

export default OrderDetailScreen;
