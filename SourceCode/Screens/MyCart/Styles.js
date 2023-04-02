//================================ React Native Imported Files ======================================//
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { StyleSheet } from "react-native";
//================================ Local Imported Files ======================================//
import colors from "../../Assets/Colors/colors";
const Styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
    },
    lottie: {
        width: "60%",
        height: "60%",
        justifyContent: "center",
        alignItems: "center",
    },
    headerView: {
        flex: 0.1,
    },
    bottomContainer: {
        flex: 0.9,
        // backgroundColor: "red"
    },
    flatlistContainer: {
        // flexGrow: 1,
        height: hp(40),
        width: wp(100),
        // backgroundColor: "red",
    },
    deliveryChargeContainer: {
        width: "100%",
        height: hp(3.8),
        // marginTop: hp(2),
        // backgroundColor: "pink",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: wp(5),
        alignItems: "center",
    },
    totalChargeContainer: {
        width: "100%",
        height: hp(8),
        // backgroundColor: 'red',
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: wp(5),
        alignItems: "center",
        // backgroundColor:'red'
    },
    buttonContainer: {
        width: "100%",
        height: hp(8),
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "grey",
    },
    bottomTextContainer: {
        width: "100%",
        height: hp(5),
        paddingTop: wp(2),
        justifyContent: "flex-start",
        alignItems: "center",
        // backgroundColor: "red",
    },
    contineShopingContainer: {
        width: "100%",
        height: wp(12),
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "yellow",
    },
    buttonStyles: {
        // borderRadius: wp(2),
        width: "90%",
        // marginBottom: wp(4),
    },
    titleStyles: {
        color: colors.white,
        fontSize: wp(4),
        // fontWeight: "bold"
    },
    divderContainer: {
        width: "100%",
        height: wp(0.1),
        backgroundColor: "grey",
    },
    deliveryChargeStyle: {
        color: "#AAAAAA",
        fontSize: wp(3.5),
    },
    totalStyle: {
        color: colors.black,
        fontSize: wp(4.3),
        fontWeight: "bold",
    },
    totalChargeStyle: {
        color: "#5FBFDC",
        fontSize: wp(5.5),
        fontWeight: "bold",
    },
    continueShopingText: {
        color: "#AAAAAA",
        fontSize: wp(4),
        textAlign: "center",
        textDecorationLine: "underline",
    },
    bottomTextStyle: {
        color: "#AAAAAA",
        fontSize: wp(3),
        textAlign: "center",
        // textDecorationLine: "underline",
    },
});
export default Styles;
