import React from 'react';
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ title: 'Contacts' }} 
      />
      <Stack.Screen
        name="user/index"
        options={{ title: 'Contact' }}
      />
    </Stack>
  );
}
