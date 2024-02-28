import AsyncStorage from '@react-native-async-storage/async-storage';

const storeCartItems = async cartItems => {
    try {
        await AsyncStorage.setItem("cartItems", cartItems);
    } catch (error) {
        console.log(error);        
    }
}

const getCartItems = async () => {
    try {
        const cartItems = await AsyncStorage.getItem("cartItems");
        return cartItems;
    } catch (error) {
        console.log(error);
    }
}

const removeCartItems = async () => {
    try {
        await AsyncStorage.removeItem("cartItems");
    } catch (error) {
        console.log(error);        
    }
}

export default {
    getCartItems,
    storeCartItems,
    removeCartItems,   
}
