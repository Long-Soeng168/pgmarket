import React from "react";
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import ListHeader from "../components/ListHeader";
import Card from "../components/Card";
import colors from "../config/colors";

export default function ProductDetailScreen({ route }) {
    const item = route.params;
    const category = item.category;
    const [isFetching, setIsFetching] = React.useState(true);
    const [isError, setIsError] = React.useState(false);
    const [products, setProducts] = React.useState([]);

    const getData = () => {
        fetch(`https://fakestoreapi.com/products/category/${category}`)
            .then((rest) => rest.json())
            .then((data) => {
                const relateProduct = data.filter((data) => data.id != item.id);
                setProducts(relateProduct);
                setIsError(false);
            })
            .catch((err) => setIsError(true))
            .finally(() => setIsFetching(false));
    };
    React.useEffect(() => {
        getData();
    }, []);
    return (
        <ScrollView>
            <Image
                style={styles.image}
                source={{
                    uri: item.image,
                }}
            />
            <View style={{ padding: 10 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>$ {item.price}</Text>
                <View>
                    <Text style={{ fontSize: 18, fontWeight: "500" }}>
                        Description :
                    </Text>
                    <Text style={styles.description}>{item.description}</Text>
                </View>
            </View>
            <View style={{ marginBottom: 30 }}>
                <ListHeader title="Relate Product" onPress={() => {}} />
                <FlatList
                    data={products}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <Card item={item} />}
                    contentContainerStyle={{
                        gap: 20,
                        paddingHorizontal: 10,
                    }}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 300,
        objectFit: "contain",
        backgroundColor: colors.white,
    },
    title: { fontSize: 20, fontWeight: "500" },
    price: {
        fontSize: 24,
        color: colors.danger,
        marginVertical: 15,
    },
    description: {
        fontSize: 18,
        marginBottom: 15,
    },
});
