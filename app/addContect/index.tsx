import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { 
    Alert, 
    Button, 
    StyleSheet, 
    Text, 
    TextInput, 
    View, 
    Image, 
    TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as file from '../../util/fileManager';

const AddContact = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [photo, setPhoto] = useState<string | null>(null);

    const pickFromLibrary = async () => {
        const {status} = 
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                'Premission needed',
                'We need access to your photos to add a contact image.'
            );
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
        });

        if (!result.canceled) {
            setPhoto(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        const {status} = 
            await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                'Premission needed',
                'We need access to you camera to take a contact photo.'
            );
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            quality: 0.8,
        });

        if (!result.canceled) {
            setPhoto(result.assets[0].uri);
        }
    };

    const handleAddPhoto = () => {
        Alert.alert('Add photo', 'Choose source', [
            { text: 'Camera', onPress: takePhoto },
            { text: 'Photo library', onPress: pickFromLibrary },
            { text: 'Cancel', style: 'cancel' },
        ]);
    };

    const handleSave = async () => {
        if (!name.trim()) {
            Alert.alert(
                'Name required',
                'Please enter a name for the contact.'
            );
            return;
        }

        try {
            file.createContactFile(name.trim(), phone.trim(), photo);
            router.back();
        } catch (err) {
            console.error(err);
            Alert.alert('Error', 'Could not save contact. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Contact</Text>

            <View style={styles.photoContainer}>
                {photo ? (
                    <Image source={{ uri: photo }} style={styles.photo} />
                ) : (
                    <View style={styles.photoPlaceholder}>
                        <Text style={styles.photoInitial}>+</Text>
                    </View>
                )}

                <TouchableOpacity onPress={handleAddPhoto}>
                    <Text style={styles.photoButtonText}>Add photo</Text>
                </TouchableOpacity>
            </View>

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
    photoContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    photo: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 8,
    },
    photoPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#d1d1d6',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    photoInitial: {
        color: '#fff',
        fontSize: 36,
        fontWeight: '600',
        marginTop: -4,
    },
    photoButtonText: {
        color: '#007AFF',
        fontSize: 16,
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