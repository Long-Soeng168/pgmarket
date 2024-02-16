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
    Modal,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";

import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

import colors from "../config/colors";
import HeaderText from "../components/HeaderText";
import { userContext } from "../../App";
import LoadingOverlay from "../components/LoadingOverlay";

const InputField = ({
    placeholder,
    headTitle,
    value,
    onChangeText,
    keyboardType = "default",
    error,
    style,
}) => (
    <View style={[style, { flex: 1 }]}>
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

const AddProductScreen = ({ navigation, route }) => {
    const product = route.params;
    const productInfo = product.product;
    console.log(productInfo);
    const productColors = product.colors;
    const productSizes = product.sizes;
    console.log(JSON.stringify(product, null, 2));


    const [user, setUser] = React.useContext(userContext);
    const [loading, setLoading] = useState(true);

    const [mainCategory, setMainCategory] = useState(productInfo.main_cate_id);
    const [category, setCategory] = useState(productInfo.cate_id);
    const [subCategory, setSubCategory] = useState(productInfo.sub_cate_id);
    const [brand, setBrand] = useState("");
    const [productName, setProductName] = useState(productInfo.pro_name);
    const [unitPrice, setUnitPrice] = useState(productInfo.price);
    const [discount, setDiscount] = useState(productInfo.discount);
    const [discountFromDate, setDiscountFromDate] = useState(productInfo.discount_date_start);
    const [discountToDate, setDiscountToDate] = useState(productInfo.discount_date_end);
    const [image, setImage] = useState(null);
    const [videoUrl, setVideoUrl] = useState(productInfo.video_url);
    const [shipping, setShipping] = useState(productInfo.shipping);
    const [selectedColors, setSelectedColors] = useState(productColors);
    const [selectedSizes, setSelectedSizes] = useState(productSizes);
    const [description, setDescription] = useState(productInfo.description); 

    const [categoryError, setCategoryError] = useState(null);
    const [subCategoryError, setSubCategoryError] = useState(null);
    const [brandError, setBrandError] = useState(null);
    const [productNameError, setProductNameError] = useState(null);
    const [unitPriceError, setUnitPriceError] = useState(null);
    const [discountError, setDiscountError] = useState(null);
    const [videoUrlError, setVideoUrlError] = useState(null);
    const [shippingError, setShippingError] = useState(null);

    const [mainCate, setMainCate] = useState([]);
    const [cate, setCate] = useState([]);
    const [filterCate, setFilterCate] = useState([]);
    const [subCate, setSubCate] = useState([]);
    const [filterSubCate, setFilterSubCate] = useState([]);
    const [allColors, setAllColors] = useState([]);
    const [allSizes, setAllSizes] = useState([]);

    // React.useEffect(() => {
    //     if(mainCategory){
    //         let filter = cate.filter(item => item.id === mainCategory.id);
    //         console.log('filter');
    //         setFilterCate(filter);
    //     }
    // });


    React.useEffect(() => { 

        fetch("https://pgmarket.longsoeng.website/api/getmaincategories")
            .then((response) => response.json())
            .then((result) => {
                setMainCate(result); 
                // console.log(result)
            })
            .catch((error) => console.error(error));

        fetch("https://pgmarket.longsoeng.website/api/getcategories")
            .then((response) => response.json())
            .then((result) => {
                setCate(result);
                let filter = result.filter(
                    (i) => i.main_category_id === productInfo.main_cate_id
                );
                // console.log(filter);
                setFilterCate(filter);
                // console.log(result)
            })
            .catch((error) => console.error(error));

        fetch("https://pgmarket.longsoeng.website/api/getsubcategories")
            .then((response) => response.json())
            .then((result) => {
                setSubCate(result);
                // console.log(result)
                let filter = result.filter(
                    (i) => i.sub_category_id === productInfo.cate_id
                );
                // console.log(filter);
                setFilterSubCate(filter);
            })
            .catch((error) => console.error(error));

        fetch("https://pgmarket.longsoeng.website/api/getcolors")
            .then((response) => response.json())
            .then((result) => {
                setAllColors(result);
                // console.log(JSON.stringify(result, null, 2));
            })
            .catch((error) => console.error(error));

        fetch("https://pgmarket.longsoeng.website/api/getsizes")
            .then((response) => response.json())
            .then((result) => {
                setAllSizes(result);
                // console.log(JSON.stringify(result, null, 2));
                setLoading(false);
            })
            .catch((error) => console.error(error));
        
    }, []);

    const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
    const today = new Date();
    const startDate = getFormatedDate(
        today.setDate(today.getDate()),
        "YYYY/MM/DD"
    );
    const [startedDate, setStartedDate] = useState(discountFromDate || startDate);
    function handleChangeStartDate(propDate) {
        setDiscountFromDate(propDate);
    }
    const handleOnPressStartDate = () => {
        setOpenStartDatePicker(!openStartDatePicker);
    };

    const [openEndDatePicker, setOpenEndDatePicker] = useState(false);

    const [endDate, setEndDate] = useState(discountToDate || startDate);
    function handleChangeEndDate(propDate) {
        setDiscountToDate(propDate);
    }
    const handleOnPressEndDate = () => {
        setOpenEndDatePicker(!openEndDatePicker);
    };

    const [isFocusMain, setIsFocusMain] = useState(false);
    // const [selectedMain, setSelectedMain] = useState([]);
    const [isFocusCate, setIsFocusCate] = useState(false);
    const [isFocusSubCate, setIsFocusSubCate] = useState(false);

    const renderLabelMain = () => {
        if (mainCategory || isFocusMain) {
            return (
                <Text style={[styles.label, isFocusMain && { color: "blue" }]}>
                    Main Category
                </Text>
            );
        }
        return null;
    };
    const renderLabelCate = () => {
        if (category || isFocusCate) {
            return (
                <Text style={[styles.label, isFocusCate && { color: "blue" }]}>
                    Category
                </Text>
            );
        }
        return null;
    };
    const renderLabelSubCate = () => {
        if (subCategory || isFocusSubCate) {
            return (
                <Text
                    style={[styles.label, isFocusSubCate && { color: "blue" }]}
                >
                    Sub Category
                </Text>
            );
        }
        return null;
    };

    const validateField = (field, value) => {
        switch (field) {
            // Add validation logic for each field
            case "category":
                setCategoryError(value ? null : "Category required");
                break;
            case "subCategory":
                setSubCategoryError(value ? null : "Sub-category required");
                break;
            case "brand":
                setBrandError(value ? null : "Brand required");
                break;
            case "productName":
                setProductNameError(
                    value.trim() !== "" ? null : "Product Name required"
                );
                break;
            case "unitPrice":
                setUnitPriceError(
                    value.trim() !== "" ? null : "Price required"
                );
                break;
            case "discount":
                setDiscountError(
                    value.trim() !== "" ? null : "Discount required"
                );
                break;
            case "videoUrl":
                setVideoUrlError(
                    value.trim() !== "" ? null : "Video URL required"
                );
                break;
            case "shipping":
                setShippingError(
                    value.trim() !== "" ? null : "Shipping required"
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
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled) {
                const selectedAsset = result.assets[0];
                setImage(selectedAsset);
            }
        } catch (error) {
            console.error("Error picking image:", error);
        }
    };

    const addProduct = () => {
        // console.log(selectedColors);
        // Validate fields
        validateField("category", category);
        validateField("subCategory", subCategory);
        validateField("productName", productName);
        validateField("unitPrice", unitPrice);

        // Check for errors
        if (
            categoryError ||
            subCategoryError ||
            productNameError ||
            unitPriceError ||
            !mainCategory ||
            !category ||
            !subCategory
        ) {
            return;
        } 

        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        image && myHeaders.append("Content-Type", "multipart/form-data");
        myHeaders.append("Authorization", "Bearer " + user.token);

        var formdata = new FormData();
        formdata.append("main_cate_id", mainCategory);
        formdata.append("cate_id", category);
        formdata.append("sub_cate_id", subCategory);
        formdata.append("pro_name", productName);
        formdata.append("price", unitPrice);

        discountFromDate && formdata.append("start", discountFromDate);

        if(discountFromDate){
            formdata.append("end", discountToDate);
        }else {
            if(discountToDate){
                formdata.append("end", discountFromDate);
            }
        }
        discount ? formdata.append("discount", discount) : formdata.append("discount", 0);
        videoUrl && formdata.append("video_url", videoUrl);
        description && formdata.append("description", description);
        shipping && formdata.append("shipping", shipping);
        selectedColors && formdata.append("colors", JSON.stringify(selectedColors));
        selectedSizes && formdata.append("sizes", JSON.stringify(selectedSizes));
        image && formdata.append("thumbnail", {
            uri: image.uri,
            name: "image.jpg",
            type: "image/jpeg",
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: "follow",
        };
        setLoading(true);
        fetch(
            "https://pgmarket.longsoeng.website/api/updateProduct/" + productInfo.id,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(JSON.stringify(result, null, 2));
                setLoading(false);
                if (result.success) {
                    Alert.alert(
                        "update Product",
                        "Product updated successfully",
                        [
                            { text: "", style: "" },
                            {
                                text: "OK",
                                onPress: () => {
                                    navigation.pop();
                                    navigation.replace("ShopProductDetail", productInfo);
                                },
                            },
                        ],
                        { cancelable: false }
                    );
                } else {
                    Alert.alert(
                        "update Product",
                        "Product updated unsuccessfully",
                        [
                            { text: "", style: "" },
                            {
                                text: "OK",
                                onPress: () => {
                                    navigation.pop();
                                    navigation.replace("ShopProductDetail", productInfo);
                                },
                            },
                        ],
                        { cancelable: false }
                    );
                }
            })
            .catch((error) => {
                setLoading(false);
                Alert.alert(
                    "Update Product",
                    "Product update successfully",
                    [
                        { text: "", style: "" },
                        {
                            text: "OK",
                            onPress: () => {
                                navigation.pop();
                                navigation.replace("ShopProductDetail", productInfo);
                            },
                        },
                    ],
                    { cancelable: false }
                );
                console.log("error", error);
            });
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1, backgroundColor: "white" }}
        >
            <View style={{ zIndex: 100 }}>
                <HeaderText title="Add Product" />
            </View>
            <LoadingOverlay visible={loading} />
            <ScrollView style={styles.container}>
                <View style={styles.innerContainer}>
                    {/* Image Upload Button */}
                    <View style={{ alignItems: "center" }}>
                        <ImageUploadButton
                            onPress={pickImage}
                            image={image ? image.uri : ""}
                        />
                        {/* {!image && (
                            <Text style={{ marginTop: -10, color: "red" }}>
                                Image required
                            </Text>
                        )} */}
                    </View>

                    <View style={styles.dropdownContainer}>
                        {renderLabelMain()}
                        <Dropdown
                            style={[
                                styles.dropdown,
                                isFocusMain && { borderColor: "blue" },
                            ]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={mainCate}
                            search
                            maxHeight={300}
                            labelField="name_en"
                            valueField="id"
                            placeholder={
                                !isFocusMain ? "Select Main Category" : "..."
                            }
                            searchPlaceholder="Search..."
                            value={mainCategory}
                            onFocus={() => setIsFocusMain(true)}
                            onBlur={() => setIsFocusMain(false)}
                            onChange={(item) => {
                                // setValue(item.value);
                                setMainCategory(item.id);
                                // console.log(item.id);
                                let filter = cate.filter(
                                    (i) => i.main_category_id === item.id
                                );
                                // console.log(filter);
                                setFilterCate(filter);
                                setCategory(null);
                                setSubCategory(null);
                                setIsFocusMain(false);
                            }}
                            renderLeftIcon={() => (
                                <AntDesign
                                    style={styles.icon}
                                    color={isFocusMain ? "blue" : "black"}
                                    name="profile"
                                    size={20}
                                />
                            )}
                        />
                    </View>

                    <View style={styles.dropdownContainer}>
                        {renderLabelCate()}
                        <Dropdown
                            style={[
                                styles.dropdown,
                                isFocusCate && { borderColor: "blue" },
                            ]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={filterCate}
                            search
                            maxHeight={300}
                            labelField="name_en"
                            valueField="id"
                            placeholder={
                                !isFocusCate ? "Select Category" : "..."
                            }
                            searchPlaceholder="Search..."
                            value={category}
                            onFocus={() => setIsFocusCate(true)}
                            onBlur={() => setIsFocusCate(false)}
                            onChange={(item) => {
                                // setValue(item.id);
                                setCategory(item.id);
                                // console.log(item.id);
                                let filter = subCate.filter(
                                    (i) => i.sub_category_id === item.id
                                );
                                // console.log(filter);
                                setFilterSubCate(filter);
                                setSubCategory(null);
                                setIsFocusCate(false);
                            }}
                            renderLeftIcon={() => (
                                <AntDesign
                                    style={styles.icon}
                                    color={isFocusCate ? "blue" : "black"}
                                    name="profile"
                                    size={20}
                                />
                            )}
                        />
                    </View>

                    <View style={styles.dropdownContainer}>
                        {renderLabelSubCate()}
                        <Dropdown
                            style={[
                                styles.dropdown,
                                isFocusSubCate && { borderColor: "blue" },
                            ]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={filterSubCate}
                            search
                            maxHeight={300}
                            labelField="name_en"
                            valueField="id"
                            placeholder={
                                !isFocusSubCate ? "Select Sub-Category" : "..."
                            }
                            searchPlaceholder="Search..."
                            value={subCategory}
                            onFocus={() => setIsFocusSubCate(true)}
                            onBlur={() => setIsFocusSubCate(false)}
                            onChange={(item) => {
                                // setValue(item.id);
                                setSubCategory(item.id);
                                console.log(item.id);
                                setIsFocusSubCate(false);
                            }}
                            renderLeftIcon={() => (
                                <AntDesign
                                    style={styles.icon}
                                    color={isFocusSubCate ? "blue" : "black"}
                                    name="profile"
                                    size={20}
                                />
                            )}
                        />
                    </View>
                    {subCategoryError && (
                        <Text style={{ marginTop: -10, color: "red" }}>
                            Category required
                        </Text>
                    )}

                    <View style={styles.dropdownContainer}>
                        <MultiSelect
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            search
                            data={allColors}
                            labelField="name"
                            valueField="id"
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
                                    name="tagso"
                                    size={20}
                                />
                            )}
                            selectedStyle={styles.selectedStyle}
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
                            data={allSizes}
                            labelField="name"
                            valueField="id"
                            placeholder="Select sizes"
                            searchPlaceholder="Search..."
                            //   value={selected}
                            value={selectedSizes}
                            onChange={(item) => {
                                // setSelected(item);
                                setSelectedSizes(item);
                            }}
                            renderLeftIcon={() => (
                                <AntDesign
                                    style={styles.icon}
                                    color="black"
                                    name="tagso"
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

                    <View style={{ flexDirection: "row", gap: 10 }}>
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
                            value={discount+''}
                            onChangeText={(text) => {
                                setDiscount(text);
                                validateField("discount", text);
                            }}
                            keyboardType="numeric"
                            // error={discountError}
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

                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: "500",
                                    marginTop: 10,
                                }}
                            >
                                Discount Start
                            </Text>
                            <TouchableOpacity
                                style={styles.inputBtn}
                                onPress={handleOnPressStartDate}
                            >
                                <Text>{discountFromDate}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: "500",
                                    marginTop: 10,
                                }}
                            >
                                Discount End
                            </Text>
                            <TouchableOpacity
                                style={styles.inputBtn}
                                onPress={handleOnPressEndDate}
                            >
                                <Text>{discountToDate}</Text>
                            </TouchableOpacity>
                        </View>
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
                        onPress={addProduct}
                    >
                        <Text style={styles.buttonText}>Add Product</Text>
                    </TouchableOpacity>

                    {/* Create modal for date picker */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={openStartDatePicker}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <DatePicker
                                    mode="calendar"
                                    minimumDate={startDate}
                                    selected={startedDate}
                                    onDateChanged={handleChangeStartDate}
                                    onSelectedChange={(date) => {
                                        setDiscountFromDate(date);
                                    }}
                                    style={{ borderRadius: 15 }}
                                />

                                <TouchableOpacity
                                    onPress={handleOnPressStartDate}
                                >
                                    <Text style={styles.closeModal}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={openEndDatePicker}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <DatePicker
                                    mode="calendar"
                                    minimumDate={startDate}
                                    selected={endDate}
                                    onDateChanged={handleChangeEndDate}
                                    onSelectedChange={(date) => {
                                        setDiscountToDate(date);
                                    }}
                                    style={{ borderRadius: 15 }}
                                />

                                <TouchableOpacity
                                    onPress={handleOnPressEndDate}
                                >
                                    <Text style={styles.closeModal}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
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
        backgroundColor: "lightgray",
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

    inputBtn: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: "lightgray",
        height: 50,
        paddingLeft: 8,
        fontSize: 18,
        justifyContent: "center",
        marginTop: 3,
    },
    centeredView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 35,
        width: "90%",
    },
    closeModal: {
        color: "white",
        padding: 10,
        backgroundColor: colors.accent,
        borderRadius: 10,
    },
});

export default AddProductScreen;
