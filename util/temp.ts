import { Directory, File, Paths } from 'expo-file-system';

const createUserDataFile = (name: string) => {
    try {
        //* 1. Create /Documents/data/
        const dataDir = new Directory(Paths.document, 'data');

        if (!dataDir.exists) {
            dataDir.create();
            console.log('Created directory:', dataDir.uri);
        } else {
            console.log('Directory already exists:', dataDir.uri);
        }

        //* 2. Create JSON files
        const file = new File(dataDir, name);
        if (!file.exists) {
            file.create();
            file.write(JSON.stringify({ name: name }));

            console.log('Created file:', file.uri);
        } else {
            console.log('File already exists:', file.uri);
        }
    } catch (err) {
        console.error(err);
    }
};

const chackDir = () => {
    //? temp
    const dataDir = new Directory(Paths.document, 'data');

    dataDir.list().forEach((file) => {
        console.log(file.name);
    });
};

const readDataFile = async () => {
    try {
        const dataDir = new Directory(Paths.document, 'data');

        dataDir.list().forEach(async (fileName) => {
            const file = new File(dataDir, fileName.name);

            if (!file.exists) {
                console.log("File doesn't exist:", file.uri);
                return;
            }
            const text = file.text(); // string
            const json = JSON.parse(await text);

            console.log('Parsed JSON:', json);
        });
    } catch (err) {
        console.error(err);
    }
};

const deleteAll = async () => {
    //? temp
    try {
        const dataDir = new Directory(Paths.document, 'data');

        dataDir.list().forEach(async (fileName) => {
            const file = new File(dataDir, fileName.name);

            if (file.exists) {
                file.delete();
            }
        });
    } catch (err) {
        console.error(err);
    }
};

const getAllUsers = async () => {
    try {
        const dataDir = new Directory(Paths.document, 'data');
        const users: any[] = [];

        for (const entry of dataDir.list()) {
            if (!(entry instanceof File)) continue;

            if (!entry.exists) {
                console.log("File doesn't exist:", entry.uri);
                continue;
            }

            const text = entry.text();
            const json = JSON.parse(await text);
            users.push(json);
        }
        return users;
    } catch (err) {
        console.error(err);
        return [];
    }
};

export { chackDir, createUserDataFile, deleteAll, getAllUsers, readDataFile };
