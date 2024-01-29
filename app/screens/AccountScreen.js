// screens/HomeScreen.js

import React from 'react';
import { View, Button, StyleSheet } from 'react-native';


const HomeScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Button
        title="Login"
        onPress={() => navigation.navigate('LoginScreen')}
      />
      <Button
        title="Register"
        onPress={() => navigation.navigate('RegisterScreen')}
      />
      <Button
        title="Profile Screen"
        onPress={() => navigation.navigate('ProfileScreen')}
      />  
      {/* <Button
        title="Purchase History Screen"
        onPress={() => navigation.navigate('PurchaseHistoryScreen')}
      />
      <Button
        title="Account Detail Screen"
        onPress={() => navigation.navigate('AccountDetailScreen')}
      />
      <Button
        title="Shop Profile Screen"
        onPress={() => navigation.navigate('ShopProfile')}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

});

export default HomeScreen;
