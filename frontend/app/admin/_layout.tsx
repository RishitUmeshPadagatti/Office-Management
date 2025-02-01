import { Tabs } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
// import { logout } from "../../utils/auth";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { primaryColor } from "@/utils/values";

export default function AdminLayout() {
    const router = useRouter();
    const logoSize = 25;

    return (
        <Tabs
            screenOptions={{ 
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: primaryColor, 
                tabBarInactiveTintColor: "gray",
            }}>

            <Tabs.Screen 
                name="dashboard" 
                options={{ 
                    title: "Dashboard",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home" size={logoSize} color={color} />
                    )
                }} 
            />

            <Tabs.Screen 
                name="manage" 
                options={{ 
                    title: "Manage",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="grid" size={logoSize} color={color} />
                    )
                }} 
            />

            <Tabs.Screen 
                name="checkIn" 
                options={{ 
                    title: "Check In",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="qr-code" size={logoSize} color={color} />
                    )
                }} 
            />

            <Tabs.Screen 
                name="add" 
                options={{ 
                    title: "Add",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="person-add" size={logoSize} color={color} />
                    )
                }} 
            />
        </Tabs>
    );
}
