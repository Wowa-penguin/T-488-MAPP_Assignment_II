import Search from '@/components/search';
import User from '@/components/user';
import { Contact } from '@/models/contact';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as file from '../util/fileManager';

const seedContacts: Contact[] = [
    { name: 'Guðný', phone: '5812345' },
    { name: 'Heimir', phone: '5812345' },
    { name: 'Bjarki', phone: '5812345' },
    { name: 'Vita', phone: '5812345' },
    { name: 'Callum', phone: '54292' },
];

export default function Index() {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [contacts, setContacts] = useState<Contact[]>([]);

    useEffect(() => {
        const init = async () => {
            try {
                // file.deleteContactsDirectory()
                const allUsers = await file.getAllContacts();
                setContacts(allUsers);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        init();
    }, []);

    const handleCreateUsers = () => {
        for (const c of seedContacts) {
            file.createContactFile(c.name, c.phone);
        }
    };

    const filteredContacts = contacts.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View style={styles.container}>
            {isLoading ? (
                <>
                    <Text>Is Loading </Text>
                </>
            ) : (
                <>
                    <Search value={search} onChange={setSearch} />
                    <User contacts={filteredContacts} />
                    <Button
                        title="Create users temp"
                        onPress={handleCreateUsers}
                    />
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => router.push('/addContect')}
                    >
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    addButton: {
        position: 'absolute',
        right: 24,
        bottom: 40,
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: '#c9c5c5',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 30,
        marginTop: 7,
    },
});
