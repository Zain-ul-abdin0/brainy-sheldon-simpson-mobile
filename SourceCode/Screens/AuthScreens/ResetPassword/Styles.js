
//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { StyleSheet } from "react-native";

//================================ Local Imported Files ======================================//

import colors from '../../../Assets/Colors/colors';

const Styles = StyleSheet.create({

    mainContainer:
    {
        flex: 1,
        backgroundColor: colors.white
    },

    headerView:
    {
        flex: 0.09
    },
    lottie: {
        width: '60%',
        height: '60%',
        justifyContent: "center",
        alignItems: "center"

    },
    textStyle1:
    {
        fontSize: wp(5),
        color: colors.appYellow,
        textAlign: 'center',
        marginBottom: wp(8)
    },
    signStyle: {
        fontSize: wp(5),
        textAlign: 'center',
        fontWeight: "bold"
    },
    textView: {
        flex: 0.05,
        // backgroundColor: 'red',
        justifyContent: "center",
        alignItems: "center"
    },
    upperView:
    {
        flex: 0.36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleStyles: {
        color: colors.white,
        fontSize: wp(4),
        fontWeight: "bold"
    },
    midView:
    {
        flex: 0.3,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: "red"
        // paddingTop: wp(2),
    },

    lowerView:
    {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyles:
    {
        height: '70%',
        width: '70%',
        resizeMode: 'contain'
    },
    textStyle:
    {
        fontSize: wp(3.8),
        color: colors.black,
        textAlign: 'center'
    },
    buttonStyles:
    {
        borderRadius: wp(2),
        height: hp(8),
        width: '85%',
        backgroundColor: colors.white,
        marginBottom: wp(4),
    },
    validEmail: {
        fontSize: wp(3.5),
        color: colors.black,
        paddingLeft: wp(8)
    },
    textContainer:
    {
        flex: 0.5,
        paddingHorizontal: wp(10),
        paddingTop: wp(5),
        justifyContent: 'center',
        alignItems: 'center',
    }

});
export default Styles;
