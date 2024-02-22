import React from 'react';
import { View, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const ProductImages = ({ imageUrl, imageData, handleImageUrlSelect }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
        onPress={()=>handleImageUrlSelect(item)}
    >

        <View style={[styles.imageContainer,
            {
                borderWidth: imageUrl == item ? 2 : 1,
                borderColor: imageUrl == item ? "tomato" : "gray",
            }
        ]}>
        <Image source={{ uri: item }} style={[styles.image, 
            {
                width: imageUrl == item ? 110 : 100,
                height: imageUrl == item ? 110 : 100,
            }
        ]} />
        </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={imageData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: 'white'
  },
  imageContainer: {
    margin: 5,
    borderRadius: 5,
    overflow: 'hidden',
    
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default ProductImages;
