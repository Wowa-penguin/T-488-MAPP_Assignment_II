import { FileContact } from '@/models/contact';
import * as ExpoContacts from 'expo-contacts';

const GetContacts = async (): Promise<FileContact[]> => {
    const { status } = await ExpoContacts.requestPermissionsAsync();

    if (status !== 'granted') {
        // Permission denied
        return [];
    }

    const { data } = await ExpoContacts.getContactsAsync({
        fields: [
            ExpoContacts.Fields.Name,
            ExpoContacts.Fields.PhoneNumbers,
            ExpoContacts.Fields.Image,
        ],
    });

    const retContactInfo: FileContact[] = [];

    data.forEach((contact) => {
        let phoneNumber = '';
        let photoUri = '';

        if (
            contact.phoneNumbers &&
            typeof contact.phoneNumbers[0]?.digits !== 'undefined'
        ) {
            phoneNumber = contact.phoneNumbers[0].digits!;
        }
        if (contact.image && typeof contact.image.uri !== 'undefined') {
            photoUri = contact.image?.uri;
        }

        if (contact.name && phoneNumber) {
            retContactInfo.push({
                name: contact.name,
                phone: phoneNumber,
                photo: photoUri,
                id: '',
                fileName: '',
                uri: '',
            });
        }
    });

    return retContactInfo;
};

export default GetContacts;
