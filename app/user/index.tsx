import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function UserDetailScreen() {
    const { name, phone } = useLocalSearchParams<{
        name?: string;
        phone?: string;
    }>();

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{name}</Text>

            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{phone}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 14,
        color: '#8e8e93',
        marginTop: 16,
        marginBottom: 4,
    },
    value: { 
        fontSize: 18,
    },
});