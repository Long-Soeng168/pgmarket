import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';

const LoadingOverlay = ({ visible }) => (
  <Modal transparent={true} animationType="fade" visible={visible}>
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default LoadingOverlay;
