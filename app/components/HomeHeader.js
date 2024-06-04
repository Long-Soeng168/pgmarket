import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../config/colors";

export default function HomeHeader({
  showSearch = true,
  showSwitchLanguage = false,
  handleChangeLanguage = () => {},
  language = "en",
}) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/images/pgmarket.png")}
        />
      </View>
      <View style={styles.actionContainer}>
        {showSwitchLanguage && (
          <View style={styles.lngContainer}>
            <TouchableOpacity
              onPress={() => handleChangeLanguage("en")}
              style={[
                styles.lngButton,
                language === "en" ? styles.lngActiveButton : null,
              ]}
            >
              <Text
                style={[
                  styles.lngText,
                  language === "en" ? styles.lngActiveText : null,
                ]}
              >
                EN
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleChangeLanguage("kh")}
              style={[
                styles.lngButton,
                language === "kh" ? styles.lngActiveButton : null,
              ]}
            >
              <Text
                style={[
                  styles.lngText,
                  language === "kh" ? styles.lngActiveText : null,
                ]}
              >
                KH
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {showSearch && (
          <TouchableOpacity onPress={() => navigation.navigate("SearchScreen")}>
            <Feather
              style={styles.searchIcon}
              name="search"
              size={30}
              color="black"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: colors.white,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 170,
    height: 40,
    marginLeft: -5,
    bottom: 3,
    // Uncomment if using objectFit
    // objectFit: "contain",
  },
  logoText: {
    fontSize: 20,
    fontWeight: "500",
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  lngContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 12,
  },
  lngButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    margin: 4,
    borderWidth: 1,
    borderColor: "#ccc", // Change as per your app color scheme
    borderRadius: 5,
  },
  lngActiveButton: {
    backgroundColor: "tomato", // Highlight color for the active language
    borderColor: "tomato",
  },
  lngText: {
    color: "#000", // Text color, change it according to your needs
    fontWeight: "bold",
  },
  lngActiveText: {
    color: "white",
  },
  searchIcon: {
    paddingRight: 10,
  },
});
