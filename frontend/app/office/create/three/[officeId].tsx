import { employeeToAsstRegionalManager, searchAllEmployee } from "@/utils/addresses";
import { getValue } from "@/utils/auth";
import { customSimpleAlert } from "@/utils/functions";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Keyboard, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Employee = {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    objectUrl: string;
    role: string;
    office: { name: string } | undefined;
};

export default function Three(){
    const { officeId } = useLocalSearchParams()

    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [results, setResults] = useState<Employee[]>([]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 600); 

        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    useEffect(() => {
        if (debouncedQuery) {
            fetchResults(debouncedQuery);
        }
    }, [debouncedQuery]);

    const fetchResults = async (searchTerm: string) => {
        try {
            const response = await axios.get(`${searchAllEmployee}?name=${searchTerm}`);
            setResults(response.data.employees);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    }

    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>()

    const onSubmit = async () => {
        try {
            const result = await axios.post(employeeToAsstRegionalManager, {
                employeeId: selectedEmployeeId,
                officeId: officeId
            }, {
                headers: {
                    "Authorization": await getValue("UserToken")
                }
            })
            if (result.data.success == true){
                router.push(`/office/create/three/${4}`) // TODO
            } else{
                customSimpleAlert("Something went wrong")
            }
        } catch (error) {
            console.error(error)
            customSimpleAlert("Something went wrong")
        }
    }

    return (
        <View className="flex-1">
            <SafeAreaView className="flex-1">
                <View className="mt-2.5 mx-6">
                    <Text className="text-xl font-bold text-gray-900 mb-5 cursor-pointer">Enter Asst Regional Manager</Text>

                    <TextInput
                        className="w-full border border-gray-300 text-gray-500 px-5 py-3 rounded-lg"
                        placeholder="Regional Manager"
                        value={query}
                        placeholderTextColor="#8E8E8E"
                        onChangeText={setQuery}
                        onSubmitEditing={Keyboard.dismiss}
                    />

                    <View className="min-h-96 mt-2">
                        {results.map((element) => (
                            <ResultComponent
                                key={element.id}
                                employeeId={element.id}
                                objectUrl={element.objectUrl}
                                name={element.name}
                                role={element.role}
                                office={element.office?.name}
                                selectedEmployeeId={selectedEmployeeId}
                                onPress={() => setSelectedEmployeeId(element.id)}
                            />
                        ))}
                    </View>

                    <View className="items-center">
                        <CircleButton onPress={onSubmit} />
                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}

const ResultComponent = ({ objectUrl, employeeId, name, role, office, selectedEmployeeId, onPress }: { objectUrl: string, employeeId: number, name: string, role: string | undefined, office: string | undefined, selectedEmployeeId: number|undefined, onPress: () => void }) => {
    const bg = selectedEmployeeId ? (employeeId == selectedEmployeeId ? "bg-gray-300" : "") : ""
    return (
        <TouchableOpacity className={`p-2 flex flex-row items-center mt-2 rounded-md ${bg}`} onPress={onPress}>
            <View>
                <Image source={{ uri: objectUrl }} className="w-14 h-14 rounded-full" />
            </View>
            <View className="ml-3">
                <Text className="text-lg font-bold">{name}</Text>
                <Text className="text-sm text-gray-800">{role || "-"}{office ? ", " + office : ""}</Text>
            </View>
        </TouchableOpacity>
    )
}

const CircleButton = ({ onPress }: { onPress: () => void }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className={`w-16 h-16 bg-black rounded-full flex justify-center items-center shadow-lg active:opacity-80`}>
            <Ionicons name="arrow-forward" size={36} color="white" />
        </TouchableOpacity>
    );
};