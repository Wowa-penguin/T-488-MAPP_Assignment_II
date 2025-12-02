import * as Contacts from 'expo-contacts';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export const Get_Contact = () => {
    const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const { status } = await Contacts.requestPermissionsAsync();
                console.log('Permission status:', status);

                if (status === 'granted') {
                    const { data } = await Contacts.getContactsAsync({
                        fields: [
                            Contacts.Fields.Emails,
                            Contacts.Fields.PhoneNumbers,
                        ],
                    });

                    console.log('Number of contacts:', data.length);
                    setContacts(data);
                } else {
                    setError('Permission denied');
                }
            } catch (err) {
                console.error('Error fetching contacts:', err);
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
                <Text>Loading contacts...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.error}>Error: {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Contacts ({contacts.length})</Text>
            {contacts.length === 0 ? (
                <Text>No contacts found</Text>
            ) : (
                <FlatList
                    data={contacts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.contactItem}>
                            <Text style={styles.name}>
                                {item.name || 'No Name'}
                            </Text>
                            {item.emails && (
                                <Text style={styles.detail}>
                                    {item.emails[0]?.email}
                                </Text>
                            )}
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    contactItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
    },
    detail: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    error: {
        color: 'red',
        fontSize: 16,
    },
});
