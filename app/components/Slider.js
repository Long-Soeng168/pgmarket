import {Animated, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import SlideItem from './SliderItem';
import Pagination from './Pagination';
import ImageViewer from 'react-native-image-zoom-viewer';

const images = [
    "https://source.unsplash.com/1024x768/?nature",
    "https://source.unsplash.com/1024x768/?mountain",
    "https://source.unsplash.com/1024x768/?tree",
    "https://source.unsplash.com/1024x768/?market",
  ];

const imgs = [
  {
    url: "https://source.unsplash.com/1024x768/?nature",
  },
  // {
  //   url: images[1],
  // },
  // {
  //   url: images[2],
  // }
];

const Slider = ({images}) => {

    const [modalVisible, setModalVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleOnScroll = event => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(({viewableItems}) => {
    // console.log('viewableItems', viewableItems);
    setIndex(viewableItems[0].index);
  }).current;

//   const viewabilityConfig = useRef({
//     itemVisiblePercentThreshold: 50,
//   }).current;

  return (
    <View>
        <FlatList
            data={images}
            renderItem={({item}) => (
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setModalVisible(true)}
                >
                    <SlideItem item={item} />
                </TouchableOpacity>
            )}
            horizontal
            pagingEnabled
            snapToAlignment="center"
            showsHorizontalScrollIndicator={false}
            onScroll={handleOnScroll}
            onViewableItemsChanged={handleOnViewableItemsChanged}
            // viewabilityConfig={viewabilityConfig}
        />
        <Pagination data={images} scrollX={scrollX} index={index} />

    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({});