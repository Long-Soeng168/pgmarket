import React from 'react';
import { View, StyleSheet } from 'react-native';

const LineSeparator = () => {
    return (
        <View style={styles.separator} />
    );
};

const styles = StyleSheet.create({
    separator: {
        height: 1,
        width: "70%",
        alignSelf: "center",
        marginVertical: 25,
        backgroundColor: "gray",
    },
});

export default LineSeparator;
