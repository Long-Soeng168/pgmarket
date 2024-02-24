import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

const ShopCardComponent = ({ imageURL, title, contact, description, style }) => {
  return (
    <View style={[styles.row, style]}>
      <View style={styles.leftPart}>
        <Image source={{ uri: imageURL }} style={styles.image} />
      </View>
      <View style={styles.rightPart}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.contact}>{contact}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  leftPart: {
    marginRight: 16,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  rightPart: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contact: {
    fontSize: 14,
    color: '#888',
  },
  description: {
    fontSize: 14,
  },
});

export default ShopCardComponent;
