import globalStyles from '@/util/globalStyles';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type NavButtonsProps = {
    handleIsEdit: () => void;
};

const NavButtons = ({ handleIsEdit }: NavButtonsProps) => {
    const router = useRouter();
    return (
        <View style={styles.topButtonsContainer}>
            <TouchableOpacity
                style={[
                    globalStyles.button,
                    styles.topButtons,
                    {
                        width: 40,
                        height: 40,
                    },
                ]}
                onPress={() => router.back()}
            >
                <Image
                    source={require('@/assets/images/back_arrow_icon.png')}
                    style={{ width: 30, height: 30 }}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    globalStyles.button,
                    styles.topButtons,
                    {
                        width: 60,
                        height: 40,
                    },
                ]}
                onPress={handleIsEdit}
            >
                <Text
                    style={[
                        { color: '#ffffffff', fontSize: 20 },
                        globalStyles.useFont,
                    ]}
                >
                    Edit
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#fff',
    },
    topButtonsContainer: {
        justifyContent: 'space-around',
        gap: 60,
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
    },
    topButtons: {
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
});

export default NavButtons;
