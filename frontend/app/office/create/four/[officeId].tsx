// import { useLocalSearchParams } from "expo-router"
// import { Text, View } from "react-native"

import { StyleSheet } from "react-native";

// export default function Four(){
//     const { officeId } = useLocalSearchParams()

//     return (
//         <View>
//             <Text>Hello</Text>
//         </View>
//     )
// }


// SECOND
// import { getValue } from '@/utils/auth';
// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, ActivityIndicator } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// type Floor = {
//     id: number;
//     name: string;
//     desks: Desk[];
//     cabins: Cabin[];
// };

// type Desk = {
//     id: number;
//     name: string;
//     occupiedBy?: string;
// };

// type Cabin = {
//     id: number;
//     name: string;
//     occupiedBy?: string;
// };

// const CreateFloorAndAssignEmployeesScreen = () => {
//     const [floorName, setFloorName] = useState<string>('');
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [floors, setFloors] = useState<Floor[]>([]);

//     const createFloor = async () => {
//         if (!floorName) {
//             Alert.alert('Error', 'Please provide a floor name.');
//             return;
//         }

//         setIsLoading(true);

//         try {
//             // Hit the API to create a new floor in the backend
//             const response = await fetch('http://localhost:3000/admin/floors', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': (await getValue("UserToken")) || ''
//                 },
//                 body: JSON.stringify({
//                     name: floorName,
//                     officeId: 1, // Replace with actual office ID
//                 }),
//             });

//             const floorData = await response.json();

//             if (response.ok) {
//                 // Create desks and cabins for the new floor (for simplicity, we'll create them here)
//                 const newFloor: Floor = {
//                     id: floorData.id,
//                     name: floorData.name,
//                     desks: [],
//                     cabins: [],
//                 };
//                 setFloors((prev) => [...prev, newFloor]);
//                 setFloorName('');
//             } else {
//                 Alert.alert('Error', 'Failed to create floor');
//             }
//         } catch (error) {
//             Alert.alert('Error', 'Something went wrong');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const assignEmployees = async (floorId: number) => {
//         setIsLoading(true);

//         try {
//             // Fetch employees (this could be done with a different API)
//             const employeeResponse = await fetch('http://localhost:3000/general/employees');
//             const data = await employeeResponse.json(); // Parsing the response

//             if (employeeResponse.ok) {
//                 // Check if success is true and handle employees data
//                 if (data.success) {
//                     const employees = data.employees;

//                     // Iterate through employees and assign desks or cabins
//                     for (const employee of employees) {
//                         // For simplicity, let's assume desks are being assigned here
//                         const assignResponse = await fetch('http://localhost:3000/admin/assign', {
//                             method: 'POST',
//                             headers: {
//                                 'Content-Type': 'application/json',
//                             },
//                             body: JSON.stringify({
//                                 floorId,
//                                 employeeId: employee.id,
//                             }),
//                         });

//                         const assignData = await assignResponse.json();

//                         if (assignResponse.ok) {
//                             // Add the employee to desks/cabins here if needed
//                             setFloors((prev) =>
//                                 prev.map((floor) =>
//                                     floor.id === floorId
//                                         ? {
//                                             ...floor,
//                                             desks: [
//                                                 ...floor.desks,
//                                                 {
//                                                     id: assignData.deskId,
//                                                     name: `Desk ${assignData.deskId}`,
//                                                     occupiedBy: employee.name,
//                                                 },
//                                             ],
//                                             cabins: [
//                                                 ...floor.cabins,
//                                                 {
//                                                     id: assignData.cabinId,
//                                                     name: `Cabin ${assignData.cabinId}`,
//                                                     occupiedBy: employee.name,
//                                                 },
//                                             ],
//                                         }
//                                         : floor
//                                 )
//                             );
//                         } else {
//                             Alert.alert('Error', 'Failed to assign employee to desk/cabin');
//                         }
//                     }
//                 } else {
//                     Alert.alert('Error', data.msg || 'Failed to fetch employees');
//                 }
//             } else {
//                 Alert.alert('Error', 'Failed to fetch employees');
//             }
//         } catch (error) {
//             Alert.alert('Error', 'Something went wrong');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <SafeAreaView style={{ flex: 1, padding: 16 }}>
//             <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Create Floor and Assign Employees</Text>

//             <TextInput
//                 style={{
//                     borderWidth: 1,
//                     borderColor: '#ccc',
//                     padding: 8,
//                     marginVertical: 10,
//                     fontSize: 16,
//                 }}
//                 placeholder="Enter Floor Name"
//                 value={floorName}
//                 onChangeText={setFloorName}
//             />
//             <TouchableOpacity
//                 onPress={createFloor}
//                 style={{
//                     backgroundColor: '#4CAF50',
//                     padding: 12,
//                     borderRadius: 5,
//                     marginVertical: 10,
//                 }}>
//                 {isLoading ? (
//                     <ActivityIndicator color="#fff" />
//                 ) : (
//                     <Text style={{ color: '#fff', textAlign: 'center', fontSize: 16 }}>
//                         Create Floor
//                     </Text>
//                 )}
//             </TouchableOpacity>

//             <FlatList
//                 data={floors}
//                 renderItem={({ item }) => (
//                     <View
//                         style={{
//                             borderWidth: 1,
//                             borderColor: '#ddd',
//                             borderRadius: 5,
//                             marginVertical: 10,
//                             padding: 10,
//                         }}>
//                         <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
//                         <TouchableOpacity
//                             onPress={() => assignEmployees(item.id)}
//                             style={{
//                                 backgroundColor: '#2196F3',
//                                 padding: 10,
//                                 borderRadius: 5,
//                                 marginVertical: 5,
//                             }}>
//                             <Text style={{ color: '#fff', textAlign: 'center' }}>
//                                 Assign Employees
//                             </Text>
//                         </TouchableOpacity>

//                         <Text style={{ fontSize: 16, marginTop: 10 }}>Desks:</Text>
//                         {item.desks.map((desk) => (
//                             <Text key={desk.id}>
//                                 {desk.name} {desk.occupiedBy && `- Occupied by ${desk.occupiedBy}`}
//                             </Text>
//                         ))}
//                         <Text style={{ fontSize: 16, marginTop: 10 }}>Cabins:</Text>
//                         {item.cabins.map((cabin) => (
//                             <Text key={cabin.id}>
//                                 {cabin.name} {cabin.occupiedBy && `- Occupied by ${cabin.occupiedBy}`}
//                             </Text>
//                         ))}
//                     </View>
//                 )}
//                 keyExtractor={(item) => item.id.toString()}
//             />
//         </SafeAreaView>
//     );
// };

// export default CreateFloorAndAssignEmployeesScreen;





// import { getValue } from '@/utils/auth';
// import axios from 'axios';
// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, ActivityIndicator } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// type Floor = {
//     id: number;
//     name: string;
//     desks: Desk[];
//     cabins: Cabin[];
// };

// type Desk = {
//     id: number;
//     name: string;
//     occupiedBy?: string;
// };

// type Cabin = {
//     id: number;
//     name: string;
//     occupiedBy?: string;
// };

// const CreateFloorAndAssignEmployeesScreen = () => {
//     const [floorName, setFloorName] = useState<string>('');
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [floors, setFloors] = useState<Floor[]>([]);

//     const createFloor = async () => {
//         if (!floorName) {
//             Alert.alert('Error', 'Please provide a floor name.');
//             return;
//         }

//         setIsLoading(true);

//         try {
//             // Hit the API to create a new floor in the backend
//             const response = await fetch('http://localhost:3000/admin/floors', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': (await getValue("UserToken")) || ''
//                 },
//                 body: JSON.stringify({
//                     name: floorName,
//                     officeId: 1, // Replace with actual office ID
//                 }),
//             });

//             const floorData = await response.json();

//             if (response.ok) {
//                 // Create desks and cabins for the new floor (for simplicity, we'll create them here)
//                 const newFloor: Floor = {
//                     id: floorData.id,
//                     name: floorData.name,
//                     desks: [],
//                     cabins: [],
//                 };
//                 setFloors((prev) => [...prev, newFloor]);
//                 setFloorName('');
//             } else {
//                 Alert.alert('Error', 'Failed to create floor');
//             }
//         } catch (error) {
//             Alert.alert('Error', 'Something went wrong');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const assignEmployees = async (floorId: number) => {
//         setIsLoading(true);
    
//         try {
//             // Fetch employees using Axios
//             const employeeResponse = await axios.get('http://localhost:3000/general/employees', {
//                 headers: {
//                     'Authorization': (await getValue("UserToken")) || '', // Add the token if needed
//                 },
//             });
//             console.log("Employee Response: ", employeeResponse.status);
//             console.log("Data: ", employeeResponse.data);
    
//             if (employeeResponse.status === 200) {
//                 // Check if success is true and handle employees data
//                 const data = employeeResponse.data;
//                 if (data.success) {
//                     const employees = data.employees;
    
//                     // Iterate through employees and assign desks or cabins
//                     for (const employee of employees) {
//                         const assignResponse = await axios.post(
//                             'http://localhost:3000/admin/assign',
//                             {
//                                 floorId,
//                                 employeeId: employee.id,
//                             },
//                             {
//                                 headers: {
//                                     'Content-Type': 'application/json',
//                                 },
//                             }
//                         );
    
//                         if (assignResponse.status === 200) {
//                             const assignData = assignResponse.data;
    
//                             // Update the floor state with the assigned desk or cabin
//                             setFloors((prev) =>
//                                 prev.map((floor) =>
//                                     floor.id === floorId
//                                         ? {
//                                               ...floor,
//                                               desks: floor.desks.map((desk) =>
//                                                   desk.id === assignData.deskId
//                                                       ? { ...desk, occupiedBy: employee.name }
//                                                       : desk
//                                               ),
//                                               cabins: floor.cabins.map((cabin) =>
//                                                   cabin.id === assignData.cabinId
//                                                       ? { ...cabin, occupiedBy: employee.name }
//                                                       : cabin
//                                               ),
//                                           }
//                                         : floor
//                                 )
//                             );
//                         } else {
//                             Alert.alert('Error', 'Failed to assign employee to desk/cabin');
//                         }
//                     }
//                 } else {
//                     Alert.alert('Error', data.msg || 'Failed to fetch employees');
//                 }
//             } else {
//                 Alert.alert('Error', 'Failed to fetch employees');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             Alert.alert('Error', 'Something went wrong');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <SafeAreaView style={{ flex: 1, padding: 16 }}>
//             <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Create Floor and Assign Employees</Text>

//             <TextInput
//                 style={{
//                     borderWidth: 1,
//                     borderColor: '#ccc',
//                     padding: 8,
//                     marginVertical: 10,
//                     fontSize: 16,
//                 }}
//                 placeholder="Enter Floor Name"
//                 value={floorName}
//                 onChangeText={setFloorName}
//             />
//             <TouchableOpacity
//                 onPress={createFloor}
//                 style={{
//                     backgroundColor: '#4CAF50',
//                     padding: 12,
//                     borderRadius: 5,
//                     marginVertical: 10,
//                 }}>
//                 {isLoading ? (
//                     <ActivityIndicator color="#fff" />
//                 ) : (
//                     <Text style={{ color: '#fff', textAlign: 'center', fontSize: 16 }}>
//                         Create Floor
//                     </Text>
//                 )}
//             </TouchableOpacity>

//             <FlatList
//                 data={floors}
//                 renderItem={({ item }) => (
//                     <View
//                         style={{
//                             borderWidth: 1,
//                             borderColor: '#ddd',
//                             borderRadius: 5,
//                             marginVertical: 10,
//                             padding: 10,
//                         }}>
//                         <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
//                         <TouchableOpacity
//                             onPress={() => assignEmployees(item.id)}
//                             style={{
//                                 backgroundColor: '#2196F3',
//                                 padding: 10,
//                                 borderRadius: 5,
//                                 marginVertical: 5,
//                             }}>
//                             <Text style={{ color: '#fff', textAlign: 'center' }}>
//                                 Assign Employees
//                             </Text>
//                         </TouchableOpacity>

//                         <Text style={{ fontSize: 16, marginTop: 10 }}>Desks:</Text>
//                         {item.desks.map((desk) => (
//                             <Text key={desk.id}>
//                                 {desk.name} {desk.occupiedBy && `- Occupied by ${desk.occupiedBy}`}
//                             </Text>
//                         ))}
//                         <Text style={{ fontSize: 16, marginTop: 10 }}>Cabins:</Text>
//                         {item.cabins.map((cabin) => (
//                             <Text key={cabin.id}>
//                                 {cabin.name} {cabin.occupiedBy && `- Occupied by ${cabin.occupiedBy}`}
//                             </Text>
//                         ))}
//                     </View>
//                 )}
//                 keyExtractor={(item) => item.id.toString()}
//             />
//         </SafeAreaView>
//     );
// };

// export default CreateFloorAndAssignEmployeesScreen;


import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Alert,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useLocalSearchParams } from "expo-router";
// import { RootStackParamList } from '../navigation/AppNavigator';

type Floor = {
  id: number;
  name: string;
  desks: Desk[];
  cabins: Cabin[];
};

type Desk = {
  id: number;
  occupiedById: number | null;
};

type Cabin = {
  id: number;
  occupiedById: number | null;
};

type Employee = {
  id: number;
  name: string;
};
const serverLocation = "http://localhost:3000"
const OfficeScreen: React.FC = () => {
  const { officeId } = useLocalSearchParams()

  const [floors, setFloors] = useState<Floor[]>([]);
  const [floorName, setFloorName] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedDeskId, setSelectedDeskId] = useState<number | null>(null);
  const [selectedCabinId, setSelectedCabinId] = useState<number | null>(null);
  const [allocationType, setAllocationType] = useState<'desk' | 'cabin' | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);

  useEffect(() => {
    fetchFloors();
    fetchEmployees();
  }, []);

  const fetchFloors = async () => {
    try {
      setLoading(true);
      console.log(`${serverLocation}/offices/${officeId}/floors`)
      const response = await axios.get<Floor[]>(
        `${serverLocation}/offices/${officeId}/floors`
      );
      setFloors(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch floors.');
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get<Employee[]>(`http://localhost:3000/general/employees`);
      setEmployees(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch employees.');
    }
  };

  const handleCreateFloor = async () => {
    if (!floorName.trim()) {
      Alert.alert('Validation', 'Floor name cannot be empty.');
      return;
    }

    try {
      await axios.post(`${serverLocation}/offices/${officeId}/floors`, { name: floorName });
      setFloorName('');
      fetchFloors();
    } catch (error) {
      Alert.alert('Error', 'Failed to create floor.');
    }
  };

  const openAllocationModal = (deskId: number | null = null, cabinId: number | null = null) => {
    if (deskId) {
      setSelectedDeskId(deskId);
      setAllocationType('desk');
    }
    if (cabinId) {
      setSelectedCabinId(cabinId);
      setAllocationType('cabin');
    }
    setModalVisible(true);
  };

  const handleAllocateEmployee = async () => {
    if (selectedEmployeeId === null) {
      Alert.alert('Validation', 'Please select an employee.');
      return;
    }

    try {
      if (allocationType === 'desk' && selectedDeskId !== null) {
        await axios.put(`${serverLocation}/desks/${selectedDeskId}/occupy`, {
          employeeId: selectedEmployeeId,
        });
      } else if (allocationType === 'cabin' && selectedCabinId !== null) {
        await axios.put(`${serverLocation}/cabins/${selectedCabinId}/occupy`, {
          employeeId: selectedEmployeeId,
        });
      }
      setModalVisible(false);
      setSelectedEmployeeId(null);
      setSelectedDeskId(null);
      setSelectedCabinId(null);
      setAllocationType(null);
      fetchFloors();
    } catch (error) {
      Alert.alert('Error', 'Failed to allocate employee.');
    }
  };

  const renderFloor = ({ item }: { item: Floor }) => (
    <View style={styles.floorContainer}>
      <Text style={styles.floorName}>{item.name}</Text>

      {/* Desks */}
      <Text style={styles.sectionTitle}>Desks:</Text>
      <FlatList
        data={item.desks}
        keyExtractor={(desk) => desk.id.toString()}
        horizontal
        renderItem={({ item: desk }) => (
          <TouchableOpacity
            style={styles.desk}
            onPress={() => openAllocationModal(desk.id, null)}
          >
            <Text>Desk {desk.id}</Text>
            <Text>{desk.occupiedById ? `Occupied by ID: ${desk.occupiedById}` : 'Available'}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>No Desks Available</Text>}
      />

      {/* Cabins */}
      <Text style={styles.sectionTitle}>Cabins:</Text>
      <FlatList
        data={item.cabins}
        keyExtractor={(cabin) => cabin.id.toString()}
        horizontal
        renderItem={({ item: cabin }) => (
          <TouchableOpacity
            style={styles.cabin}
            onPress={() => openAllocationModal(null, cabin.id)}
          >
            <Text>Cabin {cabin.id}</Text>
            <Text>{cabin.occupiedById ? `Occupied by ID: ${cabin.occupiedById}` : 'Available'}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>No Cabins Available</Text>}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Create Floor Section */}
      <View style={styles.createFloorSection}>
        <Text style={styles.sectionHeader}>Create New Floor</Text>
        <TextInput
          style={styles.input}
          placeholder="Floor Name"
          value={floorName}
          onChangeText={setFloorName}
        />
        <Button title="Create Floor" onPress={handleCreateFloor} />
      </View>

      {/* List of Floors */}
      <Text style={styles.sectionHeader}>Floors:</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={floors}
          keyExtractor={(floor) => floor.id.toString()}
          renderItem={renderFloor}
          ListEmptyComponent={<Text>No Floors Available</Text>}
        />
      )}

      {/* Allocation Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Allocate Employee</Text>
            <FlatList
              data={employees}
              keyExtractor={(emp) => emp.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.employeeItem}
                  onPress={() => setSelectedEmployeeId(item.id)}
                >
                  <Text style={selectedEmployeeId === item.id ? styles.selectedEmployee : undefined}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={<Text>No Employees Available</Text>}
            />
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <View style={styles.buttonSpacing}>
                <Button title="Allocate" onPress={handleAllocateEmployee} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f0f0f0',
    },
    createFloorSection: {
        marginBottom: 24,
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        marginBottom: 8,
        backgroundColor: '#fff',
    },
    floorContainer: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    floorName: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 12,
        marginBottom: 4,
    },
    desk: {
        padding: 12,
        marginRight: 8,
        backgroundColor: '#add8e6',
        borderRadius: 6,
        width: 120,
        alignItems: 'center',
    },
    cabin: {
        padding: 12,
        marginRight: 8,
        backgroundColor: '#90ee90',
        borderRadius: 6,
        width: 120,
        alignItems: 'center',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        maxHeight: '70%',
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16,
    },
    modalHeader: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 12,
    },
    employeeItem: {
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    selectedEmployee: {
        color: '#0000ff',
        fontWeight: '600',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 16,
    },
    buttonSpacing: {
        marginLeft: 8,
    },
});

export default OfficeScreen;