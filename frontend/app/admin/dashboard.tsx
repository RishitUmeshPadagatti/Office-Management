import { numberOfEmployeesAddress, numberOfOfficesAddress } from "@/utils/addresses";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, SafeAreaView, ScrollView, Text, View } from "react-native";

export default function AdminDashboard() {
	const [officeCount, setOfficeCount] = useState<number>()
	const [numberOfEmployees, setNumberOfEmployees] = useState<number>()
	let avgEnergyConsumption = 1700;
	let avgWaterConsumption = 25000;

	useEffect(() => {
		const fetchNumberOfOffices = async () => {
			try {
				const result = await axios.get(numberOfOfficesAddress);
				setOfficeCount(result.data.length);
			} catch (error) {
				console.error("Error fetching number of offices:", error);
			}
		};
		const fetchNumberOfEmployees = async () => {
			try {
				const result = await axios.get(numberOfEmployeesAddress);
				setNumberOfEmployees(result.data.length);
			} catch (error) {
				console.error("Error fetching number of offices:", error);
			}
		}

		fetchNumberOfOffices();
		fetchNumberOfEmployees();

	}, [])


	return (
		<ScrollView className="">
			<SafeAreaView className=" flex-row flex-wrap justify-evenly">
				<Card title="Number of Offices" value={officeCount?.toString() ?? "Loading..."} />
				<Card title="Number of Employees" value={numberOfEmployees?.toString() ?? "Loading..."} />

				<Card title="Unoccupied Cabins" value="10" />
				<Card title="Unoccupied Desks" value="30" />

				<Card title="Total Energy Consumed" value={`${(officeCount ?? 0) * avgEnergyConsumption}kWh`} />
				<Card title="Average Energy Consumed" value={`${avgEnergyConsumption}kWh`} />

				<Card title="Total Water Consumed" value={`${(officeCount ?? 0) * avgWaterConsumption}L`} />
				<Card title="Average Water Consumed" value={`${avgWaterConsumption}L`} />

				<Card title="Workforce Pay" value="₹5,00,00,000" />
				<Card title="Payroll Expenses" value="₹3,00,00,000" />
			</SafeAreaView>
		</ScrollView>
	);
}

const Card = ({ title, value }: { title: string, value: string }) => {
	return (
		<View className={`bg-black py-7 px-2 rounded-2xl my-4 min-w-48 shadow-md`}>
			<Text className="text-white text-xs uppercase">{title}</Text>
			<Text className="text-white text-2xl font-bold mt-4">{value}</Text>
		</View>
	);
};
