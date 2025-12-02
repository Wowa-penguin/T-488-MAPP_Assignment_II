import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import * as file from '../../util/fileManager';

const AddContact = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const handleSave = async () => {
        if (!name.trim()) {
            Alert.alert(
                'Name required',
                'Please enter a name for the contact.'
            );
            return;
        }

        try {
            file.createContactFile(name.trim(), phone.trim());
            router.back();
        } catch (err) {
            console.error(err);
            Alert.alert('Error', 'Could not save contact. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Contact</Text>

            <View style={styles.field}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Name"
                    style={styles.input}
                />
            </View>

            <View style={styles.field}>
                <Text style={styles.label}>Phone number</Text>
                <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="Phone"
                    keyboardType="phone-pad"
                    style={styles.input}
                />
            </View>

            <Button title="Save contact" onPress={handleSave} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 24,
        textAlign: 'center',
    },
    field: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        marginBottom: 4,
        color: '#555',
    },
    input: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 16,
    },
});

export default AddContact;
