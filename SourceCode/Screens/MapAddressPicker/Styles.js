
//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { StyleSheet } from "react-native";

//================================ Local Imported Files ======================================//

import colors from '../../Assets/Colors/colors';
import { ButtonGroup } from "react-native-elements";




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
        flex: 0.1
    },
    bottomContainer: {
        flex: 0.9,
        // backgroundColor: "red"
    },
    enterTitleContainer: {
        height: hp(10),
        width: wp(100),
        position: "absolute",
        top: hp(2),
        // left: wp(32),
        // alignSelf: "center",
        // backgroundColor: 'rgba(255,255,255,0.5)',
        // backgroundColor: "red"
        // backgroundColor: "transparent",



    },
    mapView: {
        flex: 1,

    },
    mapTextContainer: {
        // backgroundColor: "transparent",
        flex: 0.2,
        paddingTop: wp(5),
        // justifyContent: 'center',
        paddingLeft: wp(4),

    },
    mapStyles:
    {

        height: '100%',
        width: '100%',
    },
    fixMarker: {
        position: "absolute",
        top: hp(42),
        left: wp(32),
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "red"
    },
    getAddressContainer: {
        height: hp(6),
        width: wp(40),
        elevation: 4,
        borderWidth: wp(0.3),

        backgroundColor: "#E0E0E0",
        justifyContent: "center",
        alignItems: "center",
    },
    getAddressPic: {
        height: hp(6),
        width: wp(40),
        justifyContent: "flex-start",
        alignItems: "center",
        // backgroundColor: "pink",

    },
    addressTextContainer: {
        fontWeight: "bold",
        fontSize: wp(4),

    },
    addressPickContainer: {
        // fontWeight: '0',
        // fontSize: wp(4),
    },

});
export default Styles;