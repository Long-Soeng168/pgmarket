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
    Alert,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import colors from "../config/colors";
import HeaderText from "../components/HeaderText";
import { userContext } from "../../App";
import LoadingOverlay from "../components/LoadingOverlay";

const UpdateShopDetail = ({navigation}) => {
    const [user, setUser] = React.useContext(userContext); 
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [coverPicture, setCoverPicture] = useState(null);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const [nameError, setNameError] = useState(null);
    const [phoneNumberError, setPhoneNumberError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [addressError, setAddressError] = useState(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState(null);
    const [passwordMatchError, setPasswordMatchError] = useState(null);

    React.useEffect(() => {
        fetch("https://pgmarket.online/api/shopview/" + user.user.id)
            .then((response) => response.json())
            .then((result) => {
                console.log(JSON.stringify(result, null, 2));

                setName(result.shop_name);
                setPhoneNumber(result.shop_phone);
                setEmail(result.shop_email);
                setAddress(result.shop_address); 
                setDescription(result.description);
                setLoading(false);
            })
            .catch((error) => {console.error(error)
                setLoading(false);
            }); 
    }, []);

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

    const pickImageProfile = async () => {
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
    const pickImageCover = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [21, 9],
                quality: 1,
            });

            if (!result.canceled) {
                // Use the first asset in the "assets" array
                const selectedAsset = result.assets[0];
                setCoverPicture(selectedAsset.uri);
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

        if (
            nameError ||
            phoneNumberError ||
            emailError ||
            addressError
        ) {
            return;
        }

        // Implement logic to update user details (e.g., make API call)
        console.log("Updating user details...");
        console.log("Name:", name);
        console.log("Phone Number:", phoneNumber);
        console.log("Email:", email);
        console.log("Address:", address);
        console.log("Profile Picture:", profilePicture);

        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", "Bearer " + user.token);

        const formdata = new FormData();
        formdata.append("shop_name", name);
        formdata.append("shop_email", email);
        formdata.append("shop_phone", phoneNumber);
        formdata.append("shop_address", address);
        formdata.append("description", description);
        if(profilePicture) {
            formdata.append("image", {
                uri: profilePicture,
                name: "image.jpg",
                type: "image/jpeg",
            });
        }
        if(coverPicture) {
            formdata.append("image_banner", {
                uri: coverPicture,
                name: "image.jpg",
                type: "image/jpeg",
            });
        }

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: "follow"
        };
        setLoading(true);
        fetch("https://pgmarket.online/api/updateShopProfile/" + user.user.id , requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            setLoading(false);
                if (!result.errors) {
                    Alert.alert(
                        "Add Product",
                        "Product has been added successfully",
                        [
                            { text: "", style: "" },
                            {
                                text: "OK",
                                onPress: () => {
                                    navigation.pop();
                                    navigation.replace("ShopProfile");
                                },
                            },
                        ],
                        { cancelable: false }
                    );
                } else {
                    Alert.alert(
                        "Add Product",
                        "Product added unsuccessfully",
                        [
                            { text: "", style: "" },
                            {
                                text: "OK",
                                onPress: () => {
                                    navigation.pop();
                                    navigation.replace("ShopProfile");
                                },
                            },
                        ],
                        { cancelable: false }
                    );
                }
        })
        .catch((error) => console.error(error));

        // Optionally, reset password-related states after updating details
        // setNewPassword("");
        // setConfirmPassword("");
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <View style={{ zIndex: 100}}>
                <HeaderText title="Update Shop Details" />
            </View>
                <LoadingOverlay visible={loading}/>
            <ScrollView style={styles.container}>
                <View style={styles.innerContainer}>
                    {coverPicture ? (
                        <TouchableOpacity onPress={pickImageCover}>
                            <Image
                                style={styles.coverPicture}
                                source={{ uri: coverPicture }}
                            />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={{ 
                                width: '100%',
                                aspectRatio: 21/9,
                                backgroundColor: 'lightgray',
                                justifyContent: "center",
                                alignItems: "center",
                             }}
                            onPress={pickImageCover}
                        >
                            <Ionicons name="camera" size={28} color="white" />
                        </TouchableOpacity>
                    )}

                    {profilePicture ? (
                        <TouchableOpacity onPress={pickImageProfile}>
                            <Image
                                style={styles.profilePicture}
                                source={{ uri: profilePicture }}
                            />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={styles.uploadButton}
                            onPress={pickImageProfile}
                        >
                            <Ionicons name="camera" size={28} color="white" />
                        </TouchableOpacity>
                    )}
                    <View style={{ width: "100%" }}>
                            <Text
                                style={{ fontWeight: "bold", marginBottom: 3 }}
                            >
                                Name
                            </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                    </View>
                    {nameError && (
                        <Text style={styles.errorText}>{nameError}</Text>
                    )}
                    <View style={{ width: "100%" }}>
                            <Text
                                style={{ fontWeight: "bold", marginBottom: 3 }}
                            >
                                Phone Number
                            </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        keyboardType="phone-pad"
                        value={phoneNumber}
                        onChangeText={(text) => setPhoneNumber(text)}
                    />
                    </View>
                    {phoneNumberError && (
                        <Text style={styles.errorText}>{phoneNumberError}</Text>
                    )}
                    <View style={{ width: "100%" }}>
                            <Text
                                style={{ fontWeight: "bold", marginBottom: 3 }}
                            >
                                Email
                            </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    </View>
                    {emailError && (
                        <Text style={styles.errorText}>{emailError}</Text>
                    )}
                    <View style={{ width: "100%" }}>
                            <Text
                                style={{ fontWeight: "bold", marginBottom: 3 }}
                            >
                                Address
                            </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Address"
                        value={address}
                        onChangeText={(text) => setAddress(text)}
                    />
                    </View>
                    {addressError && (
                        <Text style={styles.errorText}>{addressError}</Text>
                        )}
                        <View style={{ width: "100%" }}>
                            <Text
                                style={{ fontWeight: "bold", marginBottom: 3 }}
                            >
                                Description
                            </Text>
                    <TextInput
                        multiline
                        numberOfLines={10} 
                        style={[styles.input, {minHeight: 70, textAlignVertical: 'top'}]}
                        placeholder="Description"
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                    />
                    </View>

                </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={updateDetails}
                    >
                        <Text style={styles.buttonText}>Update Details</Text>
                    </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: "center",
        // paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: 'white',
    },
    innerContainer: {
        // justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 30,
    },
    profilePicture: {
        width: 120,
        height: 120,
        marginTop: -60,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'white',
    },
    coverPicture: {
            width: '100%',
            aspectRatio: 21/9,
            backgroundColor: 'lightgray',
            justifyContent: "center",
            alignItems: "center",
    },
    uploadButton: {
        width: 120,
        height: 120,
        borderRadius: 100,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
        marginTop: -60,
        // margin: 25,
    },
    input: {
        width: "100%",
        height: 50,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        // marginTop: 20,
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

export default UpdateShopDetail;
