import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../Assets/Colors/colors';


class DriverHomeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accept:true,
            decline:false,
        };
    }

    onPressAccept = () => {
        this.setState({
            accept:!this.state.accept,decline:!this.state.decline
        })
    }

    onPressDecline = () => {
        this.setState({accept:!this.state.accept,decline:!this.state.decline})
    }

    render() {

        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                <View style={styles.leftIconContainer}>
                    <View style={{flexDirection:'row'}}>
                    <Text style={styles.orderTitle1}>Order Id: </Text>
                    <Text style={styles.orderTitle}>{this.props.orderNumber}</Text>
                        <Text style={styles.orderTitle2}>{this.props.productStatus}</Text>
                    </View>
                <View >
                    <Text style={styles.deliverTo1}>Delivery Location Address: </Text>
                    <Text style={styles.deliverTo}>{this.props.orderAddress}</Text>
                </View>
                </View>
                {/*<View style={styles.btnView}>*/}
                {/*    <TouchableOpacity*/}
                {/*        onPress={this.onPressAccept}*/}
                {/*        style={this.state.accept ? styles.btnShown1 : styles.btnShown }*/}
                {/*    >*/}
                {/*    <Text style={this.state.accept ? styles.btnHeading1 : styles.btnHeading}>Accept</Text>*/}
                {/*    </TouchableOpacity>*/}
                {/*    <TouchableOpacity*/}
                {/*        onPress={this.onPressDecline}*/}
                {/*        style={this.state.decline ? styles.btnShown1: styles.btnShown}*/}
                {/*    >*/}
                {/*        <Text style={this.state.decline ? styles.btnHeading1 : styles.btnHeading}>Decline</Text>*/}
                {/*    </TouchableOpacity>*/}
                {/*</View>*/}
                {/*<View style={[styles.centerTextContainer,]}>*/}
                {/*    <Text style={styles.textStyleUpper}>*/}
                {/*        {this.props.productNames}*/}
                {/*    </Text>*/}
                {/*</View>*/}
                {/*<View style={styles.rightIconContainer}>*/}
                {/*    <Text style={styles.orderTitle}>Status: <Text style={styles.subTitle}>{this.props.orderStatus}</Text></Text>*/}
                {/*    <Text style={styles.orderTitle}>Total Price: <Text style={styles.subTitle}>{'$' + this.props.price}</Text></Text>*/}
                {/*</View>*/}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: hp(18),
        width: wp(95),
        borderWidth: wp(0.3),
        borderBottomColor: colors.black,
        borderRadius:wp(3),
        marginTop: wp(4),
    },
    leftIconContainer: {
        flex: 0.7,
        paddingLeft: '4%',
        paddingTop:'5.7%',
    },
    btnView:{
        flex: 0.5,
        // backgroundColor:'green',
        justifyContent: 'space-around',
        alignItems:'center',
        flexDirection:'row',
        borderBottomRightRadius:wp(3),
        borderBottomLeftRadius:wp(3),

    },
    orderTitle:{
        fontSize: wp(4),
        fontWeight:'500'
    },
    orderTitle1:{
        fontSize: wp(4),
        fontWeight:'bold'
    },
    orderTitle2:{
        marginLeft:wp(1.3),
        fontSize: wp(4),
        fontWeight:'bold',
        color:colors.appGreenColor
    },
    subTitle:{
        fontSize: wp(4),
        fontWeight:'normal'
    },
    rightIconContainer: {
        justifyContent: 'space-around',
        flex: 0.4,
    },
    deliverTo:{
        fontSize: wp(4),
        // marginTop: hp(1),
        fontWeight:'normal',
        width: wp(90),
    },
    deliverTo1:{
        fontSize: wp(4),
        marginTop: hp(1),

        fontWeight:'bold'
    },
    btnShown:{
      height: hp(5),
      width:wp(43),
      borderWidth: 1,
      borderColor: colors.appGreenColor,
        justifyContent: 'center',
        borderRadius: wp(2)
    },
    btnHeading:{
        alignSelf:'center',
        fontSize: wp(4),
        fontWeight:'500',
        color: colors.appGreenColor,
    },
    btnShown1:{
        height: hp(5),
        width:wp(43),
        borderWidth: 1,
        borderColor: colors.appGreenColor,
        justifyContent: 'center',
        borderRadius: wp(2),
        backgroundColor: colors.appGreenColor,
    },
    btnHeading1:{
        alignSelf:'center',
        fontSize: wp(4),
        fontWeight:'500',
        color: colors.white
    }

});
export default DriverHomeComponent;
