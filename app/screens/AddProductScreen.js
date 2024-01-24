import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Image,
    ScrollView,
    TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

import colors from "../config/colors";
import HeaderText from "../components/HeaderText";

const data = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
    { label: "Item 3", value: "3" },
    { label: "Item 4", value: "4" },
    { label: "Item 5", value: "5" },
    { label: "Item 6", value: "6" },
    { label: "Item 7", value: "7" },
    { label: "Item 8", value: "8" },
];

const InputField = ({
    placeholder,
    headTitle,
    value,
    onChangeText,
    keyboardType = "default",
    error,
    style,
}) => (
    <View style={[style, {flex: 1}]}>
        <Text style={{ marginTop: 10, fontWeight: "500", marginBottom: 3 }}>
            {headTitle}
        </Text>
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={(text) => onChangeText(text)}
            keyboardType={keyboardType}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
);

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

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [selected, setSelected] = useState([]);

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: "blue" }]}>
                    Category
                </Text>
            );
        }
        return null;
    };

    const validateField = (field, value) => {
        switch (field) {
            // Add validation logic for each field
            case "category":
                setCategoryError(value ? null : "Category cannot be empty");
                break;
            case "subCategory":
                setSubCategoryError(
                    value ? null : "Sub-category cannot be empty"
                );
                break;
            case "brand":
                setBrandError(value ? null : "Brand cannot be empty");
                break;
            case "productName":
                setProductNameError(
                    value.trim() !== "" ? null : "Product Name cannot be empty"
                );
                break;
            case "unitPrice":
                setUnitPriceError(
                    value.trim() !== "" ? null : "Unit Price cannot be empty"
                );
                break;
            case "discount":
                setDiscountError(
                    value.trim() !== "" ? null : "Discount cannot be empty"
                );
                break;
            case "videoUrl":
                setVideoUrlError(
                    value.trim() !== "" ? null : "Video URL cannot be empty"
                );
                break;
            case "shipping":
                setShippingError(
                    value.trim() !== "" ? null : "Shipping cannot be empty"
                );
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
        // validateField("category", category);
        // validateField("subCategory", subCategory);
        // validateField("brand", brand);
        // validateField("productName", productName);
        // validateField("unitPrice", unitPrice);
        // validateField("discount", discount);
        // validateField("videoUrl", videoUrl);
        // validateField("shipping", shipping);

        // // Check for errors
        // if (
        //   categoryError ||
        //   subCategoryError ||
        //   brandError ||
        //   productNameError ||
        //   unitPriceError ||
        //   discountError ||
        //   videoUrlError ||
        //   shippingError
        // ) {
        //   return;
        // }

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
        console.log("============================");
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1, backgroundColor: "white" }}
        >
            <View style={{ zIndex: 100 }}>
                <HeaderText title="Add Product" />
            </View>
            <ScrollView style={styles.container}>
                <View style={styles.innerContainer}>
                    {/* Image Upload Button */}
                    <View style={{ alignItems: 'center',}}>
                        <ImageUploadButton onPress={pickImage} image={image} />
                    </View>

                    <View style={styles.dropdownContainer}>
                        {renderLabel()}
                        <Dropdown
                            style={[
                                styles.dropdown,
                                isFocus && { borderColor: "blue" },
                            ]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? "Select Category" : "..."}
                            searchPlaceholder="Search..."
                            value={category}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={(item) => {
                                // setValue(item.value);
                                setCategory(item.value);
                                setIsFocus(false);
                            }}
                            renderLeftIcon={() => (
                                <AntDesign
                                    style={styles.icon}
                                    color={isFocus ? "blue" : "black"}
                                    name="Safety"
                                    size={20}
                                />
                            )}
                        />
                    </View>

                    <View style={styles.dropdownContainer}>
                        <MultiSelect
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            search
                            data={data}
                            labelField="label"
                            valueField="value"
                            placeholder="Select colors"
                            searchPlaceholder="Search..."
                            //   value={selected}
                            value={selectedColors}
                            onChange={(item) => {
                                // setSelected(item);
                                setSelectedColors(item);
                            }}
                            renderLeftIcon={() => (
                                <AntDesign
                                    style={styles.icon}
                                    color="black"
                                    name="Safety"
                                    size={20}
                                />
                            )}
                            selectedStyle={styles.selectedStyle}
                        />
                    </View>

                    {/* InputFields for Product Name, Unit Price, Discount, Video URL, and Shipping */}
                    <InputField
                        placeholder="Product Name"
                        headTitle="Name"
                        value={productName}
                        onChangeText={(text) => {
                            setProductName(text);
                            validateField("productName", text);
                        }}
                        error={productNameError}
                    />

                    <View style={{flexDirection: 'row', gap: 10}}>
                        <InputField
                            placeholder="Unit Price"
                            headTitle="Price($)"
                            value={unitPrice}
                            onChangeText={(text) => {
                                setUnitPrice(text);
                                validateField("unitPrice", text);
                            }}
                            keyboardType="numeric"
                            error={unitPriceError}
                        />
                        <InputField
                            placeholder="Discount"
                            headTitle="Discount(%)"
                            value={discount}
                            onChangeText={(text) => {
                                setDiscount(text);
                                validateField("discount", text);
                            }}
                            keyboardType="numeric"
                            error={discountError}
                        />
                        <InputField
                            placeholder="Shipping"
                            headTitle="Shipping($)"
                            value={shipping}
                            onChangeText={(text) => {
                                setShipping(text);
                                validateField("shipping", text);
                            }}
                            keyboardType="numeric"
                            error={shippingError}
                        />
                    </View>

                    <InputField
                        placeholder="Video URL"
                        headTitle="Viedeo URL"
                        value={videoUrl}
                        onChangeText={(text) => {
                            setVideoUrl(text);
                            validateField("videoUrl", text);
                        }}
                        error={videoUrlError}
                    />

                    {/* Selected Colors and Sizes - Implement multi-select components as needed */}

                    <InputField
                        placeholder="Description"
                        headTitle="Description"
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
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    // ... Existing styles ...
    container: {
        flex: 1,
        // padding: 20,
        paddingHorizontal: 20,
        // marginTop: 20,
    },
    button: {
        backgroundColor: colors.primary,
        paddingHorizontal: 17,
        paddingVertical: 12,
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 20,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
    input: {
        width: "100%",
        height: 45,
        borderColor: "lightgray",
        borderWidth: 1,
        // marginTop: 20,
        paddingHorizontal: 10,
        fontSize: 16,
        borderRadius: 5,
    },
    errorText: {
        color: colors.danger,
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
        backgroundColor: 'lightgray',
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
    dropdownContainer: {
        backgroundColor: "white",
        // padding: 16,
        paddingVertical: 10,
    },
    dropdown: {
        height: 50,
        borderColor: "gray",
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: "absolute",
        backgroundColor: "white",
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

export default AddProductScreen;
