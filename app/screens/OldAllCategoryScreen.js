import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "../config/colors";
import categories from "../config/oldAllCategories";

export default function AllCategoryScreen() {
    const [categorySelected, setCategorySelected] = React.useState(0);
    const [subCategorySelected, setSubCategorySelected] = React.useState(0);
    const [subItemSelected, setSubItemSelected] = React.useState(0);

    const handleSelectCategory = (id) => {
        setCategorySelected(id);
        setSubCategorySelected(0);
    };
    const handleSelectSubCategory = (id) => {
        setSubCategorySelected(id);
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <FlatList
                data={categories}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Category
                        item={item}
                        categorySelected={categorySelected}
                        handleSelectCategory={handleSelectCategory}
                        subCategorySelected={subCategorySelected}
                        handleSelectSubCategory={handleSelectSubCategory}
                    />
                )}
                contentContainerStyle={{ gap: 5, margin: 10 }}
            />
        </View>
    );
}

function Category({
    item,
    categorySelected,
    handleSelectCategory,
    subCategorySelected,
    handleSelectSubCategory,
}) {
    const subCategories = item.subCategories;
    return (
        <View>
            <TouchableOpacity onPress={() => handleSelectCategory(item.id)}>
                <View
                    style={{
                        padding: 5,
                        backgroundColor: colors.secondary,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 5,
                        }}
                    >
                        <Image
                            style={{
                                width: 40,
                                height: 40,
                                objectFit: "contain",
                            }}
                            source={{ uri: item.image }}
                        />
                        <Text
                            style={{
                                backgroundColor: colors.secondary,
                                fontSize: 16,
                                fontWeight: "bold",
                            }}
                        >
                            {item.category}
                        </Text>
                    </View>
                    <Feather
                        name={
                            categorySelected === item.id
                                ? "chevron-down"
                                : "chevron-right"
                        }
                        size={30}
                        color="black"
                    />
                </View>
            </TouchableOpacity>
            {categorySelected === item.id && (
                <FlatList
                    data={subCategories}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <SubCategory
                            item={item}
                            subCategorySelected={subCategorySelected}
                            handleSelectSubCategory={handleSelectSubCategory}
                        />
                    )}
                />
            )}
        </View>
    );
}

function SubCategory({ item, subCategorySelected, handleSelectSubCategory }) {
    const subCategoryItem = item.subCategoryItem;
    return (
        <View style={{ margin: 1 }}>
            <TouchableOpacity onPress={() => handleSelectSubCategory(item.id)}>
                <View
                    style={{
                        padding: 10,
                        backgroundColor: colors.light,
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Feather
                        name={
                            subCategorySelected === item.id
                                ? "chevron-down"
                                : "chevron-right"
                        }
                        size={20}
                        color="black"
                    />
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: "500",
                        }}
                    >
                        {item.subCategoryTitle}
                    </Text>
                </View>
            </TouchableOpacity>
            {subCategorySelected === item.id && (
                <FlatList
                    data={subCategoryItem}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => <SubCategoryItem item={item} />}
                />
            )}
        </View>
    );
}

function SubCategoryItem({ item }) {
    return (
        <TouchableOpacity
            onPress={() => console.warn(item)}
            style={{
                padding: 10,
                paddingLeft: 30,
                backgroundColor: colors.white,
            }}
        >
            <Text
                style={{
                    fontSize: 16,
                }}
            >
                {item}
            </Text>
        </TouchableOpacity>
    );
}
