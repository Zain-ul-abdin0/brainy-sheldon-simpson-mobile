//================================ React Native Imported Files ======================================//

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {View, Text, Image, TouchableOpacity, StatusBar, Platform} from 'react-native';
import React from 'react';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import { LoginManager, AccessToken, LoginButton } from 'react-native-fbsdk';
import { appleAuth,appleAuthAndroid,AppleAuthError } from '@invertase/react-native-apple-authentication';

import auth from '@react-native-firebase/auth';

//================================ Local Imported Files ======================================//

import images from '../../../Assets/Images/images';
import styles from './Styles';
import colors from '../../../Assets/Colors/colors';
import Button from '../../../Components/Button/Button';
import CommonDataManager from '../../Singleton'
import FirebaseHelper from '../../../Firebase/FirebaseHelper';
import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import AppLoading from '../../../Components/AppLoading/AppLoading';

class SignupWith extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
    };
  }
  componentDidMount() {

    GoogleSignin.configure({
      scopes: ["https://www.googleapis.com/auth/userinfo.profile"], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '481242816460-l44oln8jej5v1i2v2m7dqnlvtktkq5lp.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true,
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below
    });

  }

  firebaseGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const credential = auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken);
      const googleEmailUser = auth.GoogleAuthProvider.credential(userInfo.user.email);


      await auth().signInWithCredential(credential).then((response) => {
        if (response) {
          FirebaseHelper.fetchUserData(response.user.uid, (resp) => {
            if (resp._data !== undefined) {
              if(resp._data.isActive === true) {
                if (resp._data.isCustomer === true) {
                  this.setValue(response.user.uid).then(() => {
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
                } else if (resp._data.isCustomer === false) {
                  this.setValue(response.user.uid).then(() => {
                    let userPersonalInfo = {
                      firstName: resp._data.fullName,
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
                }
              }else{
                this.setState({loading: false},() => {
                  alert('User is banned by the admin')
                });
              }
            }else{
              console.log('googleEmailUser',googleEmailUser)
              CommonDataManager.getInstance().setCommonCredential(credential)
              CommonDataManager.getInstance().setEmail(googleEmailUser.token)
              CommonDataManager.getInstance().setCheckFromSignIn('google');

              this.props.navigation.navigate("AccountDetails");
            }
          })
        }else{
          alert('Problem While SignIn')
        }
      })


      // console.log('googleEmailUser',googleEmailUser)
      // CommonDataManager.getInstance().setCommonCredential(credential)
      // CommonDataManager.getInstance().setEmail(googleEmailUser.token)
      // CommonDataManager.getInstance().setCheckFromSignIn('google');
      //
      // this.props.navigation.navigate("AccountDetails");

    }
    catch (error) {

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert(error)

      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert(error)

      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert(error)

      }
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


  onLoginFacebook = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email',])
      .then((result) => {
        console.log('facebook result ====>',result);
        if (result.isCancelled) {
          return Promise.reject(new Error('The user cancelled the request'));
        }
        // console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);
        // get the access token
        return AccessToken.getCurrentAccessToken();
      })
      .then(data => {
        this.initUser(data.accessToken);
        // console.log(`Facebook Login Data===>`,data)


      })
      .then((currentUser) => {
        // console.log(`Facebook Login with user : ${JSON.stringify(currentUser.toJSON())}`)

      })
      .catch((error) => {
        alert(`Facebook login fail with error: ${error}`,'user already exists');
        // console.log('eror facebook ===>',error);
      });
  };

  initUser = (token) => {
    // let fullName, email, userImage;
    fetch('https://graph.facebook.com/v2.5/me?fields=email,first_name,last_name,picture.type(large),friends&access_token=' + token)
      .then((response) => {
        response.json().then(async(json) => {
          email = json.email
          CommonDataManager.getInstance().setEmail(email)

          const credential = auth.FacebookAuthProvider.credential(token);

          await auth().signInWithCredential(credential).then((response) => {
            console.log('response of facebook',response)
            if (response) {
              FirebaseHelper.fetchUserData(response.user.uid, (resp) => {
                if (resp._data !== undefined) {
                  if(resp._data.isActive === true) {
                    if (resp._data.isCustomer === true) {
                      this.setValue(response.user.uid).then(() => {
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
                    } else if (resp._data.isCustomer === false) {
                      this.setValue(response.user.uid).then(() => {
                        let userPersonalInfo = {
                          firstName: resp._data.fullName,
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
                    }
                  }else{
                    this.setState({loading: false},() => {
                      alert('User is banned by the admin')
                    });
                  }
                }else{
                  CommonDataManager.getInstance().setCommonCredential(credential)
                  CommonDataManager.getInstance().setCheckFromSignIn('facebook');
                  this.props.navigation.navigate("AccountDetails");

                  this.props.navigation.navigate("AccountDetails");
                }
              })
            }else{
              alert('Problem While SignIn')
            }
          })


          // CommonDataManager.getInstance().setCommonCredential(credential)
          // CommonDataManager.getInstance().setCheckFromSignIn('facebook');
          // this.props.navigation.navigate("AccountDetails");

        }, (error) => { alert(error.message) })
      })
      .catch(() => {
        console.log('ERROR GETTING DATA FROM FACEBOOK')
        alert(error.message)
      })
  }


  loginWithApple = async () =>{
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME,],
      });

    console.log('creditial fulll --->',appleAuthRequestResponse);

    // Create a Firebase credential from the response
    let userFirstName = appleAuthRequestResponse.fullName.familyName;
    let userLastName = appleAuthRequestResponse.fullName.givenName;
    let userEmail = appleAuthRequestResponse.email;
    const { identityToken, nonce,} = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
    let appleUserInfo = {
      firstName:userFirstName,
      lastName:userLastName,
      userEmail:userEmail,
      appleTokens:identityToken,

    }
    // console.log('appleCredential appleCredential --->',appleCredential);

    // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
    // console.log('creditial apple --->',credentialState);

      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        CommonDataManager.getInstance().setCommonCredential(appleCredential)
        CommonDataManager.getInstance().setAppleInfo(appleUserInfo)
          CommonDataManager.getInstance().setCheckFromSignIn('apple')
          this.props.navigation.navigate("AccountDetails");
      } else if(appleAuth.Error.CANCELED){
        console.log('user cancelled')

      }
    }


  render() {
    return (
      <View style={styles.mainContainer}>
        {/* //================================ StatusBar ======================================// */}
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor={colors.statusBarColor}
          translucent={false}
        />



        {/* //================================ Logo ======================================// */}
        <View style={styles.upperView}>
          <Image style={styles.imageStyles} source={images.logo}/>
        </View>
        <View style={styles.textView}>
          <Text style={styles.signStyle}>Sign Up</Text>

        </View>
        {/* //================================ Sign up Buttons ======================================// */}
        <View style={styles.midView}>
          <Button
            style={styles.buttonStyles}
            title={'Sign up with Facebook'}
            iconPlace={'left'}
            icon={images.ic_fb}
            bgColor={colors.fb_color}
            titleColor={colors.white}
            iconWidth={wp(3)}
            onPress={this.onLoginFacebook}

          />
          <Button
            style={styles.buttonStyles}
            title={'Sign up with Google'}
            iconPlace={'left'}
            bgColor={"#E8E8E8"}
            icon={images.ic_google}
            titleStyle={styles.titleStyles}
            iconStyle={styles.iconStyles}
            onPress={this.firebaseGoogleLogin}

          />
          {Platform.OS === 'ios' ?
          <Button
            style={styles.buttonStyles}
            title={'Sign up with Apple'}
            iconPlace={'left'}
            bgColor={colors.black}
            icon={images.ic_apple}
            iconWidth={wp(5)}
          onPress={this.loginWithApple}
          />: null}
          <Button
            style={styles.buttonStyles}
            title={'Sign up with Email'}
            iconPlace={'left'}
            bgColor={colors.appGreenColor}
            icon={images.ic_email}
            titleStyle={[styles.titleStylesEmail]}
            onPress={() => this.props.navigation.navigate('SignUpScreen')}
          />
        </View>

        <View style={styles.lowerView}>
          {/* //================================ Login Button ======================================// */}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('LoginScreen')}>
            <Text style={styles.textStyle}>Already have an account?</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default SignupWith;
