import { adminLoginAddress, employeeLoginAddress } from "@/utils/addresses";
import { useState } from "react";
import { Keyboard, Text, TextInput, TouchableOpacity, View } from "react-native";
import axios from "axios"
import {customSimpleAlert} from "../utils/functions"
import { getValue, saveValue } from "@/utils/auth";
import { router } from "expo-router";

export default function Index() {
	const [inputEmail, setInputEmail] = useState("")
	const [inputPassword, setInputPassword] = useState("")

	const handleSubmit = async () => {
		if (inputEmail === "admin"){
			try {
				const result = await axios.post(adminLoginAddress, {
					username: inputEmail,
					password: inputPassword
				})	
				// console.log("Token:", result.data.token)
				saveValue("UserToken", result.data.token)
				saveValue("isAdmin", String(true))
				router.replace("/admin/dashboard")
			} catch (error) {
				customSimpleAlert("Incorrect Email or Password")
			}
		} else{
			try {
				const result = await axios.post(employeeLoginAddress, {
					email: inputEmail,
					password: inputPassword
				})
				// console.log("Token:", result.data.token)
				saveValue("UserToken", result.data.token)
				saveValue("isAdmin", String(false))
				console.log("Replace to Employee pages") // router.replace("")
			} catch (error) {
				customSimpleAlert("Incorrect Email or Password")
			}
		}
	};

	return (
		<View className="flex-1 justify-center items-center bg-white px-6">
			<View className="w-full max-w-sm flex gap-4">
				<View className="pb-6">
					<Text className="text-4xl font-bold text-center">Login</Text>
				</View>

				<View>
					<Text className="text-lg font-bold text-gray-900 mb-2 cursor-pointer">Email</Text>
					<TextInput
						className="w-full border border-gray-300 text-gray-500 px-5 py-3 rounded-lg mb-4"
						placeholder="Email"
						placeholderTextColor="#8E8E8E"
						onChangeText={setInputEmail}
						autoCapitalize="none"
						onSubmitEditing={Keyboard.dismiss}
					/>
				</View>

				<View>
					<Text className="text-lg font-bold text-gray-900 mb-2 cursor-pointer">Password</Text>
					<TextInput
						className="w-full border border-gray-300 text-gray-500 px-5 py-3 rounded-lg mb-6"
						placeholder="Password"
						placeholderTextColor="#8E8E8E"
						onChangeText={setInputPassword}
						secureTextEntry
						autoCapitalize="none"
						onSubmitEditing={Keyboard.dismiss}
					/>
				</View>

				<TouchableOpacity className="bg-black py-3 rounded-lg active:opacity-90" onPress={handleSubmit}>
					<Text className="text-white text-center font-bold text-lg">Submit</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
