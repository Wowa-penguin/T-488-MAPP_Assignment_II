import ContactInfo from '@/components/contactInfo';
import EditContact from '@/components/editContact';
import NavButtons from '@/components/navButtons';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    View,
} from 'react-native';
import * as file from '../../util/fileManager';

export default function UserDetailScreen() {
    const router = useRouter();

    const params = useLocalSearchParams<{
        fileUri: string;
    }>();

    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [photoUri, setPhotoUri] = useState('');
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        const init = async () => {
            try {
                const user = await file.getContactInfo(params.fileUri);
                if (!user) {
                    Alert.alert('Not a valid contact uri');
                    return;
                }

                setName(user.name);
                setPhone(user.phone);
                setPhotoUri(user.photo);
            } catch {
                Alert.alert('Error', 'File does not exist');
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
        if (!params.fileUri) {
            Alert.alert('Error in the file uri');
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
                params.fileUri,
                trimmedName,
                trimmedPhone,
                photoUri
            );
            router.back();
        } catch (err) {
            console.error(err);
            Alert.alert('Error', 'Failed to save contact.');
        }
    };

    const handleIsEdit = () => {
        setIsEdit(!isEdit);
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={80}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={{ flex: 1 }}>
                    <NavButtons handleIsEdit={handleIsEdit} />

                    {isEdit ? (
                        <EditContact
                            name={name}
                            phone={phone}
                            photoUri={photoUri}
                            handleAddPhoto={handleAddPhoto}
                            handleSave={handleSave}
                            setName={setName}
                            setPhone={setPhone}
                        />
                    ) : (
                        <ContactInfo
                            name={name}
                            phone={phone}
                            photoUri={photoUri}
                        />
                    )}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
