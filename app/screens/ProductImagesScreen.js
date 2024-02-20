import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import HeaderText from "../components/HeaderText";
import colors from "../config/colors";
import LoadingOverlay from "../components/LoadingOverlay";

const ProductImagesScreen = ({route, navigation}) => {
    const proId = route.params;
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const urls = [
        "https://pgmarket.online/public/images/product/1705979855-.jpg",
        "https://pgmarket.online/public/images/product/1705979855-.jpg",
        "https://pgmarket.online/public/images/product/1705979855-.jpg",
        "https://pgmarket.online/public/images/product/1705979855-.jpg",
    ];

    const handleDeleteImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                allowsMultipleSelection: true, // Enable multiple image selection
            });

            if (!result.canceled) {
                const selectedAssets = result.assets;
                setImages([
                    ...images,
                    ...selectedAssets.map((asset) => asset.uri),
                ]);
            }
        } catch (error) {
            console.error("Error picking images:", error);
        }
    };

    const handleUploadImages = () => {
        images.length > 0 && setLoading(true);
        setTimeout(() => {
            uploadImages();
        }, 10);
    };

    const showSuccess = () => {
        Alert.alert(
            "Add Images",
            "Images has been added successfully",
            [
                { text: "", style: "" },
                {
                    text: "OK",
                    onPress: () => {
                        navigation.goBack();
                    },
                },
            ],
            { cancelable: false }
        );
    }

    const uploadImages = () => { 
        images.forEach((uri, index) => {
            const formData = new FormData();

            const filename = uri.split("/").pop(); // Extract filename from URI
            const fileExtension = filename.split(".").pop(); // Extract file extension

            formData.append("image", {
                uri,
                name: "image.jpg", // Rename the file
                type: `image/${fileExtension}`, // Set correct MIME type
            });

            fetch(
                "https://pgmarket.longsoeng.website/api/addProductImages/" + proId,
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
                .then((response) => {
                    if (!response.ok) {
                        index == images.length - 1 && setLoading(false);
                        throw new Error("Failed to upload images");
                    }
                    return response.json(); // assuming server responds with JSON
                })
                .then((data) => {
                    if(index == images.length - 1) {
                        setLoading(false);
                        showSuccess();
                    }
                        console.log("Images uploaded successfully:", data);
                    
                })
                .catch((error) => {
                    if(index == images.length - 1) {
                        setLoading(false);
                        showSuccess();
                    }
                    console.error("Error uploading images:", error);
                });
            });
    };

    const renderImages = () => {
        return (
            <View>
                <HeaderText title="Product Images" />
                <View style={styles.imageContainer}>
                    {images.map((uri, index) => (
                        <View key={index} style={styles.imageWrapper}>
                            <Image source={{ uri }} style={styles.image} />
                            <TouchableOpacity
                                onPress={() => handleDeleteImage(index)}
                                style={styles.deleteButton}
                            >
                                <Text style={styles.deleteButtonText}>
                                    Delete
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </View>
        );
    };

    return (
        <ScrollView>
            {renderImages()}
            <View style={{ alignItems: "center" }}>
                <LoadingOverlay visible={loading} />
                <TouchableOpacity
                    onPress={pickImage}
                    style={styles.uploadButton}
                >
                    <Ionicons name="camera" size={28} color="white" />
                </TouchableOpacity>
                <Button
                    title="Upload Images"
                    bgColor={colors.primary}
                    onPress={handleUploadImages}
                />
            </View>
            <View style={{ height: 1, width: "90%", alignSelf: 'center', marginTop: 35, backgroundColor: "black" }}></View>
            <View style={[styles.imageContainer, {marginBottom: 200}]}>
                    {urls.map((url, index) => (
                        <View key={index} style={[styles.imageWrapper, {marginBottom: 40}]}>
                            <Image source={{ uri: url }} style={styles.image} />
                            <TouchableOpacity
                                onPress={() => {
                                    console.log("Press");
                                }}
                                style={{ backgroundColor: 'red', padding: 8, borderRadius: 5 }}
                            >
                                <Text
                                    style={{ color: 'white', alignSelf: "center", fontSize: 16 }}
                                >
                                    Delete
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
        </ScrollView>
    );
};

function Button({ title, onPress, bgColor }) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={{
                backgroundColor: bgColor,
                alignItems: "center",
                padding: 10,
                borderRadius: 10,
                flex: 1,
            }}
        >
            <View
                style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
                {/* <FontAwesome
                    name="shopping-cart"
                    size={24}
                    color={colors.white}
                /> */}
                <Text
                    style={{
                        color: colors.white,
                        fontSize: 16,
                        fontWeight: "500",
                    }}
                >
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        padding: 20,
    },
    imageWrapper: {
        position: "relative",
        width: "45%", // Adjust the width as needed
        // height: 200,
        aspectRatio: 1,
        margin: 5,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },
    deleteButton: {
        position: "absolute",
        top: 5,
        right: 5,
        backgroundColor: "red",
        padding: 5,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: "white",
    },
    uploadButton: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "lightgray",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
    },
});

export default ProductImagesScreen;
