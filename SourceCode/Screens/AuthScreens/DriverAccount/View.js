//================================ React Native Imported Files ======================================//

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  View,
  StatusBar,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  Platform, TouchableWithoutFeedback, Keyboard,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage  from '@react-native-community/async-storage';
import {CommonActions} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import messaging from '@react-native-firebase/messaging';
import React from 'react';

//================================ Local Imported Files ======================================//

import styles from './Styles';
import AppInput from '../../../Components/AppInput/AppInput';
import Button from '../../../Components/Button/Button';
import colors from '../../../Assets/Colors/colors';
import images from '../../../Assets/Images/images';
import AppLoading from '../../../Components/AppLoading/AppLoading';
import CommonDataManager from '../../Singleton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';


class DriverAccount extends React.Component {
  constructor(props) {
    let email = CommonDataManager.getInstance().getEmail();
    let password = CommonDataManager.getInstance().getPassword();

    super(props);
    this.state = {
      spinner: false,
      email: email,
      password: password,
      fullName: '',
      age: '',
      phoneNumber: '',
      picWithIdCard: images.no_user_image,
      drivingLicencePic: images.no_user_image,
      deviceToken: '',
      mainProfielPic: CommonDataManager.getInstance().getMainProfilePic(),
      date: 'Select Date',
      datePickerVisible:false,
      lastName:'',
    };
  }


  submitRecord = async () => {
    let image = CommonDataManager.getInstance().getMainProfilePic();
    this.setState({spinner: true}, () => {
    });

    let {
      email,
      password,
      fullName,
      age,
      phoneNumber,
      picWithIdCard,
      mainProfielPic,
      drivingLicencePic,
        date,
      lastName
    } = this.state;

    if (fullName === '') {
      alert('Please Enter Name');
      this.setState({spinner: false});
    }else if (phoneNumber === '') {
      this.setState({spinner: false});
      alert('Please Enter Correct Phone Number, at least 11 numbers');
    }else if (date === 'Select Date') {
      this.setState({spinner: false});
      alert('Please select date of birth');
    }else if (lastName === '') {
      this.setState({spinner: false});
      alert('Please Enter last name');
    }else if (image === '') {
      this.setState({spinner: false});
      alert('Please select profile Image');
    }else if (picWithIdCard === images.no_user_image) {
      this.setState({spinner: false});
      alert('Please Select ID Card Picture');
    } else {
      this.setState({spinner: true});
      let getCommonCredential = CommonDataManager.getInstance().getCommonCredential();
      let checkFromSignIn = CommonDataManager.getInstance().getCheckFromSignIn();
      this.getDeviceToken();

      if (checkFromSignIn === 'google') {
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
              this.setState({spinner: false});
              setTimeout(() => {
                alert("Email already In use")

              },500)
            }else{
              this.setState({spinner: false});
              setTimeout(() => {
                alert(error)
              },500)
            }
          });
      } else if (checkFromSignIn === 'facebook') {
        // await auth()
        //   .signInWithCredential(getCommonCredential)
        //     .then((resp) => {
            let userId = auth().currentUser.uid;
                this.setValue(userId)
            .then(() => {
              this.storeDataToFirebase();
            })
          // })
          .catch((error) => {
            if(error.message === '[auth/email-already-in-use] The email address is already in use by another account.')
            {
              this.setState({spinner: false});
              setTimeout(() => {
                alert("Email already In use")

              },500)
            }else{
              this.setState({spinner: false});
              setTimeout(() => {
                alert(error)

              },500)
            }
          });
      } else {
        await auth()
          .createUserWithEmailAndPassword(email, password)
          .then(async(resp) => {
            if(resp) {
              this.setValue(resp.user._user.uid).then(async() => {

              const userID = auth().currentUser.uid;
              await firestore()
                  .collection('UserRecords')
                  .doc(userID)
                  .set({
                    createdAt: new Date(),
                    firstName: fullName,
                    lastName: lastName,
                    email: email,
                    phoneNumber: phoneNumber,
                    dateOFBirthday: date,
                    isCustomer: false,
                    fcmToken: this.state.deviceToken,
                    ageVerified: true,
                    isActive: true,
                    isApproved:false,
                  })
                  .then(() => {
                    this.uploadIdCardPic();
                    this.uploadProfilePic();
                    this.setState({spinner: false}, () => {
                      setTimeout(() => {
                        Alert.alert(
                            'Alert',
                            'Your Driver Profile has been Created.',
                            [
                              {
                                text: 'Ok',
                                onPress: () =>
                                    this.props.navigation.dispatch(
                                        CommonActions.reset({
                                          index: 1,
                                          routes: [{name: 'DriverProfileCreated'}],
                                        }),
                                    ),
                              },
                            ],
                        )
                      },1000)
                    })
                  })
            })
            }
          })
          .catch((error) => {
            if(error.message === '[auth/email-already-in-use] The email address is already in use by another account.')
            {
              this.setState({spinner: false});
              setTimeout(() => {
                alert("Email already In use")

              },500)
            }else{
              this.setState({spinner: false});
              setTimeout(() => {
                alert(error)
              },500)
            }
          });
      }
    }
  };


  imageProfilePicker = () => {
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


  uploadIdCardPic = async () => {
    let imageUrl = this.state.picWithIdCard;

    const uri = imageUrl.uri;

    if (uri !== undefined) {
      const uploadUri =
        Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      const userID = auth().currentUser.uid;
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
        console.log('Url1',url,userID)
      await firestore().collection('UserRecords').doc(userID).update({
        picWithIDCard: url,
      });
    } else {
      alert('something went wrong');
    }
  };


  uploadProfilePic = async () => {
    let imageUrl = CommonDataManager.getInstance().getMainProfilePic();
    console.log('imageUrl', imageUrl);
    const uri = imageUrl;

    if (uri !== undefined) {
      const uploadUri =
        Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      const userID = auth().currentUser.uid;
      const task = storage()
        .ref('ProfilePics/' + userID)
        .putFile(uploadUri);
      try {
        await task;
        console.log(task);
      } catch (e) {
        alert.error(e);
        console.log(e.message);
      }
      const ref = storage().ref('ProfilePics/' + userID);
      const url = await ref.getDownloadURL();
      console.log('Url2',url)
      await firestore().collection('UserRecords').doc(userID).update({
        ProfilePicUri: url,
      });
    } else {
      alert('something went wrong');
    }
  };


  storeDataToFirebase = async () => {
    let {
      fullName,
      address,
      age,
      deviceToken,
      email,
      mainProfielPic,
      phoneNumber,
      picWithIdCard,
        date,
        lastName,
    } = this.state;
    const userID = auth().currentUser.uid;

    let addressLat = CommonDataManager.getInstance().getAddressLat();
    let addressLog = CommonDataManager.getInstance().getAddressLog();

    let userProfile = {
      fullName,
      address,
      email,
      phoneNumber,
      userID,
    };

    CommonDataManager.getInstance().setProfile(userProfile);

    await firestore()
      .collection('UserRecords')
      .doc(userID)
      .set({
        createdAt: new Date(),
        firstName: fullName,
        lastName: lastName,
          email: email,
          address: {
            fullAddress: address,
            latitude: addressLat,
            longitude: addressLog,
          },
          phoneNumber: phoneNumber,
          dateOFBirthday: date,
          isCustomer: true,
          fcmToken: this.state.deviceToken,
          ageVerified: true,
          isActive: true,
          isApproved:false,
      }).then(() => {
          this.uploadIdCardPic(),
              this.uploadProfilePic(),
              this.setState({spinner: false},() => {
                setTimeout(() => {
                  Alert.alert(
                      'Alert',
                      'Your Driver Profile has been Created.',
                      [
                        {
                          text: 'Ok',
                          onPress: () =>
                              this.props.navigation.dispatch(
                                  CommonActions.reset({
                                    index: 1,
                                    routes: [{name: 'DriverProfileCreated'}],
                                  }),
                              ),
                        },
                      ],
                  )
                },1000)
              })
        }).catch((error) => {
          this.setState({spinner: false});
          alert(error.message);
        });
  };


  setValue = async (value) => {
    try {
      await  AsyncStorage.setItem('Uid', value).then(() => {
        CommonDataManager.getInstance().setUser(value)
      })
    } catch(e) {
      console.log(e);
    }
    console.log('Done.')
  }


  handleConfirm = (value) => {
    let date = value.toString();
    let finalDate = date.substring(0,15);
    this.setState({date: finalDate, datePickerVisible: false});
  };


  render() {
    return (
      <View style={styles.mainContainer}>

        {AppLoading.renderLoading(this.state.spinner)}

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
            onChangeText={(fullName) => this.setState({fullName})}
            value={this.state.fullName}
          /><Text style={styles.validEmail}>Last Name</Text>

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
            placeholderTextColor={colors.placeholder_text_color}
            marginBottom={wp(3)}
            marginTop={5}
            borderRadius={wp(2)}
            borderColor
            keyboardType={'email-address'}
            borderWidth={0.5}
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
            backgroundColor={colors.grey}
            editable={false}
          />
          {/*<Text style={styles.validEmail}>Age</Text>*/}

          {/*<AppInput*/}
          {/*  height={hp(6.5)}*/}
          {/*  placeholder={'Age'}*/}
          {/*  colortextInput={colors.black}*/}
          {/*  placeholderTextColor={colors.placeholder_text_color}*/}
          {/*  marginBottom={wp(3)}*/}
          {/*  marginTop={5}*/}
          {/*  borderRadius={wp(2)}*/}
          {/*  borderColor*/}
          {/*  borderWidth={0.5}*/}
          {/*  maxLength={3}*/}
          {/*  keyboardType="numeric"*/}
          {/*  onChangeText={(age) => this.setState({age})}*/}
          {/*  value={this.state.age}*/}
          {/*/>*/}
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
            <Text style={{color: this.state.date === 'Select Date' ?colors.placeholder_color:colors.black, paddingLeft: '3%'}}>
              {this.state.date}
            </Text>
          </TouchableOpacity>

          <Text style={styles.validEmail}>Pic with ID Card</Text>

          <View style={styles.imagePickerIdCard}>
            <TouchableOpacity onPress={this.imageProfilePicker}>
              <Image
                style={styles.imagePlaceHolder}
                source={this.state.picWithIdCard}
              />
            </TouchableOpacity>

            <Text> card.png</Text>
          </View>
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
export default DriverAccount;
