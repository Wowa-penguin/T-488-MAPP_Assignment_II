import Search from '@/components/search';
import User from '@/components/user';
import { Contact } from '@/models/contact';
import * as file from '@/util/fileManager';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const seedContacts: Contact[] = [
    { name: 'Guðný', phone: '5812345' },
    { name: 'Heimir', phone: '5812345' },
    { name: 'Bjarki', phone: '5812345' },
    { name: 'Vita', phone: '5812345' },
];

export default function Index() {
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
});
