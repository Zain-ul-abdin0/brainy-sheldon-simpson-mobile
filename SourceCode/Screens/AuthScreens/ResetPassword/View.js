//================================ React Native Imported Files ======================================//

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { View, Text, Alert, Image, StatusBar } from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//

import AppInput from '../../../Components/AppInput/AppInput';
import Button from '../../../Components/Button/Button';
import colors from '../../../Assets/Colors/colors';
import images from '../../../Assets/Images/images';
import styles from './Styles';
import AppHeader from '../../../Components/AppHeader/AppHeader';
import auth from '@react-native-firebase/auth';
import AnimatedLoader from 'react-native-animated-loader';
import AppLoading from '../../../Components/AppLoading/AppLoading';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      loading: false,
      emailValidation: false,
    }

  };


  forgetPassword = () => {
    this.setState({ loading: true })

    let { email, emailValidation } = this.state;
    if (email === '') {
      alert("Enter Email Address")
      this.setState({ loading: false })
    }
    else if (emailValidation === false) {
      alert("Please Enter Valid Email")
      this.setState({ loading: false })
    }
    else {
      this.setState({ loading: true })

      auth().sendPasswordResetEmail(email).then(() => {
        this.setState({ loading: false })

        Alert.alert('Reset Password', 'We have sent a password reset link to your email', [
          {
            text: "Ok", onPress: () => this.props.navigation.goBack()

          }
        ])
      }).catch((error) => {
        this.setState({ loading: false })
        alert(error.message)
      })
    }


  };
  validateEmail = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      this.setState({ email: text, emailValidation: false })
    }
    else {
      this.setState({ email: text, emailValidation: true, })
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
        {/*<AnimatedLoader*/}
        {/*  visible={this.state.spinner}*/}
        {/*  overlayColor="rgba(255,255,255,0.50)"*/}
        {/*  source={require("../../../Assets/Loading/lf30_editor_xycez9s4.json")}*/}
        {/*  animationStyle={styles.lottie}*/}
        {/*  speed={1}*/}
        {/*/>*/}
        {AppLoading.renderLoading(this.state.loading)}

        {/* //================================ Header ======================================// */}
        <View style={styles.headerView}>
          <AppHeader
            headerHeight="100%"
            titleFontSize={wp(5)}
            title={'Reset Password'}
            leftIconPath={images.headerLeftBack}
            onLeftIconPress={() => this.props.navigation.goBack()}
          />
        </View>

        {/* //================================ Logo ======================================// */}
        <View style={styles.upperView}>
          <Image style={styles.imageStyles} source={images.logo}></Image>
        </View>
        <View style={styles.textView}>
          {/* <Text style={styles.signStyle}>Forgot Password</Text> */}
        </View>
        <Text style={styles.validEmail}>Email</Text>

        {/* //================================ Password Input ======================================// */}
        <View style={styles.midView}>
          <AppInput
            height={hp(6.5)}
            placeholder={'Email'}
            colortextInput={colors.black}
            // paddingLeft={wp(5)}
            placeholderTextColor={colors.placeholder_text_color}
            marginBottom={wp(3)}
            marginTop={5}
            borderRadius={wp(2)}
            borderColor
            borderWidth={0.5}
            onChangeText={(text) => this.validateEmail(text)}
            value={this.state.email}

          />
          <View style={styles.textContainer}>
            <Text style={styles.textStyle}>
              Input the email used to create your account. We will send you a
              link to reset your password.
            </Text>
          </View>
        </View>
        {/* //================================ Button ======================================// */}
        <View style={styles.lowerView}>
          <Button
            activeOpacity={0.7}
            height={hp(8)}
            width={'70%'}
            style={styles.buttonStyles}
            title={'RESET PASSWORD'}
            bgColor={colors.appButtonColor}
            titleColor={colors.dark_red}
            titleStyle={[styles.titleStyles]}
            onPress={this.forgetPassword}
          />
        </View>
      </View>
    );
  }
}

export default ResetPassword;
