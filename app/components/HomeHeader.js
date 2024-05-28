import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../config/colors";

export default function HomeHeader({
    showSearch = true,
    showSwitchLanguage = false,
    handleChangeLanguage = () => {}, 
    language = 'en',
}) {
    const navigation = useNavigation();
    return (
        <View
            style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 10,
                backgroundColor: colors.white,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Image
                    style={{
                        width: 170,
                        height: 40,
                        marginLeft: -5,
                        bottom: 3,
                        // objectFit: "contain",
                    }}
                    source={require("../assets/images/pgmarket.png")}
                />
                {/* <Text style={{ fontSize: 20, fontWeight: "500" }}>
                            PG Market
                        </Text> */}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                
                {showSwitchLanguage && (
                    <View style={styles.lngcontainer}>
                        <TouchableOpacity
                        onPress={() => handleChangeLanguage('en')}
                        style={[
                            styles.lngbutton,
                            language === 'en' ? styles.lngactiveButton : null,
                        ]}
                        >
                        <Text style={[
                            styles.lngtext,
                            language === 'en' ? styles.lngactiveText : null,
                        ]}>
                            EN
                        </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={() => handleChangeLanguage('kh')}
                        style={[
                            styles.lngbutton,
                            language === 'kh' ? styles.lngactiveButton : null,
                        ]}
                        >
                        <Text style={[
                            styles.lngtext,
                            language === 'kh' ? styles.lngactiveText : null,
                        ]}
                        
                        >
                            KH
                        </Text>
                        </TouchableOpacity>
                    </View>
                )}
                {showSearch && (
                    <TouchableOpacity
                        onPress={() => navigation.navigate("SearchScreen")}
                    >
                        <Feather
                            style={{ paddingRight: 10 }}
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
    lngcontainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 12,
    },
    lngbutton: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      margin: 4,
      borderWidth: 1,
      borderColor: '#ccc', // Change as per your app color scheme
      borderRadius: 5,
    },
    lngactiveButton: {
      backgroundColor: 'tomato', // Highlight color for the active language
      borderColor: 'tomato',
    },
    lngtext: {
      color: '#000', // Text color, change it according to your needs
      fontWeight: 'bold',
    },
    lngactiveText: {
        color: 'white',
    }
  });