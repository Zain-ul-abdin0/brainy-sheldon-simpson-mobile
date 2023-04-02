import React from 'react';
import { View, Text, Image, ImageBackground, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { Divider, SocialIcon } from 'react-native-elements';

import Modal from 'react-native-modal';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../Assets/Colors/colors';
import images from '../../Assets/Images/images';
import AppInput from '../AppInput/AppInput';




class AboutModel extends React.Component {



    render() {
        return (
            <View style={styles.mainContainer}>


                <View style={styles.conatiner}>
                    <View style={styles.logo}>
                        <Image
                            style={styles.avatarStyles}
                            source={images.logo}
                        />
                    </View>
                    <View style={styles.onlyText}>
                        <Text style={styles.onlyTextStyle}>Verion 1.00</Text>
                    </View>
                    <View style={styles.onlyText}>
                        <Text style={styles.onlyTextStyle}>Copyright 2020</Text>
                    </View>
                    <View style={styles.onlyText}>
                        <Text style={styles.onlyTextStyle}>SnacksLikes.com</Text>
                    </View>
                    <View style={styles.onlyText}>
                        <Text style={styles.onlyTextStyle}>Developer Name Inc,</Text>
                    </View>


                    <View style={styles.divider}></View>
                    <TouchableOpacity style={styles.postReviewStyle}>
                        <Text style={styles.textStylePost}>Contact Us</Text>
                    </TouchableOpacity>
                    <View style={styles.divider}></View>
                    <TouchableOpacity onPress={this.props.onPressClose} style={styles.postReviewStyle}>
                        <Text style={styles.textStyleClose}>Close</Text>
                    </TouchableOpacity>


                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        // backgroundColor: 'white'
        justifyContent: "center",
        alignItems: "center",

    },
    conatiner:
    {
        height: hp(50),
        width: '80%',
        // flex: 0.3,
        backgroundColor: '#EBE8E6',
        // margin: 10,
        alignSelf: "center",
        marginHorizontal: wp(2),
        borderRadius: wp(3),
        marginTop: wp(3),
        // flexDirection: "row"
    },
    logo: {
        height: hp(20),
        width: '100%',
        // backgroundColor: 'red',
        justifyContent: "center",
        alignItems: "center",
    },
    onlyText: {
        height: hp(3.5),
        width: '100%',
        // backgroundColor: 'yellow',
        justifyContent: "center",
        alignItems: "center",
    },
    onlyTextStyle: {
        fontStyle: "italic"
    },
    avatarStyles: {
        height: wp(28),
        width: wp(28),
        resizeMode: "contain",
        // tintColor: colors.appBrownColor
    },
    snack: {
        height: hp(5),
        width: '100%',
        // justifyContent: "center",
        alignItems: "center",
    },
    image: {
        height: hp(5),
        // backgroundColor: 'red',
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: wp(20),
        alignItems: "center",

    },
    snackReviewInput: {
        height: hp(22),
        // backgroundColor: 'red',
        width: '100%',
        // justifyContent: "center",
        alignItems: "center",
    },
    upload: {
        marginTop: hp(2),
        height: hp(8),
        backgroundColor: colors.white,
        // marginHorizontal: wp(4),
        width: '90%',
        alignSelf: "center",
        borderRadius: wp(2),
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: wp(2),
        alignItems: "center",
    },
    textStyle: {
        marginTop: hp(2),
        height: hp(4),
        justifyContent: "center",
        alignItems: "center",

        // backgroundColor: colors.appBrownColor,
    },
    divider: {
        marginTop: wp(1),
        height: hp(0.1),
        width: "100%",
        backgroundColor: colors.grey
    },
    postReviewStyle: {
        height: hp(6),
        width: "100%",
        // backgroundColor: colors.grey,
        justifyContent: "center", alignItems: "center"
    },
    addReviewStyle: {
        fontSize: wp(4.5),
        fontWeight: "bold"
    },
    snackReviewStyle: {
        fontSize: wp(3.5),
        // fontWeight: "bold"
    },
    uploadStyle: {
        fontSize: wp(3.5),

        // fontWeight: "bold"
    },
    textStyleReview: {
        fontSize: wp(3),
        fontStyle: "italic",
    },
    textStylePost: {
        fontSize: wp(4),
        // fontStyle: "italic",
        color: '#3B99FA'
    },
    textStyleClose: {
        fontSize: wp(4),
        // fontStyle: "italic",
        color: 'red'
    },
    cokieeStyles: {
        height: wp(7),
        width: wp(7),
        resizeMode: "contain",
    },
    addStyles: {
        height: wp(4),
        width: wp(4),
        resizeMode: "contain",
        tintColor: colors.appBrownColor
    },


});

export default AboutModel;