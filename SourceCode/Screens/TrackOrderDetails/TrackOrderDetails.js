//================================ React Native Imported Files ======================================//

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
    View,
    StatusBar,
    Image,
    Text,
} from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//

import styles from './style';
import colors from '../../Assets/Colors/colors';
import images from '../../Assets/Images/images';
import AppHeader from '../../Components/AppHeader/AppHeader';
import Button from '../../Components/Button/Button';
import firestore from '@react-native-firebase/firestore';
import CommonDataManager from '../Singleton';


class TrackOrderDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userUid: CommonDataManager.getInstance().getUser(),
            buttonView: false,
            tintColorRequested: colors.placeholder_color,
            tintColorAccepted: colors.placeholder_color,
            tintColorDelivered: colors.placeholder_color,
            tintColorReceived: colors.placeholder_color,
            backgroundRequested: colors.placeholder_color,
            backgroundAccepted: colors.placeholder_color,
            backgroundDelivered: colors.placeholder_color,
            productOrderNumber: this.props.route.params.productOrderNumber,
            productName: this.props.route.params.productName,
            orderStatus: this.props.route.params.productStatus,

        }
    }

    componentDidMount() {
        const { orderStatus, } = this.state;
        this.lisenter = this.props.navigation.addListener('focus', () => {
            if (orderStatus === 'Delivered') {
                // this.setState({ buttonView: true })
            }
            this.checkProductStatus();
        })
    }

    componentWillUnmount() {
        this.lisenter();
    }

    checkProductStatus = () => {
        const { orderStatus, } = this.state;
        if (orderStatus === 'Requested') {
            this.setState({ tintColorRequested: colors.black, })
        }
        else if (orderStatus === 'Accepted') {
            this.setState({ tintColorAccepted: colors.black, tintColorRequested: colors.black, backgroundRequested: colors.black })
        }
        else if (orderStatus === 'OnRoute') {
            this.setState({ tintColorDelivered: colors.black, tintColorAccepted: colors.black, tintColorRequested: colors.black, backgroundRequested: colors.black, backgroundAccepted: colors.black })
        }
        else if (orderStatus === 'Delivered') {
            this.setState({ tintColorReceived: colors.black, tintColorDelivered: colors.black, tintColorAccepted: colors.black, tintColorRequested: colors.black, backgroundRequested: colors.black, backgroundAccepted: colors.black, backgroundDelivered: colors.black })
        }
    }


    onPressReceived = () => {
        const { orderStatus, productOrderNumber, userUid } = this.state;
        if (userUid) {
            firestore()
                .collection('Orders')
                .doc(productOrderNumber)
                .update({
                    orderStatus: 'Received'
                }).then(() => {
                    this.setState({ tintColorReceived: colors.black, backgroundDelivered: colors.black, tintColorAccepted: colors.black, tintColorRequested: colors.black, backgroundRequested: colors.black, backgroundAccepted: colors.black }, () => {
                        this.setState({ buttonView: false });
                        this.checkProductStatus();
                    })
                })
        }

    }

    _getAllHistoryOrders = async() => {
        const { userUid } = this.state;
        let dataOrderIdsStatus = [];
        let totalPriceOfProducts = [];
        if (userUid !== null) {
           await firestore()
                .collection('Orders')
                .where('userId', '==', userUid)
                .get().then((response) => {
                    if (response._docs.length <= 0) {
                        this.setState({
                            showData: false,
                            orderYet: true,
                        });
                    } else {
                        response._docs.forEach((res) => {
                            res._data.orderProduct.map((resp) => {
                                dataOrderIdsStatus.push({
                                    productOrderNumber: res.id,
                                    productStatus: res._data.orderStatus,
                                    price: resp.productPrice,
                                    productName: resp.productName,
                                })
                            })
                        })
                        this.setState({
                            totalPrice: totalPriceOfProducts,
                            productsOrdersDetails: dataOrderIdsStatus,
                            showData: true,
                            orderYet: false,
                            onRefresh: false,
                        }, () => {
                        });
                    }
                })
        }

    };



    render() {
        const { tintColorRequested, tintColorAccepted, tintColorDelivered, tintColorReceived, backgroundRequested, backgroundAccepted, backgroundDelivered, productOrderNumber, orderStatus, productName } = this.state;
        console.log('orderStatus', orderStatus);
        return (
            <View style={styles.mainContainer}>

                {/* //================================ StatusBar ======================================// */}
                <StatusBar
                    barStyle="dark-content"
                    hidden={false}
                    backgroundColor={colors.statusBarColor}
                    translucent={false}
                />
                {/* //================================ Header ======================================// */}
                <View style={styles.headerView}>
                    <AppHeader

                        title={"Track Order Details"}
                        onLeftIconPress={() => this.props.navigation.goBack()}
                        bgColor={colors.black}
                        tintColor={colors.white}
                        leftIconPath={images.headerLeftBack}
                    // rightIconOnePath={images.cart}
                    />
                </View>
                <View style={styles.bottomContainer}>
                    <View style={styles.statusViews}>
                        <View style={styles.productInfoView}>
                            <Text style={styles.titleProduct} >{productName}</Text>
                            <Text style={styles.orderNumber}>Order Number: <Text style={{ fontWeight: 'normal' }}>{productOrderNumber}</Text></Text>
                        </View>

                        <View style={styles.requestedView}>
                            <View style={styles.innerRequestedView}>
                                <Image style={[styles.circleStyle, { tintColor: tintColorRequested }]} source={images.ic_circle} />
                                <Text style={styles.titleText}>Requested</Text>
                            </View>
                            <View style={[styles.verticalView, { backgroundColor: backgroundRequested }]} />
                        </View>

                        <View style={styles.requestedView}>
                            <View style={styles.innerRequestedView}>
                                <Image style={[styles.circleStyle, { tintColor: tintColorAccepted }]} source={images.ic_circle} />
                                <Text style={styles.titleText}>Accepted</Text>
                            </View>
                            <View style={[styles.verticalView, { backgroundColor: backgroundAccepted }]} />
                        </View>

                        <View style={styles.requestedView}>
                            <View style={styles.innerRequestedView}>
                                <Image style={[styles.circleStyle, { tintColor: tintColorDelivered }]} source={images.ic_circle} />
                                <Text style={styles.titleText}>OnRoute</Text>
                            </View>
                            <View style={[styles.verticalView, { backgroundColor: backgroundDelivered }]} />
                        </View>

                        <View style={styles.requestedView}>
                            <View style={styles.innerRequestedView}>
                                <Image style={[styles.circleStyle, { tintColor: tintColorReceived }]} source={images.ic_circle} />
                                <Text style={styles.titleText}>Delivered</Text>
                            </View>
                        </View>

                    </View>

                    <View style={styles.buttonView}>
                        {this.state.buttonView && <Button
                            title={'Received'}
                            activeOpacity={0.7}
                            height={hp(8)}
                            width={'80%'}
                            style={styles.buttonStyles}
                            titleColor={colors.appBlue}
                            bgColor={colors.appButtonColor}
                            titleStyle={{ color: colors.white, fontWeight: 'bold', fontSize: wp(4), }}
                            onPress={this.onPressReceived}
                        />}
                    </View>

                </View>

            </View>
        );
    }
}
export default TrackOrderDetails;
