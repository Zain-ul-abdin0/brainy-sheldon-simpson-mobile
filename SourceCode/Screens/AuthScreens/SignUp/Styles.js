
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
    lottie: {
        width: '60%',
        height: '60%',
        justifyContent: "center",
        alignItems: "center"

    },
    headerView:
    {
        flex: 0.09
    },
    upperView:
    {
        flex: 0.31,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red'
    },
    textStyle1:
    {
        fontSize: wp(5),
        color: colors.appYellow,
        textAlign: 'center',
        marginBottom: wp(3)
    },
    midView:
    {
        flex: 0.42,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    buttonView:
    {
        flex: 0.1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingTop: wp(2),
        // backgroundColor: "green"
    },
    lowerView:
    {
        flex: 0.07,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    imageStyles:
    {
        height: '85%',
        width: '85%',
        resizeMode: 'contain'
    },
    signStyle: {
        fontSize: wp(5),
        textAlign: 'center',
        fontWeight: "bold"
    },
    textStyle:
    {
        fontSize: wp(4),
        color: colors.appLightBlue,
        textAlign: 'center',
        textDecorationLine: "underline",
    },
    buttonStyles:
    {
        borderRadius: wp(2),
        width: '85%',
        marginBottom: wp(4),

    },
    titleStyles: {
        color: colors.white,
        fontSize: wp(4.5),
        fontWeight: "bold"
    },
    checkBoxContainer:
    {
        flex: 0.4,
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: wp(4),
        // backgroundColor: "red"

    },
    checkBoxIcon:
    {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    checkBoxText:
    {
        flex: 0.9,
        paddingHorizontal: wp(2),
        justifyContent: 'center',
        // backgroundColor: ""
    },
    checkBoxIconStyle:
    {
        height: wp(4),
        width: wp(4),
        resizeMode: 'contain',
    },
    checkBoxTextStyle:
    {
        fontSize: wp(3.5),
        color: colors.black,
        // paddingLeft:wp(4)
    },
    validEmail: {
        fontSize: wp(3.5),
        color: colors.black,
        paddingLeft: wp(8)
    },
    validPassword: {
        fontSize: wp(3.5),
        color: colors.black,
        paddingLeft: wp(8),
        marginTop: wp(2),
    },

});
export default Styles;
