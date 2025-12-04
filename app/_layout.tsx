import { DataProvider } from '@/util/useData';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();
export default function Layout() {
    const [loaded] = useFonts({
        'RobotoMono-Regular': require('@/assets/fonts/RobotoMono-Regular.ttf'),
        'RobotoMono-Bold': require('@/assets/fonts/RobotoMono-Bold.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync().catch(() => {});
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <DataProvider>
            <Stack>
                <Stack.Screen name="index" options={{ title: 'Contacts' }} />
                <Stack.Screen name="user/index" options={{ title: 'User' }} />
                <Stack.Screen
                    name="addContect/index"
                    options={{ title: 'Add Contect' }}
                />
            </Stack>
        </DataProvider>
    );
}
