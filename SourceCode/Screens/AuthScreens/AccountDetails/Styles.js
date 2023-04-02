
//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import {Platform, StyleSheet} from 'react-native';

//================================ Local Imported Files ======================================//

import colors from '../../../Assets/Colors/colors';



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
        flex: 0.15
    },
    bottomContainer: {
        flex: 0.9,
        backgroundColor: "red"
    },
    imagePickerContainer: {
        height: hp(20),
        width: '100%',
        // backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
    },
    tabsContainer: {
        // flex:1
        height:Platform.OS === 'ios' ? hp(105) : hp(115),
        width: '100%',
        // backgroundColor: "red",
    },
    imagePlaceHolder:
    {
        height: wp(30),
        width: wp(30),
        borderRadius: wp(30),
        resizeMode: "cover",
    },

});
export default Styles;
