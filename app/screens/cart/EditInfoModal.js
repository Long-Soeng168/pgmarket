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
    Modal,
    Button,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import colors from "../../config/colors";
import HeaderText from "../../components/HeaderText";
import { userContext } from "../../../App";

const AccountDetailScreen = ({navigation, isVisible, setIsVisible}) => {
    const [user, setUser] = React.useContext(userContext);
    const [reload, setReload] = React.useState(false);
    const userInfo = user ? user.user : null;
    // console.log(userInfo);

    const [name, setName] = useState(userInfo && userInfo.name);
    const [phoneNumber, setPhoneNumber] = useState(userInfo && userInfo.phone);
    const [email, setEmail] = useState(userInfo && userInfo.email);
    const [address, setAddress] = useState(userInfo && userInfo.address);

    const [nameError, setNameError] = useState(null);
    const [phoneNumberError, setPhoneNumberError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [addressError, setAddressError] = useState(null);


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

      const updateDetails = () => {
        if(!userInfo) {
            return;
        }
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
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", "Bearer " + user.token);

        var formdata = new FormData();
        formdata.append("name", name);
        formdata.append("phone", phoneNumber);
        formdata.append("email", email);
        formdata.append("address", address);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
        };

        fetch("https://pgmarket.longsoeng.website/api/updateUserDetail/" + userInfo.id, requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.errors) {
                console.log('Update Unsuccess!');
                setReload(!reload)
            }
            else {
                console.log('Update Successfully!');
                setReload(!reload);
                // console.log(result.user);
                setUser(user => {
                    return {
                        "token": user.token,
                        "user": result.user,
                    }
                })
                Alert.alert(
                    "Message",
                    "Update Successfully!",
                    [
                        { text: "", style: "" },
                        {
                            text: "OK",
                            onPress: () => {
                                setIsVisible(false);
                            },
                        },
                    ],
                    { cancelable: false }
                );

            }
        })
        .catch(error => {console.log('error', error);
        Alert.alert(
            "Message",
            "Update Unsuccessfully!",
            [
                { text: "", style: "" },
                {
                    text: "OK",
                    onPress: () => {
                        setIsVisible(false);
                    },
                },
            ],
            { cancelable: false }
        );
        });

        // Optionally, reset password-related states after updating details
        // setNewPassword("");
        // setConfirmPassword("");
    };

    return (
        <Modal
            visible={isVisible}
            style={{ flex: 1 }}
            transparent={true}
            animationType="slide"
        >
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <TouchableOpacity
                        style={{ 
                            backgroundColor: '#000000c7',
                            // padding: 10,
                            width: 50,
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 200,
                            position: 'absolute',
                            top: -20,
                            right: -20,
                         }}
                         onPress={() => setIsVisible(false)}
                        >
                        <Ionicons name="close" size={28} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.label}>Username:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            value={name}
                            onChangeText={(text) => setName(text)}
                        />
                        {nameError && (
                            <Text style={styles.errorText}>{nameError}</Text>
                            )}
                            <Text style={styles.label}>Phone:</Text>
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
                            <Text style={styles.label}>Email:</Text>
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
                            <Text style={styles.label}>Address:</Text>
                        <TextInput
                            multiline
                            style={[styles.input,
                                {
                                    height: 70,
                                    paddingTop: 5,
                                    textAlignVertical: 'top'
                                }
                            ]}
                            placeholder="Address"
                            value={address}
                            onChangeText={(text) => setAddress(text)}
                        />
                        {addressError && (
                            <Text 
                                
                            style={styles.errorText}>{addressError}</Text>
                        )}
                    

                        <TouchableOpacity
                            style={styles.button}
                            onPress={updateDetails}
                        >
                            <Text style={styles.buttonText}>Update Details</Text>
                        </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: '#000000b2',
        paddingHorizontal: 25,
    },
    innerContainer: {
        padding: 20,
        borderRadius: 20,
        justifyContent: "center",
        backgroundColor: 'white',

        // alignItems: "center",
    },
    profilePicture: {
        width: 120,
        height: 120,
        borderRadius: 100,
    },
    uploadButton: {
        width: 120,
        height: 120,
        borderRadius: 100,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
        margin: 25,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        // marginBottom: 5,
    },
    input: {
        width: "100%",
        height: 45,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 20,
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
        borderRadius: 10,
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
