
//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { StyleSheet } from "react-native";

//================================ Local Imported Files ======================================//

import colors from '../../Assets/Colors/colors';



const Styles = StyleSheet.create({

    mainContainer:
        {
            flex: 1,
            // backgroundColor: colors.dark_red
        },
    lottie: {
        width: '60%',
        height: '60%',
        justifyContent: "center",
        alignItems: "center"

    },
    headerView:
        {
            flex: 0.1
        },
    bottomContainer: {
        flex: 1,
        paddingTop: hp(4),
        // backgroundColor: "red"
    },
    imagePickerContainer: {
        height: hp(20),
        width: '100%',
        // backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
    },
    dateStyle: {
        borderRadius: wp(2),
        // borderColor: '#9ec600',
        borderWidth: 0.5,
        marginTop: wp(1.5),
        height: hp(7.5),
        width: "85%",
        alignSelf: "center",
        justifyContent: 'center',
        marginBottom: wp(3),

        // alignItems: "center",
        // paddingTop:

        backgroundColor: "white",
    },
    imagePickerIdCard: {
        height: hp(7.5),
        width: "85%",
        backgroundColor: "white",
        alignSelf: "center",
        flexDirection: 'row',
        alignItems: "center",
        borderWidth: 1,
        marginTop: wp(1.5),
        borderRadius: wp(2),
        paddingLeft: wp(2),



    },
    imagePlaceHolder:
        {
            height: hp(15),
            width: hp(15),
            // borderWidth: 4,
            // borderColor: 'green',
            borderRadius: hp(15),
            resizeMode: 'cover',
        },

    validEmail: {
        fontSize: wp(3.5),
        color: colors.black,
        paddingLeft: wp(8),
        fontWeight: "bold"
    },
    buttonView:
        {
            height: hp(10),
            width: '85%',
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'red',
            alignSelf: "center",
            paddingTop: wp(5),
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

});
export default Styles;
