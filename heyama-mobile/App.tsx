// App.tsx
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SocketProvider } from './src/context/SocketContext';
import { ObjectsProvider } from './src/context/ObjectsContext';
import AppNavigator from './src/AppNavigator';



export default function App() {
  useEffect(() => {
    // Configuration initiale
    console.log('Heyama Mobile App started');
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SocketProvider>
          <ObjectsProvider>
            <StatusBar style="auto" />
            <AppNavigator />
          </ObjectsProvider>
        </SocketProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}