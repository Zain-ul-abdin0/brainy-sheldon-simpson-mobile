import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import colors from '../../Assets/Colors/colors';

let Styles = {
    drawerMainContainer: {
        width: "100%", height: hp(100),

    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    backgroundImageContainer: {
        width: "100%", height: hp(100),
    },
    userInfoContainer: {
        width: "100%",
        height: "20%",
        paddingTop: wp(5),
        // backgroundColor: colors.appDarkBlue,
        flexDirection: "row",


    },
    userImageContainer: {
        width: "40%",
        justifyContent: "center",
        alignItems: "center",
    },

    userProfileImage: {
        width: hp(11),
        height: hp(11),
        resizeMode: 'cover',
        borderRadius: hp(11),
    },
    userTextContainer: {
        width: "60%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: wp(5),


    },
    userNameText: {
        textAlign: "center",
        color: colors.appYellow,
        fontSize: 17,
        fontWeight: "bold"
    },
    emailText: {
        marginTop: 5,
        textAlign: "center",
        color: "white",
        fontSize: 13
    },
    drawerItemsContainer: {
        width: "100%",
        height: "70%",
        marginTop: 10,

    },
    drawerItemLabelText: {
        fontWeight: "500",
        fontSize: wp(4),
        // color: colors.appGreenColor
    },
    drawerItemImage: {
        width: 24,
        height: 24,
        // tintColor: colors.grey1,
        resizeMode: "contain"
    }
    ,
    drawerItemStyles:
    {
        height: wp(14),
        // width:wp(100),
        marginVertical: wp(0.5),
        // backgroundColor: 'red',

        justifyContent: 'center',

    }

};
export default Styles;
