import * as FileSystem from "expo-file-system";
import {randomUUID} from 'expo-crypto';

import baseData from '@/resource/data.json';

const fileUri = FileSystem.documentDirectory + 'contacts';

FileSystem.deleteAsync(fileUri);

const setUpDirectory = async () => {
  const dir = await FileSystem.getInfoAsync(fileUri);
  if (!dir.exists) {
    await FileSystem.makeDirectoryAsync(fileUri);
    baseData.contacts.map(contact => saveContact(JSON.stringify(contact), ${contact.name.replace(/\s+/g, "-")}-${randomUUID()}.json));
  }

};

export const saveContact = async (info:string, fileName:string) => {
  fileName.replace('', '-');

  await FileSystem.writeAsStringAsync(fileUri + '/' + fileName, info);
}

export const getContact = async (fileName:string) => {
  try {
    return await FileSystem.readAsStringAsync(fileUri + '/' + fileName);
  }
  catch (e) {
    console.log(e);
  }
}

export const getContacts = async () => {
  await setUpDirectory();

  const fileUris = await FileSystem.readDirectoryAsync(fileUri);
  return await Promise.all(fileUris.map(async contactPath => {
    return await getContact(contactPath).then(d => JSON.parse(d));
  }
));
};