import React from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import {Contact} from "../models/contact.js"

type UserProps = {
    contacts: Contact[];
};

export default function User({ contacts }: UserProps) {
    const grouped = groupContacts(contacts);

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }}>
            {Object.keys(grouped).map((letter) => (
                <View key={letter}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionText}>{letter}</Text>
                    </View>

                    {grouped[letter].map((c, index) => (
                        <TouchableOpacity key={index} style={styles.row}>
                            <View style={styles.avatar}>
                            <Text style={styles.avatarInitial}>
                                {c.name.charAt(0).toUpperCase()}
                            </Text>
                            </View>
                            <Text style={styles.name}>{c.name}</Text>
                        </TouchableOpacity>
                        ))}
                </View>   
            ))}
        </ScrollView>
    );
}

const ICELANDIC_ALPHABET = [
    'A', 'Á', 'B', 'D', 'Ð', 'E', 'É', 'F', 'G', 'H', 'I', 'Í', 'J', 'K',
    'L', 'M', 'N', 'O', 'Ó', 'P', 'R', 'S', 'T', 'U', 'Ú', 'V', 'X', 'Y',
    'Ý', 'Þ', 'Æ', 'Ö'
];

function groupContacts(contacts: Contact[]) {
    const sorted = [...contacts].sort((a, b) =>
        a.name.localeCompare(b.name, 'is', { sensitivity: 'base' })
    );

    const groups: Record<string, Contact[]> = {};

    sorted.forEach((contact) => {
        let letter = contact.name.charAt(0).toUpperCase();
        
        if (!ICELANDIC_ALPHABET.includes(letter)) {
            letter = '#';
        }

        if (!groups[letter]) groups[letter] = [];
        groups[letter].push(contact);
    });

    return groups;
}

const styles = StyleSheet.create({
    sectionHeader: {
        paddingVertical: 4,
        paddingHorizontal: 10,
    },
    sectionText: {
        fontSize: 14,
        color: "#8e8e93",
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#e5e5ea"
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#d1d1d6",
        marginRight: 15,
        alignItems: "center",
        justifyContent: "center",
      },
      avatarInitial: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
      },      
    name: {
        fontSize: 16,
    },
});