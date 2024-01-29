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
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import colors from "../config/colors";
import HeaderText from "../components/HeaderText";

const UpdateBankAccount = () => {
    const [name, setName] = useState("IDO Technology");
    const [phoneNumber, setPhoneNumber] = useState("010775589");
    const [email, setEmail] = useState("ido@gmail.com");
    const [address, setAddress] = useState(" Phnom Penh");
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
                <HeaderText title="Update Bank Details" />
            </View>
            <ScrollView style={styles.container}>
                <View style={styles.innerContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Bank Name"
                        // value={address}
                        // onChangeText={(text) => setAddress(text)}
                    />
                   
                    <TextInput
                        style={styles.input}
                        placeholder="Account Name"
                        // value={address}
                        // onChangeText={(text) => setAddress(text)}
                    />
                   
                    <TextInput
                        style={styles.input}
                        placeholder="Account ID"
                        // value={address}
                        // onChangeText={(text) => setAddress(text)}
                    />
                   
                    <TextInput
                        style={styles.input}
                        placeholder="Payment Link URL"
                        // value={address}
                        // onChangeText={(text) => setAddress(text)}
                    />

                    {profilePicture ? (
                        <View>
                            <Text>QR Code</Text>
                            <TouchableOpacity onPress={pickImage}>
                                <Image
                                    style={styles.profilePicture}
                                    source={{ uri: profilePicture }}
                                />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={{ alignItems: 'center', marginTop: 20 }}>
                            <Text style={{ fontWeight: '500' }}>QR Code</Text>
                            <TouchableOpacity
                                style={{
                                    width: '70%',
                                    aspectRatio: 1/1,
                                    backgroundColor: 'lightgray',
                                    justifyContent: "center",
                                    alignItems: "center",
                                    // margin: 20,
                                 }}
                                onPress={pickImage}
                            >
                                <Ionicons name="camera" size={28} color="white" />
                            </TouchableOpacity>
                        </View>
                    )}
                    {profilePicture ? (
                        <View>
                            
                            <TouchableOpacity onPress={pickImage}>
                                <Image
                                    style={styles.profilePicture}
                                    source={{ uri: profilePicture }}
                                />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={{ alignItems: 'center', marginTop: 20 }}>
                            <Text style={{ fontWeight: '500' }}>Bank Logo</Text>
                            <TouchableOpacity
                                style={styles.uploadButton}
                                onPress={pickImage}
                            >
                                <Ionicons name="camera" size={28} color="white" />
                            </TouchableOpacity>
                        </View>
                    )}
                     

                    <TouchableOpacity
                        style={styles.button}
                        onPress={updateDetails}
                    >
                        <Text style={styles.buttonText}>Update Details</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        // paddingTop: 20,
        // marginTop: 20,
        paddingHorizontal: 20,
        backgroundColor: 'white',
    },
    innerContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    profilePicture: {
        width: 120,
        height: 120,
        borderRadius: 100,
    },
    uploadButton: {
        width: 120,
        height: 120,
        borderRadius: 10,
        backgroundColor: 'lightgray',
        justifyContent: "center",
        alignItems: "center",
        // marginTop: -60,
        // margin: 25,
    },
    input: {
        width: "100%",
        height: 45,
        borderColor: "gray",
        borderWidth: 1,
        // marginBottom: 20,
        marginTop: 20,
        paddingHorizontal: 10,
        fontSize: 16, // Adjust the font size as needed
        borderRadius: 5,
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
        height: 45,
        paddingHorizontal: 10,
    },
    eyeIcon: {
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: colors.accent,
        paddingHorizontal: 17,
        paddingVertical: 15,
        borderRadius: 5,
        marginTop: 35,
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

export default UpdateBankAccount;
