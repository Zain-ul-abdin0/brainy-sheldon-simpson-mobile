//================================ React Native Imported Files ======================================//
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { StyleSheet, Text } from "react-native";
import colors from '../../Assets/Colors/colors';

const Styles = StyleSheet.create({

    mainCotainer:
    {
        flex: 1,
        // backgroundColor: colors.appBrownColor

    },
    headerView:
    {
        flex: 0.12
    },
    mapView: {
        flex: 1,

    },
    mapStyles:
    {
        height: '100%',
        width: '100%',
    },
    fixMarker: {
        position: "absolute",
        top: hp(45),
        left: wp(45),
        alignSelf: "center"


    },
    button: {

        position: "absolute",
        top: hp(85),
        left: wp(15),
        // alignSelf: "center"

    },
    buttonStyles:
    {
        borderRadius: wp(7),
        height: hp(8),
        width: '85%',
        // marginBottom: wp(4),
    },
    titleStyles: {
        color: colors.white,
        fontSize: wp(4.5),
        fontWeight: "bold"
    },

});
export default Styles;