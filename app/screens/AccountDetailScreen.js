import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import colors from "../config/colors";
import HeaderText from "../components/HeaderText";

const AccountDetailScreen = () => {
    const [name, setName] = useState("John Doe");
    const [phoneNumber, setPhoneNumber] = useState("123-456-7890");
    const [email, setEmail] = useState("john.doe@example.com");
    const [address, setAddress] = useState("123 Main St, Cityville");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const [nameError, setNameError] = useState(null);
    const [phoneNumberError, setPhoneNumberError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [addressError, setAddressError] = useState(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState(null);
    const [passwordMatchError, setPasswordMatchError] = useState(null);

    const validateField = (field, value) => {
        switch (field) {
            case "name":
                setNameError(
                    value.trim() !== "" ? null : "Name cannot be empty"
                );
                break;
            case "phoneNumber":
                setPhoneNumberError(
                    value.trim() !== "" ? null : "Phone number cannot be empty"
                );
                break;
            case "email":
                setEmailError(
                    /\S+@\S+\.\S+/.test(value) ? null : "Invalid email address"
                );
                break;
            case "address":
                setAddressError(
                    value.trim() !== "" ? null : "Address cannot be empty"
                );
                break;
            case "passwordMatch":
                setPasswordMatchError(
                    value === newPassword ? null : "Passwords do not match"
                );
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        (async () => {
            if (Platform.OS !== "web") {
                try {
                    const { status } =
                        await ImagePicker.requestMediaLibraryPermissionsAsync();
                    if (status !== "granted") {
                        alert(
                            "Sorry, we need camera roll permissions to make this work!"
                        );
                    }
                } catch (error) {
                    console.error(
                        "Error requesting media library permissions:",
                        error
                    );
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled) {
                // Use the first asset in the "assets" array
                const selectedAsset = result.assets[0];
                setProfilePicture(selectedAsset.uri);
            }
        } catch (error) {
            console.error("Error picking image:", error);
        }
    };

    const updateDetails = () => {
        validateField("name", name);
        validateField("phoneNumber", phoneNumber);
        validateField("email", email);
        validateField("address", address);
        validateField("passwordMatch", confirmPassword);

        if (
            nameError ||
            phoneNumberError ||
            emailError ||
            addressError ||
            passwordMatchError
        ) {
            return;
        }

        // Implement logic to update user details (e.g., make API call)
        console.log("Updating user details...");
        console.log("Name:", name);
        console.log("Phone Number:", phoneNumber);
        console.log("Email:", email);
        console.log("Address:", address);
        console.log("New Password:", newPassword);
        console.log("Confirm Password:", confirmPassword);
        console.log("Profile Picture:", profilePicture);

        // Optionally, reset password-related states after updating details
        // setNewPassword("");
        // setConfirmPassword("");
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <View style={{ zIndex: 100 }}>
                <HeaderText title="Account Detail" />
            </View>
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    {profilePicture ? (
                        <TouchableOpacity onPress={pickImage}>
                            <Image
                                style={styles.profilePicture}
                                source={{ uri: profilePicture }}
                            />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={styles.uploadButton}
                            onPress={pickImage}
                        >
                            <Ionicons name="camera" size={24} color="white" />
                        </TouchableOpacity>
                    )}
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                    {nameError && (
                        <Text style={styles.errorText}>{nameError}</Text>
                    )}
                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        keyboardType="phone-pad"
                        value={phoneNumber}
                        onChangeText={(text) => setPhoneNumber(text)}
                    />
                    {phoneNumberError && (
                        <Text style={styles.errorText}>{phoneNumberError}</Text>
                    )}
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    {emailError && (
                        <Text style={styles.errorText}>{emailError}</Text>
                    )}
                    <TextInput
                        style={styles.input}
                        placeholder="Address"
                        value={address}
                        onChangeText={(text) => setAddress(text)}
                    />
                    {addressError && (
                        <Text style={styles.errorText}>{addressError}</Text>
                    )}
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="New Password"
                            secureTextEntry={!passwordVisible}
                            value={newPassword}
                            onChangeText={(text) => setNewPassword(text)}
                        />
                        <TouchableOpacity
                            style={styles.eyeIcon}
                            onPress={() => setPasswordVisible(!passwordVisible)}
                        >
                            <Ionicons
                                name={passwordVisible ? "eye" : "eye-off"}
                                size={24}
                                color="gray"
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Confirm Password"
                            secureTextEntry={!passwordVisible}
                            value={confirmPassword}
                            onChangeText={(text) => setConfirmPassword(text)}
                        />
                        <TouchableOpacity
                            style={styles.eyeIcon}
                            onPress={() => setPasswordVisible(!passwordVisible)}
                        >
                            <Ionicons
                                name={passwordVisible ? "eye" : "eye-off"}
                                size={24}
                                color="gray"
                            />
                        </TouchableOpacity>
                    </View>
                    {passwordMatchError && (
                        <Text style={styles.errorText}>
                            {passwordMatchError}
                        </Text>
                    )}

                    <TouchableOpacity
                        style={styles.button}
                        onPress={updateDetails}
                    >
                        <Text style={styles.buttonText}>Update Details</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    innerContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    uploadButton: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
        margin: 25,
    },
    input: {
        width: "100%",
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        // marginBottom: 20,
        marginTop: 20,
        paddingHorizontal: 10,
        fontSize: 16, // Adjust the font size as needed
    },
    passwordContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        // marginBottom: 20,
        marginTop: 20,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
    },
    passwordInput: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
    },
    eyeIcon: {
        padding: 10,
    },
    button: {
        backgroundColor: colors.accent,
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
    errorText: {
        color: "red",
        alignSelf: "flex-start",
        // marginBottom: 10,
    },
});

export default AccountDetailScreen;
