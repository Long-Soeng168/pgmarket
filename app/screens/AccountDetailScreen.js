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
import { userContext } from "../../App";
import LoadingOverlay from "../components/LoadingOverlay";
import { useTranslation } from "react-i18next";

const AccountDetailScreen = ({ navigation }) => {
  const [user, setUser] = React.useContext(userContext);
  const [message, setMessage] = React.useState("");
  const [reload, setReload] = React.useState(false);
  const [isUpdate, setIsUpdate] = React.useState(false);
  const userInfo = user.user;
  console.log(userInfo);
  const [t, i18n] = useTranslation("global");

  const [name, setName] = useState(userInfo.name);
  const [phoneNumber, setPhoneNumber] = useState(userInfo.phone);
  const [email, setEmail] = useState(userInfo.email);
  const [address, setAddress] = useState(userInfo.address);
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

  React.useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage(null); // Reset message state to false after 3 seconds
        // navigation.goBack();
      }, 2000);
    }
  }, [reload]);

  const validateField = (field, value) => {
    switch (field) {
      case "name":
        setNameError(value.trim() !== "" ? null : "Name cannot be empty");
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
        setAddressError(value.trim() !== "" ? null : "Address cannot be empty");
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
            alert("Sorry, we need camera roll permissions to make this work!");
          }
        } catch (error) {
          console.error("Error requesting media library permissions:", error);
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

    setIsUpdate(true);

    setTimeout(() => {
      var myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + user.token);

      var formdata = new FormData();
      formdata.append("name", name);
      formdata.append("phone", phoneNumber);
      formdata.append("email", email);
      if (newPassword != "" && newPassword == confirmPassword) {
        formdata.append("password", newPassword);
      }
      formdata.append("address", address);

      if (profilePicture) {
        formdata.append("image", {
          uri: profilePicture,
          name: "image.jpg",
          type: "image/jpeg",
        });
      }

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      fetch(
        "https://pgmarket.online/api/updateUserDetail/" + userInfo.id,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.errors) {
            console.log("Update Unsuccess!");
            setMessage("Update Unsuccess");
            setReload(!reload);
          } else {
            console.log("Update Successfully!");
            setMessage("Update Successfully");
            setReload(!reload);
            console.log(result.user);
            setUser((user) => {
              return {
                token: user.token,
                user: result.user,
              };
            });
            setIsUpdate(false);
          }
        })
        .catch((error) => console.log("error", error))
        .finally(() => setIsUpdate(false));
    }, 50);

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
        <LoadingOverlay visible={isUpdate} />
        <HeaderText title="Account Detail" />
        {message && (
          <Text
            style={{
              color: "red",
              textAlign: "center",
              fontSize: 16,
              backgroundColor: colors.lightGreen,
              padding: 10,
            }}
          >
            {message}
          </Text>
        )}
      </View>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.innerContainer}>
            {profilePicture ? (
              <TouchableOpacity onPress={pickImage}>
                <Image
                  style={styles.profilePicture}
                  source={{ uri: profilePicture }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                <Ionicons name="camera" size={28} color="white" />
              </TouchableOpacity>
            )}
            <View style={{ width: "100%" }}>
              <Text style={{ fontWeight: "bold", marginBottom: 3 }}>
                {t("name")}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </View>
            {nameError && <Text style={styles.errorText}>{nameError}</Text>}
            <View style={{ width: "100%" }}>
              <Text style={{ fontWeight: "bold", marginBottom: 3 }}>
                {t("phone")}
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
              <Text style={{ fontWeight: "bold", marginBottom: 3 }}>
                {t("email")}
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
            {emailError && <Text style={styles.errorText}>{emailError}</Text>}
            <View style={{ width: "100%" }}>
              <Text style={{ fontWeight: "bold", marginBottom: 3 }}>
                {t("address")}
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
              <Text style={{ fontWeight: "bold", marginBottom: 3 }}>
                {t("password")}
              </Text>
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
            </View>

            <View style={{ width: "100%" }}>
              <Text style={{ fontWeight: "bold", marginBottom: 3 }}>
                {t("confirmPassword")}
              </Text>
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
            </View>
            {passwordMatchError && (
              <Text style={styles.errorText}>{passwordMatchError}</Text>
            )}
            <TouchableOpacity style={styles.button} onPress={updateDetails}>
              <Text style={styles.buttonText}>{t("updateDetails")}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  profilePicture: {
    marginTop: 25,
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
  input: {
    width: "100%",
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    // marginBottom: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 16, // Adjust the font size as needed
    borderRadius: 5,
  },
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 20,
    marginBottom: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
  passwordInput: {
    flex: 1,
    height: 48,
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

export default AccountDetailScreen;
