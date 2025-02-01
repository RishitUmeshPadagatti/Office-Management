import * as SecureStore from "expo-secure-store"
import { Platform } from "react-native";

type keyOptions = "UserToken" | "isAdmin"

export async function saveValue(key: keyOptions, data: string){
    if (Platform.OS ==="web"){
        localStorage.setItem(key, data)
    }
    else{
        SecureStore.setItem(key, data)
    }
}

export async function getValue(key: keyOptions){
    let result;
    if (Platform.OS === "web"){
        result = localStorage.getItem(key)
    }
    else{
        result = await SecureStore.getItem(key)
    }
    return result
}

export async function deleteValue(key: keyOptions){
    if (Platform.OS === "web"){
        localStorage.removeItem(key)
    }
    else{
        await SecureStore.deleteItemAsync(key)
    }
}