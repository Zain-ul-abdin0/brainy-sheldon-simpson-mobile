import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity, Platform,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../Assets/Colors/colors';


class ComponentItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={[styles.container]}>
                <View style={styles.leftIconContainer}>
                    <Text style={styles.orderTitle}>Order #</Text>
                    <Text style={[styles.subTitle,{paddingTop:'1%'}]}>{this.props.orderNumber}</Text>
                    <View style={{paddingTop:'4%'}}>
                    <Text style={styles.orderTitle}>Total Cost</Text>
                    <Text style={styles.subTitle}>${this.props.price}</Text>
                    </View>
                </View>
                <View style={styles.rightIconContainer}>
                    <Text style={styles.orderTitle}>Status: <Text style={styles.subTitle}>{this.props.orderStatus}</Text></Text>

                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: hp(15),
        width: wp(95),
        flexDirection: 'row',
        borderBottomWidth: wp(0.1),
        borderBottomColor: colors.deep_grey,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        borderRadius:wp(3),
        alignSelf:'center',
        marginTop: wp(4),
        backgroundColor:colors.white
    },
    leftIconContainer: {
        flex: 0.6,
        paddingLeft: '4%',
        paddingTop: Platform.OS === 'android' ? '1%' : '5%'
    },
    orderTitle:{
        fontSize: wp(4),
        fontWeight:'bold'
    },
    subTitle:{
        fontSize: wp(4),
        fontWeight:'normal'
    },
    rightIconContainer: {
        flex: 0.4,
        paddingTop: Platform.OS === 'android' ? '1%' : '5%'
    },

});
export default ComponentItem;
