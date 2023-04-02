import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Platform,
} from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../Assets/Colors/colors';
import AppHeader from '../AppHeader/AppHeader';
import images from '../../Assets/Images/images';
import firestore from '@react-native-firebase/firestore';
import OrderHistoryProductInfo from '../OrderHistoryProductInfo/OrderHistoryProductInfo';


class OrderHistoryItemDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productOrderNumber:this.props.route.params.productOrderNumber,
            userFullName:'',
            userAddress:'',
            productsDetails:[],
            totalPriceWithDelivery:''
        }
    }

    componentDidMount() {
        this.getAllDetailsOfProduct()
    }

    getAllDetailsOfProduct = async () => {
        const {productOrderNumber} = this.state;
        let productData = [];
        await firestore().collection('Orders').doc(productOrderNumber).get().then((res) =>{
            let data = res._data;
            data.orderProduct.map((resp) =>{
                productData.push(resp)
            })
            // .where('orderStatus','==','Pending')
            let subString = data.totalPrice.substring(1);
            let parseValue = parseFloat(subString);
            let price = parseValue.toFixed(2);
            this.setState({userFullName:(data.firstName+ ' '+data.lastName),userAddress:data.address,productsDetails:productData,totalPriceWithDelivery:price})
        })
    }


    menuItem(item) {
        return (
            //================================ Common FlatList ======================================//
            <OrderHistoryProductInfo
                imageItem={item.productImage[0]}
                productName={item.productName}
                totalPrice={item.productPrice}
            />
        )
    }

    render() {
        const {productOrderNumber,userFullName,userAddress,productsDetails,totalPriceWithDelivery} = this.state;
        console.log('productsDetails new ======>',productsDetails);
        return (
            <View style={styles.mainContainer}>
                <View style={styles.headerView}>
                    <AppHeader
                        title={"Order Details"}
                        onLeftIconPress={() => this.props.navigation.goBack()}
                        bgColor={colors.black}
                        tintColor={colors.white}
                        leftIconPath={images.headerLeftBack}
                        // rightIconOnePath={images.cart}
                    />
                </View>

                <View style={styles.container}>
                    <View style={styles.orderNumberView}>
                        <Text style={styles.orderTitle}>Order #</Text>
                        <Text style={[styles.subTitle,{paddingTop:'1%'}]}>{productOrderNumber}</Text>
                    </View>
                    <View style={styles.userRecordView}>
                        <View style={styles.innerView}>
                            <Text style={styles.orderTitle}>Full Name:</Text>
                            <Text style={[styles.subTitle]}> {this.props.orderNumber}{userFullName}</Text>
                        </View>

                        <View style={styles.innerView}>
                            <Text style={styles.orderTitle}>Address:</Text>
                            <Text style={[styles.subTitle]}> {this.props.orderNumber}{userAddress}</Text>
                        </View>
                    </View>
                    <View style={styles.flatListView}>
                        <FlatList
                            data={productsDetails}
                            // keyExtractor={(val) => val.userId}
                            renderItem={({ item }) => this.menuItem(item)}
                            keyExtractor={item => item.id}
                        />
                    </View>

                    <View style={styles.totalPriceView}>
                        <Text style={styles.orderTitle}>Total Price With Delivery Charges:</Text>
                        <Text style={[styles.subTitle,]}>$ {totalPriceWithDelivery}</Text>
                    </View>
                    {/*<View style={styles.receivedButton}>*/}
                        {/*<Button*/}
                        {/*    title={'Received'}*/}
                        {/*    activeOpacity={0.7}*/}
                        {/*    height={hp(8)}*/}
                        {/*    width={'80%'}*/}
                        {/*    style={styles.buttonStyles}*/}
                        {/*    titleColor={colors.appBlue}*/}
                        {/*    bgColor={colors.appButtonColor}*/}
                        {/*    titleStyle={[styles.titleStyles]}*/}
                        {/*    onPress={() => console.log('Received')}*/}
                        {/*/>*/}
                    {/*</View>*/}

                </View>
            </View>

        );
    }
}


const styles = StyleSheet.create({
    mainContainer:{
        flex:1
    },
    headerView:{
        flex:0.1
    },
    container: {
        flex:0.9,
        borderRadius: wp(3),
    },
    orderNumberView:{
        height: '13%',
        width: '90%',
        alignSelf:'center',
        paddingLeft:'4%',
        paddingTop:'4%',
    },
    orderTitle:{
        fontSize: wp(4),
        fontWeight:'bold'
    },
    subTitle:{
        fontSize: wp(4),
        fontWeight:'normal'
    },
    userRecordView:{
        height: Platform.OS === 'ios' ? '14%' :'17%',
        width: '90%',
        alignSelf:'center',
        paddingLeft:'4%',
    },
    innerView:{
        marginTop: '2%',
    },
    flatListView:{
        height: '40%',
        width: '100%',
        marginTop:'3%',
    },
    receivedButton:{
        marginTop:wp(10),
        height:'23%',
        width:'100%',
        alignItems: 'center'
    },
    totalPriceView:{
        height: '33%',
        width: '90%',
        alignSelf:'center',
        marginTop:'3%',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:'4%'
    }


});

export default OrderHistoryItemDetails;
