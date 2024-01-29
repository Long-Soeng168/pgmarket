import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    Button,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import HeaderText from "../components/HeaderText";
const ProductImagesScreen = () => {
    const [imageUrls, setImageUrls] = useState([]);
    const [image, setImage] = useState(null);
    useEffect(() => {
        // Replace these placeholder URLs with the actual URLs of your images
        const urls = [
            "https://pgmarket.online/public/images/product/1705979855-.jpg",
            "https://pgmarket.online/public/images/product/1705979855-.jpg",
            "https://pgmarket.online/public/images/product/1705979855-.jpg",
        ];

        setImageUrls(urls);
    }, []);

    const handleDeleteClick = (index) => {
        // Implement your logic to delete the image at the specified index
        console.log("Delete button clicked for index:", index);
    };
    const handleAddImage = () => {
        // Implement your logic to delete the image at the specified index
        console.log("addImage button");
    };

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
            });

            if (!result.canceled) {
                const selectedAsset = result.assets[0];
                setImage(selectedAsset.uri);
            }
        } catch (error) {
            console.error("Error picking image:", error);
        }
    };

    const ImageUploadButton = ({ onPress, image }) => (
        <TouchableOpacity onPress={onPress}>
            {image ? (
                <Image style={styles.productImage} source={{ uri: image }} />
            ) : (
                <View style={styles.uploadButton}>
                    <Ionicons name="camera" size={28} color="white" />
                </View>
            )}
        </TouchableOpacity>
    );

    const renderImages = () => {
        return (
            <View>
                <HeaderText title="Product Images" />
                <View style={styles.imageContainer}>
                    {imageUrls.map((url, index) => (
                        <View key={index} style={styles.imageWrapper}>
                            <Image source={{ uri: url }} style={styles.image} />
                            <TouchableOpacity
                                onPress={() => handleDeleteClick(index)}
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
                <ImageUploadButton onPress={pickImage} image={image} />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Add Image" onPress={handleAddImage} />
            </View>
        </ScrollView>
    );
};

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
        height: 200,
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
    buttonContainer: {
        margin: 20,
    },
    productImage: {
        width: "50%",
        // height: 200,
        aspectRatio: 1 / 1,
        borderRadius: 5,
        marginTop: 20,
    },
    uploadButton: {
        width: "50%",
        // height: 200,
        aspectRatio: 1 / 1,
        borderRadius: 5,
        backgroundColor: "lightgray",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
    },
});

export default ProductImagesScreen;
