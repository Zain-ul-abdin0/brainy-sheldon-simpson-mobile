//================================ React Native Imported Files ======================================//

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Alert,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import React from 'react';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import  AsyncStorage  from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';

//================================ Local Imported Files ======================================//

import styles from './Styles';
import AppInput from '../../../Components/AppInput/AppInput';
import Button from '../../../Components/Button/Button';
import colors from '../../../Assets/Colors/colors';
import images from '../../../Assets/Images/images';
import AppHeader from '../../../Components/AppHeader/AppHeader';
import CommonDataManager from '../../Singleton';
import AppLoading from '../../../Components/AppLoading/AppLoading';


class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      email: '',
      password: '',
      //   email: 'uos@gmail.com',
      // password: 'uos0099!',
      modalVisible: false,
      view: 'this',
      showPassword: true,
      checkValue: false,
      profilePic: '',
    };
  }


  getDeviceTokenAndSaveToDatabase = async() => {
    await messaging()
      .getToken()
      .then(async (token) => {
          console.log('token')
        const userId = auth().currentUser.uid;
        await firestore().collection('UserRecords').doc(userId).update({
            fcmToken: token,
        });
      });
  }


  handleLogin = async() => {
    this.setState({loading: true});
    let {email, password,pass,distance} = this.state;
    if (email === '') {
      alert('PLease Enter the Email');
      this.setState({loading: false});
    } else if (password === '') {
      alert('PLease Enter the Password');
      this.setState({loading: false});
    } else {
      this.setState({loading: true});
               await auth()
                  .signInWithEmailAndPassword(email, password)
                  .then(async (res) => {
                      if (res !== null) {
                        let userUid = res.user.uid;
                         await firestore()
                          .collection('UserRecords')
                          .doc(userUid)
                          .get()
                          .then((resp) => {
                              if(resp._data.isActive === true) {
                                  if (resp._data.isCustomer === true) {
                                      this.setValue(userUid).then(() => {
                                          this.setState({
                                              profilePic: resp._data.ProfilePicUri,
                                          });
                                          let userPersonalInfo = {
                                              firstName: resp._data.firstName,
                                              lastName: resp._data.lastName,
                                              url: resp._data.ProfilePicUri,
                                          };
                                          CommonDataManager.getInstance().setUserPersonalInfo(
                                              userPersonalInfo,
                                          );
                                          this.getDeviceTokenAndSaveToDatabase();

                                          this.setState({loading: false}, () => {
                                              this.props.navigation.navigate('WelcomeScreen');
                                          });
                                      });
                                  } else if ((resp._data.isCustomer === false) && (resp._data.isApproved === true)) {
                                      this.setValue(userUid).then(() => {
                                          this.setState({
                                              profilePic: resp._data.ProfilePicUri,
                                          });
                                          let userPersonalInfo = {
                                              firstName: resp._data.fullName,
                                              lastName: resp._data.lastName,
                                              url: resp._data.ProfilePicUri,
                                          };
                                          CommonDataManager.getInstance().setUserPersonalInfo(
                                              userPersonalInfo,
                                          );
                                          this.getDeviceTokenAndSaveToDatabase();

                                          this.setState({loading: false}, () => {
                                              this.props.navigation.navigate('driverDrawer');
                                          });
                                      });
                                  }else{
                                      this.setState({loading: false}, () => {
                                          setTimeout(() => {
                                              alert('Admin has not approved your profile yet')
                                          },100)
                                      });
                                  }
                              }else{
                                  this.setState({loading: false},() => {
                                      alert('User is banned by the admin')
                                  });
                              }
                          }).catch((error) => {
                              this.setState({loading:false},() => {
                                  alert(error)
                              })
                             })
                        // this.getDeviceTokenAndSaveToDatabase();
                        //
                        // this.setState({loading: false}, () => {
                        //     this.props.navigation.navigate('WelcomeScreen')
                        // });
                      }
                  })
                  .catch((error) =>
                    Alert.alert(
                      "Can't Find Account",
                      'It looks like ' +
                        this.state.email +
                        " doesn't match an existing account. If you don't have an All-Rounder account, you can create one now.",
                      [
                        {
                          text: 'CREATE ACCOUNT',
                          onPress: () => this.props.navigation.navigate('SignupWith'),
                        },
                        {cancelable: false, text: 'TRY AGAIN', style: 'cancel'},
                        this.setState({loading: false}),
                      ],
                    ),
                  );

    }
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


  togglePassword() {
    this.setState({showPassword: !this.state.showPassword});
  }


  render() {
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
            headerHeight="100%"
            titleFontSize={wp(5)}
            leftIconPath={images.headerLeftBack}
            onLeftIconPress={() => this.props.navigation.goBack()}
          />
        </View>
        {/* //================================ Logo ======================================// */}
        <View style={styles.upperView}>
          <Image style={styles.imageStyles} source={images.logo}/>
        </View>
        <View style={styles.textView}>
        </View>
          <TouchableWithoutFeedback style ={styles.mainContainer} onPress={()=>Keyboard.dismiss()}>
        <View style={styles.midView}>
          <Text style={styles.validEmail}>Email</Text>

          {/* //================================ Email Input ======================================// */}
          <AppInput
            height={hp(6.5)}
            placeholder={'Email'}
            colortextInput={colors.black}
            placeholderTextColor={colors.placeholder_text_color}
            marginBottom={wp(3)}
            marginTop={5}
            borderRadius={wp(2)}
            borderColor
            borderWidth={0.5}
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
            keyboardType={'email-address'}
          />

          {/* //================================ Password Input ======================================// */}
          <Text style={styles.validPassword}>Password</Text>

          <AppInput
            height={hp(6.5)}
            borderRadius={wp(4)}
            placeholder={'Password'}
            marginTop={5}
            secureEntry={this.state.showPassword}
            onRightIconPress={() => this.togglePassword()}
            colortextInput={colors.black}
            placeholderTextColor={colors.placeholder_text_color}
            marginBottom={wp(3)}
            tintColor={colors.grey}
            rightIconPath={images.ic_eye}
            borderRadius={wp(2)}
            borderColor
            borderWidth={0.5}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
          />
        </View>
          </TouchableWithoutFeedback>
        {/* //================================ Buttons ======================================// */}
        <View style={styles.buttonView}>
          <Button
            activeOpacity={0.7}
            height={hp(8)}
            width={'70%'}
            style={styles.buttonStyles}
            title={'LOGIN'}
            titleColor={colors.appBlue}
            bgColor={colors.appButtonColor}
            titleStyle={[styles.titleStyles]}
            onPress={this.handleLogin}
          />
        </View>
        <View style={styles.lowerView}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ResetPassword')}>
            <Text style={styles.textStyle}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default LoginScreen;
