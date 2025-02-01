import { Stack, useRouter } from "expo-router";
import "../global.css"
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { deleteValue, getValue, saveValue } from "@/utils/auth";
import { logout } from "@/utils/functions";

export default function RootLayout() {
	const router = useRouter()

	useEffect(() => {
		const checkAuth = async() => {
			const token = await getValue("UserToken")
			if (token){
				const isAdmin = Boolean(await getValue("isAdmin"))
				if (isAdmin){
					router.replace("/admin/dashboard")
				} else{
					console.log("Route to Employee dashboard") // router.replace("")
				}
			} else{
				console.log("Token not present");
			}
		}

		// checkAuth()
		// logout()
		// router.push("/admin/add")
		// router.push("/admin/dashboard")
		// router.push("/")
		// router.push("/admin/manage")
		// router.push("/office/create/one")
		router.push("/office/create/two/5")
	}, [])

	return <Stack screenOptions={{ headerShown: false }} />;
}
