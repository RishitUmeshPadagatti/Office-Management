import { getAllOfficesAddress } from "@/utils/addresses";
import { getValue } from "@/utils/auth";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AdminManage() {
	const [office, setOffice] = useState<{ id: number, name: string, objectUrl: string }[]>([])

	const blackImage = "https://img.freepik.com/free-photo/photo-wall-texture-pattern_58702-14875.jpg?semt=ais_hybrid"

	useEffect(() => {
		const hitServer = async () => {
			const result = await axios.post(getAllOfficesAddress, {}, {
				headers: {
					"Authorization": await getValue("UserToken")
				}
			})
			setOffice(result.data.offices)
		}
		hitServer()
	}, [])

	return (<ScrollView>
		<SafeAreaView>
			<View className="p-5">
				{office.map((item) => (
					<Box
						key={item.id}
						officeName={item.name}
						imageLink={item.objectUrl || blackImage}
						functionToExecute={() => router.push(`/office/id/${item.id}`)}
					/>
				))}

				<View className="flex items-center my-10">
				<CircleButton onPress={() => router.push(`/office/create/one`)}/>
				</View>

			</View>
		</SafeAreaView>
	</ScrollView>)
}

const Box = ({ officeName, imageLink, functionToExecute }: { officeName: string, imageLink: string, functionToExecute: () => void }) => {
	return (<ImageBackground
		source={{ uri: imageLink }}
		resizeMode="cover"
		className="w-full h-52 rounded-2xl overflow-hidden my-3">
		<TouchableOpacity onPress={functionToExecute}>
			<View className="w-full h-full p-3 flex justify-end items-end bg-black/30">
				<Text className="text-white font-bold text-3xl">{officeName} {">>"}</Text>
			</View>
		</TouchableOpacity>
	</ImageBackground>)
}

const CircleButton = ({ onPress}: { onPress: () => void}) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			className={`w-16 h-16 bg-black rounded-full flex justify-center items-center shadow-lg active:opacity-80`}>
			<Ionicons name="add" size={36} color="white" />
		</TouchableOpacity>
	);
};