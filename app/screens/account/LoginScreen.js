import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Image,
    Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import colors from "../../config/colors";
import { userContext } from "../../../App";
import storage from "../../localStorage/storage";

const LoginScreen = () => {
    const navigation = useNavigation();

    const [user, setUser] = React.useContext(userContext);
    // console.log(JSON.stringify(user, null, 2));

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleLogin = () => {
        // Implement your login logic here
        console.log("Email:", email);
        console.log("Password:", password);
        // You can add authentication logic, API calls, etc. here

        const fetchData = () => {
            const myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");

            const formdata = new FormData();
            formdata.append("email", email);
            formdata.append("password", password);

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: formdata,
                redirect: "follow",
            };

            fetch(
                "https://pgmarket.longsoeng.website/api/login",
                requestOptions
            )
                .then((response) => {
                    if (!response.ok) {
                        setIsError(true);
                        throw new Error("Network response was not ok");
                    }
                    return response.json(); // Convert response to JSON
                })
                .then((result) => {
                    if (result.token) {
                        // console.log(result.token);
                        // console.log(JSON.stringify(result, null, 2));
                        setUser(result);
                        storage.storeToken(JSON.stringify(result));

                        navigation.replace("ProfileScreen");
                        setIsError(false);
                    } else {
                        setIsError(true);
                    }
                    // Process the JSON result here
                    // setIsError(false);
                })
                .catch((error) => {
                    console.error(
                        "There was a problem with the fetch operation:",
                        error
                    );
                    // setIsError(true);
                });
        };

        fetchData();
    };

    const handleRegister = () => {
        // Navigate to the registration screen
        navigation.navigate("RegisterScreen");
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.innerContainer}>
                <Image
                    style={{
                        width: 100,
                        height: 100,
                        objectFit: "contain",
                        margin: 25,
                    }}
                    source={require("../../assets/images/pgmarketLogo.png")}
                />
                <Text style={styles.title}>Login</Text>
                <View style={{ width: "100%" }}>
                    <Text style={{ fontWeight: "bold", marginBottom: 3 }}>
                        Email or Phone
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email or Phone Number"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
                <View style={{ width: "100%" }}>
                    <Text style={{ fontWeight: "bold", marginBottom: 3 }}>
                        Password
                    </Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Password"
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                        <TouchableOpacity
                            onPress={togglePasswordVisibility}
                            style={styles.eyeIcon}
                        >
                            <Ionicons
                                name={showPassword ? "eye" : "eye-off"}
                                size={24}
                                color="gray"
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            Linking.openURL(
                                "https://pgmarket.online/forgetpassword"
                            );
                        }}
                        style={{ alignItems: "flex-end", marginTop: 3 }}
                    >
                        <Text
                            style={{
                                color: colors.primary,
                                textDecorationLine: "underline",
                            }}
                        >
                            Forgot Password?
                        </Text>
                    </TouchableOpacity>
                </View>
                {isError && (
                    <Text style={{ color: "red", marginTop: 5 }}>
                        Email or Password are invalid.
                    </Text>
                )}

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleRegister}>
                    <Text style={styles.registerText}>
                        Don't have an account? Register here
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
        backgroundColor: "white",
    },
    innerContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        height: 50,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    button: {
        backgroundColor: colors.primary,
        paddingHorizontal: 17,
        paddingVertical: 12,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
    registerText: {
        marginTop: 10,
        color: colors.primary,
    },
    passwordContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        // marginBottom: 20,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        // marginTop: 20,
    },
    passwordInput: {
        flex: 1,
        height: 48,
        paddingHorizontal: 10,
    },
    eyeIcon: {
        paddingHorizontal: 10,
    },
});

export default LoginScreen;
