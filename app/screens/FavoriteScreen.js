import React from "react";
import { Dimensions, FlatList, ScrollView, Text, View } from "react-native";
import Card from "../components/Card";
import colors from "../config/colors";
import ActivityIndicator from "../components/ActivityIndicator";
import { favoritesContext } from "../../App";
import HeaderText from "../components/HeaderText";

const width = Dimensions.get("screen").width / 2 - 15;

export default function FavoriteScreen() {
    const [favorites, setFavorites] = React.useContext(favoritesContext);
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colors.white,
            }}
        >
            <HeaderText title="favorite" showBackBtn={false}/>
            {favorites.length < 1 && 
            <View
                style={{ 
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                 }}
            >
                <Text>{ t('noItem') }</Text>
            </View>}
            {favorites.length > 0 && 
            <ScrollView
            contentContainerStyle={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                paddingVertical: 10,
                rowGap: 10,
                paddingHorizontal: 10,
            }}
        >
            {favorites.map((product, index) => (
                <Card
                    key={index}
                    item={product}
                    width={width}
                    title={product.pro_name}
                    imageUrl={"https://pgmarket.longsoeng.website/public/images/product/thumb/" + product.thumbnail}
                    description={product.description}
                    price={product.price}
                />
            ))}
        </ScrollView>
            }
        </View>
    );
}
