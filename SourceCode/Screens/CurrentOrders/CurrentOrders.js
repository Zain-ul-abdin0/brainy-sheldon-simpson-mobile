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

//================================ Local Imported Files ======================================//

import styles from './Styles';
import colors from '../../Assets/Colors/colors';
import images from '../../Assets/Images/images';
import AppHeader from '../../Components/AppHeader/AppHeader';
import DriverHomeComponent from '../../Components/DriverHomeComponent/DriverHomeComponent';
import AppLoading from '../../Components/AppLoading/AppLoading';
import FirebaseHelper from '../../Firebase/FirebaseHelper';


class CurrentOrders extends React.Component {
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
            check_box: [],
        }
    }


    componentDidMount() {
        this.setState({loading: true});
        this.focuslistener = this.props.navigation.addListener('focus',() => {
            // this.getStatus();
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
        let statusArray = [];
        let totalPriceOfProducts = [] ;
        if (userUid !== null) {
            FirebaseHelper.fetchOrdersOfOneId((response) =>{
                if(response === undefined) {
                    this.setState({showData: false, orderYet: true, onRefresh: false, loading:false,});
                } else {
                    response.map((resp) => {
                        dataOrderIdsStatus.push({
                            productOrderNumber: resp.id,
                            productStatus: resp._data.orderStatus,
                            address: resp._data.address,
                            show:true
                        })
                    });
                    this.setState({
                        totalPrice: totalPriceOfProducts,
                        productsOrdersDetails:dataOrderIdsStatus,
                        loading:false,
                        showData: true,
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
                onPress={() => this.props.navigation.navigate('OrderHistoryDriverDetails',({item,current:true,}))}
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

                        title={"Current Orders"}
                        onLeftIconPress={() => this.props.navigation.openDrawer()}
                        bgColor={colors.black}
                        tintColor={colors.white}
                        leftIconPath={images.ic_hamburger_menu}
                    />
                </View>
                <View style={styles.flatListView}>
                    {productsOrdersDetails.length <=0 ?
                        <View style={styles.noOrderView}>
                            <Text style={{fontSize:wp(4),fontWeight:'500'}}>No Orders Yet!</Text>
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
export default CurrentOrders;
