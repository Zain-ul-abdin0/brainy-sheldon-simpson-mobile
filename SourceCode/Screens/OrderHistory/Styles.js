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
    headerView: {
        flex: 0.1,
    },
    container: {
        flex: 0.9,
    },

    viewListContainer: {
        flex: 1,
        backgroundColor: colors.white_most_dark,
    },
    PricesView: {
        flex: 0.2,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 3,
        backgroundColor: colors.white_dark,
    },
    viewTextList: {
        height: wp(10),
        width: '100%',
        justifyContent: 'space-between',
    },
    viewLine: {
        height: 2,
        width: '50%',
        marginHorizontal: '25%',
        backgroundColor: colors.black,
        marginTop: wp(5),
        marginBottom: wp(5),
    },
    viewTotalText: {
        flexDirection: 'row',
        height: wp(15),
        justifyContent: 'space-between',
        paddingHorizontal: wp(9.5),
    },
    viewTotalTextInner: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        flex: 1,
    },
    textStyleTotal: {
        fontSize: wp(5),
        color: colors.heading_text,
    },
    viewDeliveryText: {
        flexDirection: 'row',
        height: wp(15),
        justifyContent: 'space-between',
        paddingHorizontal: wp(4),
        marginBottom: wp(2),
    },
    viewDeliveryTextInner: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        flex: 1,
    },
    textStyleDelivery: {
        fontSize: wp(4),
        color: 'blue',
    },
    noOrderYet: {
        fontSize: wp(4),
        fontWeight: '500',
    },
    noOrderYetStyle: {
        flex: 0.91,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default styles;
