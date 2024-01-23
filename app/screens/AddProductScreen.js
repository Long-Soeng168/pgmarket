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
    Picker,
    DatePickerIOS,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import colors from "../config/colors";
import HeaderText from "../components/HeaderText";

const AddProductScreen = () => {
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [productName, setProductName] = useState("");
    const [unitPrice, setUnitPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [discountFromDate, setDiscountFromDate] = useState(new Date());
    const [discountToDate, setDiscountToDate] = useState(new Date());
    const [image, setImage] = useState(null);
    const [videoUrl, setVideoUrl] = useState("");
    const [shipping, setShipping] = useState("");
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [description, setDescription] = useState("");

    const [categoryError, setCategoryError] = useState(null);
    const [subCategoryError, setSubCategoryError] = useState(null);
    const [brandError, setBrandError] = useState(null);
    const [productNameError, setProductNameError] = useState(null);
    const [unitPriceError, setUnitPriceError] = useState(null);
    const [discountError, setDiscountError] = useState(null);
    const [videoUrlError, setVideoUrlError] = useState(null);
    const [shippingError, setShippingError] = useState(null);


    const validateField = (field, value) => {
        switch (field) {
            // Add validation logic for each field
            case "category":
                setCategoryError(value ? null : "Category cannot be empty");
                break;
            case "subCategory":
                setSubCategoryError(value ? null : "Sub-category cannot be empty");
                break;
            case "brand":
                setBrandError(value ? null : "Brand cannot be empty");
                break;
            case "productName":
                setProductNameError(value.trim() !== "" ? null : "Product Name cannot be empty");
                break;
            case "unitPrice":
                setUnitPriceError(value.trim() !== "" ? null : "Unit Price cannot be empty");
                break;
            case "discount":
                setDiscountError(value.trim() !== "" ? null : "Discount cannot be empty");
                break;
            case "videoUrl":
                setVideoUrlError(value.trim() !== "" ? null : "Video URL cannot be empty");
                break;
            case "shipping":
                setShippingError(value.trim() !== "" ? null : "Shipping cannot be empty");
                break;
            default:
                break;
        }
    };

    

    useEffect(() => {
        // Add any additional setup logic here
    }, []);

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                // allowsEditing: true,
                // aspect: [1, 1],
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

    const updateProduct = () => {
        // Validate fields
        validateField("category", category);
        validateField("subCategory", subCategory);
        validateField("brand", brand);
        validateField("productName", productName);
        validateField("unitPrice", unitPrice);
        validateField("discount", discount);
        validateField("videoUrl", videoUrl);
        validateField("shipping", shipping);

        // Check for errors
        if (
            categoryError ||
            subCategoryError ||
            brandError ||
            productNameError ||
            unitPriceError ||
            discountError ||
            videoUrlError ||
            shippingError
        ) {
            return;
        }

        // Implement logic to add new product (e.g., make API call)
        console.log("Adding new product...");
        console.log("Category:", category);
        console.log("Sub-category:", subCategory);
        console.log("Brand:", brand);
        console.log("Product Name:", productName);
        console.log("Unit Price:", unitPrice);
        console.log("Discount:", discount);
        console.log("Discount From Date:", discountFromDate);
        console.log("Discount To Date:", discountToDate);
        console.log("Image:", image);
        console.log("Video URL:", videoUrl);
        console.log("Shipping:", shipping);
        console.log("Selected Colors:", selectedColors);
        console.log("Selected Sizes:", selectedSizes);
        console.log("Description:", description);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <View style={{ zIndex: 100 }}>
                <HeaderText title="Add Product" />
            </View>
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    {/* ... Other UI components ... */}
                    

                    {/* Product Name */}
                    <TextInput
                        style={styles.input}
                        placeholder="Product Name"
                        value={productName}
                        onChangeText={(text) => {
                            setProductName(text);
                            validateField("productName", text);
                        }}
                    />
                    {productNameError && (
                        <Text style={styles.errorText}>{productNameError}</Text>
                    )}

                    {/* Unit Price */}
                    <TextInput
                        style={styles.input}
                        placeholder="Unit Price"
                        keyboardType="numeric"
                        value={unitPrice}
                        onChangeText={(text) => {
                            setUnitPrice(text);
                            validateField("unitPrice", text);
                        }}
                    />
                    {unitPriceError && (
                        <Text style={styles.errorText}>{unitPriceError}</Text>
                    )}

                    {/* Discount */}
                    <TextInput
                        style={styles.input}
                        placeholder="Discount"
                        keyboardType="numeric"
                        value={discount}
                        onChangeText={(text) => {
                            setDiscount(text);
                            validateField("discount", text);
                        }}
                    />
                    {discountError && (
                        <Text style={styles.errorText}>{discountError}</Text>
                    )}

                  

                    {/* Image */}
                    <TouchableOpacity onPress={pickImage}>
                        {image ? (
                            <Image
                                style={styles.productImage}
                                source={{ uri: image }}
                            />
                        ) : (
                            <View style={styles.uploadButton}>
                                <Ionicons name="camera" size={28} color="white" />
                            </View>
                        )}
                    </TouchableOpacity>

                    {/* Video URL */}
                    <TextInput
                        style={styles.input}
                        placeholder="Video URL"
                        value={videoUrl}
                        onChangeText={(text) => {
                            setVideoUrl(text);
                            validateField("videoUrl", text);
                        }}
                    />
                    {videoUrlError && (
                        <Text style={styles.errorText}>{videoUrlError}</Text>
                    )}

                    {/* Shipping */}
                    <TextInput
                        style={styles.input}
                        placeholder="Shipping"
                        keyboardType="numeric"
                        value={shipping}
                        onChangeText={(text) => {
                            setShipping(text);
                            validateField("shipping", text);
                        }}
                    />
                    {shippingError && (
                        <Text style={styles.errorText}>{shippingError}</Text>
                    )}

                    {/* Selected Colors */}
                    {/* Implement a multi-select component for colors as needed */}

                    {/* Selected Sizes */}
                    {/* Implement a multi-select component for sizes as needed */}

                    {/* Description */}
                    <TextInput
                        style={styles.longTextInput}
                        placeholder="Description"
                        multiline
                        numberOfLines={4}
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={updateProduct}
                    >
                        <Text style={styles.buttonText}>Add Product</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    // ... Existing styles ...
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        width: "100%",
        height: 45,
        borderColor: "gray",
        borderWidth: 1,
        marginTop: 20,
        paddingHorizontal: 10,
        fontSize: 16,
        borderRadius: 5,
    },
    productImage: {
        width: 120,
        height: 120,
        borderRadius: 5,
        marginTop: 20,
    },
    uploadButton: {
        width: 120,
        height: 120,
        borderRadius: 5,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
    },
    longTextInput: {
        width: "100%",
        height: 100,
        borderColor: "gray",
        borderWidth: 1,
        marginTop: 20,
        paddingHorizontal: 10,
        fontSize: 16,
        borderRadius: 5,
    },
    pickerContainer: {
        marginTop: 20,
    },
});

export default AddProductScreen;
