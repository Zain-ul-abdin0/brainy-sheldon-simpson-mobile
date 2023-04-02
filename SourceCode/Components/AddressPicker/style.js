import { StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "./Essential/Colors";

const styles = StyleSheet.create({
    mapContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    doneButtonStyle: {
        color: colors.white,
        fontSize: wp("5%"),
    },
    itemView: {
        height: wp("10%"),
        alignContent: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: colors.light_gray,
    },

    currentLocationStyle: {
        height:wp(11),
        width:wp(11),
        borderRadius:wp(11),
        justifyContent: "center",
        alignItems: "center",
        position:'absolute',
        bottom:hp(18),
        right:wp(5),
        backgroundColor:colors.white

    },

    textStyle: {
        color: "black",
        fontSize: wp("4%"),
    },

    locationImageStyle: {
        resizeMode: "contain",
        height: 40,
        width: 40,
    },

    mainView: {
        width: "90%",
        height: "38%",
        bottom: "45%",
        paddingTop: "5%",
        borderRadius: 10,
        position: "absolute",
        backgroundColor: "white",
    },
    itemTextStyle: {
        paddingLeft: wp("2%"),
        paddingRight: wp("1%"),
        fontSize: wp("4%"),
        color: colors.black,
    },
    doneButton: {
        top: "35%",
        width: wp("70%"),
        height: hp("7%"),
        backgroundColor: colors.orange,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    },

    map: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },

    shadow: {
        elevation: 4,
        shadowOpacity: 0.2,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: colors.black,
    },

    textInputStyle:{
        elevation: 4,
        shadowOpacity: 0.2,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: colors.black,
        zIndex: 2,
        justifyContent: "center",
        height: "7%",
        width: "90%",
        bottom: "28%",
        padding: "2%",
        backgroundColor: "white",
        color: colors.black,
        borderRadius: 10,
    },
    currentButtonStyle:{
        width: wp(7),
        height: wp(7),
        resizeMode: 'contain',
        tintColor:colors.light_blackish
    },
    cancelButton:{
        top: "36%",
        width: wp("30%"),
        height: hp("3%"),
        backgroundColor: 'transparent',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    },
    cancelButtonStyle: {
        color: colors.gray,
        fontSize: wp("4.5%"),
        textDecorationLine:'underline'
    },
});

export default styles;
