import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import HomeHeader from "../components/HomeHeader";
import categories from "../config/allCategory";
import { FullWindowOverlay } from "react-native-screens";

export default function AllCategoryScreen() {
    const [selected, setSelected] = React.useState("Categories");
    const [categorySelected, setCategorySelected] = React.useState(
        categories[0]
    );
    const subCategories = categorySelected.subCategories;

    const handleCategoryIdSelect = (item) => {
        setCategorySelected(item);
    };

    return (
        <View>
            {/* Header */}
            <HomeHeader />
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    borderBottomWidth: 1,
                    borderColor: "lightgrey",
                }}
            >
                <ShopSelection
                    title="Categories"
                    icon="apps"
                    selected={selected}
                    onPress={() => setSelected("Categories")}
                />
                <ShopSelection
                    title="Brands"
                    icon="progress-star"
                    selected={selected}
                    onPress={() => setSelected("Brands")}
                />
            </View>
            {/* End Header */}
            <View
                style={{
                    flexDirection: "row",
                    height: "100%",
                    backgroundColor: colors.white,
                }}
            >
                {/* Left Side */}
                <View
                    style={{
                        width: 140,
                        alignItems: "center",
                        paddingTop: 25,
                        borderRightColor: colors.medium,
                        borderRightWidth: 1,
                    }}
                >
                    <FlatList
                        data={categories}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <CategoryComponent
                                item={item}
                                handleCategoryIdSelect={handleCategoryIdSelect}
                                categorySelected={categorySelected}
                            />
                        )}
                    />
                </View>
                {/* Right Side */}
                <View
                    style={{
                        flex: 1,
                        paddingTop: 25,
                        alignItems: "center",
                    }}
                >
                    <FlatList
                        numColumns={2}
                        data={subCategories}
                        renderItem={({ item }) => (
                            <SubCategoryComponent item={item} />
                        )}
                        columnWrapperStyle={{ gap: 15 }}
                    />
                </View>
            </View>
        </View>
    );
}

// Selection Component
function ShopSelection({ title, icon, selected, onPress }) {
    const isSelected = title === selected;
    return (
        <TouchableOpacity
            opacity={0.8}
            onPress={onPress}
            style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                padding: 10,
                backgroundColor: isSelected ? colors.mdLight : colors.white,
                borderBottomWidth: isSelected ? 2 : 1,
                borderColor: isSelected ? colors.primary : colors.mdLight,
                top: 1,
            }}
        >
            <MaterialCommunityIcons
                name={icon} //appstore-o, bars
                size={19}
                color={isSelected ? colors.dark : colors.medium}
            />
            <Text
                style={{
                    fontSize: 16,
                    color: isSelected ? colors.dark : colors.medium,
                }}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}

// Category Component
function CategoryComponent({ item, categorySelected, handleCategoryIdSelect }) {
    const isSelected = categorySelected.id === item.id;
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleCategoryIdSelect(item)}
        >
            <View
                style={{
                    width: 100,
                    height: 100,
                    alignItems: "center",
                    alignSelf: "flex-start",
                }}
            >
                <Image
                    style={{
                        width: "80%",
                        height: "60%",
                        objectFit: "contain",
                        borderWidth: isSelected ? 1.6 : 1,
                        borderColor: isSelected ? colors.dark : colors.medium,
                        borderRadius: 10,
                    }}
                    source={{
                        uri:
                            item.image ||
                            "https://cdn-icons-png.flaticon.com/512/10701/10701484.png",
                    }}
                />
                <Text
                    numberOfLines={3}
                    style={{
                        textAlign: "center",
                        fontSize: 14,
                        color: isSelected ? colors.dark : colors.medium,
                        fontWeight: isSelected ? "500" : "400",
                    }}
                >
                    {item.category}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

// Sub Category
function SubCategoryComponent({ onPress, item }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View
                style={{
                    width: 100,
                    height: 100,
                    alignItems: "center",
                    alignSelf: "flex-start",
                }}
            >
                <Image
                    style={{
                        width: "80%",
                        height: "60%",
                        objectFit: "contain",
                        // borderWidth: 1,
                        // borderColor: colors.medium,
                        borderRadius: 10,
                    }}
                    source={{
                        uri:
                            item.image ||
                            "https://cdn-icons-png.flaticon.com/512/10701/10701484.png",
                    }}
                />
                <Text
                    numberOfLines={3}
                    style={{
                        textAlign: "center",
                        fontSize: 14,
                        color: colors.medium,
                    }}
                >
                    {item.subCategoryTitle}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
