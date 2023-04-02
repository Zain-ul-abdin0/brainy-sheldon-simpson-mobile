import {StyleSheet} from 'react-native';
import colors from '../../Assets/Colors/colors';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
    },
    imageStyles: {
        height: hp(12),
        width: hp(12),
        borderRadius: hp(12),
    },
    headerView: {
        flex: 0.1,
        backgroundColor:'red',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    welcomeTextStyle: {
        fontSize: wp(6),
        color: colors.black,
    },
    logo: {
        flex: 0.9,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor:'red'
    },
    logoStyle: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    bottomView: {
        flex: 0.12,
        borderTopWidth: 0.5,
        backgroundColor: '#F8F8F8',
        flexDirection: 'row',
    },
    leftView: {
        width: '50%',
        height: '100%',
        alignItems: 'center',
    },
    rightView: {
        width: '50%',
        height: '100%',
        alignItems: 'center',
    },
    bottleStyle: {
        width: hp(4),
        height: hp(4),
        resizeMode: 'contain',
        marginTop: wp(2),
    },
    btnView:{
        flex:0.1,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        // backgroundColor:'brown'
    },
    flatListView:{
        flex:0.9,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:'green'
    },
    btnShown:{
        height: hp(5),
        width:wp(43),
        borderWidth: 1,
        borderColor: colors.appGreenColor,
        justifyContent: 'center',
        borderRadius: wp(2)
    },
    btnHeading:{
        alignSelf:'center',
        fontSize: wp(4),
        fontWeight:'500',
        color: colors.appGreenColor,
    },
    btnShown1:{
        height: hp(5),
        width:wp(43),
        borderWidth: 1,
        borderColor: colors.appGreenColor,
        justifyContent: 'center',
        borderRadius: wp(2),
        backgroundColor: colors.appGreenColor,
    },
    btnHeading1:{
        alignSelf:'center',
        fontSize: wp(4),
        fontWeight:'500',
        color: colors.white
    },
    noOrderYetStyle: {
        flex: 0.91,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noOrderYet: {
        fontSize: wp(4),
        fontWeight: '500',
    },
});
export default styles;
