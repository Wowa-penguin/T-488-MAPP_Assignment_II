import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function UserDetailScreen() {
    const router = useRouter();

    const params = useLocalSearchParams<{
        name?: string;
        phone?: string;
        fileName?: string;
    }>();

    const [name, setName] = useState(params.name ?? '');
    const [phone, setPhone] = useState(params.phone ?? '');

    const handleSave = () => {
        console.log("Saving contact:");
        console.log({ name, phone, fileName: params.fileName });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter name"
            />

            <Text style={styles.label}>Phone</Text>
            <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
            />

            <View style={{ marginTop: 32 }}>
                <Button title="Save" onPress={handleSave} />
            </View>
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
  input: {
    fontSize: 18,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
});