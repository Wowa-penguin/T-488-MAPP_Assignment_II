import Search from '@/components/search';
import User from '@/components/user';
import { FileContact } from '@/models/contact';
import GetContacts from '@/util/getContacts';
import globalStyles from '@/util/globalStyles';
import { useData } from '@/util/useData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as file from '../util/fileManager';

const CONTACTS_IMPORTED_KEY = 'CONTACTS_IMPORTED_V1';

export default function Index() {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { contacts, setContacts } = useData();

    let filteredContacts: FileContact[] | any;

    useEffect(() => {
        const init = async () => {
            try {
                const importedFlag = await AsyncStorage.getItem(
                    CONTACTS_IMPORTED_KEY
                );

                if (!importedFlag) {
                    //! console.log(contacts?.length === 0);
                    //! if (contacts?.length === 0) {
                    const oldContacts = await GetContacts();
                    for (const c of oldContacts) {
                        file.createContactFile(c.name, c.phone, c.photo);
                    }
                    //! }

                    await AsyncStorage.setItem(CONTACTS_IMPORTED_KEY, 'true');
                }
                const allUsers = await file.getAllContacts();
                setContacts(allUsers);
            } catch {
                Alert.alert(
                    'Error',
                    'Could not find contacts or no contacts accessible'
                );
            } finally {
                setIsLoading(false);
            }
        };

        init();
    }, [setContacts, contacts]);

    if (!contacts) {
        filteredContacts = [];
    } else {
        filteredContacts = contacts.filter((c) =>
            c.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    return (
        <View style={styles.container}>
            {isLoading ? (
                <Text>Is Loading</Text>
            ) : (
                <>
                    <Search value={search} onChange={setSearch} />
                    <User contacts={filteredContacts} />
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => router.push('/addContect')}
                    >
                        <Text
                            style={[styles.addButtonText, globalStyles.useFont]}
                        >
                            +
                        </Text>
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
        backgroundColor: '#b4b4b4ff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
        marginBottom: 30,
    },
    addButtonText: {
        fontFamily: 'RobotoMono-Regular',
        color: '#fff',
        fontSize: 30,
    },
});
