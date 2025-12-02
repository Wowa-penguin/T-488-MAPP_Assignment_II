import { Stack } from 'expo-router';
import React from 'react';

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'Contacts' }} />
            <Stack.Screen name="user/index" options={{ title: 'Contact' }} />
        </Stack>
    );
}
