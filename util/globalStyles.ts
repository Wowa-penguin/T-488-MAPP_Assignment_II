import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    photo: {
        width: 200,
        height: 200,
        borderRadius: 120,
        marginBottom: 10,
    },
    photoPlaceholder: {
        width: 200,
        height: 200,
        borderRadius: 120,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    call: {
        marginTop: 5,
        width: 'auto',
        alignItems: 'center',
        alignSelf: 'center',
    },
    phoneIcone: {
        width: 50,
        height: 50,
    },
    button: {
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 45,
        borderColor: '#707070ff',
        backgroundColor: '#b4b4b4ff',
        justifyContent: 'center',
        alignItems: 'center',

    },
    useFont: {
        fontFamily: 'RobotoMono-Regular',
    },
    useFontBold: {
        fontFamily: 'RobotoMono-Bold',
    },
});
