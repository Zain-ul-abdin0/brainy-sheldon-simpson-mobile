
//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { StyleSheet } from "react-native";

//================================ Local Imported Files ======================================//

import colors from '../../Assets/Colors/colors';




const Styles = StyleSheet.create({

    mainContainer:
        {
            flex: 1,
            backgroundColor: colors.white,
        },
    headerView:
        {
            flex: 0.1
        },
    flatListView:{
        flex:0.9,
        justifyContent: 'center',
        alignItems:'center'
    },
    noOrderView:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center'
    },
    bottomContainer: {
        flex: 0.9,
    },
    productInfoView: {
        flex:0.2,
        justifyContent: "center",
        alignItems: "center",

    },
    titleProduct:{
        fontSize:wp(5),
        fontWeight:'bold'
    },
    orderNumber:{
        fontSize:wp(3.8),
    },
    requestedView:{
        flex:0.15,
        paddingLeft:'5%'
    },
    innerRequestedView:{
        height: '25%',
        width: '100%',
        flexDirection:'row',
        alignItems: "center",
    },
    verticalView:{
        height: '75%',
        width: 5,
        backgroundColor:colors.placeholder_color,
        marginLeft: '3.5%'

    },
    circleStyle:{
        height:hp(3.5),
        width:hp(3.5),
        resizeMode:'contain'
    },
    titleText:{
        fontSize:wp(4),
        fontWeight: 'bold',
        paddingLeft: '1%'
    }


});
export default Styles;
