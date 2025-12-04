import globalStyles from '@/util/globalStyles';
import React from 'react';
import {
    Image,
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type ContactInfoProp = {
    name: string;
    phone: string;
    photoUri: string;
};

const ContactInfo = ({ name, phone, photoUri }: ContactInfoProp) => {
    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
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
            </View>

            <View style={{ alignSelf: 'center' }}>
                <Text
                    style={[
                        { fontSize: 30, fontWeight: 'bold' },
                        globalStyles.useFontBold,
                    ]}
                >
                    {name}
                </Text>
            </View>

            <View>
                <Text style={[styles.label, globalStyles.useFont]}>Phone</Text>
                <Text
                    style={[
                        { fontSize: 25, marginLeft: '5%' },
                        globalStyles.useFont,
                    ]}
                >
                    {phone}
                </Text>
            </View>

            <TouchableOpacity
                style={globalStyles.call}
                onPress={() => Linking.openURL(`tel:${phone}`)}
            >
                <Image
                    source={require('@/assets/images/phone_icon.png')}
                    style={globalStyles.phoneIcone}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 24,
        height: 'auto',
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 18,
        color: '#8e8e93',
        marginTop: 16,
        marginBottom: 4,
    },
});

export default ContactInfo;
