import { useState } from "react";
import { Image, Keyboard, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { avatarUploadAddress, createEmployeeAddress } from "@/utils/addresses";
import { customSimpleAlert } from "@/utils/functions";
import { getValue } from "@/utils/auth";
import { Picker } from '@react-native-picker/picker';

export default function Add() {
    const defaultAvatarLink = "https://img.icons8.com/ios-filled/100/CCCCCC/user.png"
    const [image, setImage] = useState<string>(defaultAvatarLink);
    const [isSettingImage, setIsSettingImage] = useState<boolean>(false)

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.3,
        });

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
    const [inputEmail, setInputEmail] = useState("")
    const [inputPhone, setInputPhone] = useState("")
    const [inputPassword, setInputPassword] = useState("")
    const [workModel, setWorkModel] = useState<string>('in_office');

    const handleSubmit = async () => {
        if (isSettingImage == false) {
            try {
                const result = await axios.post(createEmployeeAddress, {
                    name: inputName,
                    email: inputEmail,
                    phoneNumber: inputPhone,
                    password: inputPassword,
                    objectUrl: image,
                    workModel: workModel
                }, {
                    headers: {
                        "Authorization": await getValue("UserToken")
                    }
                })
                if (result.data.success == true) {
                    setInputName(""); setInputEmail(""); setInputPhone(""); setInputPassword(""); setImage(defaultAvatarLink);
                    customSimpleAlert("Employee created successfully")
                } else {
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
            <SafeAreaView className="flex-1">

                <View className="flex items-center justify-center py-5">
                    <TouchableOpacity onPress={pickImage} className="p-0.5 border border-gray-300 rounded-full">
                        <Image
                            source={{ uri: image }}
                            className="w-40 h-40 rounded-full border-2 border-gray-300"
                        />
                    </TouchableOpacity>
                </View>

                <InputComponent name="Name" valueState={inputName} changeState={setInputName} />

                <InputComponent name="Email" valueState={inputEmail} changeState={setInputEmail} />

                <InputComponent name="Phone Number" valueState={inputPhone} changeState={setInputPhone} isNumber={true} />

                <InputComponent name="Set Password" valueState={inputPassword} changeState={setInputPassword} password={true} />

                <View className="my-2.5 mx-6">
                    <Text className="text-lg font-bold text-gray-900 mb-2 cursor-pointer">
                        Select Work Model
                    </Text>
                    <Picker
                        selectedValue={workModel}                    
                        onValueChange={(itemValue) => setWorkModel(itemValue)}
                    >
                        <Picker.Item label="In Office" value="in_office" />
                        <Picker.Item label="Hybrid" value="hybrid" />
                        <Picker.Item label="Remote" value="remote" />

                    </Picker>
                    
                </View>

                <TouchableOpacity className="bg-black py-3 my-5 mx-6 rounded-lg active:opacity-90" onPress={handleSubmit}>
                    <Text className="text-white text-center font-bold text-lg">Submit</Text>
                </TouchableOpacity>

            </SafeAreaView>
        </ScrollView>
    );
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