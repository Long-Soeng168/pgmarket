import React from "react";
import { Modal } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

export default function ImageViewer({ visible, images }) {
    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <ImageViewer
                enableSwipeDown={true}
                onSwipeDown={() => setModalVisible(false)}
                imageUrls={images}
            />
        </Modal>
    );
}
