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
  Modal, Keyboard, TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//

import styles from './Styles';
import AppInput from '../../../Components/AppInput/AppInput';
import Button from '../../../Components/Button/Button';
import colors from '../../../Assets/Colors/colors';
import images from '../../../Assets/Images/images';
import MyModel from '../../../Components/Model/Model';
import CommonDataManager from '../../Singleton';


class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      modalVisible: false,
      view: 'this',
      showPassword: true,
      checkValue: false,
      spinner: false,
      loading: false,
      checkEmail:"Email",
      letter: "Contains a letter",
      character: "At least 6 characters long",
      number: "Contains a number",
      special: "Contains a special character",


      tintcolorEmail: '',
      tintcolorPassword: "",
      tintcolorLetter: "",
      tintcolorNumber: "",
      tintcolorCharacter: "",

      emailValidation: false,
      passwordValidation: false,
      letterValidation: false,
      numberValidation: false,
      CharacterValidation: false,


    };
  }

  //================================ Navigation Functions ======================================//

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  navigateScreem() {
    this.props.navigation.navigate('TermsAndCondtions'),
      this.setModalVisible(!this.state.modalVisible);
  }
  Privacy() {
    this.props.navigation.navigate('PrivacyScreen'),
      this.setModalVisible(!this.state.modalVisible);
  }

  navigteToHome() {

    let { email, password, passwordValidation, letterValidation, numberValidation, CharacterValidation, emailValidation } = this.state;
    this.setState({ spinner: true })
    if (email == '') {
      alert('Please Enter Email')
      this.setModalVisible(!this.state.modalVisible);
      this.setState({ spinner: false })

    }

    else if (password == '') {
      alert('Please Enter Password')
      this.setModalVisible(!this.state.modalVisible);
      this.setState({ spinner: false })

    }
    else if (emailValidation === false) {
      alert('Please Enter Correct Email')
      this.setModalVisible(!this.state.modalVisible);
      this.setState({ spinner: false })

    }
    else if (passwordValidation === false) {
      alert('Password should be atleast 6 characters long')
      this.setModalVisible(!this.state.modalVisible);
      this.setState({ spinner: false })

    }
    else if (letterValidation === false) {
      alert('Password must contain a letter')
      this.setModalVisible(!this.state.modalVisible);
      this.setState({ spinner: false })

    }
    else if (numberValidation === false) {
      alert('Password must contain a number')
      this.setModalVisible(!this.state.modalVisible);
      this.setState({ spinner: false })

    }
    else if (CharacterValidation === false) {
      alert('Password must contain a special character')
      this.setModalVisible(!this.state.modalVisible);
      this.setState({ spinner: false })

    }
    else {
      CommonDataManager.getInstance().setEmail(email)
      CommonDataManager.getInstance().setPasswrod(password)
      this.props.navigation.navigate('AccountDetails')
      this.setModalVisible(!this.state.modalVisible);

    }
  }

  validation = (text) => {

    if (this.state.password.length < 5) {
      this.setState({ password: text, tintcolorPassword: images.ic_filter_active })
    }
    else {
      this.setState({ password: text, tintcolorPassword: images.ic_check_green, passwordValidation: true })
    }

    let regContainLetter = /[a-zA-Z]/;
    if (!regContainLetter.test(text)) {
      this.setState({ password: text, tintcolorLetter: images.ic_filter_active, })
    }
    else {
      this.setState({ tintcolorLetter: images.ic_check_green, letterValidation: true })
    }

    let reg = /[0-9]/;
    if (!reg.test(text)) {
      this.setState({ password: text, tintcolorNumber: images.ic_filter_active })
    }
    else {
      this.setState({ tintcolorNumber: images.ic_check_green, numberValidation: true })
    }

    let regSpecialLetter = /[#?!@$%^&*-]/;
    if (!regSpecialLetter.test(text)) {
      this.setState({ password: text, tintcolorCharacter: images.ic_filter_active })
    }
    else {
      this.setState({ tintcolorCharacter: images.ic_check_green, CharacterValidation: true })
    }
  }
  validateEmail = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      this.setState({ email: text, tintcolorEmail: images.ic_filter_active, emailValidation: false, checkEmail: 'Invalid Email', })

    }

    else {
      this.setState({ email: text, tintcolorEmail: images.ic_check_green, emailValidation: true, checkEmail: 'Valid Email' })
    }
  }

  togglePassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }
  render() {
    const { modalVisible } = this.state;
    return (
        <View style={styles.mainContainer}>

        {/* //================================ StatusBar ======================================// */}
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor={colors.statusBarColor}
          translucent={false}
        />
        {/* //================================ Header ======================================// */}
          <View style={styles.headerView}>

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
            onChangeText={(email) => this.validateEmail(email)}
            value={this.state.email}
            keyboardType={"email-address"}
          />
          <View style={styles.checkBoxContainer}>
            <View style={styles.checkBoxIcon}>
              <Image
                style={[styles.checkBoxIconStyle, { tintColor: this.state.tintColorEmail }]}
                source={this.state.tintcolorEmail}
              />
            </View>
            <View style={styles.checkBoxText}>
              <Text style={styles.checkBoxTextStyle}>{this.state.checkEmail}</Text>
            </View>
          </View>
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
            onChangeText={(password) => this.validation(password)}
            value={this.state.password}

          />
          {/* //================================ CheckBoxs ======================================// */}
          <View style={styles.checkBoxContainer}>
            <View style={styles.checkBoxIcon}>
              <Image
                style={
                  styles.checkBoxIconStyle
                }
                source={this.state.tintcolorPassword}
              />
            </View>
            <View style={styles.checkBoxText}>
              <Text
                style={
                  styles.checkBoxTextStyle
                }>
                {this.state.character}
              </Text>
            </View>
          </View>
          <View style={styles.checkBoxContainer}>
            <View style={styles.checkBoxIcon}>
              <Image
                style={[
                  styles.checkBoxIconStyle,
                  { tintColor: this.state.tintColorLetter },
                ]}
                source={this.state.tintcolorLetter}
              />
            </View>
            <View style={styles.checkBoxText}>
              <Text
                style={
                  styles.checkBoxTextStyle
                }>
                {this.state.letter}
              </Text>
            </View>
          </View>
          <View style={styles.checkBoxContainer}>
            <View style={styles.checkBoxIcon}>
              <Image
                style={
                  styles.checkBoxIconStyle
                }
                source={this.state.tintcolorNumber}
              />
            </View>
            <View style={styles.checkBoxText}>
              <Text
                style={
                  styles.checkBoxTextStyl
                }>
                {this.state.number}
              </Text>
            </View>
          </View>
          <View style={styles.checkBoxContainer}>
            <View style={styles.checkBoxIcon}>
              <Image
                style={
                  styles.checkBoxIconStyle
                }
                source={this.state.tintcolorCharacter}
              />
            </View>
            <View style={styles.checkBoxText}>
              <Text
                style={
                  styles.checkBoxTextStyle

                }>
                {this.state.special}
              </Text>
            </View>
          </View>
        </View>
          </TouchableWithoutFeedback>
        {/* //================================ Buttons ======================================// */}
        <View style={styles.buttonView}>
          <Button
            activeOpacity={0.7}
            height={hp(8)}
            width={'70%'}
            style={styles.buttonStyles}
            title={'SIGN UP'}
            titleColor={colors.appBlue}
            bgColor={colors.appButtonColor}
            titleStyle={[styles.titleStyles]}
            onPress={() => this.setModalVisible(true)}
          />
        </View>
    <View style={styles.lowerView}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('LoginScreen')}>
            <Text style={styles.textStyle}>Already have an account? Login here</Text>
          </TouchableOpacity>
        </View>
        {/* //================================ model ======================================// */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}>
          <MyModel
            onPressPrivacy={() => this.Privacy()}
            onPressTerm={() => this.navigateScreem()}
            onPressCondition={() => this.navigateScreem()}
            onPressAgree={() => this.navigteToHome()}
            onPressCancel={() => {
              this.setModalVisible(!modalVisible);
            }}
          />
        </Modal>
      </View>

  );
  }
}
export default SignUpScreen;
