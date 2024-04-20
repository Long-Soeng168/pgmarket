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
import { useTranslation } from "react-i18next";

const InputField = ({
    placeholder,
    headTitle,
    value,
    onChangeText,
    keyboardType = "default",
    error,
    style,
}) => {
    const [t, i18n] = useTranslation('global');
    return <View style={[style, { flex: 1 }]}>
        <Text style={{ marginTop: 10, fontWeight: "500", marginBottom: 3 }}>
            {t(headTitle)}
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

const AddProductScreen = ({ navigation }) => {
    const [user, setUser] = React.useContext(userContext);
    const [loading, setLoading] = useState(true);
    const [t, i18n] = useTranslation('global');

    const [mainCategory, setMainCategory] = useState("");
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [productName, setProductName] = useState("");
    const [unitPrice, setUnitPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [discountFromDate, setDiscountFromDate] = useState(null);
    const [discountToDate, setDiscountToDate] = useState(null);
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

    const [mainCate, setMainCate] = useState([]);
    const [cate, setCate] = useState([]);
    const [filterCate, setFilterCate] = useState([]);
    const [subCate, setSubCate] = useState([]);
    const [filterSubCate, setFilterSubCate] = useState([]);
    const [allColors, setAllColors] = useState([]);
    const [allSizes, setAllSizes] = useState([]);
    const [allBrands, setAllBrands] = useState([]);

    // React.useEffect(() => {
    //     if(mainCategory){
    //         let filter = cate.filter(item => item.id === mainCategory.id);
    //         console.log('filter');
    //         setFilterCate(filter);
    //     }
    // });

    React.useEffect(() => {
        fetch("https://pgmarket.online/api/getmaincategories")
            .then((response) => response.json())
            .then((result) => {
                setMainCate(result);
                // console.log(result)
            })
            .catch((error) => console.error(error));

        fetch("https://pgmarket.online/api/getcategories")
            .then((response) => response.json())
            .then((result) => {
                setCate(result);
                // console.log(result)
            })
            .catch((error) => console.error(error));

        fetch("https://pgmarket.online/api/getsubcategories")
            .then((response) => response.json())
            .then((result) => {
                setSubCate(result);
                // console.log(result)
            })
            .catch((error) => console.error(error));

        fetch("https://pgmarket.online/api/getcolors")
            .then((response) => response.json())
            .then((result) => {
                setAllColors(result);
                // console.log(JSON.stringify(result, null, 2));
            })
            .catch((error) => console.error(error));
        fetch("https://pgmarket.online/api/getbrands")
            .then((response) => response.json())
            .then((result) => {
                setAllBrands(result);
                // console.log(JSON.stringify(result, null, 2));
            })
            .catch((error) => console.error(error));

        fetch("https://pgmarket.online/api/getsizes")
            .then((response) => response.json())
            .then((result) => {
                setAllSizes(result);
                // console.log(JSON.stringify(result, null, 2));
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
    const today = new Date();
    const startDate = getFormatedDate(
        today.setDate(today.getDate()),
        "YYYY/MM/DD"
    );
    const [selectedStartDate, setSelectedStartDate] = useState("");
    const [startedDate, setStartedDate] = useState(startDate);
    function handleChangeStartDate(propDate) {
        setStartedDate(propDate);
    }
    const handleOnPressStartDate = () => {
        setOpenStartDatePicker(!openStartDatePicker);
    };

    const [openEndDatePicker, setOpenEndDatePicker] = useState(false);

    const [selectedEndDate, setSelectedEndDate] = useState("");
    const [endDate, setEndDate] = useState(startDate);
    function handleChangeEndDate(propDate) {
        setEndDate(propDate);
    }
    const handleOnPressEndDate = () => {
        setOpenEndDatePicker(!openEndDatePicker);
    };

    const [isFocusMain, setIsFocusMain] = useState(false);
    // const [selectedMain, setSelectedMain] = useState([]);
    const [isFocusCate, setIsFocusCate] = useState(false);
    const [isFocusSubCate, setIsFocusSubCate] = useState(false);
    const [isFocusBrand, setIsFocusBrand] = useState(false);

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

    const renderLabelBrand = () => {
        if (brand || isFocusBrand) {
            return (
                <Text
                    style={[styles.label, isFocusBrand && { color: "blue" }]}
                >
                    Brand
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
            !category ||
            !subCategory ||
            !productName ||
            !unitPrice ||
            !image
        ) {
            return;
        } 

        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "multipart/form-data");
        myHeaders.append("Authorization", "Bearer " + user.token);

        var formdata = new FormData();
        formdata.append("main_cate_id", mainCategory);
        formdata.append("cate_id", category);
        formdata.append("sub_cate_id", subCategory);
        formdata.append("pro_name", productName);
        formdata.append("price", unitPrice);

        if(discountFromDate) {
            formdata.append("start", discountFromDate);
            if(discountToDate) {
                formdata.append("end", discountToDate);
            }else {
                formdata.append("end", discountFromDate);
            }
        }
 
        if(discount !== "") formdata.append("discount", discount);
        if(videoUrl !== "") formdata.append("video_url", videoUrl);
        if(description !== "") formdata.append("description", description);
        if(shipping !== "") formdata.append("shipping", shipping);
        if(brand !== "") formdata.append("brand_id", brand);
        if(selectedColors.length > 0) formdata.append("colors", JSON.stringify(selectedColors));
        if(selectedSizes.length > 0) formdata.append("sizes", JSON.stringify(selectedSizes));
        formdata.append("thumbnail", {
            uri: image.uri,
            name: "image.jpg",
            type: "image/jpeg",
        });

        console.log(JSON.stringify(formdata, null, 2));

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: "follow",
        };
        setLoading(true);
        fetch(
            "https://pgmarket.online/api/storeProduct",
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(JSON.stringify(result, null, 2));
                setLoading(false);
                if (result.createdProductId) {
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
            .catch((error) => {
                setLoading(false);
                Alert.alert(
                    "Add Product",
                    "Product added successfully",
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
                        {!image && (
                            <Text style={{ marginTop: -10, color: "red" }}>
                                Image required
                            </Text>
                        )}
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
                                console.log(item.id);
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
                            {renderLabelBrand()}
                            <Dropdown
                                style={[
                                    styles.dropdown,
                                    isFocusBrand && { borderColor: "blue" },
                                ]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={allBrands}
                                search
                                maxHeight={300}
                                labelField="name"
                                valueField="id"
                                placeholder={
                                    !isFocusBrand ? "Select Brand" : "..."
                                }
                                searchPlaceholder="Search..."
                                value={brand}
                                onFocus={() => setIsFocusBrand(true)}
                                onBlur={() => setIsFocusBrand(false)}
                                onChange={(item) => {
                                    // setValue(item.id);
                                    setBrand(item.id);
                                    console.log(item.id);
                                    setIsFocusBrand(false);
                                }}
                                renderLeftIcon={() => (
                                    <AntDesign
                                        style={styles.icon}
                                        color={isFocusBrand ? "blue" : "black"}
                                        name="star"
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
                        headTitle="name"
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
                            headTitle="price"
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
                            headTitle="discount"
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
                            headTitle="shipping"
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
                                {t('discountStart')}
                            </Text>
                            <TouchableOpacity
                                style={styles.inputBtn}
                                onPress={handleOnPressStartDate}
                            >
                                <Text>{selectedStartDate}</Text>
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
                                {t('discountEnd')}
                            </Text>
                            <TouchableOpacity
                                style={styles.inputBtn}
                                onPress={handleOnPressEndDate}
                            >
                                <Text>{selectedEndDate}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <InputField
                        placeholder="Video URL"
                        headTitle="videoUrl"
                        value={videoUrl}
                        onChangeText={(text) => {
                            setVideoUrl(text);
                            validateField("videoUrl", text);
                        }}
                        error={videoUrlError}
                    />

                    {/* Selected Colors and Sizes - Implement multi-select components as needed */}

                    {/* <InputField
                        placeholder="Description"
                        headTitle="description"
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                    /> */}

                    <Text
                        style={{ fontWeight: "bold", marginBottom: 3, marginTop: 10 }}
                    >
                        {t('description')}
                    </Text>
                    <TextInput
                        multiline
                        numberOfLines={10} 
                        style={[styles.input, {minHeight: 70, textAlignVertical: 'top'}]}
                        placeholder="Description"
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={addProduct}
                    >
                        <Text style={styles.buttonText}>{t("addProduct")}</Text>
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
                                        setSelectedStartDate(date);
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
                                        setSelectedEndDate(date);
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
