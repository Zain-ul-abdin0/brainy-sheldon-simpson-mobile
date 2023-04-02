
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
    titleContainer: {
        height: hp(8),
        width: "100%",
        // backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",

    },
    subTitleContainer: {
        height: hp(7),
        width: "100%",
        // backgroundColor: "green",
        flexDirection: "row",
    },
    quantityContainer: {
        height: hp(7),
        width: "100%",
        // backgroundColor: "green",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingRight: wp(9)

    },
    dividerContainer: {
        height: hp(0.1),
        width: "100%",
        backgroundColor: "grey",
    },
    ratingContainer: {
        height: hp(8),
        width: "100%",
        // backgroundColor: "green",
        justifyContent: "center",
        alignItems: "center",
        marginTop: wp(2),
    },
    reviewContainer: {
        height: hp(35),
        width: "100%",
        // backgroundColor: "green",
    },
    buttonContainer: {
        height: hp(18),
        width: "100%",
        // backgroundColor: "green",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonStyles:
    {
        // borderRadius: wp(2),
        width: '85%',
        // marginBottom: wp(4),

    },
    titleStyles: {
        color: colors.white,
        fontSize: wp(4.5),
        // fontWeight: "bold"
    },
    subTitleAndPriceContainer: {
        height: '100%',
        width: '80%',
        // backgroundColor: "blue",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: hp(9)
    },
    priceContainer: {
        height: '100%',
        width: '20%',
        // backgroundColor: "pink",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    titleStyleContainer: {
        color: colors.black,
        fontWeight: "bold",
        fontSize: wp(5.3),
        paddingTop: wp(4)

    },
    subTitleStyleContainer: {
        color: '#A7A7A7',
        // fontWeight: "bold",
        fontSize: wp(3.5)
    },
    reviewStyleContainer: {
        color: '#A7A7A7',
        // fontWeight: "bold",
        fontSize: wp(3.5)
    },
    priceStyleContainer: {
        color: '#5FBFDC',
        fontWeight: "bold",
        fontSize: hp(3.5)
    },
    quantityStyleContainer: {
        fontSize: wp(4),
        color: '#AAAAAA'
    },
    quantityNumberStyleContainer: {
        fontSize: wp(4),
        color: colors.black,
        paddingLeft: wp(2)
    },


});
export default Styles;