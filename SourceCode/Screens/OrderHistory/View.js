// =========================== React Native Imported Files =========================== //

import React from 'react';
import {View, Text, FlatList} from 'react-native';

// =========================== Local Imported Files =========================== //

import OrderHistoryComponent from '../../Components/OrderHistoryComponent/OrderHistoryComponent';
import AppHeader from '../../Components/AppHeader/AppHeader';
import CommonDataManager from '../Singleton';
import AppLoading from '../../Components/AppLoading/AppLoading';
import colors from '../../Assets/Colors/colors';
import images from '../../Assets/Images/images';
import styles from './Styles';
import firestore from '@react-native-firebase/firestore';



class OrderHistory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userUid: CommonDataManager.getInstance().getUser(),
      historyProducts: [],
      loading: false,
      showAllHistoryPorducts: [],
      productsOrdersDetails: [],
      totalPrice: 0,
      orderYet: false,
      showData: false,
      onRefresh: true,
    };
  }



  componentDidMount() {
    this.setState({loading: true});
    this.props.navigation.addListener('focus',() =>{
        this._getAllHistoryOrders();
        this.setState({loading: false, onRefresh: false});
        // setTimeout(() => {
        //     this._getAllHistoryOrders();
        //     this.setState({loading: false, onRefresh: false});
        // }, 500);
    })

  }

  _getAllHistoryOrders = async() => {
    const {userUid} = this.state;
    let dataEnterTempArray = [];
    let dataOrderIdsStatus = [];
    let totalPriceOfProducts = [] ;
    if(userUid !== null) {
        await firestore()
            .collection('Orders')
            .where('userId', '==', userUid)
            .where('orderStatus','==','Delivered')
            .get()
            .then((response) => {
                if(response._docs.length <= 0) {
                    this.setState({
                        showData: false,
                        orderYet: true,
                    });
                } else {
                    response._docs.forEach((res) =>{
                        res._data.orderProduct.map((resp) =>{
                            dataOrderIdsStatus.push({
                                productOrderNumber: res.id,
                                productStatus: res._data.orderStatus,
                                price:res._data.totalPrice.substring(1),
                            })
                        })
                    })
                    this.setState({
                        showAllHistoryPorducts: dataEnterTempArray,
                        totalPrice: totalPriceOfProducts,
                        productsOrdersDetails:dataOrderIdsStatus,
                        showData: true,
                        orderYet: false,
                        onRefresh: false,
                    },() => {
                        console.log('state showAllHistoryPorducts',this.state.showAllHistoryPorducts);
                    });
                }

            })
            .catch((error) => {
                alert(error)
            });
    }

  };


  list(item) {
      let parseValue = parseFloat(item.price);
      let price = parseValue.toFixed(2);
    return (
        <OrderHistoryComponent
            orderNumber={item.productOrderNumber}
            orderStatus={item.productStatus}
            price={price}
            onPress={() => this.props.navigation.navigate('OrderHistoryItemDetails',(item))}
        />
    );
  }
  render() {
    console.log('this.state.productsOrdersDetails',this.state.productsOrdersDetails);
    return (
        <View style={styles.mainContainer}>
          {/* //================================ Header ======================================// */}

          <View style={styles.headerView}>
            <AppHeader
                title={'Order History'}
                onLeftIconPress={() => this.props.navigation.openDrawer()}
                bgColor={colors.black}
                tintColor={colors.white}
                leftIconPath={images.ic_hamburger_menu}
            />
          </View>
          {AppLoading.renderLoading(this.state.loading)}
          <View style={styles.container}>
            {/* //================================ Order History List ======================================// */}

            {this.state.showData && (
                <View style={styles.viewListContainer}>
                  <FlatList
                      onRefresh={() => {
                        this._getAllHistoryOrders();
                      }}
                      refreshing={this.state.onRefresh}
                      showsVerticalScrollIndicator={false}
                      data={this.state.productsOrdersDetails}
                      renderItem={({item}) => this.list(item)}
                      keyExtractor={(item) => item.id}
                  />
                </View>
            )}
            {/* //================================ Tip ======================================// */}

            {/*{this.state.showData && (*/}
            {/*    <View style={styles.PricesView}>*/}
                  {/*<View style={[styles.viewTotalText]}>*/}
                  {/*  <View*/}
                  {/*      style={[*/}
                  {/*        styles.viewTotalTextInner,*/}
                  {/*        {alignItems: 'flex-start'},*/}
                  {/*      ]}>*/}
                  {/*    <Text style={styles.textStyleTotal}>Tip</Text>*/}
                  {/*  </View>*/}
                  {/*  <View*/}
                  {/*      style={[styles.viewTotalTextInner, {alignItems: 'flex-end'}]}>*/}
                  {/*    <Text*/}
                  {/*        style={[*/}
                  {/*          styles.textStyleTotal,*/}
                  {/*          {color: colors.price_text, fontSize: wp(5.5)},*/}
                  {/*        ]}>*/}
                  {/*      {'$' + this.state.tip}*/}
                  {/*    </Text>*/}
                  {/*  </View>*/}
                  {/*</View>*/}

                  {/* //================================ Total Price ======================================// */}

                  {/*<View style={[styles.viewTotalText]}>*/}
                  {/*  <View*/}
                  {/*      style={[*/}
                  {/*        styles.viewTotalTextInner,*/}
                  {/*        {alignItems: 'flex-start'},*/}
                  {/*      ]}>*/}
                  {/*    <Text style={styles.textStyleTotal}>Total</Text>*/}
                  {/*  </View>*/}
                  {/*  <View*/}
                  {/*      style={[styles.viewTotalTextInner, {alignItems: 'flex-end'}]}>*/}
                  {/*    <Text*/}
                  {/*        style={[*/}
                  {/*          styles.textStyleTotal,*/}
                  {/*          {color: colors.price_text, fontSize: wp(5.5)},*/}
                  {/*        ]}>*/}
                  {/*      {this.state.totalPrice}*/}
                  {/*    </Text>*/}
                  {/*  </View>*/}
                  {/*</View>*/}
                {/*</View>*/}
            {/*)}*/}

            {/* //================================ No Order ======================================// */}

            {this.state.orderYet && (
                <View style={styles.noOrderYetStyle}>
                  <Text style={styles.noOrderYet}>No order history</Text>
                </View>
            )}
          </View>
        </View>
    );
  }
}
export default OrderHistory;
