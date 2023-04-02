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
  FlatList, Dimensions, Modal,
} from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

//================================ Local Imported Files ======================================//

import styles from './Styles';
import colors from '../../Assets/Colors/colors';
import images from '../../Assets/Images/images';
import AppHeader from '../../Components/AppHeader/AppHeader';

import AddressComponet from '../../Components/AddressComponet/AddressComponet';
import Button from '../../Components/Button/Button';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ToggleSwitch from 'toggle-switch-react-native'
import RadioForm, {RadioButton, RadioButtonInput} from 'react-native-simple-radio-button';
import AddAddressModal from '../../Components/AddAddressModal/AddAddressModal';
import AppLoading from '../../Components/AppLoading/AppLoading';
import CommonDataManager from '../Singleton';


class AccountScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userFirstName:'',
      userLastName:'',
      userProfileImage:'',
      userEmail:'',
      userPhoneNumber:'',
      toggleSwitch:false,
      address: '',
      nameAddress:'',
      radioValue: [],
      selectedValue: 0,
      addressFromRadioButton: '',
      modalVisible: false,
      loading:true,


    }
  }


  componentDidMount() {
    this.props.navigation.addListener('focus',() =>{
      this.loading();
      this.getUserInfo();
    })
  }

  loading = () =>{
    setTimeout(() =>{
      this.setState({loading:false})
    },1000)
  }


  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };


  onTextInputAddress = (text) => {
    this.setState({address: text});
  };

  onChangeNameAddress = (text) => {
    this.setState({nameAddress: text});
  };

  addAddress = () => {
    let address = this.state.address;
    let nameAddress = this.state.nameAddress;
    if(CommonDataManager.getInstance().getUser()) {
      let userUid = CommonDataManager.getInstance().getUser();
    if (this.state.address <= 0) {
      alert('Please enter address');
    }
    else if (this.state.nameAddress <= 0) {
      alert('Please enter name of address');
    }
    else {
      firestore()
          .collection('UserRecords')
          .doc(userUid)
          .update({
            address: firestore.FieldValue.arrayUnion({nameAddress,address}),
          });
      this.setModalVisible(false);
      this.getUserInfo();
      this.setState({address: '',nameAddress:''});
    }}
  };

  getUserInfo = () =>{
    if(CommonDataManager.getInstance().getUser()) {
      let userUid = CommonDataManager.getInstance().getUser();
      firestore().collection('UserRecords').doc(userUid).get().then((res)=>{
        let addressList = [];
        if(res !== undefined) {
          res._data.address.map((resp) =>{
            console.log('address =====> =====>',resp );
            addressList.push({label: resp.address,nameAddress:resp.nameAddress});
          })
          console.log('addressList ------->',addressList);
        }
        this.setState({radioValue: addressList,userFirstName:res._data.firstName,userLastName:res._data.lastName,userProfileImage:res._data.ProfilePicUri,userEmail:res._data.email,userPhoneNumber:res._data.phoneNumber})
      },()=>{console.log('userProfileImage',this.state.userProfileImage)})
    }

  }


  menuItem(item) {
    return (
      //================================ Comman FlatList ======================================//
      <AddressComponet
        mainTitle={item.mainTitle}
        mainAddress={item.mainAddress}

      />
    )
  }

  render() {
    const {userFirstName,userLastName,userProfileImage,userEmail,userPhoneNumber,toggleSwitch,modalVisible} = this.state;
    return (
      <View style={styles.mainContainer}>
        {AppLoading.renderLoading(this.state.loading)}
        {/* <AnimatedLoader
          visible={this.state.spinner}
          overlayColor="rgba(255,255,255,0.50)"
          source={require("../../../../Assets/Loading/lf30_editor_lEfhkW.json")}
          animationStyle={styles.lottie}
          speed={1}
        /> */}
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
            title={"My Account"}
            onLeftIconPress={() => this.props.navigation.openDrawer()}
            bgColor={colors.black}
            tintColor={colors.white}
            leftIconPath={images.ic_hamburger_menu}
          // rightIconOnePath={images.cart}
          />
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.uperContainer}>
            <View style={styles.leftContainer}>
              <Image style={styles.imageStyles}
                     source={userProfileImage ? {uri: userProfileImage} : images.ic_profile_inactive}
              />
            </View>
            <View style={styles.middleContainer}>
              <View style={styles.uperTextContainer}>
                <Text style={styles.uperTextStyleContainer}>{userFirstName+' '+userLastName }</Text>
              </View>
              <View style={styles.bottomTextContainer}>
                <Text style={styles.uperTextStyleNumber}>{userPhoneNumber}</Text>
                <Text style={styles.lowerTextStyleContainer}>{userEmail}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.rightContainer} onPress={() => this.props.navigation.navigate('EditProfile')}>
              <Image style={styles.ic_penStyles} source={images.ic_pen}/>
            </TouchableOpacity>
          </View>
          <View style={styles.dividerContainer}/>

          <View style={styles.addressContainer}>
            <Text style={styles.addressStyleContainer}>Delivery Address</Text>
            <Image style={styles.ic_penStyles} source={images.ic_down}/>
          </View>
          <View style={styles.flatListContainer}>
            <ScrollView
                contentContainerStyle={{flexGrow: 1,paddingBottom:'2%'}}
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
                                    console.log(
                                        'selectedValue',
                                        this.state.selectedValue,
                                    );
                                  })
                              }
                              borderWidth={wp(0.5)}
                              buttonInnerColor={colors.light_blue_apptheme}
                              // buttonOuterColor={this.state.value3Index === i ? '#2196F3' : '#000'}
                              buttonSize={15}
                              buttonOuterSize={25}
                              buttonStyle={{}}
                              buttonWrapStyle={{marginLeft: 10,}}
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
          </View>
          <View style={styles.buttonContainer}>

            <Button
              activeOpacity={0.7}
              height={hp(8)}
              width={'80%'}
              style={styles.buttonStyles}
              title={'ADD NEW ADDRESS'}
              titleColor={colors.appBlue}
              bgColor={colors.white}
              titleStyle={[styles.titleStyles]}
              onPress={() => this.setModalVisible(true)}
            />
          </View>
          <View style={styles.dividerContainer}/>

          {/*// Payment Options hide for now*/}

          {/*<View style={styles.paymentContainer}>*/}
          {/*  <Text style={styles.paymentStyleContainer}>Payment Options</Text>*/}
          {/*  <Image style={styles.ic_penStyles} source={images.ic_chevron_right}/>*/}
          {/*</View>*/}

          <View style={styles.dividerContainer}/>
          <View style={styles.paymentContainer}>
            <Text style={styles.paymentStyleContainer}>Notifications</Text>
            <ToggleSwitch
                isOn={toggleSwitch}
                onColor={colors.appButtonColor}
                offColor={colors.placeholder_color}
                size="medium"
                onToggle={() => this.setState({toggleSwitch:!toggleSwitch})}
            />
          </View>
          <View style={styles.dividerContainer}/>
        </View>

      </View>
    );
  }
}

export default AccountScreen;
