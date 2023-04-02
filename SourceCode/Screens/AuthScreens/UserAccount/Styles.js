
//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { StyleSheet } from "react-native";

//================================ Local Imported Files ======================================//

import colors from '../../../Assets/Colors/colors';
import AppInput from '../../../Components/AppInput/AppInput';
import React from 'react';



const Styles = StyleSheet.create({

    mainContainer:
    {
        flex: 1,
        // backgroundColor: colors.dark_red
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
        flex: 1,
        paddingTop: hp(2),
        // backgroundColor: "red"
    },
    dateStyle: {
        borderRadius: wp(2),
        // borderColor: '#9ec600',
        borderWidth: 0.5,
        marginTop: wp(1.5),
        height: hp(7.5),
        width: "85%",
        alignSelf: "center",
        justifyContent: 'center',
        marginBottom: wp(3),

        // alignItems: "center",
        // paddingTop:

        backgroundColor: "white",
    },
    imagePickerIdCard: {
        height: hp(7.5),
        width: "85%",
        backgroundColor: "white",
        alignSelf: "center",
        flexDirection: 'row',
        alignItems: "center",
        borderWidth: 1,
        marginTop: wp(1.5),
        borderRadius: wp(2),
        paddingLeft: wp(2),



    },
    imagePlaceHolder:
    {
        height: wp(12),
        width: wp(12),
        // borderWidth: 4,
        // borderColor: 'green',
        borderRadius: wp(12),
        resizeMode: 'cover',
    },

    validEmail: {
        fontSize: wp(3.5),
        color: colors.black,
        paddingLeft: wp(8),
        fontWeight: "bold"
    },
    buttonView:
    {
        height: hp(10),
        width: '85%',
        // justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        alignSelf: "center",
        paddingTop: wp(3),
        // position:"absolute",

        // top:hp(90),
        // bottom:10,
    },
    buttonStyles:
    {
        borderRadius: wp(2),
        width: '85%',
        marginBottom: wp(4),

    },
    titleStyles: {
        color: colors.white,
        fontSize: wp(4.5),
        fontWeight: "bold"
    },
    addressViewStyle:{
        height:hp(6.5),
        borderWidth:0.5,
        width:wp(85),
        borderRadius:wp(2),
        alignSelf:'center',
        marginBottom:wp(3),
        marginTop:5,
        justifyContent:'center',
        paddingLeft:'3%',
        backgroundColor:colors.white
    }

});
export default Styles;
