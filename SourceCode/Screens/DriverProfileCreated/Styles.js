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
    headerView: {
        flex: 0.1,
    },
    bottomContainer: {
        flex: 0.9,
    },
    viewText:{
        flex:0.2,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:'15%',
    },
    textOrderPlaced:{
        fontSize:wp(5),
        fontWeight:'600',
        textAlign:'center',
        lineHeight:27
    },
    viewImage:{
        flex:0.3,
        alignItems:'center',
        justifyContent:'center',
    },
    imageStyle:{
        height:hp(15),
        width:hp(15),
    },
    viewTextDetails:{
        flex:0.3,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:'15%',

    },
    textDetails:{
        fontSize:wp(4),
        fontWeight:'500',
        textAlign:'center',
        lineHeight:24
    },
    viewButton:{
        flex:0.2,
        alignItems:'center',
        justifyContent:'center',
    },
    titleStyles: {
        color: colors.white,
        fontSize: wp(4.5),
        fontWeight: "bold"
    },


});

export default styles;

