import { FileContact } from '@/models/contact';
import { Directory, File, Paths } from 'expo-file-system';

const slugify = (name: string) =>
    name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9\-]/g, '');

const generateRandomId = () => {
    return `${Date.now().toString(36)}-${Math.random()
        .toString(36)
        .slice(2, 5)}`;
};

const createContactFile = (name: string, phone: string, photo: string | null): FileContact => {
    const contactsDir = new Directory(Paths.document, 'contacts');

    if (!contactsDir.exists) {
        contactsDir.create();
    }

    //? fromat <name-of-contact>-<uuid>.json
    const id = generateRandomId();
    const slug = slugify(name);
    const fileName = `${slug}-${id}.json`;

    const file = new File(contactsDir, fileName);

    if (!file.exists) {
        const payload = { id, name, phone };
        file.create();
        file.write(JSON.stringify(payload, null, 2));
    }

    return {
        id,
        name,
        phone,
        fileName,
        uri: file.uri,
    };
};

const getAllContacts = async (): Promise<FileContact[]> => {
    const contactsDir = new Directory(Paths.document, 'contacts');

    if (!contactsDir.exists) {
        return [];
    }

    const contacts: FileContact[] = [];

    for (const entry of contactsDir.list()) {
        if (!(entry instanceof File)) continue;
        if (!entry.name.endsWith('.json')) continue;
        if (!entry.exists) continue;

        try {
            const text = entry.text();
            const data = JSON.parse(await text);

            const contact: FileContact = {
                id: data.id ?? '',
                name: data.name ?? '',
                phone: data.phone ?? '',
                fileName: entry.name,
                uri: entry.uri,
            };

            contacts.push(contact);
        } catch (e) {
            console.warn('Failed to parse contact file:', entry.name, e);
        }
    }

    return contacts;
};

const getContactInfo = async (fileUri: string) => {
    const file = new File(fileUri);

    if (!file.exists) {
        console.error('Error in getContactInfo');
        return;
    }

    try {
        const text = file.text();
        const data = JSON.parse(await text);
        return data;
    } catch (e) {
        console.warn('Error in (getContactInfo):', e);
    }
};

const deleteContactsDirectory = () => {
    const contactsDir = new Directory(Paths.document, 'contacts');

    if (!contactsDir.exists) {
        console.log('Contacts directory does not exist');
        return;
    }

    contactsDir.delete(); // deletes folder + all contents

    console.log('Contacts directory deleted.');
};

export {
    createContactFile,
    deleteContactsDirectory,
    getAllContacts,
    getContactInfo,
};
