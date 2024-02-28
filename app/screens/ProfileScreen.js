import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../config/colors";
import { userContext } from "../../App";
import storage from "../localStorage/storage";

const ProfileScreen = ({ navigation }) => {
    const [user, setUser] = React.useContext(userContext);
    // console.log(JSON.stringify(user, null, 2));
    const userInfo = user.user;

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

        fetch("https://pgmarket.longsoeng.website/api/logout", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));
        // navigation.navigate('LoginScreen');
        // You can add your sign-out logic here, e.g., navigating to the authentication screen

        setUser(null);
        storage.removeAuthToken();
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileInfo}>
                {/* Display user profile information here */}
                {!userInfo.image ? (
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
                        source={require("../assets/images/user.png")}
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
                                "https://pgmarket.longsoeng.website/public/images/users/" +
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
                        <Text style={styles.menuItemText}>Account Detail</Text>
                    </TouchableOpacity>

                    {/* Show for dealer */}
                    {userInfo.type_roles === "dealer" && (
                        <>
                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={onViewOrders}
                            >
                                <Icon name="list" size={20} color="#555" />
                                <Text style={styles.menuItemText}>Orders</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={onGoToShop}
                            >
                                <Icon name="th-large" size={20} color="#555" />
                                <Text style={styles.menuItemText}>
                                    Your Shop
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
                                Orders History
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>

                <TouchableOpacity
                    style={styles.signOutButton}
                    onPress={onSignOut}
                >
                    <Text style={styles.signOutButtonText}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: "flex-start",
        alignItems: "center",
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
    },
    signOutButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default ProfileScreen;
