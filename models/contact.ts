type Contact = {
    name: string;
    phone: string;
    photo?: string | null;
};

interface FileContact {
    id: string;
    name: string;
    phone: string;
    fileName: string;
    uri: string;
    photo?: string | null;
}

export { Contact, FileContact };
