import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';

import styles from './style';
import colors from '../../Assets/Colors/colors';
import AppInput from '../AppInput/AppInput';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";


class AddAddressModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            // dummyText: 'If you love our app we would appreciate you if you take a couple' +
            //     ' of seconds to rate us  in the app market!',

        }
    }

    render() {
        return (

            <View style={styles.mainContainer}>

                <View style={styles.container}>

                    <View style={styles.topTitle}>
                        <Text style={styles.textRateApp}>Add Address</Text>
                    </View>
                    <View style={[styles.inputContainer,{borderBottomWidth:wp(0.1),borderColor:colors.placeholder_color}]}>
                        <AppInput
                            textInputColor={colors.black}
                            placeholder={"Enter Name (ex: Home, WorkPlace)"}
                            placeholderTextColor={colors.placeholder_color}
                            value={this.props.nameAddress}
                            onChangeText={this.props.onChangeNameAddress}
                            keyboardType={"email-address"}
                            borderWidth={wp(0.1)}
                            borderColor={colors.white}

                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <AppInput
                            textInputColor={colors.black}
                            placeholder={"Enter Address"}
                            placeholderTextColor={colors.placeholder_color}
                            value={this.props.address}
                            onChangeText={this.props.onChangeText}
                            keyboardType={"email-address"}
                            borderWidth={wp(0.1)}
                            borderColor={colors.white}

                        />
                    </View>

                    <View style={styles.bottomButtons}>
                        <TouchableOpacity onPress={this.props.onPressCancel} style={styles.laterContainer}>
                            <Text style={[styles.submitBurron,]}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.rateNowContainer} onPress={this.props.onPressAdd}>
                            <Text style={styles.submitBurron}>Add</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        )
    }
}

export default AddAddressModal;
