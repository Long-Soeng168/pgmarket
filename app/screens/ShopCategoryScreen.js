import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import ActivityIndicator from "../components/ActivityIndicator";
import { useTranslation } from "react-i18next";
import HeaderText from "../components/HeaderText";


export default function ShopCategoryScreen({ navigation, route }) {
    const item = route.params;
    // console.log(JSON.stringify(item.id, null, 2));
    // console.log(JSON.stringify("https://pgmarket.online/api/getshops_bycategoryshop/" + item.id, null, 2));
    
    const [isFetching, setIsFetching] = React.useState(true);
    const [shopsByCate, setShopsByCate] = React.useState([]);
    
    const getShopsByCate = () => {
        fetch("https://pgmarket.online/api/getshops_bycategoryshop/" + item.id)
        .then((rest) => rest.json())
        .then((data) => {
            setShopsByCate(data);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsFetching(false));
    };
    React.useEffect(() => {
        getShopsByCate();
    }, []);
    
    const [t, i18n] = useTranslation('global');
    // console.log(JSON.stringify(shopsByCate, null, 2));
    // console.log(JSON.stringify(item.id, null, 2));

    const shops = shopsByCate;
    // console.log(JSON.stringify(shops, null, 2));
    return (
        <View style={{ flex: 1 }}>
            <HeaderText title="Shops" />
            <ActivityIndicator visibility={isFetching} />
            {!isFetching && (
                shops.length !== 0 ? (
                    <View
                        style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            gap: 20,
                            marginTop: 10,
                        }}
                    >
                        {shops.map((shop) => (
                            <ShopItem
                                item={shop}
                                onPress={() => navigation.navigate("ShopScreen", shop)}
                                key={shop.id}
                            />
                        ))}
                    </View>
                    
                ) : (
                    <Text
                        style={{ 
                            height: '100%',
                            verticalAlign: 'middle',
                            textAlign: 'center',
                            fontSize: 18,
                            marginTop: 10
                        }}
                    >
                        { t('noShop') }
                    </Text>
                )
            )}
        </View>
    );
    
}

function ShopItem({ onPress, item }) {
    // console.log(JSON.stringify(item, null, 2));
    return (
        <TouchableOpacity onPress={onPress} style={{ width: "20%" }}>
            <View
                style={{
                    width: "100%",
                    alignItems: "center",
                }}
            >
                <Image
                    style={{
                        width: "100%",
                        aspectRatio: 1,
                        borderRadius: 100,
                    }}
                    source={{
                        uri: "https://pgmarket.online/public/images/shop/" + item.image,
                    }}
                />
                <Text
                    numberOfLines={3}
                    style={{ textAlign: "center", fontSize: 10, marginTop: 5, }}
                >
                    { item.shop_name }
                </Text>
            </View>
        </TouchableOpacity>
    );
}
