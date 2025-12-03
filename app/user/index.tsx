import EditContact from '@/components/contactInfo';
import globalStyles from '@/util/globalStyles';
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
    TouchableOpacity,
    View,
} from 'react-native';
import * as file from '../../util/fileManager';

export default function UserDetailScreen() {
    const router = useRouter();

    const params = useLocalSearchParams<{
        fileUri: string;
    }>();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [photoUri, setPhotoUri] = useState('');
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        const init = async () => {
            try {
                const user = await file.getContactInfo(params.fileUri);
                if (!user) {
                    Alert.alert('Error'); // todo: fix
                    return;
                }

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
        if (!params.fileUri) {
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

    return (
        <View>
            <View style={styles.topButtonsContainer}>
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

                <TouchableOpacity
                    style={[
                        globalStyles.button,
                        styles.topButtons,
                        {
                            width: 50,
                            height: 40,
                        },
                    ]}
                    onPress={() => setIsEdit(!isEdit)}
                >
                    <Text style={{ color: '#ffffffff', fontSize: 20 }}>
                        Edit
                    </Text>
                </TouchableOpacity>
            </View>
            {isEdit ? (
                <View style={styles.container}>
                    <View style={{ alignItems: 'center', marginBottom: 20 }}>
                        {photoUri ? (
                            <Image
                                source={{ uri: photoUri }}
                                style={globalStyles.photo}
                            />
                        ) : (
                            <View style={globalStyles.photoPlaceholder}>
                                <Text style={{ fontSize: 40, color: '#888' }}>
                                    {name ? name[0].toUpperCase() : '?'}
                                </Text>
                            </View>
                        )}
                        <View style={globalStyles.button}>
                            <Button
                                title="Change photo"
                                color={'#fff'}
                                onPress={handleAddPhoto}
                            />
                        </View>
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

                    <TouchableOpacity
                        style={[globalStyles.call, { marginTop: 25 }]}
                        onPress={() => Linking.openURL(`tel:${phone}`)}
                    >
                        <Image
                            source={require('@/assets/images/phone_icon.png')}
                            style={globalStyles.phoneIcone}
                        />
                    </TouchableOpacity>
                    <View
                        style={[
                            globalStyles.button,
                            {
                                width: '25%',
                                alignSelf: 'center',
                                marginTop: 10,
                            },
                        ]}
                    >
                        <Button
                            title="Save"
                            color={'#fff'}
                            onPress={handleSave}
                        />
                    </View>
                </View>
            ) : (
                <EditContact name={name} phone={phone} photoUri={photoUri} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
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
    topButtonsContainer: {
        justifyContent: 'space-around',
        gap: 60,
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
    },
    topButtons: {
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
});
