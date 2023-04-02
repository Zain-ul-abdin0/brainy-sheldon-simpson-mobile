// =========================== React Native File =========================== //

import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import DriverHomeComponent from '../../Components/DriverHomeComponent/DriverHomeComponent';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// =========================== Local File =========================== //

import AppLoading from '../../Components/AppLoading/AppLoading';
import images from '../../Assets/Images/images';
import styles from './Styles';
import AppHeader from '../../Components/AppHeader/AppHeader';
import colors from '../../Assets/Colors/colors';


class DriverHomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: auth().currentUser.uid,
            loading:false,
            result: '',
            profilePic: '',
            orders:[{
                price:'60.$',
            }],
            accept:true,
            decline:false,

            showData: false,
            orderYet: true,
            productsOrdersDetails:[],
            showAllHistoryPorducts:[],
            check_box : [
                {title: 'Requested', show:  true },
                {title: 'Accepted',  show:  false },
                {title: 'On Route',  show:  false },
                {title: 'Delivered', show:  false }
            ],
        };
    }


    componentDidMount() {
        this.listener = this.props.navigation.addListener('focus',() => {
            this._getAllHistoryOrders();
        })
    }

    componentWillUnmount() {
        this.listener()
    }


    onPressAccept = () => {
        this.setState({
            accept:!this.state.accept,decline:!this.state.decline,showData:true
        },() => {
            this._getAllHistoryOrders();
        })
    }


    onPressDecline = () => {
        this.setState({accept:!this.state.accept,decline:!this.state.decline,showData:false})
    }


    _getAllHistoryOrders = async() => {
        this.setState({loading:true})
        let dataEnterTempArray = [];
        let dataOrderIdsStatus = [];
        let totalPriceOfProducts = [] ;
            await firestore()
                .collection('Orders')
                .where('orderStatus','==','Requested')
                .get()
                .then((response) => {
                    console.log('response',response)
                    if(response._docs.length <= 0) {
                        this.setState({
                            showData: false,
                            orderYet: true,
                            loading:false
                        });
                    } else {
                        response._docs.forEach((res) => {
                                dataOrderIdsStatus.push({
                                    productOrderNumber: res.id,
                                    productStatus: res._data.orderStatus,
                                    address: res._data.address,
                                    show:true
                                })
                        })
                        this.setState({
                            showAllHistoryPorducts: dataEnterTempArray,
                            productsOrdersDetails:dataOrderIdsStatus,
                            showData: true,
                            orderYet: false,
                            loading:false
                        },() => {
                            console.log('this.array',this.state.productsOrdersDetails)
                        });
                    }

                })
                .catch((error) => {
                    this.setState({loading:false})
                    alert(error)
                });

    };

    list(item) {
        return (
            <DriverHomeComponent
                productStatus={item.productStatus}
                orderNumber={item.productOrderNumber}
                orderAddress={item.address}
                onPress={() => this.props.navigation.navigate('OrderHistoryDriverDetails',({item,checkArray:this.state.check_box,current:false}))}
            />
        );
    }


    render() {
        return (
            <View style={styles.mainContainer}>
                {AppLoading.renderLoading(this.state.loading)}

                <View style={styles.headerView}>
                    <AppHeader
                        title={'Upcoming Orders'}
                        onLeftIconPress={() => this.props.navigation.openDrawer()}
                        bgColor={colors.black}
                        tintColor={colors.white}
                        leftIconPath={images.ic_hamburger_menu}
                    />
                </View>


                <View style={styles.logo}>
                        <View style={styles.btnView}>
                            <TouchableOpacity
                                onPress={this.onPressAccept}
                                style={this.state.accept ? styles.btnShown1 : styles.btnShown }
                            >
                                <Text style={this.state.accept ? styles.btnHeading1 : styles.btnHeading}>On Duty</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.onPressDecline}
                                style={this.state.decline ? styles.btnShown1: styles.btnShown}
                            >
                                <Text style={this.state.decline ? styles.btnHeading1 : styles.btnHeading}>Off Duty</Text>
                            </TouchableOpacity>
                        </View>
                    {this.state.showData && (<View style={styles.flatListView}>
                        <FlatList
                            data={this.state.productsOrdersDetails}
                            renderItem={({item}) => this.list(item)}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>)}

                    {this.state.orderYet && (
                        <View style={styles.noOrderYetStyle}>
                            <Text style={styles.noOrderYet}>No Orders Yet</Text>
                        </View>
                    )}
                </View>

            </View>
        );
    }
}
export default DriverHomeScreen;
