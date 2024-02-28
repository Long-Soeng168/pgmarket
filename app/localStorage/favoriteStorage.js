import AsyncStorage from '@react-native-async-storage/async-storage';

const storeFavorites = async favorites => {
    try {
        await AsyncStorage.setItem("favorites", favorites);
    } catch (error) {
        console.log(error);        
    }
}

const getFavorites = async () => {
    try {
        const favorites = await AsyncStorage.getItem("favorites");
        return favorites;
    } catch (error) {
        console.log(error);
    }
}

const removeFavorites = async () => {
    try {
        await AsyncStorage.removeItem("favorites");
    } catch (error) {
        console.log(error);        
    }
}

export default {
    getFavorites,
    storeFavorites,
    removeFavorites,   
}
