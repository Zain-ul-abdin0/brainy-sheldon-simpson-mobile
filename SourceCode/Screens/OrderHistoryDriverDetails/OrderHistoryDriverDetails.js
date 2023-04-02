//================================ React Native Imported Files ======================================//

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Platform,
    Alert, PermissionsAndroid
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import firestore from '@react-native-firebase/firestore';
import {launchCamera} from "react-native-image-picker";
import auth from "@react-native-firebase/auth";
import storage from "@react-native-firebase/storage";

//================================ local Imported Files ======================================//

import OrderHistoryProductInfo from '../../Components/OrderHistoryProductInfo/OrderHistoryProductInfo';
import FirebaseHelper from '../../Firebase/FirebaseHelper';
import AppLoading from '../../Components/AppLoading/AppLoading';
import colors from '../../Assets/Colors/colors';
import AppHeader from '../../Components/AppHeader/AppHeader';
import images from '../../Assets/Images/images';
import CheckBoxView from '../CheckBox/CheckBox';



class OrderHistoryDriverDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productOrderNumber:this.props.route.params.item.productOrderNumber,
            userFullName:'',
            userAddress:'',
            productsDetails:[],
            show: this.props.route.params.item.show,
            // show: true,
            totalPriceWithDelivery:'',
            check_box: this.props.route.params.checkArray,
            fcmToken:'',
            filePath:'',
            url:'',
        }
    }

    componentDidMount() {
        this.checkStatusValue();
        this.getFcmToken();
        this.getAllDetailsOfProduct()
    }


    checkStatusValue = () => {
        this.setState({loading:false})
        let statusArray = [];
        if(this.props.route.params.current === true) {
            if(this.props.route.params.item.productStatus === 'Accepted'){
                statusArray.push({
                    title: 'Requested',
                    show: true,
                })
                statusArray.push({
                    title: 'Accepted',
                    show:true,
                })
                statusArray.push({
                    title: 'onRoute',
                    show: false,
                })
                statusArray.push({
                    title: 'Delivered',
                    show: false,
                })
            }else if(this.props.route.params.item.productStatus === 'OnRoute'){
                statusArray.push({
                    title: 'Requested',
                    show: true,
                })
                statusArray.push({
                    title: 'Accepted',
                    show: true,
                })
                statusArray.push({
                    title: 'onRoute',
                    show:true,
                })
                statusArray.push({
                    title: 'Delivered',
                    show: false,
                })
            }
        }
        else{
            console.log('Check_box -- checkStatusValue ===>> I am in Else');
            statusArray.push({
                title: 'Requested',
                show: true,
            })
            statusArray.push({
                title: 'Accepted',
                show:false,
            })
            statusArray.push({
                title: 'onRoute',
                show: false,
            })
            statusArray.push({
                title: 'Delivered',
                show: false,
            })
        }

        console.log('Check_box -- checkStatusValue ===>> ', statusArray);
        this.setState({loading:false,check_box:statusArray})

    }


    getFcmToken = async() => {
        const { productOrderNumber } = this.state;
        await firestore()
            .collection('Orders')
            .doc(productOrderNumber)
            .get()
            .then((res) =>{
                FirebaseHelper.fetchUserData(res._data.userId,(response)=>{
                    this.setState({
                        fcmToken: response._data.fcmToken,
                    })
                })
            })
    }


    getAllDetailsOfProduct = async () => {
        const { productOrderNumber } = this.state;
        let productData = [];
        await firestore().collection('Orders').doc(productOrderNumber).get().then((res) =>{
            let data = res._data;
            data.orderProduct.map((resp) =>{
                productData.push(resp)
            })
            this.setState({userFullName:(data.firstName+ ' '+data.lastName),
                userAddress:data.address,
                productsDetails:productData,
                totalPriceWithDelivery:data.totalPrice})
        })
    }


    menuItem(item) {
        let price = parseInt(item.productPrice)
        let final = price.toFixed(2)

        return (
            //================================ Common FlatList ======================================//
            <OrderHistoryProductInfo
                imageItem={item.productImage[0]}
                productName={item.productName}
                totalPrice={final}
            />
        )
    }


    changeStatus = (status) => {
        if(status === 'Delivered') {
            Alert.alert(
                'Change Status',
                'Are you sure you want to change status?',
                [
                    {
                        text: 'No',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {text: 'Yes', onPress: () => this.showCameraPicker()},
                ],
            );
        }
        if(status === 'Accepted'){
            Alert.alert(
                'Change Status',
                'Are you sure you want to change status?',
                [
                    {
                        text: 'No',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {text: 'Yes', onPress: () => this.deliverStatus()},
                ],
            );
        }
        if(status === 'onRoute'){
            Alert.alert(
                'Change Status',
                'Are you sure you want to change status?',
                [
                    {
                        text: 'No',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {text: 'Yes', onPress: () => this.onRouteStatus()},
                ],
            );
        }
    }


    showCameraPicker =async()=> {
        if(Platform.OS ==="android") {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: "BVS Camera Permission",
                        message:"BVS wants to access Camera",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    this.openCamera();
                } else {
                    this.setState({loading:false})
                    console.log("Camera permission denied");
                }
            } catch (err) {
                this.setState({loading:false})
                console.warn(err);
            }
        }else {
            this.openCamera();
        }
    }


    openCamera = () => {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };
        launchCamera(options, (Imageresponse) => {
            if (Imageresponse.didCancel) {
                this.setState({loading:false})
            } else if (Imageresponse.error) {
                this.setState({loading:false})
            } else if (Imageresponse.customButton) {
                this.setState({loading:false})
            } else {
                if (Imageresponse) {
                        this.setState({
                            filePath: Imageresponse.uri,
                        }, () => {
                            this.acceptStatus()
                        });
                }else{
                    this.setState({loading:false})
                }
            }
        })
    }


    acceptStatus = () => {
        this.setState({loading:true})
        const { productOrderNumber,filePath } = this.state;
        if(filePath === ''){
            this.setState({loading:false})
            alert('Please attach picture')
        }else if(filePath !== '') {
            this.uploadProfilePic(filePath, (callback) => {
                this.setState({url: callback}, async() => {
                    FirebaseHelper.onSendNotifications(
                    this.state.fcmToken,
                    "Review",
                    `Your Order is Delivered`,
                    () => {
                        FirebaseHelper.changeOrderStatusAndUpdatePic(productOrderNumber, 'Delivered',this.state.url).then(() => {
                            this.setState({loading: false}, () => {
                                this.props.navigation.navigate('driverDrawer')
                            })
                        })
                    })
                })
            })
        }
    }


    deliverStatus = () => {
        this.setState({loading:true})
        const { productOrderNumber } = this.state;
        FirebaseHelper.onSendNotifications(
            this.state.fcmToken,
            "Review",
            `Your Order is Accepted`,
            () => {
                FirebaseHelper.changeOrderStatus(productOrderNumber, 'Accepted').then(() => {
                    this.setState({loading: false}, () => {
                        this.props.navigation.navigate('driverDrawer')
                    })
                })
            })
    }


    onRouteStatus = () => {
        this.setState({loading:true})
        const { productOrderNumber } = this.state;
        FirebaseHelper.onSendNotifications(
            this.state.fcmToken,
            "Order",
            `Your Order is On-Route`,
            () => {
                FirebaseHelper.changeOrderStatus(productOrderNumber, 'OnRoute').then(() => {
                    this.setState({loading: false}, () => {
                        this.props.navigation.navigate('driverDrawer')
                    })
                })
            })
    }


    uploadProfilePic = async (images,callback) => {
        let userID = auth().currentUser.uid;
        const item = images;
        const image =
            Platform.OS === "android" ? item : item.replace("file:///", ""); //imagePath.uri;
        const imageRef = storage().ref('DeliveryPictures/' + userID);
        imageRef
            .putFile(image)
            .then(() => {
                storage()
                    .ref('DeliveryPictures/' + userID)
                    .getDownloadURL()
                    .then((urli) => {
                        if (urli) {
                            console.log('urli', urli);
                            callback(urli);
                        } else {
                            this.setState({loading: false});
                            alert('No Image Url found');
                        }
                    });
            })
            .catch((error) => {
                this.setState({ loading: false });
                alert(error);
            });
    };


    checkBoxItems(items){
        return (
            //================================ Common FlatList ======================================//
            <CheckBoxView
                title={items.title}
                show={items.show}
                onPress={()=> this.changeStatus(items.title)}
            />
        )
    }


    render() {
        const {productOrderNumber,userFullName,userAddress,productsDetails} = this.state;

        console.log('this.state.check_box ===>> ', this.state.check_box)
        return (
            <View style={styles.mainContainer}>
                {AppLoading.renderLoading(this.state.loading)}
                <View style={styles.headerView}>
                    <AppHeader
                        title={"Order Details"}
                        onLeftIconPress={() => this.props.navigation.goBack()}
                        bgColor={colors.black}
                        tintColor={colors.white}
                        leftIconPath={images.headerLeftBack}
                    />
                </View>

                <View style={[styles.container]}>
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

                    <View style={[styles.flatListView]}>
                        <FlatList
                            data={productsDetails}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => this.menuItem(item)}
                            keyExtractor={item => item.id}
                        />
                    </View>

                    {this.state.show ?
                        <View style={[styles.receivedButton]}>
                            <FlatList
                                data={this.state.check_box}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => this.checkBoxItems(item)}
                                keyExtractor={item => item.title}
                            />

                        </View>:
                        <View style={styles.receivedButton}>
                            <Text>Order Delivered</Text>
                        </View>}

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
        // backgroundColor:'blue'
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
        // backgroundColor:"green"
    },
    receivedButton:{
        height:'33%',
        width:'100%',
        // alignItems: 'center',
        // backgroundColor:'red',
        paddingHorizontal: wp(10)
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

export default OrderHistoryDriverDetails;
