import { router } from "expo-router";
import { Alert, Platform } from "react-native";
import { deleteValue } from "./auth";

export function customSimpleAlert(sentence: string){
    if (Platform.OS === "web"){
        alert(sentence)
    }
    else{
        Alert.alert(sentence)
    }
} 

export function logout(){
    deleteValue("UserToken")
    deleteValue("isAdmin")
    router.replace("/")
}