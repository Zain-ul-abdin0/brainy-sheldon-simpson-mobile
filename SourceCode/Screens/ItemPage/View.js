//================================ React Native Imported Files ======================================//
//================================ React Native Imported Files ======================================//

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  View,
  ScrollView,
  StatusBar,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  Platform,
} from 'react-native';
import React from 'react';
import firestore from '@react-native-firebase/firestore';

//================================ Local Imported Files ======================================//

import styles from './Styles';
import colors from '../../Assets/Colors/colors';
import images from '../../Assets/Images/images';
import AppHeader from '../../Components/AppHeader/AppHeader';
import Swiper from 'react-native-swiper';
import Dropdown from '../../Components/DropDwon/DropDwon';
import Button from '../../Components/Button/Button';
import CommentFlatList from '../../Components/CommnetFlatList/CommentFlatList';
import CommonDataManager from '../Singleton';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Rating, AirbnbRating} from 'react-native-ratings';
import AppInput from '../../Components/AppInput/AppInput';
import auth from '@react-native-firebase/auth';
import AppLoading from '../../Components/AppLoading/AppLoading';


class ItemPage extends React.Component {
  constructor(props) {
    super(props);
    this.getUserInfo();
    this.state = {
      userFirstName: '',
      userLastName: '',
      userProfileImage: '',
      productImage: this.props.route.params.item.imageUrl,
      productName: this.props.route.params.item.productName,
      productDetail: this.props.route.params.item.productDetail,
      productSubName: this.props.route.params.item.subTitle,
      productPrice: this.props.route.params.item.productPrice,
      singlePrice: this.props.route.params.item.productPrice,
      productQuantity: '1',
      firebaseProductId: this.props.route.params.item.firebaseProductId,
      productComments: [],
      rating: '5',
      ratingTextInputValue: '',
      loading: true,
    };
  }

  componentDidMount() {
    // console.log(this.state.productImage);
    this.props.navigation.addListener('focus', () => {
      this.getCommentsFromFirebase();
      this.loading();
    });
    // this.addShoppingToCart();
  }

  loading = () => {
    setTimeout(() => {
      this.setState({loading: false});
    }, 1000);
  };

  addShoppingToCart = () => {
    const {
      productQuantity,
      productImage,
      productName,
      productSubName,
      productPrice,
      firebaseProductId,
    } = this.state;

    let productDetails = {
      productImage,
      productName,
      productSubName,
      productPrice,
      firebaseProductId,
      productQuantity,
    };

    let productArray = CommonDataManager.getInstance().getShoppingCartDetails();

    productArray.push(productDetails);

    this.setState({
      productImage,
      productName,
      productSubName,
      productPrice,
      firebaseProductId,
    });
    this.props.navigation.navigate('MyCart');
  };

  getUserInfo = async() => {
    if (CommonDataManager.getInstance().getUser()) {
      let userUid = CommonDataManager.getInstance().getUser();
      await firestore()
        .collection('UserRecords')
        .doc(userUid)
        .get()
        .then(
          (res) => {
            this.setState({
              userFirstName: res._data.firstName,
              userLastName: res._data.lastName,
              userProfileImage: res._data.ProfilePicUri,
            });
          },
          () => {
            console.log('userProfileImage', this.state.userProfileImage);
          },
        );
    }
  };

  addComments = async() => {
    const {
      rating,
      ratingTextInputValue,
      userFirstName,
      userLastName,
      userProfileImage,
      firebaseProductId,
    } = this.state;
    if (ratingTextInputValue.length <= 0) {
      Alert.alert('Required', 'Please write comment');
    } else {
      await firestore()
        .collection('ProductComments')
        .doc()
        .set({
          postedBy: userFirstName + ' ' + userLastName,
          userProfileImage: userProfileImage,
          productId: firebaseProductId,
          commentText: ratingTextInputValue,
          rating: rating,
          date: new Date(),
        });
      this.setState({ratingTextInputValue: ''});
      this.getCommentsFromFirebase();
      this.RBSheet.close();
    }
  };

  menuItem(item) {
    return (
      //================================ Comman FlatList ======================================//
      <CommentFlatList
        userName={item.userName}
        userImage={item.userProfileImage}
        givenRating={item.rating}
        userComment={item.commentText}
      />
    );
  }
  onIndexChanged(index) {
    this.setState({currentIndex: index});
  }

  dropdwonQuantity = () => {
    return ['1', '2', '3', '4', '5'];
  };

  onDropSelect = (value) => {
    const {singlePrice}         = this.state;

    this.state.productQuantity  = value;
    console.log('DropDown Value ===>> ', value);


    if (value === '1') {
      this.setState({productPrice: singlePrice * value,
            productQuantity: value},
        () => {
           console.log('valuue======>>>',this.state.productPrice);
        },
      );
    } else if (value === '2') {
      this.setState(
        {productPrice: singlePrice * value,
          productQuantity: value},
        () => {
          // console.log('valuue',this.state.productQuantity);
        },
      );
    } else if (value === '3') {
      this.setState({
        productPrice: singlePrice * value,
        productQuantity: value,
      });
    } else if (value === '4') {
      this.setState({
        productPrice: singlePrice * value,
        productQuantity: value,
      });
    } else if (value === '5') {
      this.setState({
        productPrice: singlePrice * value,
        productQuantity: value,
      });
    }
  };

  getCommentsFromFirebase = async() => {
    const {firebaseProductId} = this.state;
    let tempArr = [];
    await firestore()
      .collection('ProductComments')
      .where('productId', '==', firebaseProductId)
      .get()
      .then((res) => {
        res._docs.map((resp) => {
          // console.log('coommments====>',resp);
          tempArr.push({
            userName: resp._data.postedBy,
            userProfileImage: resp._data.userProfileImage,
            commentText: resp._data.commentText,
            rating: resp._data.rating,
            date: resp._data.date,
          });
        });
        this.loading();
        this.setState({productComments: tempArr}, () => {
          // console.log("productComments =====> ", this.state.productComments)
        });
      });
  };

  openRbSheet = () => {
    // console.log('this.RBSheet',this.RBSheet);
    this.setState({loading: true});
    setTimeout(() => {
      this.setState({loading: false});
      this.RBSheet.open();
    }, 1000);
    //
  };

  render() {
    // const {spinner} = this.state;
    // console.log('productPrice productPrice productPrice ----->',this.state.productPrice);
    let productPrice=parseFloat(this.state.productPrice);
    productPrice=productPrice.toFixed(3)
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
            title={'Item Page'}
            onLeftIconPress={() => this.props.navigation.goBack()}
            bgColor={colors.black}
            tintColor={colors.white}
            leftIconPath={images.headerLeftBack}
            rightIconOnePath={images.cart}
            onRightIconPress={() => this.props.navigation.navigate('MyCart')}
          />
        </View>
        <View style={styles.bottomContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: hp(5)}}>
            <View style={styles.swiperContainer}>
              <Swiper
                showsButtons={false}
                // loop={true}
                ref={'swiper'}
                onIndexChanged={this.onIndexChanged.bind(this)}
                dotColor={colors.lightGreenColor}
                // activeDotColor={colors.white}
                activeDot={
                  <View
                    style={{
                      backgroundColor: colors.black,
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      marginLeft: 3,
                      marginRight: 3,
                      marginTop: 3,
                      marginBottom: 3,
                    }}
                  />
                }>
                {this.state.productImage.map((item)=>{
                  return(
                      <View style={styles.slides}>
                        <View style={styles.imageView}>
                          <Image
                              style={styles.imageStyles}
                              source={{uri:item}}
                          />

                        </View>
                        <View style={styles.midView}/>
                      </View>

                  )
                })}


                {/*<View style={styles.slides}>*/}
                {/*  <View style={styles.imageView}>*/}
                {/*    <Image*/}
                {/*      style={styles.imageStyles}*/}
                {/*      source={{uri: this.state.productImage}}*/}
                {/*    />*/}
                {/*  </View>*/}
                {/*  <View style={styles.midView}/>*/}
                {/*</View>*/}

                {/*<View style={styles.slides}>*/}
                {/*  <View style={styles.imageView}>*/}
                {/*    <Image*/}
                {/*      style={styles.imageStyles}*/}
                {/*      source={{uri: this.state.productImage}}*/}
                {/*    />*/}
                {/*  </View>*/}
                {/*  <View style={styles.midView}></View>*/}
                {/*</View>*/}
              </Swiper>
            </View>
            <View style={styles.mainTitleContainer}>
              <Text style={styles.mainTitleStyle}>
                {this.state.productName}
              </Text>
              <Text style={styles.subTitleStyle}>
                {this.state.productSubName}
              </Text>
            </View>
            <View style={styles.aboutProductTitleContainer}>
              <Text style={styles.aboutProductTitleTextStyle}>
                {this.state.productDetail}
              </Text>
            </View>
            <View style={styles.dropdwonAndTotalContainer}>
              <View style={styles.dropdwonContainer}>
                <View style={styles.dropdwonQuantityContainer}>
                  <Text style={styles.dropdwonQuantityStyleContainer}>
                    Quantity
                  </Text>
                </View>
                <View style={styles.dropdwonMainContainer}>
                  <Dropdown
                    dropdownStyle={styles.dropdownStyle}
                    dropdownOptionsStyle={styles.dropdownLeftOptionsStyle}
                    buttonTextStyle={styles.dropdownButtonText}
                    defaultButtontext={'1'}
                    arrowBackgroundColor={colors.appBlue}
                    dropIcon={images.avatar}
                    options={this.dropdwonQuantity()}
                    tintColor={colors.black}
                    showsVerticalScrollIndicator={false}
                    // renderRow={(instance) => this.renderRowForInstance(instance)}
                    onSelect={(index, value) => {
                      console.log('onSelect Dropdown ===>> ', value);
                      this.onDropSelect(value);
                    }}
                  />
                </View>
              </View>
              <View style={styles.dividerContainer}></View>
              <View style={styles.totalPriceContainer}>
                <View style={styles.totalPriceTextContainer}>
                  <Text style={styles.dropdwonQuantityStyleContainer}>
                    Total
                  </Text>
                </View>
                <View style={styles.totalPriceNumberContainer}>
                  <Text style={styles.totalPriceNumberTextContainer}>
                    {'$' + productPrice}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.addToShoppingCart}>
              <Button
                activeOpacity={0.7}
                height={hp(8)}
                width={'75%'}
                style={styles.buttonStyles}
                title={'ADD TO SHOPPING CART'}
                titleColor={colors.appBlue}
                bgColor={colors.appButtonColor}
                titleStyle={[styles.titleStyles]}
                onPress={this.addShoppingToCart}
              />
            </View>
            <View style={styles.commnetContainer}>
              <Text style={styles.CommentsTextContainer}>Comments</Text>
              <TouchableOpacity activeOpacity={0.5} onPress={this.openRbSheet}>
                <Text style={styles.addCommentsTextContainer}>
                  Add comment +
                </Text>
              </TouchableOpacity>
            </View>
            <RBSheet
              ref={(ref) => {
                this.RBSheet = ref;
              }}
              height={hp(70)}
              openDuration={250}
              animationType={'fade'}>
              <View style={styles.rBSheetHeaderView}>
                <AppHeader
                  title={'Add Comment'}
                  onLeftIconPress={() => this.RBSheet.close()}
                  bgColor={colors.black}
                  tintColor={colors.white}
                  leftIconPath={images.headerLeftBack}
                  rightIconOnePath={images.ic_ok}
                  tintColorRight={'none'}
                  onRightIconPress={this.addComments}
                />
              </View>
              <View style={styles.rBSheetProductMainView}>
                <View style={styles.rBSheetImageView}>
                  <Image
                    style={styles.rBSheetImageStyle}
                    source={{uri: this.state.productImage[0]}}
                    // source={images.ic_driver_history_inactive}
                  />
                </View>
                <View style={styles.rBSheetProductInfo}>
                  <Text style={styles.mainTitleStyle}>
                    {this.state.productName}
                  </Text>
                  <Text style={styles.subTitleStyle}>
                    {this.state.productSubName}
                  </Text>
                </View>
              </View>
              <View style={styles.rBSheetRatingView}>
                <Text style={[styles.mainTitleStyle, {paddingRight: '4%'}]}>
                  Rating
                </Text>
                <AirbnbRating
                  count={5}
                  defaultRating={5}
                  size={23}
                  showRating={false}
                  onFinishRating={(rate) => this.setState({rating: rate})}
                />
              </View>
              <View style={styles.rBSheetInputView}>
                <AppInput
                  value={this.state.ratingTextInputValue}
                  onChangeText={(ratingTextInputValue) =>
                    this.setState({ratingTextInputValue})
                  }
                  height={'90%'}
                  multiline={true}
                  placeholder={'Please write a comment'}
                  paddingBottom={Platform.OS === 'ios' ? 0 : '30%'}
                  borderRadius={wp(2)}
                  borderColor={colors.placeholder_color}
                  borderWidth={wp(0.1)}
                />
              </View>
            </RBSheet>
            <View style={styles.flatListContainer}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                // horizontal={true}
                data={this.state.productComments}
                renderItem={({item}) => this.menuItem(item)}
                keyExtractor={(item) => item.id}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
export default ItemPage;
