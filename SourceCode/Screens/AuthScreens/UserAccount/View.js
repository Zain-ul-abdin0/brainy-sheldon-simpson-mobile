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
  Platform,
  Dimensions,
  Alert, Keyboard, TouchableWithoutFeedback,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AnimatedLoader from 'react-native-animated-loader';
import storage from '@react-native-firebase/storage';
import AsyncStorage  from '@react-native-community/async-storage';
import React from 'react';

//================================ Local Imported Files ======================================//

import styles from './Styles';
import AppInput from '../../../Components/AppInput/AppInput';
import Button from '../../../Components/Button/Button';
import colors from '../../../Assets/Colors/colors';
import images from '../../../Assets/Images/images';

import CommonDataManager from '../../Singleton';
import messaging from '@react-native-firebase/messaging';
import {CommonActions} from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AppLoading from '../../../Components/AppLoading/AppLoading';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';



class UserAccount extends React.Component {
  constructor(props) {
    var email = CommonDataManager.getInstance().getEmail();
    var password = CommonDataManager.getInstance().getPassword();
    super(props);
    this.state = {
      spinner: false,
      loading: false,
      email: email,
      password: password,
      mainProfielPic: CommonDataManager.getInstance().getMainProfilePic(),
      firstName: '',
      lastName: '',
      address:'Address',
      nameAddress: '',
      date: 'Select Date',
      phoneNumber: '',
      picWithIdCard: images.no_user_image,
      deviceToken: '',
      datePickerVisible: false,
      selectDate: 'Select Date of birth',
      urlProfile:'',
    };
  }
  unsubscribe = this.props.navigation.addListener('focus', () => {
    this.getAddressFromMapScreen();
  });

  componentDidMount() {
   let checkUserType = CommonDataManager.getInstance().getCheckFromSignIn();
   if(checkUserType === 'apple'){
     let appleUserInfo = CommonDataManager.getInstance().getAppleInfo();
     this.setState({email:appleUserInfo.userEmail,firstName:appleUserInfo.firstName,lastName:appleUserInfo.lastName})
   }
  }

  getAddressFromMapScreen = () => {
    var fullAddress = CommonDataManager.getInstance().getFullAddress();

    console.log('fullAddress', fullAddress);
    if (fullAddress !== undefined) {
      this.setState({
        address: fullAddress,
      });
    } else {
    }
  };

  uploadProfilePic = async (images,callback) => {
    let userID = auth().currentUser.uid;
      const item = images;
      const image =
          Platform.OS === "android" ? item : item.replace("file:///", ""); //imagePath.uri;
      const imageRef = storage().ref('ProfilePics/' + userID);
      imageRef
          .putFile(image)
          .then(() => {
            storage()
                .ref('ProfilePics/' + userID)
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




//     const uri = mainProfielPic;
// console.log('mainProfile',mainProfielPic)
//     if (uri !== undefined) {
//       const uploadUri =
//         Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
//       const userID = auth().currentUser.uid;
//       const task = await storage()
//         .ref('ProfilePics/' + userID)
//         .putFile(uploadUri);
//       try {
//         await task;
//         console.log(task);
//       } catch (e) {
//         alert.error(e);
//         console.log(e.message);
//       }
//       const ref = storage().ref('ProfilePics/' + userID);
//       const url = await ref.getDownloadURL().then(() => {
//         console.log('pic',url)
//         this.setState({urlProfile: url})
//       })
//       }
      //   let userProfileInfo = {
      //     firstName,
      //     lastName,
      //     url,
      //   };
      //   CommonDataManager.getInstance().setUserPersonalInfo(userProfileInfo);
      //   await firestore().collection('UserRecords').doc(userID).update({
      //     ProfilePicUri: url,
      //   });
      // });

      // firestore().collection('UserRecords').doc(userID).update({
      //   ProfilePicUri: url,
      // });
    // else {
    //   alert('something went wrong');
    // }
  };

  uploadIdCardPic = async () => {
    let imageUrl = this.state.picWithIdCard;
    console.log('imageUrl', imageUrl.uri);
    const uri = imageUrl.uri;

    if (uri !== undefined) {
      const uploadUri =
        Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      const userID = CommonDataManager.getInstance().getUser();
      const task = storage()
        .ref('PicsWithIDCard/' + userID)
        .putFile(uploadUri);
      try {
        await task;
        console.log(task);
      } catch (e) {
        alert.error(e);
        console.log(e.message);
      }
      const ref = storage().ref('PicsWithIDCard/' + userID);
      const url = await ref.getDownloadURL();

      await firestore().collection('UserRecords').doc(userID).update({
        picWithIDCard: url,
      });
    } else {
      alert('something went wrng');
    }
  };

  ImagePicker = () => {
    let options = {
      mediaType: 'photo',
    };
    launchImageLibrary(options, (res) => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.errorMessage) {
        console.log('ImagePicker Error: ', res.errorMessage);
      } else {
        this.setState({picWithIdCard: res});
      }
    });
  };

  getDeviceToken = async () => {
    await messaging()
      .getToken()
      .then((token) => {
        this.setState({
          deviceToken: token,
        });
      });
  };

  submitRecord = async () => {
    let image = CommonDataManager.getInstance().getMainProfilePic();

    let {
      email,
      password,
      firstName,
      lastName,
      address,
      phoneNumber,
      picWithIdCard,
      mainProfielPic,
    } = this.state;

    if (firstName === '') {
      alert('Please Enter First Name');
      this.setState({loading: false});
    } else if (lastName === '') {
      alert('Please Enter Last Name');
      this.setState({loading: false});
    } else if (address === '') {
      alert('Please Pick Address');
      this.setState({loading: false});
    } else if (phoneNumber === '') {
      alert('Please Enter Phone Number');
      this.setState({loading: false});
    } else if (phoneNumber.length <= 10) {
      alert('Please Enter Correct Phone Number, at least 11 numbers');
      this.setState({loading: false});
    } else if (image === '') {
      alert('Please Select Profile Image');
      this.setState({loading: false});
    } else if (picWithIdCard === images.no_user_image) {
      alert('Please Enter Pic with ID Card');
      this.setState({loading: false});
    } else {
      let {firstName, lastName, mainProfielPic} = this.state;


      this.setState({loading: true});
      var getCommonCredential = CommonDataManager.getInstance().getCommonCredential();
      var checkFromSignIn = CommonDataManager.getInstance().getCheckFromSignIn();

      this.getDeviceToken();

      if (checkFromSignIn === 'apple') {
        await auth()
            .signInWithCredential(getCommonCredential)
            .then(() => {
              this.storeDataToFirebase();
            })
            .catch((error) => {
              if(error.message === '[auth/email-already-in-use] The email address is already in use by another account.')
              {
                this.setState({loading: false});
                setTimeout(() => {
                  alert("Email already In use")

                },500)
              }else{
                this.setState({loading: false});
                setTimeout(() => {
                  alert(error)

                },500)
              }
            });
      }else if (checkFromSignIn === 'google') {
        // const credentials = await auth()
        //   .signInWithCredential(getCommonCredential)
        let userId = auth().currentUser.uid;
          this.setValue(userId)
          .then(() => {
            this.storeDataToFirebase();
          })
          .catch((error) => {
            if(error.message === '[auth/email-already-in-use] The email address is already in use by another account.')
            {
              this.setState({loading: false});
              setTimeout(() => {
                alert("Email already In use")

              },500)
            }else{
              this.setState({loading: false});
              setTimeout(() => {
                alert(error)

              },500)
            }
          });
      } else if (checkFromSignIn === 'facebook') {
        // await auth()
          // .signInWithCredential(getCommonCredential)
          // .then((resp) => {
        let userId = auth().currentUser.uid;
        this.setValue(userId)
            .then(() => {
              this.storeDataToFirebase();
            })
          // })
          .catch((error) => {
            if(error.message === '[auth/email-already-in-use] The email address is already in use by another account.')
            {
              this.setState({loading: false});
              setTimeout(() => {
                alert("Email already In use")

              },500)
            }else{
              this.setState({loading: false});
              setTimeout(() => {
                alert(error)

              },500)
            }
          });
      } else {
        await auth()
          .createUserWithEmailAndPassword(email, password)
          .then((resp) => {
            if(resp){
              this.setValue(resp.user._user.uid)
              .then(() => {
                this.storeDataToFirebase();
              })
            }
          })
          .catch((error) => {
            if(error.message === '[auth/email-already-in-use] The email address is already in use by another account.')
            {
              this.setState({loading: false});
              setTimeout(() => {
                alert("Email already In use")

              },500)
            }else{
              this.setState({loading: false});
              setTimeout(() => {
                alert(error)

              },500)
            }
          });
      }
    }
  };

  setValue = async (value) => {
    console.log("Value")
    try {
      await AsyncStorage.setItem('Uid', value).then(() => {
        CommonDataManager.getInstance().setUser(value)
      })
    } catch(e) {
      console.log(e);
    }
    console.log('Done.')
  }


  storeDataToFirebase = async () => {
    let imageUrl = CommonDataManager.getInstance().getMainProfilePic();
    let {
      firstName,
      lastName,
      nameAddress,
      address,
      date,
      deviceToken,
      email,
      mainProfielPic,
      phoneNumber,
      picWithIdCard,
      urlProfile,
    } = this.state;
    console.log( firstName,
      lastName,
      nameAddress,
      address,
      date,
      deviceToken,
      email,
        mainProfielPic,
      phoneNumber);
    const userID = CommonDataManager.getInstance().getUser();

    let addressLat = CommonDataManager.getInstance().getAddressLat();
    let addressLog = CommonDataManager.getInstance().getAddressLog();
    let fullAddress = CommonDataManager.getInstance().getFullAddress();

    this.uploadProfilePic(imageUrl, (callback) => {
      this.setState({urlProfile: callback}, async() => {
        console.log('callback',this.state.urlProfile)
        await firestore()
            .collection('UserRecords')
            .doc(userID)
            .set({
              createdAt: new Date(),
              firstName: firstName,
              lastName: lastName,
              ProfilePicUri:this.state.urlProfile,
              email: email,
              address: [
                {nameAddress, address},
              ],
              phoneNumber: phoneNumber,
              dateOFBirthday: date,
              isCustomer: true,
              fcmToken: this.state.deviceToken,
              ageVerified: true,
              isActive: true,
            }).then(() => {
              let userProfile = {
                firstName,
                lastName,
                address,
                date,
                email,
                phoneNumber,
                userID,
                url:this.state.urlProfile,
              };
              CommonDataManager.getInstance().setProfile(userProfile);

              CommonDataManager.getInstance().setUserPersonalInfo(userProfile);
              this.uploadIdCardPic();
              // this.uploadProfilePic();
              this.setState({loading: false},() => {
                this.props.navigation.navigate('WelcomeScreen')
              });
            })
            .catch((error) => {
              this.setState({loading: false});
              alert(error);
            });

      });
    });

  };

  handleConfirm = (value) => {
    let date = value.toString();
    let finalDate = date.substring(0,15);
    this.setState({date: finalDate, datePickerVisible: false});
  };

  render() {
    const {date,address} = this.state;
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
        <TouchableWithoutFeedback style ={styles.mainContainer} onPress={()=>Keyboard.dismiss()}>
        <View style={styles.bottomContainer}>
          <Text style={styles.validEmail}>First Name</Text>
          <AppInput
            height={hp(6.5)}
            placeholder={'First Name'}
            colortextInput={colors.black}
            placeholderTextColor={colors.placeholder_text_color}
            marginBottom={wp(3)}
            marginTop={5}
            borderRadius={wp(2)}
            borderColor
            borderWidth={0.5}
            onChangeText={(firstName) => this.setState({firstName})}
            value={this.state.firstName}
          />
          <Text style={styles.validEmail}>Last Name</Text>

          <AppInput
            height={hp(6.5)}
            placeholder={'Last Name'}
            colortextInput={colors.black}
            placeholderTextColor={colors.placeholder_text_color}
            marginBottom={wp(3)}
            marginTop={5}
            borderRadius={wp(2)}
            borderColor
            borderWidth={0.5}
            onChangeText={(lastName) => this.setState({lastName})}
            value={this.state.lastName}
          />
          <Text style={styles.validEmail}>Email Address</Text>

          <AppInput
            height={hp(6.5)}
            placeholder={'Email Address'}
            colortextInput={colors.black}
            backgroundColor={colors.grey}
            placeholderTextColor={colors.placeholder_text_color}
            marginBottom={wp(3)}
            marginTop={5}
            borderRadius={wp(2)}
            borderColor
            keyboardType={'email-address'}
            borderWidth={0.5}
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
            editable={false}
          />
          <Text style={styles.validEmail}>Address Name</Text>
          <AppInput
            height={hp(6.5)}
            placeholder={'Enter name address (ex: home,workplace)'}
            colortextInput={colors.black}
            placeholderTextColor={colors.placeholder_text_color}
            marginBottom={wp(3)}
            marginTop={5}
            borderRadius={wp(2)}
            borderColor
            borderWidth={0.5}
            onChangeText={(Address) => this.setState({nameAddress: Address})}
            value={this.state.nameAddress}
          />
          <Text style={styles.validEmail}>Address</Text>
          <TouchableOpacity style={styles.addressViewStyle}
            onPress={() => this.props.navigation.navigate('MapScreeen')}>
            <Text style={{color:address === 'Address' ? colors.placeholder_text_color:colors.black}}>{this.state.address}</Text>
          </TouchableOpacity>

          <Text style={styles.validEmail}>Date of Birth</Text>

          <TouchableOpacity
            style={styles.dateStyle}
            onPress={() => this.setState({datePickerVisible: true})}>
            <DateTimePickerModal
              isVisible={this.state.datePickerVisible}
              mode="date"
              maximumDate={new Date()}
              onConfirm={(value) => this.handleConfirm(value)}
              onCancel={() => this.setState({datePickerVisible: false})}
            />
            <Text style={{color: date === 'Select Date' ?colors.placeholder_color:colors.black, paddingLeft: '3%'}}>
              {date}
            </Text>
          </TouchableOpacity>
          <Text style={styles.validEmail}>Phone Number</Text>

          <AppInput
            height={hp(6.5)}
            placeholder={'Phone Number'}
            colortextInput={colors.black}
            placeholderTextColor={colors.placeholder_text_color}
            marginBottom={wp(3)}
            marginTop={5}
            borderRadius={wp(2)}
            borderColor
            borderWidth={0.5}
            maxLength={15}
            keyboardType="numeric"
            onChangeText={(phoneNumber) => this.setState({phoneNumber})}
            value={this.state.phoneNumber}
          />
          <Text style={styles.validEmail}>Pic with ID Card</Text>

          <TouchableOpacity
            style={styles.imagePickerIdCard}
            onPress={this.ImagePicker}>
            <Image
              style={styles.imagePlaceHolder}
              source={this.state.picWithIdCard}
            />
            <Text> card.png</Text>
          </TouchableOpacity>
          <View style={styles.buttonView}>
            <Button
              activeOpacity={0.7}
              height={hp(8)}
              width={'90%'}
              style={styles.buttonStyles}
              title={'Submit'}
              titleColor={colors.appButtonColor}
              bgColor={colors.appButtonColor}
              titleStyle={[styles.titleStyles]}
              onPress={this.submitRecord}
            />
          </View>
        </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
export default UserAccount;
