import { Contact } from '@/models/contact';
import * as ExpoContacts from 'expo-contacts';

const GetContacts = async (): Promise<Contact[]> => {
    const { status } = await ExpoContacts.requestPermissionsAsync();

    if (status !== 'granted') {
        // Permission denied
        return [];
    }

    const { data } = await ExpoContacts.getContactsAsync({
        fields: [ExpoContacts.Fields.Name, ExpoContacts.Fields.PhoneNumbers],
    });

    const retContactInfo: Contact[] = [];

    data.forEach((contact) => {
        let phoneNumber = '';

        if (
            contact.phoneNumbers &&
            typeof contact.phoneNumbers[0]?.digits !== 'undefined'
        ) {
            phoneNumber = contact.phoneNumbers[0].digits!;
        }

        if (contact.name && phoneNumber) {
            retContactInfo.push({
                name: contact.name,
                phone: phoneNumber,
            });
        }
    });

    return retContactInfo;
};

export default GetContacts;
