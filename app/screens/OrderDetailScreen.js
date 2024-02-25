import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native'; 
import colors from "../config/colors";
import HeaderText from '../components/HeaderText';
import { userContext } from '../../App';

const OrderDetailScreen = ({ route }) => {
  const orderId= route.params;
  const [user, setUser] = React.useContext(userContext);
  const userToken = user.token;

  const [products, setProducts] = React.useState([]);
  const [invoice, setInvoice] = React.useState({});
//   console.log(orderId);

// const products = [
//     {
//         id: 1,
//         image: 'https://pgmarket.online/public/images/product/1688531508-.png',
//         name: 'Foscam HT2 1080p Outdoor 2.4/5gHz WiFi PTZ Security Camera4X Optical Zoom for More Details 350° horizontal and 90° vertical rotation, almost covering',
//         price: 29.99,
//         size: 'Medium',
//         quantity: 2,
//         total: 59.98,
//     },
//     {
//         id: 2,
//         image: 'https://pgmarket.online/public/images/product/1688531508-.png',
//         name: 'Foscam HT2 1080p Outdoor 2.4/5gHz WiFi PTZ Security Camera4X Optical Zoom for More Details 350° horizontal and 90° vertical rotation, almost covering',
//         price: 29.99,
//         size: 'Medium',
//         quantity: 2,
//         total: 59.98,
//     }
// ];

        useEffect(() => {
            const myHeaders = {
                Accept: "application/json",
                Authorization: "Bearer " + userToken,
            };
            
            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow',
            };
            
            fetch("https://pgmarket.longsoeng.website/api/invoiceDetail/" + orderId, requestOptions)
                .then(response => response.json())
                .then(result => {console.log(JSON.stringify(result, null, 2))
                    setProducts(result.products);
                    setInvoice(result.invoice);
                })
                .catch(error => console.log('error', error));
        }, []);

  return (
    <View style={styles.container}>
        <View style={{ zIndex: 100 }}>
            <HeaderText title="Order Detail" />
        </View>
        
        <RenderItem item = {invoice} /> 

        <Text style={[styles.headerText, {paddingLeft: 12, paddingTop: 5, color: 'tomato', textDecorationLine: 'underline'}]}>Products Order</Text>

      <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ItemComponents 
                        qty = {item.qty} 
                        title={item.product_name} 
                        imageUrl={item.thumbnail} 
                        price={item.price} 
                        note={item.input_description}
                        size={item.size}
                        color={item.color}
                    />
                )}
            />
    </View>
  );
};

const ItemComponents = ({ qty, title, imageUrl, price, note, size, color }) => {
    return (
        <View style={styles.productContainer}>
            {/* Remove Button */}
            <Image
                style={styles.image}
                source={{
                    uri: "https://pgmarket.longsoeng.website/public/images/product/" + imageUrl,
                }}
            />
            <View style={styles.rightSideContainer}>
                <View style={styles.textContainer}>
                    <Text numberOfLines={2} style={styles.title}>
                        {title}
                    </Text>
                    <Text 
                        numberOfLines={3}
                    >
                        <Text style={{ color: 'tomato' }}>Note</Text> : {note}
                    </Text>
                    <Text numberOfLines={1}>
                        <Text style={{ color: 'tomato' }}>Size</Text> : {size}
                    </Text>
                    <Text numberOfLines={1}>
                        <Text style={{ color: 'tomato' }}>Color</Text> : {color}
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


const RenderItem = ({ item }) => (
    <View>
        <Text style={[styles.headerText, {paddingLeft: 12, paddingTop: 5, color: 'tomato', textDecorationLine: 'underline'}]}>Order Info</Text>
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
        </View>
        <Text style={[styles.headerText, {paddingLeft: 12, paddingTop: 5, color: 'tomato', textDecorationLine: 'underline'}]}>Buyer Info</Text>
        <View style={styles.orderContainer}>
            <View style={styles.orderColumn}>
                <Text style={styles.headerText}>ID</Text>
                <Text style={styles.headerText}>Name</Text>
                <Text style={styles.headerText}>Phone</Text>
                <Text style={styles.headerText}>Email</Text>
                <Text style={styles.headerText}>Address</Text>
            </View>
            <View style={styles.orderColumn}>
                <Text style={styles.orderText}>{item.customer_id}</Text>
                <Text style={styles.orderText}>{item.inv_name}</Text>
                <Text style={styles.orderText}>{item.inv_phone}</Text>
                <Text style={styles.orderText}>{item.inv_email}</Text>
                <Text style={styles.orderText}>{item.inv_address}</Text>
            </View>
        </View>
    </View>
);



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
    },

    headerText: {
        fontWeight: "bold",
        fontSize: 16,
        color: colors.dark,
    },
    orderContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingVertical: 12,
        paddingHorizontal: 12,
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

export default OrderDetailScreen;
