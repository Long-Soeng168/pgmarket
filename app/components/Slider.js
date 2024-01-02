import React, { useRef, useState, useEffect } from 'react';
import { Animated, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import SlideItem from './SliderItem';
import Pagination from './Pagination';

const Slider = ({ images, endPoint, addStyle }) => {
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

  const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
    setIndex(viewableItems[0].index);
  }).current;

  const autoSlide = () => {
    const newIndex = (index + 1) % images.length;
    setIndex(newIndex);
    flatListRef.current.scrollToIndex({ index: newIndex, animated: true });
  };

  useEffect(() => {
    const intervalId = setInterval(autoSlide, 4000); // Change the interval duration as needed (e.g., 5000 for 5 seconds)
    return () => clearInterval(intervalId);
  }, [index]);

  const flatListRef = useRef(null);

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.8} onPress={() => console.log(item)}>
            <SlideItem addStyle={addStyle} item={item} endPoint={endPoint} />
          </TouchableOpacity>
        )}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
      />
      <Pagination data={images} scrollX={scrollX} index={index} />
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({});





// Old Code for slide images

// import {Animated, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import React, {useRef, useState, useEffect} from 'react';
// import SlideItem from './SliderItem';
// import Pagination from './Pagination';  

// const Slider = ({images, endPoint}) => {

//   const [index, setIndex] = useState(0);
//   const scrollX = useRef(new Animated.Value(0)).current;

//   const handleOnScroll = event => {
//     Animated.event(
//       [
//         {
//           nativeEvent: {
//             contentOffset: {
//               x: scrollX,
//             },
//           },
//         },
//       ],
//       {
//         useNativeDriver: false,
//       },
//     )(event);
//   };

//   const handleOnViewableItemsChanged = useRef(({viewableItems}) => {
//     // console.log('viewableItems', viewableItems);
//     setIndex(viewableItems[0].index);
//   }).current; 

//   return (
//     <View>
//         <FlatList
//             data={images}
//             renderItem={({item}) => (
//                 <TouchableOpacity
//                     activeOpacity={0.8}
//                     onPress={() => console.log(item)}
//                 >
//                     <SlideItem item={item} endPoint = {endPoint} />
//                 </TouchableOpacity>
//             )}
//             horizontal
//             pagingEnabled
//             snapToAlignment="center"
//             showsHorizontalScrollIndicator={false}
//             onScroll={handleOnScroll}
//             onViewableItemsChanged={handleOnViewableItemsChanged}
//             // viewabilityConfig={viewabilityConfig}
//         />
//         <Pagination data={images} scrollX={scrollX} index={index} />

//     </View>
//   );
// };

// export default Slider;

// const styles = StyleSheet.create({});