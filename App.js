import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import EventNavigator from './src/EventNavigator';
import Collectif from './src/evenements/Collectif';
import Personelle from './src/evenements/Personelle';
import HeaderRight from './HeaderRight';
import i18n from './i18n';
import {useTranslation} from 'react-i18next';

const Stack = createStackNavigator();

export default function App() {
  const {t} = useTranslation();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="EventNavigator">
        <Stack.Screen
          name="Evenement"
          component={EventNavigator}
          options={{
            headerTitle: t('EVENT'),
            headerStyle: {backgroundColor: '#006536'},
            headerTintColor: '#fff',
            headerTitleStyle: {fontSize: 16, fontFamily: 'Poppins-Bold'},
            // headerTitleAlign: 'center',
            headerRight: () => <HeaderRight />,
          }}
        />
        <Stack.Screen
          name="Personelle"
          component={Personelle}
          options={{
            headerShown: true,
            headerTitle: t('PERSONAL'),
            headerStyle: {backgroundColor: '#006536'},
            headerTintColor: '#fff',
            headerTitleStyle: {fontSize: 16, fontFamily: 'Poppins-Bold'},
            headerTitleAlign: 'center',
            headerRight: () => <HeaderRight />,
          }}
        />
        <Stack.Screen
          name="Collectif"
          component={Collectif}
          options={{
            headerShown: true,
            headerTitle: t('COLLECTIVE'),
            headerStyle: {backgroundColor: '#006536'},
            headerTintColor: '#fff',
            headerTitleStyle: {fontSize: 16, fontFamily: 'Poppins-Bold'},
            headerTitleAlign: 'center',
            headerRight: () => <HeaderRight />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}