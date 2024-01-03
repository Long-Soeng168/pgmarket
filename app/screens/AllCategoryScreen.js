import React, { useState, useEffect } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import HomeHeader from "../components/HomeHeader";
import { FullWindowOverlay } from "react-native-screens";
import ActivityIndicator from "../components/ActivityIndicator";

const fetchData = async (url, setter) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    setter(data);
  } catch (error) {
    console.error(error);
  }
};

export default function AllCategoryScreen() {
  const [shopsCate, setShopsCate] = useState([]);
  const [shops, setShops] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const [selected, setSelected] = useState("Shops");
  const [categorySelected, setCategorySelected] = useState();

  const handleCategoryIdSelect = (item) => {
    setCategorySelected(item);
  };

  useEffect(() => {
    const fetchDataAsync = async () => {
      await fetchData("https://pgmarket.online/api/toprecommendshops", setShopsCate);
    };
    fetchDataAsync();
  }, []);

  useEffect(() => {
    if (categorySelected) {
      const fetchDataAsync = async () => {
        await fetchData(`https://pgmarket.online/api/getshops_bycategoryshop/${categorySelected.id}`, setShops);
      };
      fetchDataAsync();
      setIsFetching(false);
    } else if (shopsCate.length > 0) {
      setCategorySelected(shopsCate[0]);
      setIsFetching(false);
    }
  }, [categorySelected, shopsCate]);

  console.log(JSON.stringify(shops, null, 2));

  return (
    <View style={{ flex: 1 }}>
      <ActivityIndicator visibility={isFetching} />
      {!isFetching && (
        <View>
          {/* Header */}
          <HomeHeader />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              borderBottomWidth: 1,
              borderColor: "lightgrey",
            }}
          >
            <ShopSelection
              title="Shops"
              icon="apps"
              selected={selected}
              onPress={() => setSelected("Shops")}
            />
            <ShopSelection
              title="Brands"
              icon="progress-star"
              selected={selected}
              onPress={() => setSelected("Brands")}
            />
          </View>
          {/* End Header */}
          <View
            style={{
              flexDirection: "row",
              height: "100%",
              backgroundColor: colors.white,
            }}
          >
            {/* Left Side */}
            <View
              style={{
                alignItems: "center",
                borderRightColor: colors.medium,
                borderRightWidth: 1,
              }}
            >
              <FlatList
                style={{ marginBottom: 210, marginTop: 10 }}
                data={shopsCate}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <CategoryComponent
                    item={item}
                    handleCategoryIdSelect={handleCategoryIdSelect}
                    categorySelected={categorySelected}
                  />
                )}
              />
            </View>
            {/* Right Side */}
            <View style={{ flex: 1, paddingTop: 25, alignItems: "center" }}>
              {shops.length > 0 ? (
                <FlatList
                  numColumns={2}
                  data={shops}
                  renderItem={({ item }) => <SubCategoryComponent item={item} />}
                  columnWrapperStyle={{ gap: 15 }}
                />
              ) : (
                <Text>No Shop</Text>
              )}
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

// Selection Component
function ShopSelection({ title, icon, selected, onPress }) {
  const isSelected = title === selected;
  return (
    <TouchableOpacity
      opacity={0.8}
      onPress={onPress}
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        padding: 10,
        backgroundColor: isSelected ? colors.mdLight : colors.white,
        borderBottomWidth: isSelected ? 2 : 1,
        borderColor: isSelected ? colors.primary : colors.mdLight,
        top: 1,
      }}
    >
      <MaterialCommunityIcons
        name={icon}
        size={19}
        color={isSelected ? colors.dark : colors.medium}
      />
      <Text
        style={{
          fontSize: 16,
          color: isSelected ? colors.dark : colors.medium,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

// Category Component
function CategoryComponent({ item, categorySelected, handleCategoryIdSelect }) {
  const imageUrl = `https://pgmarket.online/public/images/shopcategory/${item.image}`;
  const title = item.name;

  const isSelected = categorySelected && categorySelected.id === item.id;

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => handleCategoryIdSelect(item)}>
      <View
        style={{
          margin: 3,
          width: 130,
          alignItems: "center",
          alignSelf: "flex-start",
        }}
      >
        <Image
          style={{
            width: 100,
            aspectRatio: 1,
            objectFit: "contain",
          }}
          source={{
            uri: imageUrl || "https://cdn-icons-png.flaticon.com/512/10701/10701484.png",
          }}
        />
        <Text
          numberOfLines={3}
          style={{
            backgroundColor: isSelected ? "lightpink" : "transparent",
            paddingHorizontal: 5,
            paddingBottom: 4,
            borderRadius: 5,
            textAlign: "center",
            fontSize: 14,
            color: isSelected ? colors.dark : colors.medium,
            fontWeight: isSelected ? "500" : "400",
            textDecorationLine: isSelected ? "underline" : "none",
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

// Sub Category
function SubCategoryComponent({ item }) {
  const imageUrl = `https://pgmarket.online/public/images/shop/${item.image}`;
  const title = item.shop_name;

  return (
    <TouchableOpacity>
      <View
        style={{
          width: 100,
          height: 100,
          alignItems: "center",
          alignSelf: "flex-start",
        }}
      >
        <Image
          style={{
            width: "80%",
            height: "60%",
            objectFit: "contain",
            borderRadius: 10,
          }}
          source={{
            uri: imageUrl || "https://cdn-icons-png.flaticon.com/512/10701/10701484.png",
          }}
        />
        <Text
          numberOfLines={3}
          style={{
            textAlign: "center",
            fontSize: 14,
            color: colors.medium,
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
