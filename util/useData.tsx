import { FileContact } from '@/models/contact';
import * as file from '@/util/fileManager';
import React, { createContext, useContext, useEffect, useState } from 'react';

type DataContextType = {
    contacts: FileContact[] | undefined;
    setContacts: React.Dispatch<
        React.SetStateAction<FileContact[] | undefined>
    >;
};

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [contacts, setContacts] = useState<FileContact[]>();

    useEffect(() => {
        const init = async () => {
            const allUsers = await file.getAllContacts();
            setContacts(allUsers);
        };
        init();
    });

    return (
        <DataContext.Provider
            value={{
                contacts,
                setContacts,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const ctx = useContext(DataContext);
    if (!ctx) {
        throw new Error('useData must be used inside DataProvider');
    }
    return ctx;
};
