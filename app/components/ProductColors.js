import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const ProductColors = ({ productColors, handleColorSelect, selectedColor }) => {

    const [t, i18n] = useTranslation('global');
    
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.colorOption,
                {
                    borderWidth: 1,
                    borderColor: 
                        selectedColor === item.color.name ? 'tomato' : 'gray',
                    backgroundColor: 
                        selectedColor === item.color.name ? 'tomato' : 'white',
                    borderStyle: 'solid'
                }
            ]}
            onPress={() => handleColorSelect(item.color.name)}>
            <View
                style={[
                    styles.colorCircle,
                    { backgroundColor: item.color.color_code,
                        borderColor: 
                        selectedColor === item.color.name ? 'white' : 'gray',
                    },
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
                            ? 'white'
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
                    <Text style={styles.chooseColorText}>{ t('chooseColor') }</Text>
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
        padding: 5,
    },
    colorCircle: {
        width: 20,
        height: 20,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'gray',
        marginHorizontal: 2,
    },
});

export default ProductColors;
