import React from 'react';
import { View, Text, Image, ImageBackground, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { Divider, SocialIcon } from 'react-native-elements';

import Modal from 'react-native-modal';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../Assets/Colors/colors';
import images from '../../Assets/Images/images';
import AppInput from '../AppInput/AppInput';




class Category extends React.Component {



    render() {
        return (
            <View style={styles.mainContainer}>
                <TouchableOpacity style={[styles.conatiner, { borderBottomWidth: this.props.borderBottomWidth }, { borderBottomColor: this.props.borderBottomColor }]} onPress={this.props.onPress} activeOpacity={0.2}>
                    <Text style={styles.categoryConatiner}>{this.props.category}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        // backgroundColor: 'white'

    },
    conatiner:
    {
        height: hp(8),
        width: wp(36),
        justifyContent: "center",
        alignItems: "center",
        // flex: 0.3,
        backgroundColor: 'white',
        // margin: 10,
        // alignSelf: "center",
        // marginHorizontal: wp(0.5),
        // borderRadius: wp(3),
        marginTop: wp(2),
        paddingBottom: wp(2),
        borderRightWidth: wp(0.1)
        // flexDirection: "row"
    },
    categoryConatiner: {
        fontSize: wp(4),
        fontWeight: "bold",
        textAlign: "center"
        // alignContent: "center"
    },



});

export default Category;