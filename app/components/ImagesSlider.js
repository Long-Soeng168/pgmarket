import React from "react";
import { SliderBox } from "react-native-image-slider-box";

export default function ImagesSlider({ images }) {
    return (
        <SliderBox
            images={images}
            sliderBoxHeight={200}
            ImageComponentStyle={{
                width: "95%",
                borderRadius: 20,
            }}
            dotColor="#FFEE58"
            inactiveDotColor="#90A4AE"
            // onCurrentImagePressed={(index) =>
            //     console.warn(`image ${index} pressed`)
            // }
            paginationBoxVerticalPadding={20}
            autoplay
            // circleLoop
        />
    );
}
