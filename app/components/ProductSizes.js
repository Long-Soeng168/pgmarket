import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const ProductSizes = ({ productSizes, handleSizeSelect, selectedSize }) => {
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.colorOption,
                {
                    backgroundColor: selectedSize === item.size.name ? 'tomato' : 'white',
                    borderColor: selectedSize === item.size.name ? 'tomato' : 'gray',
                },
            ]}
            onPress={() => handleSizeSelect(item.size.name)}>
            <Text
                style={{
                    textDecorationLine: selectedSize === item.size.name ? 'underline' : 'none',
                    fontWeight: selectedSize === item.size.name ? '500' : 'normal',
                    color: selectedSize === item.size.name ? 'white' : 'gray',
                }}>
                {item.size.name}
            </Text>
        </TouchableOpacity>
    );

    return (
        <>
            {productSizes.length > 0 && (
                <View style={styles.container}>
                    <Text style={styles.chooseColorText}>Choose Color</Text>
                    <View style={styles.colorOptionsContainer}>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            data={productSizes}
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
        borderColor: 'gray',
        borderStyle: 'solid',
        borderWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 3,
    },
});

export default ProductSizes;
