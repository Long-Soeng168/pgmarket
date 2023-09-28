import React from "react";
import { Image, Text, View } from "react-native";

import colors from "../config/colors";
import CartItem from "../components/CartItem";
import { FlatList } from "react-native";

export default function CartScreen() {
    const [isFetching, setIsFetching] = React.useState(true);
    const [cartItems, setCartItems] = React.useState([]);

    const getData = () => {
        fetch(`https://fakestoreapi.com/carts/user/2`)
            .then((rest) => rest.json())
            .then((data) => {
                // console.log(data[0].products);
                setCartItems(data[0].products);
            })
            .catch((err) => console.log(err))
            .finally(() => setIsFetching(false));
    };
    React.useEffect(() => {
        getData();
    }, []);
    return (
        <View style={{ backgroundColor: colors.white, flex: 1 }}>
            <FlatList
                data={cartItems}
                renderItem={({ item }) => <CartItem item={item} />}
            />
        </View>
    );
}
