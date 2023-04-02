import React from 'react';
import { View, Text, Image, ImageBackground, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { Divider, SocialIcon } from 'react-native-elements';

import Modal from 'react-native-modal';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../Assets/Colors/colors';
import images from '../../Assets/Images/images';
import AppInput from '../AppInput/AppInput';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';


var radio_props = [
    { value: 1 },
    // { label: 'param2', value: 1 }
];

class AddressComponet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            value: 0,

        }
    }


    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.conatiner}>
                    <View style={styles.radioButtonConatiner}>
                        <RadioForm
                            radio_props={radio_props}
                            initial={1}
                            labelColor={colors.black}
                            buttonSize={15}
                            buttonOuterSize={25}
                            // buttonColor={colors.black}
                            buttonInnerColor={'#e74c3c'}
                            onPress={(value) => { this.setState({ value: value }) }}
                        />
                    </View>
                    <View style={styles.homeTitleConatiner}>

                        <View style={styles.TitleConatiner}>
                            <Text style={styles.titleStyle}>{this.props.mainTitle}</Text>
                        </View>

                        <View style={styles.mainAddressConatiner}>
                            <Text style={styles.homeStyle}>{this.props.mainAddress}</Text>
                        </View>

                    </View>

                    <TouchableOpacity style={styles.delConatiner}>
                        <Image style={styles.delIcon} source={images.trash} />

                    </TouchableOpacity>

                </View>
                <View style={styles.dividerConatiner}/>


            </View>
        );
    }
}


const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        // backgroundColor: 'red'

    },
    conatiner:
    {
        height: hp(12),
        width: wp(100),
        // justifyContent: "center",
        // alignItems: "center",
        // flex: 0.3,
        // backgroundColor: 'grey',
        // margin: 10,
        // alignSelf: "center",
        // marginHorizontal: wp(0.5),
        // borderRadius: wp(3),
        // marginTop: wp(2),
        // paddingBottom: wp(2),
        // borderRightWidth: wp(0.1)
        flexDirection: "row"
    },
    radioButtonConatiner: {
        height: '100%',
        width: '20%',
        // backgroundColor: 'red',
        justifyContent: "center",
        alignItems: "center",
    },
    homeTitleConatiner: {
        height: '100%',
        width: '65%',
        // backgroundColor: 'pink',
    },
    delConatiner: {
        height: '100%',
        width: '15%',
        justifyContent: "center",
        alignItems: "center",
    },
    mainAddressConatiner: {
        height: '50%',
        width: '100%',
        // backgroundColor: 'yellow',

    },

    TitleConatiner: {
        height: '50%',
        width: '100%',
        // backgroundColor: "green",
        justifyContent: "center"
    },
    titleStyle: {
        color: colors.black,
        fontSize: wp(4.5),
        fontWeight: "bold"
    },
    homeStyle: {
        color: colors.grey1,
        fontSize: wp(3.8),
        // textAlign: "center"
    },
    delIcon: {
        resizeMode: "contain",
        height: hp(6),
        width: wp(6),
        tintColor: colors.appBlue
    },
    dividerConatiner: {
        height: wp(0.1),
        width: '100%',
        backgroundColor: colors.grey1,

    },




});

export default AddressComponet;
