import { Button, SafeAreaView, ScrollView, Text, View } from "react-native";

export default function AdminDashboard() {
	return (
		<ScrollView className="">
			<SafeAreaView className=" flex-row flex-wrap justify-evenly">
				<Card title="Number of Offices" value="10" />
				<Card title="Number of Employees" value="500" />

				<Card title="Unoccupied Cabins" value="10" />
				<Card title="Unoccupied Desks" value="30" />
				
				<Card title="Total Energy Consumed" value="3000kWh" />
				{/* Average energy consumed */}
				<Card title="Average Energy Consumed" value="3000kWh" />

				<Card title="Total Water Consumed" value="3000kL" />
				{/* Average water consumed */}
				<Card title="Average Water Consumed" value="300kL" />
				
				<Card title="Workforce Pay" value="₹5,00,00,000" />
				<Card title="Payroll Expenses" value="₹3,00,00,000" />
			</SafeAreaView>
		</ScrollView>
	);
}

const Card = ({title, value}: {title: string, value: string}) => {
	return (
		<View className={`bg-black py-7 px-2 rounded-2xl my-4 min-w-48`}>
			<Text className="text-white text-xs uppercase">{title}</Text>
			<Text className="text-white text-2xl font-bold mt-4">{value}</Text>
		</View>
	);
};
