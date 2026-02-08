import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screems/HomeScreen';
import CreateObjectScreen from './screems/CreateObjectScreen';
import ObjectDetailScreen from './screems/ObjectDetailScreen';



export type RootStackParamList = {
  MainTabs: undefined;
  ObjectDetail: { id: string };
  CreateObject: undefined;
};

export type TabParamList = {
  Home: undefined;
  Create: undefined;
  Settings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          tabBarLabel: 'Accueil',
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateObjectScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          ),
          tabBarLabel: 'Ajouter',
        }}
      />
      {/* <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
          tabBarLabel: 'Paramètres',
        }}
      /> */}
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ObjectDetail"
          component={ObjectDetailScreen}
          options={{ title: 'Détails' }}
        />
        <Stack.Screen
          name="CreateObject"
          component={CreateObjectScreen}
          options={{ title: 'Nouvel objet' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}