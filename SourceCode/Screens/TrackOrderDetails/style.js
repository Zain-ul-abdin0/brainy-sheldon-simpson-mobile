
//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import {Platform, StyleSheet} from 'react-native';

//================================ Local Imported Files ======================================//

import colors from '../../Assets/Colors/colors';




const Styles = StyleSheet.create({

    mainContainer:
        {
            flex: 1,
            backgroundColor: colors.white
        },
    headerView:
        {
            flex: 0.1
        },
    bottomContainer: {
        flex: 0.9,
        // backgroundColor: "red"
    },
    statusViews:{
      flex:0.9,
      // backgroundColor:'green'
    },
    buttonView:{
        flex:0.1,
        // backgroundColor: "red",
        alignItems:'center'
    },
    productInfoView: {
        flex:0.2,
        // backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        // borderBottomWidth:wp(0.1),
        // borderColor:colors.placeholder_color

    },

    titleProduct:{
        fontSize:wp(5),
        fontWeight:'bold',
        paddingBottom:'1.5%'
    },
    orderNumber:{
        fontSize:wp(3.8),
        fontWeight:'600'
    },
    requestedView:{
        flex:0.2,
        // backgroundColor: "green",z
        // borderBottomWidth:wp(0.1),
        // borderColor:colors.placeholder_color,
        paddingLeft:'5%'
    },
    innerRequestedView:{
        height: '25%',
        width: '100%',
        flexDirection:'row',
        // justifyContent: "center",
        alignItems: "center",
        // backgroundColor:'pink'
    },
    verticalView:{
        height: '75%',
        width: 5,
        backgroundColor:colors.placeholder_color,
        marginLeft:Platform.OS === 'ios'? '3.5%' :'2.7%'
        // alignItems: "center",

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
