import { useState } from "react";
import { Image, Keyboard, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { avatarUploadAddress, createNewOfficeAddress } from "@/utils/addresses";
import { Ionicons } from "@expo/vector-icons";
import { customSimpleAlert } from "@/utils/functions";
import { getValue } from "@/utils/auth";
import { router } from "expo-router";

export default function One() {
    const blackImage = "https://img.freepik.com/free-photo/photo-wall-texture-pattern_58702-14875.jpg?semt=ais_hybrid"
    const [image, setImage] = useState<string>(blackImage)
    const [isSettingImage, setIsSettingImage] = useState<boolean>(false)

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.5,
        })

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setIsSettingImage(true)
            uploadImage(result.assets[0].uri);
        }
    };

    const uploadImage = async (uri: string) => {
        let formData = new FormData();
        formData.append("file", {
            uri,
            name: "profile.jpg",
            type: "image/jpeg",
        } as any);

        try {
            const response = await axios.post(avatarUploadAddress, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setImage(response.data.imageUrl)
            setIsSettingImage(false)
            console.log("Uploaded Image URL:", response.data.imageUrl);
        } catch (error) {
            console.error("Upload failed", error)
        }
    };

    const [inputName, setInputName] = useState("")

    const handleSubmit = async () => {
        if (isSettingImage == false){
            try {
                const result = await axios.post(createNewOfficeAddress, {
                    name: inputName,
                    objectUrl: image
                }, {
                    headers: {
                        "Authorization": await getValue("UserToken")
                    }
                })
                if (result.data.success == true){
                    router.push(`/office/create/two/${result.data.office.id}`)
                } else{
                    customSimpleAlert("Something went wrong")
                }
            } catch (error) {
                console.error(error)
                customSimpleAlert("Something went wrong")
            }
        }
    }
    return (
        <ScrollView className="flex-1">
            <View className="flex-1">
                <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
                    <View className="w-full h-52 mb-6">
                        <Image source={{ uri: image }} className="w-full h-full" />
                    </View>
                </TouchableOpacity>

                <InputComponent name="Office Name" valueState={inputName} changeState={setInputName} />

                <View className="items-center mt-10">
                    <CircleButton onPress={handleSubmit} />
                </View>


            </View>
        </ScrollView>
    )
}

const InputComponent = ({ name, valueState, changeState, password = false, isNumber = false }: { name: string, valueState: string, changeState: (text: string) => void, password?: boolean, isNumber?: boolean }) => {
    return (
        <View className="my-2.5 mx-6">
            <Text className="text-lg font-bold text-gray-900 mb-2 cursor-pointer">{name}</Text>
            <TextInput
                className="w-full border border-gray-300 text-gray-500 px-5 py-3 rounded-lg mb-4"
                placeholder={name}
                value={valueState}
                placeholderTextColor="#8E8E8E"
                onChangeText={changeState}
                autoCapitalize="none"
                secureTextEntry={password}
                onSubmitEditing={Keyboard.dismiss}
                keyboardType={isNumber ? 'numeric' : 'default'}
                inputMode={isNumber ? 'numeric' : 'text'}
            />
        </View>
    )
}

const CircleButton = ({ onPress}: { onPress: () => void}) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			className={`w-16 h-16 bg-black rounded-full flex justify-center items-center shadow-lg active:opacity-80`}>
			<Ionicons name="arrow-forward" size={36} color="white" />
		</TouchableOpacity>
	);
};