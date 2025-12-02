import { Contact } from '@/models/contact';
import * as Contacts from 'expo-contacts';
import { useEffect, useState } from 'react';

const GetContacts = () => {
    const [contacts, setContacts] = useState<Contacts.Contact[]>([]);

    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();

            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                    fields: [
                        Contacts.Fields.Name,
                        Contacts.Fields.PhoneNumbers,
                    ],
                });
                console.log(data);
                setContacts(data);
            } else {
                //* If permission is not allowed
                return [];
            }
        })();
    }, []);
    if (contacts.length > 0) {
        const retContactInfo: Contact[] = [];
        contacts.forEach((contact) => {
            let phoneNumber: string = '';
            if (
                contact.phoneNumbers &&
                typeof contact.phoneNumbers[0].digits != 'undefined'
            ) {
                phoneNumber = contact.phoneNumbers[0].digits;
            }
            retContactInfo.push({
                name: contact.name,
                phone: phoneNumber,
            });
        });
        return retContactInfo;
    }
};

export default GetContacts;
