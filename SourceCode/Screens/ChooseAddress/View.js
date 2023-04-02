//================================ React Native Imported Files ======================================//
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  View,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {CreditCardInput} from 'react-native-credit-card-input';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
} from 'react-native-simple-radio-button';
import Stripe from 'react-native-stripe-api';
import React from 'react';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import firestore from '@react-native-firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';

//================================ Local Imported Files ======================================//

import AddAddressModal from '../../Components/AddAddressModal/AddAddressModal';
import CommonDataManager from '../Singleton';
import AppLoading from '../../Components/AppLoading/AppLoading';
import Button from '../../Components/Button/Button';
import colors from '../../Assets/Colors/colors';
import images from '../../Assets/Images/images';
import styles from './Styles';
import AppHeader from '../../Components/AppHeader/AppHeader';
import CheckBox from '../../Components/CheckBox/CheckBox';
import FirebaseHelper from '../../Firebase/FirebaseHelper';


class ChooseAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getCommonCredential: CommonDataManager.getInstance().getCommonCredential(),
      firstName: '',
      lastName: '',
      profileImage: '',
      phoneNumber: '',
      totalPrice: CommonDataManager.getInstance().getTotalPriceProducts(),
      productsName: [],
      modalVisible: false,
      isModalVisible: false,
      address: '',
      nameAddress: '',
      radioValue: [],
      selectedValue: 0,
      addressFromRadioButton: '',
      isPaymentProcess: false,
      creditCardInput: {},
      loading: false,
      selectedDateValue:0,
      todayTomorrowTiming:[{label: '', value: '9am-11am' }, {label: '', value: '11am-1pm' }, {label: '', value: '1pm-3pm' }, {label: '', value: '3pm-5pm' }, {label: '', value: '5pm-7pm' }, {label: '', value: '7pm-9pm' }, {label: '', value: '9pm-11pm' },],
      tomorrowTiming:[{label: '', value: '9am-11am' }, {label: '', value: '11am-1pm' }, {label: '', value: '1pm-3pm' }, {label: '', value: '3pm-5pm' }, {label: '', value: '5pm-7pm' }, {label: '', value: '7pm-9pm' }, {label: '', value: '9pm-11pm' },],
      defaultValueTodayTomorrow:null,
      defaultTotalDays:null,
      totalDays:[],
      defaultValueMonth:null,
      defaultValueMonthName:null,
      months:[{label: 'January', value: 1 }, {label: 'February', value: 2 }, {label: 'March', value: 3 }, {label: 'April', value: 4 }, {label: 'May', value: 5 }, {label: 'June', value: 6 }, {label: 'July', value: 7 },{label: 'August', value: 8 }, {label: 'September', value: 9 }, {label: 'October', value: 10 }, {label: 'November', value: 11 }, {label: 'December', value: 12 }],
      time:null,
      todayRadioValue:false,
      tomorrowRadioValue:false,
      customRadioValue:false,
      isDatePickerVisible:false,
      timeDropDown:false,
      isToday:false,
      isTomorrow:true,
      tempArray:[],
      customDeliveryTime:null,
      todayDeliveryTime:null,
      saveTime:null,
      closeTime:null,
      openTime:null,
      driversFcmToken:[]
    };

  }

  componentDidMount() {
    this.getUserLocation();
    this.getProductsDetails();
    this.getAllDriversFcmToken();
  }


  getAllDriversFcmToken = () => {
    let tempArray = [];
      FirebaseHelper.getProfilesOfAllDriversForFcm((response) => {
        if((response === undefined) || (response._docs.length < 1)){
          this.setState({loading:false})
        }else{
          response.forEach((token) => {
            if(token._data.isApproved === true) {
              tempArray.push({
                fcmToken: token._data.fcmToken,
                userId: token.id,
              })
            }
          })
          this.setState({driversFcmToken: tempArray})
        }
      })
  }


  getTiming = () => {
    this.setState({loading:false})
    FirebaseHelper.getTimings((response) => {
      if(response._docs.length < 1){
        this.setState({loading:false})
        alert("Something went wrong please contact with the admin..")
      }else{
        let currentDate = new Date();
        let todaysWeekDayName =  moment(currentDate).format('dddd');
        response._docs.map((day) => {
          this.setState({
            closeTime: day._data[todaysWeekDayName].closeTime,
            openTime: day._data[todaysWeekDayName].openTime
          },() => {
            this.calculateTime();
          })
        })
      }
    })
  }


  calculateTime = () => {
    let { closeTime } = this.state;
    let timeNow = new Date();
    let currentTime = moment(timeNow).format('HH:mm')
    if(currentTime <= closeTime){
      this.setStripeModalVisible(true);
    }else{
      this.setState({loading:false})
      alert('Sorry we are not accepting order at this time.')
    }
  }


  getUserLocation = async() => {
    if (CommonDataManager.getInstance().getUser()) {
      let userUid = CommonDataManager.getInstance().getUser();
      await firestore()
          .collection('UserRecords')
          .doc(userUid)
          .get()
          .then((res) => {
            // console.log('userData =====>',res._data );
            let addressList = [];
            if (res !== undefined) {
              res._data.address.map((resp) => {
                addressList.push({
                  label: resp.address,
                  nameAddress: resp.nameAddress,
                });
              });
            }
            this.setState(
                {
                  radioValue: addressList,
                  firstName: res._data.firstName,
                  lastName: res._data.lastName,
                  profileImage: res._data.ProfilePicUri,
                  phoneNumber: res._data.phoneNumber,
                },

            );
          });
    }
  };


  getProductsDetails = () => {
    let arrayProductName = [];
    let productsDetails = CommonDataManager.getInstance().getShoppingCartDetails();
    if (productsDetails !== undefined) {
      productsDetails.map((res) => {
        arrayProductName.push({
          productName: res.productName,
          productImage: res.productImage,
          productPrice: res.productPrice,
          productId: res.firebaseProductId,
        });
      });
    }
    this.setState({productsName: arrayProductName}, () => {
    });
  };


  onTextInputAddress = (text) => {
    this.setState({address: text});
  };


  onChangeNameAddress = (text) => {
    this.setState({nameAddress: text});
  };


  addAddress = async() => {
    let address = this.state.address;
    let nameAddress = this.state.nameAddress;
    if (CommonDataManager.getInstance().getUser()) {
      let userUid = CommonDataManager.getInstance().getUser();
      if (this.state.address <= 0) {
        alert('Please enter address');
      } else if (this.state.nameAddress <= 0) {
        alert('Please enter name of address');
      } else {
        await firestore()
            .collection('UserRecords')
            .doc(userUid)
            .update({
              address: firestore.FieldValue.arrayUnion({nameAddress, address}),
            });
        this.setModalVisible(false);
        this.getUserLocation();
        this.setState({address: '', nameAddress: ''});
      }
    }
  };


  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };


  setStripeModalVisible = (visible) => {
    let {selectedValue, radioValue} = this.state;
    if (selectedValue || selectedValue === 0) {
      this.setState({
        addressFromRadioButton: radioValue[selectedValue].label,
        isModalVisible: visible,
      });
    } else {
      alert('please select a address');
    }
  };


  togglePaymentProcess = () => {
    this.setState({isPaymentProcess: !this.state.isPaymentProcess});
  };


  onCreditCardInput = (form) => {
    this.setState({creditCardInput: form}, () => {
      // console.log('creditCard ====>', this.state.creditCardInput);
    });
  };


  chargeUserFromCard = async (callback) => {
    const {firstName, lastName} = this.state;
    let cardNumber = this.state.creditCardInput.values.number.toString();
    let expiry = this.state.creditCardInput.values.expiry;
    let arrayExpiry = expiry.split('/');
    let expiryMonth = arrayExpiry[0].toString();
    let expiryYear = arrayExpiry[1].toString();
    let cvc = this.state.creditCardInput.values.cvc.toString();
    let client = new Stripe(
        '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',
    );
    const token = await client.createToken({
      number: cardNumber,
      exp_month: expiryMonth,
      exp_year: expiryYear,
      cvc: cvc,
    });

    let description = 'Charge ' + firstName + ' ' + lastName;
    // console.log('description',description);

    let properties = {
      amount: Math.round(this.state.totalPrice * 100),
      currency: 'usd',
      source: token.id,
      description: description,
    };
    const chargeApiResponse = await client.stripePostRequest(
        'charges',
        properties,
    );
    if (chargeApiResponse.error !== undefined) {
      alert(chargeApiResponse.error.message);
      return callback(false);
    } else {
      this.checkDeliveryTime();
      this._clearCartMenu();
      this.setState({isModalVisible: false});
      return callback(true);
    }
  };


  onPressCreditCardDone = () => {
        if (this.state.creditCardInput.valid) {
          this.setState(
              {
                isPaymentProcess: !this.state.isPaymentProcess,
                isModalVisible: false,
                loading: true,
              },
              () => {
                this.chargeUserFromCard((result) => {
                  if (result) {
                  } else {
                    this.setState({loading: false});
                  }
                }).done();
              },
          );
        } else {
          alert('Please enter valid card information');
        }

  };


  checkDeliveryTime = () => {
    let { todayRadioValue, tomorrowRadioValue, customRadioValue,saveTime,defaultValueTodayTomorrow,customDeliveryTime} = this.state;
    if(todayRadioValue || tomorrowRadioValue) {
      let value = defaultValueTodayTomorrow;
      this.setState({saveTime:value},() => {
        this._registerOrderToFirebase();
      })
    }
    else if(customRadioValue){
      this.saveCustomData();
    }
    else {
      alert('Please Select Delivery Time')
    }
  }


  _registerOrderToFirebase = async() => {
    let {
      firstName,
      lastName,
      profileImage,
      phoneNumber,
      productsName,
      addressFromRadioButton,
      totalPrice,
      saveTime

    } = this.state;
    if (CommonDataManager.getInstance().getUser()) {
      let userUid = CommonDataManager.getInstance().getUser();
      let date = new Date();

      await firestore()
          .collection('Orders')
          .doc()
          .set({
            firstName: firstName,
            lastName: lastName,
            orderStatus: 'Requested',
            profileImage: profileImage,
            phoneNumber: phoneNumber,
            createdAt: date,
            orderProduct: productsName,
            userId: userUid,
            address: addressFromRadioButton,
            deliveryTime:saveTime,
            totalPrice: '$' + '' + totalPrice,
          })
          .then(() => {
            this.setState({loading:false},() =>{
              this.props.navigation.navigate('OrderPlaced',{
                fcmTokens: this.state.driversFcmToken,
              })
            })

          })
          .catch((error) => {
            console.log(error);
          });
    }
  };


  _clearCartMenu = () => {
    CommonDataManager.getInstance().clearCart([]);
  };


  onPressTodayRadioButton = () =>{
    let {todayTomorrowTiming,isToday,todayRadioValue,tempArray,tomorrowTiming} = this.state;
    let todayDate = moment().toDate();
    let updatedTodayDate = todayDate.toString().substring(0,15);

    let tempData=[];
      this.setState({todayRadioValue:true, tomorrowRadioValue:false, customRadioValue:false,tempArray:[],defaultValueTodayTomorrow:null},()=>{

          todayTomorrowTiming.map((i)=>{
            console.log('values ==todayTomorrowTiming===>>>>',i)

            let value = i.value;
          let values = value.toString();
            tempData.push({
            label:updatedTodayDate +' '+values,
            value:updatedTodayDate +' '+values,
          })
          this.setState({tempArray:tempData},()=>{
            console.log('todayTiming --->', this.state.tempArray);
          })
        })
      })
  }


  onPressTomorrowRadioButton = () =>{
    let {tomorrowTiming,} = this.state;
    console.log('tomorrowTiming ==tomorrowTiming===>>>>',tomorrowTiming)

    let tempData=[];
      this.setState({todayRadioValue:false, tomorrowRadioValue:true, customRadioValue:false,tempArray:[],defaultValueTodayTomorrow:null
      },()=>{
        console.log('tomorrowTiming ==tempArray==before call=>>>>',this.state.tempArray)

        // alert('yes')
        let tomorrowDate = moment().add(1,'days')._d;
        let updatedTomorrowDate = tomorrowDate.toString().substring(0,15);
        // if(tempArray.length > 0){
        //   this.setState({tempArray:[]})
        // } else {
          tomorrowTiming.map((i)=>{
            console.log('values ==tomorrowTiming===>>>>',i)
            let value = i.value;
            let values = value.toString();
            tempData.push({
              label:updatedTomorrowDate +' '+values,
              value:updatedTomorrowDate +' '+values,
            })
            this.setState({tempArray:tempData},()=>{
              console.log('TomorrowTiming --tempArray->', this.state.tempArray);
            })
          })
        // }

      })

  }


  onPressCustomRadioButton = () =>{
    this.setState({todayRadioValue:false,  tomorrowRadioValue:false, customRadioValue:true,})
  }


  saveCustomData = () =>{
    let {defaultValueMonthName,defaultTotalDays,time} = this.state;
    this.setState({customDeliveryTime:defaultValueMonthName+' '+' '+defaultTotalDays+' '+time},()=>{
      let val= this.state.customDeliveryTime;
      this.setState({saveTime:val},()=>{
        this._registerOrderToFirebase()
      })
    })
  }


  saveTodayData = () =>{
    let {defaultValueTodayTomorrow} = this.state;
    this.setState({customDeliveryTime:defaultValueTodayTomorrow})
  }

  render() {

    const {modalVisible, isModalVisible, isDatePickerVisible,customDeliveryTime,customRadioValue, todayRadioValue, tomorrowRadioValue, time, tempArray} = this.state;
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
                title={'Choose Address'}
                onLeftIconPress={() => this.props.navigation.goBack()}
                bgColor={colors.black}
                tintColor={colors.white}
                leftIconPath={images.headerLeftBack}
            />
          </View>
          <View style={styles.bottomContainer}>
            {/* //================================ Address Container ======================================// */}

            <View style={styles.flatlistContainer}>
              <ScrollView
                  contentContainerStyle={{flexGrow: 1}}
                  showsVerticalScrollIndicator={false}>
                <RadioForm formHorizontal={false} animation={true}>
                  {this.state.radioValue.map((obj, i) => (
                      <View style={styles.addressComponentStyle}>
                        <View>
                          <Text style={styles.titleStyle}>{obj.nameAddress}</Text>
                          <RadioButton labelHorizontal={true} key={i}>
                            <RadioButtonInput
                                obj={obj}
                                index={i}
                                isSelected={this.state.selectedValue === i}
                                onPress={() =>
                                    this.setState({selectedValue: i}, () => {
                                      // console.log(
                                      //   'selectedValue',
                                      //   this.state.selectedValue,
                                      // );
                                    })
                                }
                                borderWidth={wp(0.5)}
                                buttonInnerColor={colors.light_blue_apptheme}
                                // buttonOuterColor={this.state.value3Index === i ? '#2196F3' : '#000'}
                                buttonSize={15}
                                buttonOuterSize={25}
                                buttonStyle={{}}
                                buttonWrapStyle={{marginLeft: 10}}
                            />
                            <Text numberOfLines={2} style={styles.addressTitle}>
                              {obj.label}
                            </Text>
                          </RadioButton>
                        </View>
                      </View>
                  ))}
                </RadioForm>
              </ScrollView>
              <TouchableOpacity
                  style={styles.buttonAddAddress}
                  onPress={() => this.setModalVisible(true)}>
                <Text style={{color: colors.white,fontWeight:'bold'}}>
                  Add New Address
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.viewDate}>
              <Text style={styles.deliveryDateText}>Delivery Date</Text>
              <View>
                <CheckBox checkTitle={'Today'}
                          value={this.state.todayRadioValue}
                          onValueChange={this.onPressTodayRadioButton}
                />
                <CheckBox
                    value={this.state.tomorrowRadioValue}
                    onValueChange={this.onPressTomorrowRadioButton}
                    checkTitle={'Tomorrow'} marginTop={wp(7)} marginBottom={wp(5)}/>
                <DropDownPicker
                    placeholder={'Select Time'}
                    placeholderStyle={{color:colors.black}}
                    items={this.state.tempArray}
                    disabled={todayRadioValue || tomorrowRadioValue ? false : true}
                    defaultValue={this.state.defaultValueTodayTomorrow}
                    containerStyle={{height: hp(5.5),width:wp(90),alignSelf:'center'}}
                    style={{backgroundColor: '#fafafa',}}
                    itemStyle={{justifyContent: 'flex-start'}}
                    dropDownStyle={{backgroundColor: '#fafafa',}}
                    onChangeItem={item => this.setState({defaultValueTodayTomorrow: item.value}, ()=>{
                          console.log('Shift 47 ----->', this.state.defaultValueTodayTomorrow);
                        }
                    )}
                />
                <CheckBox
                    value={this.state.customRadioValue}
                    onValueChange={this.onPressCustomRadioButton}
                    checkTitle={'Custom'} marginTop={wp(7)} marginBottom={wp(5)}/>
                <View style={{width:wp(94),alignSelf:'center',flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
                  <DropDownPicker
                      placeholder={'Months'}
                      placeholderStyle={{color:colors.black}}
                      disabled={customRadioValue ? false : true}
                      items={this.state.months}
                      defaultValue={this.state.defaultValueMonth}
                      containerStyle={{height: hp(5.5),width:wp(27),alignSelf:'center'}}
                      style={{backgroundColor: '#fafafa',}}
                      itemStyle={{justifyContent: 'flex-start'}}
                      dropDownStyle={{backgroundColor: '#fafafa',}}
                      onChangeItem={item => this.setState({
                            defaultValueMonth: item.value,
                            defaultValueMonthName:item.label,
                          },
                          ()=>{
                            let date = moment(item.value, "M").daysInMonth();
                            let daysOfMonth = Array.from(Array(moment(item.value,'M').daysInMonth()), (_, i) => i + 1)
                            let tempArray = [];
                            daysOfMonth.map((i)=>{
                              tempArray.push({
                                label:i.toString(),
                                value:i.toString(),
                              })
                            })
                            // tempArray.push({
                            //   label:'title',
                            //   value:daysOfMonth,
                            // })

                            this.setState({totalDays: tempArray})
                            // console.log('days in tempArray ----->',tempArray);
                            // console.log('days in month ----->',date);
                            // console.log('days daysOfMonth daysOfMonth ----->',daysOfMonth);
                            // console.log('Shift date ----->', this.state.defaultValueMonth);
                          }
                      )}
                  />

                  <DropDownPicker
                      placeholder={'Days'}
                      placeholderStyle={{color:colors.black}}
                      disabled={customRadioValue ? false : true}
                      items={this.state.totalDays}
                      defaultValue={this.state.defaultTotalDays}
                      containerStyle={{height: hp(5.5),width:wp(27),alignSelf:'center'}}
                      style={{backgroundColor: '#fafafa',}}
                      itemStyle={{justifyContent: 'flex-start'}}
                      dropDownStyle={{backgroundColor: '#fafafa',}}
                      onChangeItem={item => this.setState({
                            defaultTotalDays: item.value,
                          },
                          ()=>{
                            // console.log('defaultTotalDays ----->', this.state.defaultTotalDays);
                          }
                      )}
                  />

                  <DropDownPicker
                      onOpen={() => this.setState({isDatePickerVisible:true,timeDropDown:true},)}
                      isVisible={isDatePickerVisible ? true : false}
                      placeholder={time ? time : 'Time'}
                      placeholderStyle={{color:colors.black}}
                      disabled={customRadioValue ? false : true}
                      containerStyle={{height: hp(5.5),width:wp(27),alignSelf:'center'}}
                      style={{backgroundColor: '#fafafa',}}
                      itemStyle={{
                        justifyContent: 'flex-start',
                      }}
                      dropDownStyle={{backgroundColor: '#fffffff',borderColor:'#ffffff',marginTop:10}}
                      // onChangeItem={item => this.setState({
                      //       country: item.value
                      //     },
                      //     ()=>{
                      //       console.log('Shift ----->', this.state.country);
                      //     }
                      // )}
                      // labelStyle={{
                      //   fontSize: 40,
                      //   // textAlign: 'left',
                      //   color:'#ffffff'
                      // }}
                  />
                  <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="time"
                      onConfirm={(val) => this.setState({time:val.toString().substring(15, 21),},()=>{
                        // let timeValue = val.toString();
                        // let onlyTime = timeValue.substring(15, 24);
                        // console.log('value time00000---->',val);
                        // console.log('time ---->',this.state.time)
                        this.setState({isDatePickerVisible:false,})
                      })}
                      onCancel={()=>this.setState({isDatePickerVisible:false,})}
                  />
                </View>

              </View>
            </View>
            {/* //================================ Add New Address ======================================// */}

            <View style={styles.paymentContainer}>
              <Button
                  title={'Place Order'}
                  titleStyle={[styles.titleStyles]}
                  activeOpacity={0.7}
                  height={hp(8)}
                  width={'75%'}
                  titleColor={colors.appBlue}
                  bgColor={colors.appButtonColor}
                  // onPress={() => this.setStripeModalVisible(true)}
                  onPress={() => this.getTiming()}
                  // onPress={() => this.setStripeModalVisible(true)}
              />
            </View>
          </View>
          <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                this.setModalVisible(!modalVisible);
              }}>
            <AddAddressModal
                address={this.state.address}
                onChangeText={this.onTextInputAddress}
                nameAddress={this.state.nameAddress}
                onChangeNameAddress={this.onChangeNameAddress}
                onPressAdd={this.addAddress}
                onPressCancel={() => {
                  this.setModalVisible(!modalVisible);
                }}
            />
          </Modal>
          {/* //================================ Stripe Model ======================================// */}

          <Modal
              visible={isModalVisible}
              transparent={false}
              animationType="slide">
            <View style={{marginTop: hp('5%'), height: hp('20%')}}>
              <CreditCardInput
                  autoFocus={true}
                  onChange={this.onCreditCardInput}
              />
              <TouchableOpacity
                  style={styles.creditCardStyle}
                  onPress={() => this.onPressCreditCardDone()}>
                <Text style={styles.doneStyle}>DONE</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  style={styles.paymentProcessStyle}
                  onPress={() => {
                    this.setStripeModalVisible(!isModalVisible);
                  }}>
                <Text style={styles.cancel}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
    );
  }
}
export default ChooseAddress;
