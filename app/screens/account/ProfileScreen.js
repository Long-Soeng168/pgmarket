import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

import colors from "../../config/colors";
import { userContext } from "../../../App";
import storage from "../../localStorage/storage";
import { useTranslation } from "react-i18next";
import { width } from "deprecated-react-native-prop-types/DeprecatedImagePropType";

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = React.useContext(userContext);
  // console.log(JSON.stringify(user, null, 2));
  const userInfo = user.user;

  const [t, i18n] = useTranslation("global");

  const onViewDetail = () => {
    // Logic for navigating to the detail view
    navigation.navigate("AccountDetailScreen");
    console.log("View Detail");
  };

  const onViewOrders = () => {
    // Logic for navigating to the edit information screen
    navigation.navigate("DealerOrdersScreen");
    console.log("Edit Information");
  };

  const onGoToShop = () => {
    // Logic for navigating to the settings screen
    navigation.navigate("ShopProfile");
    console.log("Go to Shop Profile");
  };

  const onSignOut = () => {
    // Logic for signing out
    console.log("Sign Out");

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + user.token);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://pgmarket.online/api/logout", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    // navigation.navigate('LoginScreen');
    // You can add your sign-out logic here, e.g., navigating to the authentication screen

    setUser(null);
    storage.removeAuthToken();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileInfo}>
        {/* Display user profile information here */}
        {!userInfo.image || userInfo.image == "user.png" ? (
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: colors.medium,
              objectFit: "contain",
              margin: 25,
            }}
            source={require("../../assets/images/user.png")}
          />
        ) : (
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: colors.medium,
              margin: 25,
            }}
            source={{
              uri:
                "https://pgmarket.online/public/images/users/" + userInfo.image,
            }}
          />
        )}
        <Text style={styles.username}>{userInfo.name}</Text>
        <Text style={styles.email}>{userInfo.email}</Text>
      </View>

      <View style={styles.menu}>
        {/* Menu options */}
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
              paddingVertical: 10,
            }}
          >
            <TouchableOpacity
              style={{
                width: userInfo.type_roles === "customer" ? "50%" : "100%",
                padding: 5,
              }}
              onPress={onViewDetail}
            >
              <View style={styles.cardButton}>
                <Icon name="user" size={24} color={colors.primary} />
                <Text style={styles.cardText} numberOfLines={1}>
                  {t("accountDetail")}
                </Text>
              </View>
            </TouchableOpacity>
            {userInfo.type_roles === "customer" && (
              <TouchableOpacity
                style={{
                  width: "50%",
                  padding: 5,
                }}
                onPress={() => navigation.navigate("UserOrders")}
              >
                <View style={styles.cardButton}>
                  <Entypo name="list" size={24} color={colors.primary} />
                  <Text style={styles.cardText} numberOfLines={1}>
                    {t("orderHistory")}
                  </Text>
                </View>
              </TouchableOpacity>
            )}

            {/* Show for dealer */}
            {userInfo.type_roles === "dealer" && (
              <>
                <TouchableOpacity
                  style={{
                    width: "50%",
                    padding: 5,
                  }}
                  onPress={onViewOrders}
                >
                  <View style={styles.cardButton}>
                    <Entypo name="list" size={24} color={colors.primary} />
                    <Text style={styles.cardText} numberOfLines={1}>
                      {t("order")}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: "50%",
                    padding: 5,
                  }}
                  onPress={onGoToShop}
                >
                  <View style={styles.cardButton}>
                    <Entypo name="shop" size={24} color={colors.primary} />
                    <Text style={styles.cardText} numberOfLines={1}>
                      {t("yourShop")}
                    </Text>
                  </View>
                </TouchableOpacity>
              </>
            )}
          </View>
        
            <View style={{height: 1, width: '100%', backgroundColor: 'lightgray'}}></View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
              paddingVertical: 10,
            }}
          >
            {/* About Us */}
            <TouchableOpacity
              style={{
                width: "50%",
                padding: 5,
              }}
              onPress={() => {
                navigation.navigate("DetailScreen", "about");
              }}
            >
              <View style={styles.cardButton}>
                <Entypo name="info" size={24} color={colors.primary} />
                <Text style={styles.cardText} numberOfLines={1}>
                    {t("aboutUs")}
                </Text>
              </View>
            </TouchableOpacity>
            {/* End About Us */}

            {/* Contact Us */}
            <TouchableOpacity
              style={{
                width: "50%",
                padding: 5,
              }}
              onPress={() => {
                navigation.navigate("DetailScreen", "contact");
              }}
            >
              <View style={styles.cardButton}>
                <Entypo name="phone" size={24} color={colors.primary} />
                <Text style={styles.cardText} numberOfLines={1}>
                    {t("contactUs")}
                </Text>
              </View>
            </TouchableOpacity>
            {/* End Contact Us */}

            {/* Terms and Conditions */}
            <TouchableOpacity
              style={{
                width: "50%",
                padding: 5,
              }}
              onPress={() => {
                navigation.navigate("DetailScreen", "terms");
              }}
            >
              <View style={styles.cardButton}>
                <Entypo name="text-document" size={24} color={colors.primary} />
                <Text style={styles.cardText} numberOfLines={1}>
                    {t("terms")}
                </Text>
              </View>
            </TouchableOpacity>
            {/* End Terms and Conditions */}

            {/* Return & Refund Policy */}
            <TouchableOpacity
              style={{
                width: "50%",
                padding: 5,
              }}
              onPress={() => {
                navigation.navigate("DetailScreen", "return");
              }}
            >
              <View style={styles.cardButton}>
                <Entypo name="back" size={24} color={colors.primary} />
                <Text style={styles.cardText} numberOfLines={1}>
                    {t("return")}
                </Text>
              </View>
            </TouchableOpacity>
            {/* End Return & Refund Policy */}

            {/* Support Policy */}
            <TouchableOpacity
              style={{
                width: "50%",
                padding: 5,
              }}
              onPress={() => {
                navigation.navigate("DetailScreen", "support");
              }}
            >
              <View style={styles.cardButton}>
                <MaterialIcons
                  name="support-agent"
                  size={24}
                  color={colors.primary}
                />
                <Text style={styles.cardText} numberOfLines={1}>
                    {t("support")}
                </Text>
              </View>
            </TouchableOpacity>
            {/* End Support Policy */}

            {/* Privacy Policy */}
            <TouchableOpacity
              style={{
                width: "50%",
                padding: 5,
              }}
              onPress={() => {
                navigation.navigate("DetailScreen", "privacy");
              }}
            >
              <View style={styles.cardButton}>
                <MaterialIcons
                  name="privacy-tip"
                  size={24}
                  color={colors.primary}
                />
                <Text style={styles.cardText} numberOfLines={1}>
                    {t("privacyPolicy")}
                </Text>
              </View>
            </TouchableOpacity>
            {/* End Privacy Policy */}
            {userInfo.type_roles === "dealer" && (
              <TouchableOpacity
                style={{
                  width: "100%",
                  padding: 5,
                }}
                onPress={() => navigation.navigate("PgInfo")}
              >
                <View style={styles.cardButton}>
                  <Entypo name="news" size={24} color={colors.primary} />
                  <Text style={styles.cardText} numberOfLines={1}>
                    {t("pgInfo")}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <TouchableOpacity style={styles.signOutButton} onPress={onSignOut}>
          <Text style={styles.signOutButtonText}>{t("logout")}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardButton: {
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "lightgray",
  },
  cardText: {
    color: "gray",
    fontSize: 14,
    marginTop: 4,
  },
  container: {
    flex: 1,
    padding: 16,
    // justifyContent: "flex-start",
    // alignItems: "center",
    backgroundColor: "#fff",
  },
  profileInfo: {
    marginBottom: 20,
    alignItems: "center",
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: "#888",
  },
  menu: {
    width: "100%",
    flex: 1,
    justifyContent: "space-between",
    // backgroundColor: 'gray',
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  menuItemText: {
    marginLeft: 16,
    fontSize: 16,
  },
  signOutButton: {
    backgroundColor: "#e74c3c",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
    marginBottom: 30,
  },
  signOutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
