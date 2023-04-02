import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../Assets/Colors/colors';


class OrderHistoryProductInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
            // let totalPrice=this.props.totalPrice.toFixed(3)
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={[styles.container]}>
                <View style={styles.leftIconContainer}>
                    <Image style={styles.leftIconStyle}
                           source={{uri: this.props.imageItem}}
                    />
                </View>
                <View style={[styles.centerTextContainer,]}>
                    <Text numberOfLines={2} style={styles.textStyleUpper}>
                        {this.props.productName}
                    </Text>
                </View>
                <View style={styles.rightIconContainer}>
                    <Text  style={{fontSize: wp(4)}}>
                        $ {this.props.totalPrice}
                    </Text>
                </View>

            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: hp(15),
        width: wp(95),
        // backgroundColor:colors.dark_green,
        flexDirection: 'row',
        // borderBottomWidth: wp(0.1),
        // borderBottomColor: colors.deep_grey,
        // alignItems: 'center',
        elevation: 2,
        shadowColor: 'rgba(0,0,0,0.9)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        borderRadius:wp(3),
        alignSelf:'center',
        marginTop: wp(2),
        backgroundColor:colors.white
    },
    leftIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.3,
        // shadowOffset: {width: 1, height: 1},
        // backgroundColor: 'red',
    },
    orderTitle:{
        fontSize: wp(4),
        fontWeight:'bold'
    },
    subTitle:{
        fontSize: wp(4),
        fontWeight:'normal'
    },
    centerTextContainer: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: colors.dark_orange,
    },
    rightIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.3,
        // backgroundColor:'green'
    },
    leftIconStyle: {
        height: '60%',
        width: '60%',
        resizeMode: 'contain',
        // marginLeft:wp(3),
    },
    // rightIconStyle: {
    //     height: wp(10),
    //     width: wp(10),
    //     resizeMode: 'contain',
    // },
    textStyleUpper: {
        fontSize: wp(5),
        color: colors.heading_text,
    },
    // textStylelower: {
    //     fontSize: wp(3.8),
    //     color: colors.black,
    //     marginTop: wp(5),
    // },
    // firstIconContainer: {
    //     flex: 1,
    //     // backgroundColor:colors.bright_red,
    //     alignItems: 'center',
    // },
    // secondIconConatiner: {
    //     flex: 1,
    //     alignItems: 'center',
    //     // backgroundColor:colors.dark_grey,
    // },
    // rightText: {
    //     fontSize: wp(5.5),
    //     color: colors.price_text,
    // },
});
export default OrderHistoryProductInfo;
