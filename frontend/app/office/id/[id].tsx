import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OfficeId() {
    const {id} = useLocalSearchParams();

    return (
        <View>
            <SafeAreaView>
                <Text>office id: {id}</Text>
            </SafeAreaView>
        </View>
    )
}