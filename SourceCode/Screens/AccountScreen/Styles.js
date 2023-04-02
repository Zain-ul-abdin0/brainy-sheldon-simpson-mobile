
//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { StyleSheet } from "react-native";

//================================ Local Imported Files ======================================//

import colors from '../../Assets/Colors/colors';




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
    uperContainer: {
        height: hp(18),
        width: '100%',
        // backgroundColor: "red",
        flexDirection: "row",
        marginTop: wp(2),
    },
    leftContainer: {
        height: '100%',
        width: '30%',
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "blue"
    },
    middleContainer: {
        height: '100%',
        width: '60%',
        // backgroundColor: "grey"

    },
    uperTextContainer: {
        height: '40%',
        width: '100%',
        // backgroundColor: "orange",
        justifyContent: "center",
        paddingTop: wp(2),
        // alignItems: "center",
    },
    bottomTextContainer: {
        height: '60%',
        width: '100%',
        // backgroundColor: "green"
    },
    rightContainer: {
        height: '100%',
        width: '20%',
        // backgroundColor: "yellow",
        paddingTop: wp(6),
        paddingLeft: wp(2),
        // paddingLeft: wp(4)

    },
    dividerContainer: {
        height: wp(0.1),
        width: '100%',
        backgroundColor: "grey",
    },
    addressContainer: {
        marginTop: wp(1),
        height: hp(6),
        width: '100%',
        // backgroundColor: "grey",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: wp(4),
        alignItems: "center",
    },
    flatListContainer: {
        height: hp(38),
        width: '100%',
        marginTop: wp(2),
        // backgroundColor: "grey",
    },
    buttonStyles:
    {
        borderRadius: wp(1),
        width: '85%',
        borderColor: colors.black,
        borderWidth: wp(0.2),
        // marginBottom: wp(4),

    },
    titleStyles: {
        color: colors.appButtonColor,
        fontSize: wp(4.2),
        // fontWeight: "bold"
    },
    buttonContainer: {
        marginTop: wp(2),
        justifyContent: "center",
        height: hp(12),

        // width: '100%',
        // backgroundColor: "grey",
        paddingLeft: hp(10)

    },
    paymentContainer: {
        // marginTop: wp(1),
        flexDirection: "row",
        justifyContent: "space-between",
        height: hp(5.5),
        // backgroundColor: "grey",
        width: '100%',
        alignItems: "center",
        paddingHorizontal: wp(4)
    },
    imageStyles:
    {
        height: hp(11),
        width: hp(11),
        resizeMode: 'cover',
        borderRadius: hp(11)

    },
    ic_penStyles: {
        height: wp(5),
        width: wp(5),
        tintColor: "#686868",
        resizeMode: 'contain',
    },
    uperTextStyleContainer: {
        fontWeight: 'bold',
        fontSize: wp(4.5),
    },
    uperTextStyleNumber: {
        // fontWeight: 'bold',
        fontSize: wp(4),
        color: '#6B6B6B'
    },
    lowerTextStyleContainer: {
        fontSize: wp(4),
        color: '#6B6B6B'
    },
    addressStyleContainer: {
        fontSize: wp(4.5),
        color: '#666666'
    },
    paymentStyleContainer: {
        fontSize: wp(4),
        color: colors.black,
        fontWeight: "bold"
    },
    // address New
    titleStyle: {
        color: colors.black,
        fontSize: wp(4),
        fontWeight: "500",
        paddingLeft: '11%',
    },
    addressComponentStyle: {
        height: hp(9),
        width: wp(95),
        borderWidth: wp(0.1),
        borderColor: colors.placeholder_color,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: wp(3),
        borderRadius: wp(3),
        // paddingTop: '1%',
        // backgroundColor:'red'
    },
    addressTitle: {
        color: colors.grey1,
        fontSize: wp(3.9),
        paddingLeft: '2%',
        paddingRight: '10%',

    },



});
export default Styles;
