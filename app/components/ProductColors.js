import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const ProductColors = ({ productColors, handleColorSelect, selectedColor }) => {
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.colorOption}
            onPress={() => handleColorSelect(item.color.name)}>
            <View
                style={[
                    styles.colorCircle,
                    { backgroundColor: item.color.color_code },
                ]}
            />
            <Text
                style={{
                    textDecorationLine:
                        selectedColor === item.color.name
                            ? 'underline'
                            : 'none',
                    fontWeight:
                        selectedColor === item.color.name ? '500' : 'normal',
                    color:
                        selectedColor === item.color.name
                            ? 'black'
                            : 'gray',
                }}>
                {item.color.name}
            </Text>
        </TouchableOpacity>
    );

    return (
        <>
            {productColors.length > 0 && (
                <View style={styles.container}>
                    <Text style={styles.chooseColorText}>Choose Color</Text>
                    <View style={styles.colorOptionsContainer}>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            data={productColors}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id.toString()}
                            horizontal={true}
                        />
                    </View>
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
    },
    chooseColorText: {
        marginBottom: 5,
    },
    colorOptionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    colorOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    colorCircle: {
        width: 25,
        height: 25,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
        marginHorizontal: 2,
    },
});

export default ProductColors;
