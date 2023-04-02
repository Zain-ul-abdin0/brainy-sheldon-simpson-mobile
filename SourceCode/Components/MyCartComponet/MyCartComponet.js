import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../Assets/Colors/colors';
import images from '../../Assets/Images/images';


class MyCartComponet extends React.Component {


    render() {
        return (
            <View >
                <View style={styles.conatiner}>
                    <View style={styles.picConatiner}>
                        <Image style={styles.imageStyles} source={{ uri: this.props.productPic }}></Image>

                    </View>
                    <View style={styles.middleConatiner}>
                        <View style={styles.mainTitle}>

                            <Text numberOfLines={3} style={styles.mainTitleStyle}>{this.props.mainProductName}</Text>
                        </View>
                        <View style={styles.quantityContainer}>
                            <Text style={styles.quantityStyle}>Quantity</Text>
                            <Text style={styles.numberStyle}>{this.props.quantityNumber}</Text>
                        </View>
                        <View style={styles.appinputContainer}>
                            {/*<AppInput*/}
                            {/*    height={hp(5)}*/}
                            {/*    fontSize={10}*/}
                            {/*    placeholder={'Comment...'}*/}
                            {/*    colortextInput={colors.black}*/}
                            {/*    placeholderTextColor={'#B6B6B6'}*/}
                            {/*    backgroundColor={'transparent'}*/}
                            {/*    borderBottomWidth={0.7}*/}
                            {/*    borderColor={'#B6B6B6'}*/}
                            {/*// paddingLeft={wp(5)}*/}

                            {/*// marginBottom={wp(3)}*/}
                            {/*// marginTop={5}*/}
                            {/*// borderRadius={wp(2)}*/}
                            {/*// borderColor*/}
                            {/*// borderWidth={0.5}*/}
                            {/*// onChangeText={(email) => this.setState({ email })}*/}
                            {/*// value={this.state.email}*/}

                            {/*/>*/}

                        </View>



                    </View>
                    <View style={styles.numberContainer}>
                        <Text numberOfLines={1} style={styles.numberContainerStyle}>{"$" + this.props.price}</Text>
                        <TouchableOpacity
                            onPress={this.props.onPress}
                            style={{
                                height: 50,
                                width: 80,
                                //   backgroundColor: 'red',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Image
                                // source={images.ic_play}
                                style={{height: wp(5.5), width: wp(5.5), resizeMode: 'contain'}}
                                source={images.ic_delete}
                            />
                        </TouchableOpacity>

                    </View>


                </View>
                <View style={styles.divider}>
                </View>

            </View>
        );
    }
}


const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        backgroundColor: 'white',

    },
    conatiner:
    {
        height: hp(20),
        width: '100%',
        flexDirection: "row"
    },
    picConatiner: {
        height: '100%',
        width: '30%', justifyContent: "center", alignItems: "center",
    },
    middleConatiner: {
        height: '100%',
        width: '50%',
        paddingHorizontal: wp(2),
    },
    numberContainer: {
        height: '100%',
        width: '20%',
        alignItems: 'center',
        paddingTop: wp(4),
    },
    divider: {
        height: wp(0.1),
        width: '100%',
    },
    mainTitle: {
        height: '50%',
        width: '90%',

    },
    quantityContainer: {
        // height: '40%',
        width: '90%',
        flexDirection: "row",
        alignItems: "center",
        // backgroundColor:'red',
        marginTop:wp(10)
    },
    mainTitleStyle: {
        color: colors.black,
        fontSize: hp(2.2),
        paddingTop: '10%',


    },
    quantityStyle: {
        color: '#ABABAB',
        fontSize: hp(2.3),
    },
    numberContainerStyle: {
        color: colors.appGreenColor,
        fontSize: hp(2.5),
        fontWeight: "bold",
        textAlign: "center"
    },
    numberStyle: {
        color: '#666666',
        fontSize: hp(2.3),
        paddingLeft: wp(3)
    },

    imageStyles:
    {
        height: wp(25),
        width: wp(25),
        resizeMode: 'contain'
    },
    appinputContainer: {
        height: '8%',
        width: '100%',
        borderBottomWidth:wp(0.1),
        borderColor:colors.placeholder_color
    }



});

export default MyCartComponet;
