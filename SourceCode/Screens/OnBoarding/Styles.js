//================================ React Native Imported Files ======================================//

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native';

//================================ Local Imported Files ======================================//

import colors from '../../Assets/Colors/colors';

const Styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
    },
    upperView: {
        flex: 0.8,
        // justifyContent: 'flex-end',
        alignItems: 'center',
        // backgroundColor: "red"

    },
    imageView: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'pink'
    },

    midView: {
        flex: 0.35,
        // justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: wp(10),
        // backgroundColor: "red"
    },
    lowerView: {
        flex: 0.2,
        marginTop: wp(5),
        alignItems: 'center',
    },
    imageStyles: {
        height: wp(50),
        width: wp(50),
        resizeMode: 'contain',
    },
    textStyle: {
        fontSize: wp(5),
        color: colors.white,
        textAlign: 'center',
    },
    textStyleWelcome: {
        fontSize: wp(5),
        marginBottom: wp(2),
        color: colors.black,
        textAlign: 'center',
        // fontWeight: "bold",
    },
    textStyleNetwork: {
        fontSize: wp(5),
        marginBottom: wp(2),
        color: colors.AppRedColor,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonStyles: {
        borderRadius: wp(2),
        height: hp(8),
        width: '70%',
    },
    titleStyles: {
        color: colors.white,
        fontSize: wp(4),
    },
    slides: {
        flex: 1,
        // backgroundColor: 'green'
    },
});

export default Styles;
