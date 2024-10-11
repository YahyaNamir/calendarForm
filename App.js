import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import EventNavigator from './src/EventNavigator';
import Collectif from './src/evenements/Collectif';
import Personelle from './src/evenements/Personelle';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="EventNavigator">
        <Stack.Screen
          name="Evenement"
          component={EventNavigator}
          options={{
            headerTitle: 'Evenement',
            headerStyle: {backgroundColor: '#006536'},
            headerTintColor: '#fff',
            headerTitleStyle: {fontSize: 16, fontFamily: 'Poppins-Bold'},
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Personelle"
          component={Personelle}
          options={{
            headerShown: true,
            headerTitle: 'Personelle',
            headerStyle: {backgroundColor: '#006536'},
            headerTintColor: '#fff',
            headerTitleStyle: {fontSize: 16, fontFamily: 'Poppins-Bold'},
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Collectif"
          component={Collectif}
          options={{
            headerShown: true,
            headerTitle: 'Collectif',
            headerStyle: {backgroundColor: '#006536'},
            headerTintColor: '#fff',
            headerTitleStyle: {fontSize: 16, fontFamily: 'Poppins-Bold'},
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// import React, {useState, useEffect} from 'react';
// import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
// import {Picker} from '@react-native-picker/picker';

// const API_URL = 'https://api.football-data.org/v4/competitions/PL/teams';
// const API_KEY = 'f9ed8dccc34b458aac8bf4bd92ddb066';

// const App = () => {
//   const [clubs, setClubs] = useState([]);
//   const [selectedClub, setSelectedClub] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchClubs = async () => {
//       try {
//         const response = await fetch(API_URL, {
//           headers: {
//             'X-Auth-Token': API_KEY,
//           },
//         });
//         const data = await response.json();

//         const formattedClubs = data.teams.map(club => ({
//           label: club.name,
//           value: club.id,
//         }));

//         setClubs(formattedClubs);
//       } catch (error) {
//         console.error('Error fetching clubs:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchClubs();
//   }, []);

//   return (
//     <View>
//       <Text>Select a Club:</Text>

//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (
        // <Picker
        //   selectedValue={selectedClub}
        //   onValueChange={itemValue => setSelectedClub(itemValue)}>
        //   <Picker.Item label="Select a club..." value="" />

        //   {clubs.map(club => (
        //     <Picker.Item
        //       key={club.value}
        //       label={club.label}
        //       value={club.value}
        //     />
        //   ))}
        // </Picker>
//       )}

//       {selectedClub ? (
//         <Text style={styles.selectedText}>
//           Selected Club ID: {selectedClub}
//         </Text>
//       ) : (
//         <Text style={styles.selectedText}>No club selected</Text>
//       )}
//     </View>
//   );
// };

// export default App;
