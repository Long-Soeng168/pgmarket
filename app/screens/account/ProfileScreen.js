import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Entypo, MaterialIcons } from '@expo/vector-icons';

import colors from "../../config/colors";
import { userContext } from "../../../App";
import storage from "../../localStorage/storage";
import { useTranslation } from "react-i18next";
import { width } from "deprecated-react-native-prop-types/DeprecatedImagePropType";

const ProfileScreen = ({ navigation }) => {
    const [user, setUser] = React.useContext(userContext);
    // console.log(JSON.stringify(user, null, 2));
    const userInfo = user.user;

    const [t, i18n] = useTranslation('global');

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
                {!userInfo.image || userInfo.image == 'user.png' ? (
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
                                "https://pgmarket.online/public/images/users/" +
                                userInfo.image,
                        }}
                    />
                )}
                <Text style={styles.username}>{userInfo.name}</Text>
                <Text style={styles.email}>{userInfo.email}</Text>
            </View>

            <View style={styles.menu}>
                {/* Menu options */}
                <View>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={onViewDetail}
                    >
                        <Icon name="eye" size={20} color="#555" />
                        <Text style={styles.menuItemText}>{t('accountDetail')}</Text>
                    </TouchableOpacity>

                    {/* Show for dealer */}
                    {userInfo.type_roles === "dealer" && (
                        <>
                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={onViewOrders}
                            >
                                <Icon name="list" size={20} color="#555" />
                                <Text style={styles.menuItemText}>{t('order')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={onGoToShop}
                            >
                                {/* <Icon name="shop" size={20} color="#555" /> */}
                                <Entypo name="shop" size={24} color="#555" />

                                <Text style={styles.menuItemText}>
                                    {t('yourShop')}
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}

                    {/* Show for normal user */}
                    {userInfo.type_roles === "customer" && (
                        <TouchableOpacity style={styles.menuItem}
                            onPress={() => navigation.navigate("UserOrders")}
                        >
                            <Icon name="list" size={20} color="#555" />
                            <Text style={styles.menuItemText}>
                                {t('orderHistory')}
                            </Text>
                        </TouchableOpacity>
                    )}

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            paddingVertical: 10,

                        }}
                    >

                        {/* About Us */}
                        <TouchableOpacity
                            style={{
                                width: '50%',
                                padding: 5
                            }}
                        >
                            <View
                                style={styles.cardButton}
                            >
                                <Entypo name="info" size={24} color={colors.primary} />
                                <Text 
                                    style={styles.cardText}
                                    numberOfLines={1}
                                >
                                    About Us
                                </Text>
                            </View>
                        </TouchableOpacity>
                        {/* End About Us */}
                        
                        {/* Contact Us */}
                        <TouchableOpacity
                            style={{
                                width: '50%',
                                padding: 5
                            }}
                        >
                            <View
                                style={styles.cardButton}
                            >
                                <Entypo name="phone" size={24} color={colors.primary} />
                                <Text 
                                    style={styles.cardText}
                                    numberOfLines={1}
                                >
                                    Contact Us
                                </Text>
                            </View>
                        </TouchableOpacity>
                        {/* End Contact Us */}

                        {/* Terms and Conditions */}
                        <TouchableOpacity
                            style={{
                                width: '50%',
                                padding: 5
                            }}
                        >
                            <View
                                style={styles.cardButton}
                            >
                                <Entypo name="text-document" size={24} color={colors.primary} />
                                <Text 
                                    style={styles.cardText}
                                    numberOfLines={1}
                                >
                                    Terms and Conditions
                                </Text>
                            </View>
                        </TouchableOpacity>
                        {/* End Terms and Conditions */}

                        {/* Return & Refund Policy */}
                        <TouchableOpacity
                            style={{
                                width: '50%',
                                padding: 5
                            }}
                        >
                            <View
                                style={styles.cardButton}
                            >
                                <Entypo name="back" size={24} color={colors.primary} />
                                <Text 
                                    style={styles.cardText}
                                    numberOfLines={1}
                                >
                                    Return & Refund Policy
                                </Text>
                            </View>
                        </TouchableOpacity>
                        {/* End Return & Refund Policy */}

                        {/* Support Policy */}
                        <TouchableOpacity
                            style={{
                                width: '50%',
                                padding: 5
                            }}
                        >
                            <View
                                style={styles.cardButton}
                            >
                                <MaterialIcons name="support-agent" size={24} color={colors.primary} />
                                <Text 
                                    style={styles.cardText}
                                    numberOfLines={1}
                                >
                                    Support Policy
                                </Text>
                            </View>
                        </TouchableOpacity>
                        {/* End Support Policy */}

                        {/* Privacy Policy */}
                        <TouchableOpacity
                            style={{
                                width: '50%',
                                padding: 5
                            }}
                        >
                            <View
                                style={styles.cardButton}
                            >
                                <MaterialIcons name="privacy-tip" size={24} color={colors.primary} />
                                <Text 
                                    style={styles.cardText}
                                    numberOfLines={1}
                                >
                                    Privacy Policy
                                </Text>
                            </View>
                        </TouchableOpacity>
                        {/* End Privacy Policy */}

                        
                        
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.signOutButton}
                    onPress={onSignOut}
                >
                    <Text style={styles.signOutButtonText}>{t('logout')}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    cardButton: {
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.primary
    },
    cardText: {
        color: 'gray',
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
        marginBottom: 30
    },
    signOutButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default ProfileScreen;
