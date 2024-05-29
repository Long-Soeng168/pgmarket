import React from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Platform,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import ListHeader from "../components/ListHeader";
import categories from "../config/categories";
import Card from "../components/Card";
import CategoryComponent from "../components/CategoryComponent";
import ActivityIndicator from "../components/ActivityIndicator";
import HomeHeader from "../components/HomeHeader";
import colors from "../config/colors";
import Slider from "../components/Slider";
import { FontAwesome } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import storage from "../localStorage/storage";

const width = Dimensions.get("screen").width / 2 - 15;

const fetchData = async (url, setter) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    setter(data);
  } catch (error) {
    console.error(error);
  }
};

const fetchDataPage = async (url, page, setter) => {
  try {
    const response = await fetch(`${url}?page=${page}`);
    const data = await response.json();
    setter((prevData) => [...prevData, ...data.data]); // Append new data to existing data
  } catch (error) {
    console.error(error);
  }
};

export default function HomeScreen({ navigation }) {
  const [isFetching, setIsFetching] = React.useState(true);
  const [categories, setCategories] = React.useState([]);

  const [slides, setSlides] = React.useState([]);
  const [banners, setBanners] = React.useState([]);

  const [t, i18n] = useTranslation("global");
  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    storage.storeLanguage(lang);
  };

  const restoreLanguage = async () => {
    const language = await storage.getLanguage("language");
    // const token = JSON.parse(tokenString);
    let initLng = "en";
    if (language == "kh") {
      initLng = "kh";
    }
    i18n.changeLanguage(initLng);
    console.log(JSON.stringify(language, null, 2));
  };

  React.useEffect(() => {
    restoreLanguage();
    const fetchDataAsync = async () => {
      await fetchData(
        "https://pgmarket.online/api/toprecommendshops",
        setCategories
      );
      await fetchData("https://pgmarket.online/api/getslides", setSlides);
      await fetchData("https://pgmarket.online/api/getbanners", setBanners);

      setIsFetching(false);
    };

    fetchDataAsync();
  }, []);

  const [newProducts, setNewProducts] = React.useState([]);
  const [newProductsPage, setNewProductsPage] = React.useState(1);
  React.useEffect(() => {
    const fetchDataAsync = async () => {
      await fetchDataPage(
        "https://pgmarket.online/api/getnewproducts",
        newProductsPage,
        setNewProducts
      );
    };

    fetchDataAsync();
  }, [newProductsPage]);

  const handleLoadMoreNewProduct = () => {
    newProductsPage < 3 && setNewProductsPage((prevPage) => prevPage + 1); // Load next page
  };

  const [bestSellingProducts, setBestSellingProducts] = React.useState([]);
  const [bestSellingPage, setBestSellingPage] = React.useState(1);
  React.useEffect(() => {
    const fetchDataAsync = async () => {
      await fetchDataPage(
        "https://pgmarket.online/api/getbestselling",
        bestSellingPage,
        setBestSellingProducts
      );
    };

    fetchDataAsync();
  }, [bestSellingPage]);

  const handleLoadMoreBestSelling = () => {
    bestSellingPage < 3 && setBestSellingPage((prevPage) => prevPage + 1); // Load next page
  };
  // End Get New Product

  const [allProducts, setAllProducts] = React.useState([]);
  const [allProductsPage, setAllProductsPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [noMoreProduct, setNoMoreProduct] = React.useState(false);
  React.useEffect(() => {
    fetch("https://pgmarket.online/api/getallproducts?page=" + allProductsPage)
      .then((response) => response.json())
      .then((result) => {
        if (result.data.length < 1) {
          setNoMoreProduct(true);
          return;
        }
        setAllProducts((preProducts) => [...preProducts, ...result.data]);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [allProductsPage]);

  const handlePageLoad = () => {
    setLoading(true);
    setAllProductsPage((preValue) => preValue + 1);
  };

  // console.log(JSON.stringify(categories, null, 2));
  // console.log(JSON.stringify(banners, null, 2));

  return (
    <View style={{ flex: 1 }}>
      <ActivityIndicator visibility={isFetching} />
      {!isFetching && (
        <ScrollView>
          <View style={[styles.body]}>
            <HomeHeader
              showSwitchLanguage={true}
              handleChangeLanguage={handleChangeLanguage}
              language={i18n.language}
            />
            <Slider
              addStyle={{ borderRadius: 10, width: "96%", aspectRatio: 16 / 9 }}
              images={slides}
              endPoint="https://pgmarket.online/public/images/slide/"
            />
            {/* Categories */}
            <Text
              style={{
                marginLeft: 15,
                marginBottom: -5,
                marginTop: 15,
                fontSize: 15,
                fontWeight: "bold",
                color: "tomato",
              }}
            >
              {t("digitalMarket")}
            </Text>
            <FlatList
              horizontal
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              data={categories}
              renderItem={({ item }) => <CategoryComponent item={item} />}
              contentContainerStyle={{
                padding: 10,
              }}
            />
            {/* List items */}
            <View style={styles.listContainer}>
              {/* New Products */}
              <View style={{ marginBottom: 30 }}>
                <ListHeader
                  title="newProduct"
                  onPress={() => {
                    navigation.navigate("SeeMoreScreen", "getnewproducts");
                  }}
                />
                <FlatList
                  data={newProducts}
                  horizontal
                  keyExtractor={(item, index) => index.toString()}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <Card
                      item={item}
                      title={item.pro_name}
                      imageUrl={
                        "https://pgmarket.online/public/images/product/thumb/" +
                        item.thumbnail
                      }
                      description={item.description}
                      price={item.price}
                    />
                  )}
                  contentContainerStyle={{
                    gap: 10,
                    paddingHorizontal: 10,
                  }}
                  onEndReached={handleLoadMoreNewProduct}
                  onEndReachedThreshold={0.1}
                />
              </View>
              {/* Banner 1 */}
              {/* <BannerComponent /> */}

              <View style={{ marginBottom: 15 }}>
                <Slider
                  addStyle={{
                    borderRadius: 10,
                    width: "96%",
                    aspectRatio: 13 / 3,
                  }}
                  images={banners}
                  endPoint="https://pgmarket.online/public/images/banner/"
                />
              </View>

              {/* Best Selling */}
              {bestSellingProducts.length > 0 && (
                <View style={{ marginBottom: 20 }}>
                  <ListHeader
                    title="bestSelling"
                    onPress={() => {
                      navigation.navigate("SeeMoreScreen", "getbestselling");
                    }}
                  />
                  <FlatList
                    data={bestSellingProducts}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                      <Card
                        item={item}
                        title={item.pro_name}
                        imageUrl={
                          "https://pgmarket.online/public/images/product/thumb/" +
                          item.thumbnail
                        }
                        description={item.description}
                        price={item.price}
                      />
                    )}
                    contentContainerStyle={{
                      gap: 10,
                      paddingHorizontal: 10,
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={handleLoadMoreBestSelling}
                    onEndReachedThreshold={0.1}
                  />
                </View>
              )}
              {/* Banner 2 */}

              {/* All Product */}

              {allProducts.length > 0 && (
                <>
                  <View
                    style={{
                      borderBottomColor: "tomato",
                      borderBottomWidth: 2,
                      marginTop: 20,
                      marginBottom: 10,
                      marginHorizontal: 15,
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "tomato",
                        paddingHorizontal: 25,
                        paddingVertical: 5,
                        marginBottom: -2,
                        borderBottomRightRadius: 100,
                        borderTopLeftRadius: 100,
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          fontSize: 14,
                        }}
                      >
                        {t("allProduct")}
                      </Text>
                    </View>
                  </View>
                  <View style={{ paddingHorizontal: 10 }}>
                    <FlatList
                      numColumns={2}
                      data={allProducts}
                      scrollEnabled={false}
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item }) => (
                        <Card
                          key={item.id.toString()}
                          item={item}
                          width={width}
                          title={item.pro_name}
                          imageUrl={
                            "https://pgmarket.online/public/images/product/thumb/" +
                            item.thumbnail
                          }
                          description={item.description}
                          price={item.price}
                        />
                      )}
                      contentContainerStyle={{
                        gap: 10,
                      }}
                      columnWrapperStyle={{
                        justifyContent: "space-between",
                      }}
                    />
                    <ActivityIndicator visibility={loading} />
                    {!noMoreProduct && (
                      <TouchableOpacity
                        style={{
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          paddingTop: 15,
                          paddingBottom: 5,
                        }}
                        onPress={handlePageLoad}
                      >
                        <Text
                          style={{
                            textDecorationLine: "underline",
                            fontWeight: "bold",
                            color: "tomato",
                          }}
                        >
                          {t("moreProducts")}
                        </Text>
                        <FontAwesome
                          name="angle-double-down"
                          size={28}
                          color="tomato"
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      )}

      {/* <StatusBar /> */}
      <StatusBar backgroundColor="tomato" barStyle="light-content" />
    </View>
  );
}

//HomeScreen Style
const styles = StyleSheet.create({
  body: {
    backgroundColor: colors.white,
    paddingBottom: 30,
  },
  listContainer: {
    // paddingHorizontal: 10,
    // paddingTop: 20,
  },
});

// Banner Component
function BannerComponent() {
  return (
    <View
      style={{
        padding: 10,
        marginBottom: 10,
      }}
    >
      <Image
        source={{ uri: "https://source.unsplash.com/2cFZ_FB08UM" }}
        style={{
          width: "100%",
          height: 70,
          objectFit: "cover",
          borderRadius: 10,
        }}
      />
    </View>
  );
}
