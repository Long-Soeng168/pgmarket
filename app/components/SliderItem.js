import {
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Animated,
    Easing,
  } from 'react-native';
  import React from 'react';
  
  const {width, height} = Dimensions.get('screen');
  
  const SlideItem = ({item, height= 200}) => {
    // console.warn(item);
    return (
      <View style={[styles.container, {height: height}]}>
        <Animated.Image
          source={{ uri:item }}
          resizeMode="contain"
          style={[
            styles.image,
          ]}
        />
      </View>
    );
  };
  
  export default SlideItem;
  
  const styles = StyleSheet.create({
    container: {
      width,
      alignItems: 'center',
      backgroundColor: 'grey'
    },
    image: {
      width: '100%',
      height: '100%',
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