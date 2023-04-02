
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

    bottomContainer: {
        flex: 1,
        // backgroundColor: "red"
    },



});
export default Styles;