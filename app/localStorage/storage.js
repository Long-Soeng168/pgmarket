import * as SecureStore from 'expo-secure-store';

const storeToken = async authToken => {
    try {
        await SecureStore.setItemAsync("authToken", authToken)
    } catch (error) {
        console.log(error);        
    }
}

const getToken = async () => {
    try {
        const authToken = await SecureStore.getItemAsync("authToken");
        return authToken;
    } catch (error) {
        console.log(error);
    }
}

const removeAuthToken = async () => {
    try {
        await SecureStore.deleteItemAsync("authToken");
    } catch (error) {
        console.log(error);        
    }
}

export default {
    getToken,
    storeToken,
    removeAuthToken,   
}