//================================ React Native Imported Files ======================================//

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
    View,
    StatusBar,
    Text,
    FlatList,
} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

//================================ Local Imported Files ======================================//

import styles from './Styles';
import colors from '../../Assets/Colors/colors';
import images from '../../Assets/Images/images';
import AppHeader from '../../Components/AppHeader/AppHeader';
import AppLoading from '../../Components/AppLoading/AppLoading';
import DriverHomeComponent from '../../Components/DriverHomeComponent/DriverHomeComponent';


class OrderHistoryDriverComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tintColor:colors.black,
            userUid: auth().currentUser.uid,
            historyProducts: [],
            loading: false,
            productsOrdersDetails: [],
            totalPrice: 0,
            orderYet: false,
            showData: false,
            onRefresh: true,

        }
    }


    componentDidMount() {
        this.setState({loading: true});
        this.focuslistener = this.props.navigation.addListener('focus',() =>{
            this._getAllHistoryOrders();
        })

    }


    componentWillUnmount() {
        this.focuslistener();
    }


    _getAllHistoryOrders = async() => {
        this.setState({loading:true})
        const {userUid} = this.state;
        let dataOrderIdsStatus = [];
        let totalPriceOfProducts = [] ;
        if (userUid !== null) {
            await firestore()
                .collection('Orders')
                .where('orderStatus','==','Delivered')
                .get()
                .then((response) => {
                if(response._docs.length <= 0) {
                    this.setState({
                        showData: false,
                        orderYet: true,
                        loading:false,
                    });
                } else {
                    response._docs.forEach((res) => {
                        res._data.orderProduct.map((resp) => {
                            dataOrderIdsStatus.push({
                                productOrderNumber: res.id,
                                productStatus: res._data.orderStatus,
                                address: res._data.address,
                                price:resp.productPrice,
                                show:false
                            })
                        })
                    })
                    this.setState({
                        totalPrice: totalPriceOfProducts,
                        productsOrdersDetails:dataOrderIdsStatus,
                        showData: true,
                        loading:false,
                        orderYet: false,
                        onRefresh: false,
                    });
                }
            })

        }

    };


    list(item) {
        return (
            <DriverHomeComponent
                productStatus={item.productStatus}
                orderNumber={item.productOrderNumber}
                orderAddress={item.address}
                onPress={() => this.props.navigation.navigate('OrderHistoryDriverDetails',({item,current:false}))}
            />
        );
    }


    render() {
        const {productsOrdersDetails} = this.state;
        return (
            <View style={styles.mainContainer}>
                {AppLoading.renderLoading(this.state.loading)}
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

                        title={"Order History"}
                        onLeftIconPress={() => this.props.navigation.openDrawer()}
                        bgColor={colors.black}
                        tintColor={colors.white}
                        leftIconPath={images.ic_hamburger_menu}
                    />
                </View>
                <View style={styles.flatListView}>
                    {productsOrdersDetails.length <=0 ?
                        <View style={styles.noOrderView}>
                            <Text style={{fontSize:wp(4),fontWeight:'500'}}>No History Yet!</Text>
                        </View> :
                        <FlatList
                            onRefresh={() => {
                                this._getAllHistoryOrders();
                            }}
                            refreshing={this.state.onRefresh}
                            showsVerticalScrollIndicator={false}
                            data={this.state.productsOrdersDetails}
                            renderItem={({item}) => this.list(item)}
                            keyExtractor={(item) => item.id}
                        /> }
                </View>


            </View>
        );
    }
}
export default OrderHistoryDriverComponent;
