import React from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Linking
} from 'react-native';
  
const {width, height} = Dimensions.get('screen');
  
const SlideItem = ({item, endPoint, addStyle}) => {
    // console.warn(item);
    const imageUrl = item.image;
    return (
      <TouchableOpacity 
        onPress={() => {
          //  console.log(item.url);
          item.url && Linking.openURL(item.url);
          item.link && Linking.openURL(item.link);
        }}
        style={[styles.container]}>
        <Animated.Image
          source={{ uri:endPoint + imageUrl }}
          resizeMode="contain"
          style={[
            styles.image,
            addStyle
          ]}
        />
      </TouchableOpacity>
    );
  };
  
  export default SlideItem;
  
  const styles = StyleSheet.create({
    container: {
      width,
      alignItems: 'center',
      // backgroundColor: 'grey'
    },
    image: {
      width: '100%',
      // height: '100%',
      objectFit: 'cover',
    },
    content: {
      flex: 0.4,
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
    },
    description: {
      fontSize: 18,
      marginVertical: 12,
      color: '#333',
    },
    price: {
      fontSize: 32,
      fontWeight: 'bold',
    },
  });