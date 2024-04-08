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

// Language
const storeLanguage = async language => {
    try {
        await SecureStore.setItemAsync("language", language)
    } catch (error) {
        console.log(error);        
    }
}
const getLanguage = async () => {
    try {
        const language = await SecureStore.getItemAsync("language");
        return language;
    } catch (error) {
        console.log(error);
    }
}

export default {
    getToken,
    storeToken,
    removeAuthToken,   
    getLanguage,
    storeLanguage,
}