import React, { useState, useEffect } from "react";
import { FlatList, Image, Text, TouchableOpacity, View, ScrollView } from "react-native";
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

export default function AllCategoryScreen({navigation}) {
  const [shopsCate, setShopsCate] = useState([]);
  const [allShops, setAllShops] = useState([]);
  const [shops, setShops] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const [selected, setSelected] = useState("Shops");
  const [categorySelected, setCategorySelected] = useState();

  const handleCategoryIdSelect = (item) => {
    setCategorySelected(item);
  };

  useEffect(() => {
    const fetchDataAsync = async () => {
      await fetchData("https://pgmarket.online/api/toprecommendshops", setShopsCate);
      await fetchData(`https://pgmarket.online/api/getbrands`, setBrands);
      await fetchData(`https://pgmarket.online/api/getallshops`, setAllShops);
    };
    fetchDataAsync();
  }, []);

  useEffect(() => {
    if (categorySelected) {
      // const fetchDataAsync = async () => {
      //   await fetchData(`https://pgmarket.online/api/getshops_bycategoryshop/${categorySelected.id}`, setShops); 
      // };
      let data = allShops.filter((shop) => shop.shopcategory_id == categorySelected.id);
      setShops(data);
      // console.log(JSON.stringify(data, null, 2));
      // fetchDataAsync();
      setIsFetching(false);
    } else if (shopsCate.length > 0) {
      setCategorySelected(shopsCate[0]);
      setIsFetching(false);
    }
  }, [categorySelected, shopsCate]);

  // console.log(JSON.stringify(allShops, null, 2));
  // console.log(JSON.stringify(categorySelected, null, 2));

  return (
    <View style={{ flex: 1 }}>
      <ActivityIndicator visibility={isFetching} />
      {!isFetching && (
        <View style={{ flex: 1 }}>
          {/* Header */}
          <HomeHeader showSearch={false} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              borderBottomWidth: 1,
              borderColor: "lightgrey",
              zIndex: 100,
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
            {
              selected === "Shops" ? 
              (
                <View style={{
                  flexDirection: "row",
                  height: "100%",
                  backgroundColor: colors.white,
                }}>
                  {/* Left Side */}
                  <View
                    style={{
                      alignItems: "center",
                      borderRightColor: colors.medium,
                      borderRightWidth: 1,
                      marginBottom: 108,
                      marginTop: 3,
                    }}
                  >
                    <FlatList
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
                  <View style={{ flex: 1, paddingTop: 13, alignItems: "center", width: '100%' }}>
                    {shops.length > 0 ? (
                      // <FlatList
                      //   numColumns={2}
                      //   data={shops}
                      //   renderItem={({ item }) => <SubCategoryComponent item={item} onPress={() => navigation.navigate("ShopScreen", item)} />}
                      //   columnWrapperStyle={{ gap: 15}}
                      // />
                      <View style={{ 
                              width: '100%',
                              paddingHorizontal: 20,
                              flexDirection: 'row', 
                              flexWrap: 'wrap', 
                              rowGap: 15, 
                              justifyContent: 'space-between',
                              // backgroundColor: 'red'
                      
                            }}>
                          {shops.map((item, index) => (
                              <View style={{ 
                                  width: '47%', 
                                  // alignItems: 'center',
                                  // backgroundColor: 'yellow'
                                  borderColor: colors.secondary,
                                  borderWidth: 1,
                                  borderRadius: 10,
                                  padding: 5,
                              }}>
                                <SubCategoryComponent
                                    key={index} // make sure to provide a unique key
                                    item={item}
                                    onPress={() => navigation.navigate("ShopScreen", item)}
                                />
                              </View>
                          ))}
                      </View>
                    ) : (
                      <Text>No Shop</Text>
                    )}
                  </View>
                </View>
              ) : (
                <ScrollView>
                      <View style={{
                        // flex: 1,
                        justifyContent: 'center',
                        flexDirection: "row",
                        flexWrap: "wrap",
                        paddingVertical: 13,
                        gap: 2,
                        // height: "1000%",
                        // backgroundColor: colors.primary,

                        // overflow: 'scroll',
                        // marginBottom: 50,
                      }}>
                        {brands.map((item) => (
                              <BrandComponent
                                  item={item}
                                  onPress={() => navigation.navigate("ProductsByBrandScreen", item.id)}
                                  key={item.id}
                              />
                          ))} 
                      </View>
                </ScrollView>
              )
            }
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
function SubCategoryComponent({ item, onPress }) {
  const imageUrl = `https://pgmarket.online/public/images/shop/${item.image}`;
  const title = item.shop_name;

  return (
    <TouchableOpacity onPress={onPress} style={{ width: '100%'}}>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          alignSelf: "flex-start",
        }}
      >
        <Image
          style={{
            width: 70,
            aspectRatio: 1,
            objectFit: "contain",
            borderRadius: 100,
            borderWidth: 1,
            borderColor:  colors.medium,
          }}
          source={{
            uri: imageUrl || "https://cdn-icons-png.flaticon.com/512/10701/10701484.png",
          }}
        />
        <Text
          numberOfLines={3}
          style={{
            textAlign: "center",
            fontSize: 10,
            color: colors.medium,
            // width: "100%",
            // backgroundColor: 'red'
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}


// Brand Component
function BrandComponent({ item, onPress }) {
  const imageUrl = `https://pgmarket.online/public/images/brand/${item.image}`;
  const title = item.name;

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          width: 95,
          alignItems: "center",
          alignSelf: "flex-start",
          // backgroundColor: colors.white,
          padding: 5,
        }}
      >
        <Image
          style={{
            width: "100%",
            aspectRatio: 3/2,
            objectFit: "contain",
            backgroundColor: colors.white,
            borderRadius: 5,
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
