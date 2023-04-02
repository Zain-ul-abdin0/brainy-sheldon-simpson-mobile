//================================ React Native Imported Files ======================================//

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  View,
  StatusBar,
  Text,
  FlatList
} from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//

import styles from './Styles';
import colors from '../../Assets/Colors/colors';
import images from '../../Assets/Images/images';
import AppHeader from '../../Components/AppHeader/AppHeader';
import OrderHistoryComponent from '../../Components/OrderHistoryComponent/OrderHistoryComponent';
import firestore from '@react-native-firebase/firestore';
import CommonDataManager from '../Singleton';


class TrackOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tintColor:colors.black,
      userUid: CommonDataManager.getInstance().getUser(),
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
    this.props.navigation.addListener('focus',() =>{
      this._getAllHistoryOrders();
      this.setState({loading: false, onRefresh: false});
    })

  }

  _getAllHistoryOrders = async() => {
    const {userUid} = this.state;
    let dataOrderIdsStatus = [];
    let totalPriceOfProducts = [] ;
    if (userUid !== null) {
      await firestore()
          .collection('Orders')
          .where('userId', '==', userUid)
          .get().then((response) => {
            if(response._docs.length <= 0) {
              this.setState({
                showData: false,
                orderYet: true,
              });
            } else {
              response._docs.forEach((res) =>{
                res._data.orderProduct.map((resp) =>{
                  if(res._data.orderStatus !== 'Delivered'){
                    dataOrderIdsStatus.push({
                    productOrderNumber: res.id,
                    productStatus: res._data.orderStatus,
                    price: res._data.totalPrice.substring(1),
                    productName:resp.productName,
                  })}
                })
              })
              this.setState({
                totalPrice: totalPriceOfProducts,
                productsOrdersDetails:dataOrderIdsStatus,
                showData: true,
                orderYet: false,
                onRefresh: false,
              },() =>{
              });
            }
          })

    }

  };


  list(item) {
    let parseValue = parseFloat(item.price);
    let price = parseValue.toFixed(2);

    return (
        <OrderHistoryComponent
            productNames={item.productName}
            orderNumber={item.productOrderNumber}
            orderStatus={item.productStatus}
            price={price}
            onPress={() => this.props.navigation.navigate('TrackOrderDetails',(item))}
        />
    );
  }


  render() {
    const {productsOrdersDetails} = this.state;
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

            title={"Track Order"}
            onLeftIconPress={() => this.props.navigation.openDrawer()}
            bgColor={colors.black}
            tintColor={colors.white}
            leftIconPath={images.ic_hamburger_menu}
          />
        </View>
        <View style={styles.flatListView}>
          {productsOrdersDetails.length <=0 ?
              <View style={styles.noOrderView}>
              <Text style={{fontSize:wp(4),fontWeight:'500'}}>No Order Yet!</Text>
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
export default TrackOrder;
