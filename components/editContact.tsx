import globalStyles from '@/util/globalStyles';
import React from 'react';
import {
    Image,
    Linking,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

type EditContactProp = {
    name: string;
    phone: string;
    photoUri: string;
    handleAddPhoto: () => void;
    handleSave: () => void;
    setName: React.Dispatch<React.SetStateAction<string>>;
    setPhone: React.Dispatch<React.SetStateAction<string>>;
};

const EditContact = ({
    name,
    phone,
    photoUri,
    handleAddPhoto,
    handleSave,
    setName,
    setPhone,
}: EditContactProp) => {
    return (
        <View style={styles.container}>
            <View
                style={{
                    alignItems: 'center',
                    marginBottom: 20,
                }}
            >
                {photoUri ? (
                    <Image
                        source={{ uri: photoUri }}
                        style={globalStyles.photo}
                    />
                ) : (
                    <View style={globalStyles.photoPlaceholder}>
                        <Text
                            style={[
                                { fontSize: 40, color: '#888' },
                                globalStyles.useFont,
                            ]}
                        >
                            {name ? name[0].toUpperCase() : '?'}
                        </Text>
                    </View>
                )}
                <TouchableOpacity
                    style={[
                        globalStyles.button,
                        {
                            width: '40%',
                            padding: 8,
                        },
                    ]}
                    onPress={handleAddPhoto}
                >
                    <Text
                        style={[
                            globalStyles.useFont,
                            {
                                fontSize: 16,
                                color: '#fff',
                                textAlign: 'center',
                            },
                        ]}
                    >
                        Change Photo
                    </Text>
                </TouchableOpacity>
            </View>

            <Text style={[styles.label, globalStyles.useFont]}>Name</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter name"
            />

            <Text style={[styles.label, globalStyles.useFont]}>Phone</Text>
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
            <TouchableOpacity
                style={[
                    globalStyles.button,
                    {
                        width: '30%',
                        alignSelf: 'center',
                        marginTop: 15,
                        alignItems: 'center',
                        paddingVertical: 10,
                    },
                ]}
                onPress={handleSave}
            >
                <Text style={{ color: '#fff', fontSize: 16 }}>Save</Text>
            </TouchableOpacity>
        </View>
    );
};

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
});

export default EditContact;
