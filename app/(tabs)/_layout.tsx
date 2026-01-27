import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      headerShown: false, 
      tabBarStyle: { display: 'none' } // Masque la barre d'onglets pour un look plus "App Pro"
    }}>
      <Tabs.Screen name="index" options={{ title: 'Login' }} />
      <Tabs.Screen name="dashetudiant" options={{ title: 'Étudiant' }} />
      <Tabs.Screen name="dashadmin" options={{ title: 'Admin' }} />
    </Tabs>
  );
}