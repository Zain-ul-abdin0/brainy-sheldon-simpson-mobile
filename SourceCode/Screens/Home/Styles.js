
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
    inputView: {
        height: hp(9),
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: 'black',
        justifyContent: 'center',
    },
    tabsContainer: {
        // flexGrow: 1,
        height: hp(9),
        width: '100%',
        // backgroundColor: "red",
    },
    flatlistContainer: {
        flex: 1,
        // widt: '100%',
        // backgroundColor: "red"
    },


});
export default Styles;