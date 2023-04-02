import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import images from '../../Assets/Images/images';
import colors from '../../Assets/Colors/colors';



export default class PaymentsComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            viewShow: true,
        }

    }


    render() {

        return (

            <View style={styles.mainContainer}>

                <TouchableOpacity style={[styles.itemList,]} onPress={this.props.onPressItem}>
                    <View style={styles.imageView}>
                        <Image style={[styles.image]} source={this.props.leftImage} />
                        <Text style={styles.title}>{this.props.title}</Text>
                    </View>
                    <Image style={[styles.icon]} source={this.props.rightImage} />
                </TouchableOpacity>


            </View>
        )
    }
}

const styles = StyleSheet.create({

    mainContainer:
    {
        flex: 1,
        justifyContent: 'center',
        // backgroundColor: colors.app_light_color,
        // marginTop:50
    },
    itemList: {
        minHeight: hp(6),
        width: wp(90),
        alignSelf: 'center',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: wp(10),
        borderColor: '#e3e3e3',
        paddingHorizontal: '4%',
        marginTop: 7,
        backgroundColor: '#f5f5f5'
    },
    imageView: {
        // width:'100%',
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent:'space-between',
        // paddingVertical:'2%',
        // paddingRight:'3%'
    },
    textView: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    image: {
        height: 25,
        width: 25,
        resizeMode: 'contain',

    },
    icon: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
    },
    title: {
        fontSize: wp(4),
        fontWeight: 'bold',
        color: colors.black,
        paddingLeft: '3%'
        // paddingTop:'2%',
    },


});

