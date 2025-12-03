import globalStyles from '@/util/globalStyles';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Button,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import * as file from '../../util/fileManager';

const Index = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [photo, setPhoto] = useState<string>('');

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
            setPhoto(result.assets[0].uri);
        }
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
            <TouchableOpacity
                style={[
                    globalStyles.button,
                    styles.topButtons,
                    {
                        width: 40,
                        height: 40,
                    },
                ]}
                onPress={() => router.back()}
            >
                <Image
                    source={require('@/assets/images/back_arrow_icon.png')}
                    style={{ width: 30, height: 30 }}
                />
            </TouchableOpacity>

            <Text style={[styles.title, globalStyles.useFont]}>
                Add Contact
            </Text>

            <View style={styles.photoContainer}>
                {photo ? (
                    <Image source={{ uri: photo }} style={globalStyles.photo} />
                ) : (
                    <View style={globalStyles.photoPlaceholder}>
                        <Text
                            style={[styles.photoInitial, globalStyles.useFont]}
                        >
                            +
                        </Text>
                    </View>
                )}

                <TouchableOpacity
                    onPress={handleAddPhoto}
                    style={[globalStyles.button, { padding: 4 }]}
                >
                    <Text
                        style={[styles.photoButtonText, globalStyles.useFont]}
                    >
                        Add photo
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.field}>
                <Text style={[styles.label, globalStyles.useFont]}>Name</Text>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Name"
                    style={styles.input}
                />
            </View>

            <View style={styles.field}>
                <Text style={[styles.label, globalStyles.useFont]}>
                    Phone number
                </Text>
                <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="Phone"
                    keyboardType="phone-pad"
                    style={styles.input}
                />
            </View>

            <View
                style={[
                    globalStyles.button,
                    { width: '60%', alignSelf: 'center' },
                ]}
            >
                <Button
                    title="Save contact"
                    color={'#fff'}
                    onPress={handleSave}
                />
            </View>
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
    photoInitial: {
        color: '#fff',
        fontSize: 50,
        fontWeight: '600',
    },
    photoButtonText: {
        color: '#ffffffff',
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
    topButtons: {
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
});

export default Index;
