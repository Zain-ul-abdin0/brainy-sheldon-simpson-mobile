//================================ React Native Imported Files ======================================//
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {StyleSheet} from 'react-native';
//================================ Local Imported Files ======================================//
import colors from '../../Assets/Colors/colors';

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
    },
    lottie: {
        width: '60%',
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerView: {
        flex: 0.1,
        // backgroundColor:'red'
    },
    bottomContainer: {
        flex: 0.9,
        // backgroundColor:'green',
    },
    flatlistContainer: {
        flex: 0.4,
        // backgroundColor:'orange'
    },
    viewDate:{
        flex: 0.5,
        paddingTop:'4%',
        // backgroundColor:'yellow'
    },
    deliveryDateText:{
        color: colors.grey1,
        fontSize: wp(4.5),
        paddingLeft: '3%',
        paddingBottom:'3%'
    },
    addNewAddressContainer: {
        marginTop: wp(7),
        height: hp(7),
        width: wp(71),
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: wp(2),
        backgroundColor: 'transparent',
        justifyContent: 'center',
        borderWidth: wp(0.2),
        marginBottom: wp(4),
    },
    addressTitle: {
        color: colors.grey1,
        fontSize: wp(3.9),
        paddingLeft: '2%',
        paddingRight: '10%',

    },
    buttonAddAddress: {
        height: hp(6),
        width: wp(75),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: wp(0.1),
        borderColor: colors.placeholder_color,
        borderRadius: wp(2),
        marginBottom: wp(4),
        alignSelf:'center',
        backgroundColor:colors.appButtonColor,
    },
    paymentContainer: {
        flex: 0.1,
        alignItems: 'center',
        marginTop: wp(8),
        // backgroundColor:'red'
    },
    buttonStyles: {
        borderRadius: wp(2),
        width: '85%',
    },
    titleStyles: {
        color: colors.white,
        fontSize: wp(4.5),
    },
    delIcon: {
        resizeMode: 'contain',
        height: hp(4.5),
        width: wp(4.5),
        tintColor: colors.black,
    },
    newAddress: {
        fontSize: wp(4),
        color: colors.black,
        fontWeight: 'bold',
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
    creditCardStyle: {
        width: wp('70%'),
        height: hp('7%'),
        backgroundColor: colors.organeShade,
        marginTop: hp('8%'),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    doneStyle: {
        color: colors.black,
        fontSize: wp('4.5%'),
    },
    paymentProcessStyle: {
        width: wp('70%'),
        height: hp('7%'),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    cancel: {
        fontSize: wp('4%'),
        textDecorationLine: 'underline',
        alignSelf: 'center',
        color: colors.gray,
    },
    titleStyle: {
        color: colors.black,
        fontSize: wp(4),
        fontWeight: "500",
        paddingLeft: '11%',
    },
});

export default styles;
