import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Button,
    Linking,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import * as file from '../../util/fileManager';

export default function UserDetailScreen() {
    const router = useRouter();

    const params = useLocalSearchParams<{
        name?: string;
        phone?: string;
        fileName?: string;
    }>();

    const [name, setName] = useState(params.name ?? '');
    const [phone, setPhone] = useState(params.phone ?? '');

    const handleSave = async () => {
        if (!params.fileName) {
            console.warn('No fileName passed to detail screen');
            Alert.alert('Error', 'Cannot save: missing file name.');
            return;
        }

        const trimmedName = name.trim();
        const trimmedPhone = phone.trim();

        if (!trimmedName || !trimmedPhone) {
            Alert.alert('Validation', 'Name and phone cannot be empty.');
            return;
        }

        try {
            await file.updateContactFile(
                params.fileName as string,
                trimmedName,
                trimmedPhone
            );

            router.back();
        } catch (err) {
            console.error('Failed to save contact', err);
            Alert.alert('Error', 'Failed to save contact.');
        }
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
            <Button
                title="Call"
                onPress={() => Linking.openURL(`tel:${phone}`)}
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
