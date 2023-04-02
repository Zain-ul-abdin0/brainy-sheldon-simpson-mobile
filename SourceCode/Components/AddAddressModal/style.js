import {Platform, StyleSheet} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from '../../Assets/Colors/colors';


const styles = StyleSheet.create({

    mainContainer:
        {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.3)'
            // backgroundColor:colors.black
        },

    container:
        {
            height:Platform.OS === 'ios' ? hp(34) : hp(35),
            width: wp(80),
            // padding: wp(5),
            backgroundColor: colors.white,
            borderRadius: wp(4),
            shadowOpacity: 0.3,
            shadowRadius: 2,
            shadowOffset: {
                height: 4,
                // width: 1
            },
            elevation: 8
        },
    topTitle:
        {
            height: '25%',
            width: '100%',
            alignItems:'center',
            justifyContent:'center',
            borderBottomWidth:wp(0.1),
            borderColor:colors.placeholder_color
            // backgroundColor:colors.grey,
        },
    textRateApp:
        {
            fontSize: wp(5),
            color: colors.black,
            fontWeight: 'bold',
            textAlign:'center'
        },
    textDescription:
        {
            fontSize: wp(4.5),
            color: colors.black,
            textAlign:'center',
            // fontWeight:'bold'
        },
    textContainer:
        {
            fontSize: wp(4.2),
            color: colors.black,
            textAlign:'center'
        },
    inputContainer:
        {
            height: '22.5%',
            width: '100%',
            alignItems: 'center',
            justifyContent:'center',
            // backgroundColor:colors.grey1,
        },
    line:
        {
            height: '0.5%',
            marginTop: '10%',
            backgroundColor: colors.grey,
        },
    bottomButtons:
        {
            height: '30%',
            width: '100%',
            flexDirection: 'row',
            // justifyContent:'center',
            alignItems: 'center',
            borderTopWidth:wp(0.1),
            borderColor:colors.placeholder_color,
            // justifyContent: 'flex-end',
            // backgroundColor:colors.grey
        },
    rateNowContainer:
        {
            // flex:1,
            height:'50%',
            // backgroundColor:'green',
            // borderTopWidth:wp(0.1),
            // flex:1,
            width: '50%',
            justifyContent: 'center',
            alignItems: 'center',

        },
    laterContainer:
        {
            // flex:1,
            height:'50%',
            // backgroundColor:'green',
            // borderTopWidth:wp(0.1),
            // flex:1,
            width: '50%',
            justifyContent: 'center',
            alignItems: 'center',
            borderColor:colors.placeholder_color,
            borderRightWidth:wp(0.1)
        },
    submitBurron:
        {
            fontSize: wp(4.5),
            color: colors.most_blue_button,
            fontWeight: 'bold',
        },

});
export default styles;
