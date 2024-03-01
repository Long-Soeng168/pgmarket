import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native'; 
import colors from "../config/colors";
import HeaderText from '../components/HeaderText';
import { userContext } from '../../App';
import LoadingOverlay from '../components/LoadingOverlay';

const OrderDetailScreen = ({ route }) => {
  const orderId= route.params;
  const [user, setUser] = React.useContext(userContext);
  const userToken = user.token;
  const userInfo = user.user;

  const [loading, setLoading] = React.useState(true);
  const [products, setProducts] = React.useState([]);
  const [invoice, setInvoice] = React.useState({});
  const [shop, setShop] = React.useState({});
  const [reload, setReload] = React.useState(false);

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
                .then(result => {
                    console.log(JSON.stringify(result, null, 2))
                    setProducts(result.products);
                    setInvoice(result.invoice);
                    setShop(result.shop);
                    // console.log(JSON.stringify(result.shop, null, 2));
                })
                .catch(error => console.log('error', error))
                .finally(() => setLoading(false));
        }, [reload]);
    
    const handleUpdateDelivery = () => {
        setLoading(true);
        const myHeaders = {
            Accept: "application/json",
            Authorization: "Bearer " + userToken,
        };
        
        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            redirect: 'follow',
        };
        
        fetch("https://pgmarket.longsoeng.website/api/updateDeliveryStatus/" + orderId, requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(JSON.stringify(result, null, 2))
                setReload(preValue => !preValue);
            })
            .catch(error => console.log('error', error));
    }

  return (
    <View
        style={{ flex: 1 }}
    >
            <LoadingOverlay visible={loading} />
            <View style={{ zIndex: 100 }}>
                <HeaderText title="Order Detail" />
            </View>
        <ScrollView style={styles.container}>
            <RenderItem item = {invoice} shop={shop} userInfo ={userInfo} />
            <Text style={[styles.headerText, {paddingLeft: 12, paddingTop: 5, color: 'tomato', textDecorationLine: 'underline'}]}>Products Order</Text>
          <FlatList
                    scrollEnabled={false}
                    data={products}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <ItemComponents
                            qty = {item.qty}
                            title={item.product_name}
                            imageUrl={item.thumbnail}
                            price={item.price}
                            discount={item.discount}
                            note={item.input_description}
                            size={item.size}
                            color={item.color}
                        />
                    )}
                />
        </ScrollView>
        {userInfo.type_roles == "dealer" && <View
                    style={{
                        backgroundColor: "white",
                        paddingHorizontal: 20,
                        borderTopColor: colors.secondary,
                        borderTopWidth: 1,
                    }}
                >
                    <TouchableOpacity
                        style={styles.button} 
                        onPress={handleUpdateDelivery}
                    >
                        <Text style={styles.buttonText}>Update Delivery Status</Text>
                    </TouchableOpacity>
                </View>}
    </View>
  );
};

const ItemComponents = ({ qty, title, imageUrl, price, note, size, color, discount }) => {
    let totalDiscountPrice = qty * (price - discount / 100 * price);
    let totolPrice = qty * price - totalDiscountPrice;
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
                        <Text style={{ color: 'gray' }}>Note</Text> : {note}
                    </Text>
                    <Text numberOfLines={1}>
                        <Text style={{ color: 'gray' }}>Size</Text> : {size}
                    </Text>
                    <Text numberOfLines={1}>
                        <Text style={{ color: 'gray' }}>Color</Text> : {color}
                    </Text>
                </View>
               
                <View style={styles.priceContainer}>
                    <Text numberOfLines={1} style={styles.pricePerUnit}>
                        $ {parseFloat(price).toFixed(2)}
                        {discount > 0 && " (" + discount + "% off)" }
                    </Text>
                    <Text style={styles.Qty}>X {qty}</Text>
                    <Text numberOfLines={1} style={styles.totalPrice}>
                        $ {totalDiscountPrice.toFixed(2)}
                    </Text>
                </View>
            </View>
        </View>
    )
}


const RenderItem = ({ item, shop, userInfo }) => (
    <View>
        <Text style={[styles.headerText, {paddingLeft: 12, paddingTop: 5, color: 'tomato', textDecorationLine: 'underline'}]}>Order Info</Text>
        <View style={styles.orderContainer}>
            <View style={[styles.orderColumn, {maxWidth: 150}]}>
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
        </View>
        <Text style={[styles.headerText, {paddingLeft: 12, paddingTop: 5, color: 'tomato', textDecorationLine: 'underline'}]}>Buyer Info</Text>
        <View style={styles.orderContainer}>
            <View style={[styles.orderColumn, {maxWidth: 150}]}>
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

        {shop && userInfo.type_roles != "dealer" && 
            <>
            <Text style={[styles.headerText, {paddingLeft: 12, paddingTop: 5, color: 'tomato', textDecorationLine: 'underline'}]}>Shop Info</Text>
            <View style={styles.orderContainer}>
                <View style={[styles.orderColumn, {maxWidth: 150}]}>
                    <Text style={styles.headerText}>ID</Text>
                    <Text style={styles.headerText}>Name</Text>
                    <Text style={styles.headerText}>Phone</Text>
                    <Text style={styles.headerText}>Email</Text>
                    <Text style={styles.headerText}>Address</Text>
                </View>
                <View style={styles.orderColumn}>
                    <Text style={styles.orderText}>{shop.id}</Text>
                    <Text style={styles.orderText}>{shop.shop_name}</Text>
                    <Text style={styles.orderText}>{shop.shop_phone}</Text>
                    <Text style={styles.orderText}>{shop.shop_email}</Text>
                    <Text style={styles.orderText}>{shop.shop_address}</Text>
                </View>
            </View>
        </>}
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
          height: 150,
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
        height: "100%",
        aspectRatio: 1,
        borderRadius: 5,
        objectFit: "cover", 
        borderWidth: 1,
        borderColor: colors.secondary,
        
    },
    rightSideContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        paddingLeft: 10,
        flex: 1,
        height: "100%",
        borderLeftColor: colors.secondary,
        borderLeftWidth: 1,
        marginLeft: 10,
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
        // padding: 5,
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
  });

export default OrderDetailScreen;
