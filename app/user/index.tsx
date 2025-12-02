import { FileContact } from '@/models/contact';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Button,
    Image,
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
        fileUri: string;
    }>();

    const [user, setUser] = useState<FileContact>();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [photoUri, setPhotoUri] = useState('');

    useEffect(() => {
        const init = async () => {
            try {
                const user = await file.getContactInfo(params.fileUri);
                if (!user) {
                    Alert.alert('Error'); // todo: fix
                    return;
                }
                setUser(user);
                setName(user.name);
                setPhone(user.phone);
                setPhotoUri(user.photo);
            } catch (err) {
                console.error(err);
            }
        };

        init();
    }, [params.fileUri]);

    const pickFromLibrary = async () => {
        const { status } =
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
            setPhotoUri(result.assets[0].uri);
        }
    };

    const handleAddPhoto = () => {
        Alert.alert('Add photo', 'Choose source', [
            { text: 'Camera', onPress: takePhoto },
            { text: 'Photo library', onPress: pickFromLibrary },
            { text: 'Cancel', style: 'cancel' },
        ]);
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
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
            setPhotoUri(result.assets[0].uri);
        }
    };

    const handleSave = async () => {
        if (!user?.fileName) {
            Alert.alert('Error'); // todo: fix
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
                user.fileName,
                trimmedName,
                trimmedPhone,
                photoUri
            );
            router.back();
        } catch (err) {
            console.error('Failed to save contact', err);
            Alert.alert('Error', 'Failed to save contact.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
                {photoUri ? (
                    <Image source={{ uri: photoUri }} style={styles.photo} />
                ) : (
                    <View style={styles.photoPlaceholder}>
                        <Text style={{ fontSize: 40, color: '#888' }}>
                            {name ? name[0].toUpperCase() : '?'}
                        </Text>
                    </View>
                )}

                <Button title="Change photo" onPress={handleAddPhoto} />
            </View>

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
    photo: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
    },

    photoPlaceholder: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
});
