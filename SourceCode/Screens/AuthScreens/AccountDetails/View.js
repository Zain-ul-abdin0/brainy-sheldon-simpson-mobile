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
  Modal,
  Dimensions,
} from 'react-native';
import React from 'react';
import {launchImageLibrary} from 'react-native-image-picker';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CommonDataManager from '../../Singleton';

const Tab = createMaterialTopTabNavigator();

//================================ Local Imported Files ======================================//

import styles from './Styles';
import colors from '../../../Assets/Colors/colors';
import images from '../../../Assets/Images/images';
import AppHeader from '../../../Components/AppHeader/AppHeader';
import UserAccount from '../UserAccount/View';
import DriverAccount from '../DriverAccount/View';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

class AccountDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileImage: images.no_user_image,
    };
  }


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
        this.setState({profileImage: res},() => {
          CommonDataManager.getInstance().setMainProfilePic(res.uri);
          console.log('coooommmonnnn====>', CommonDataManager.getInstance().getMainProfilePic())
        });
      }
    });
  };

  render() {
    let {profileImage} = this.state;

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
          <AppHeader
            title={'Account Details'}
            leftIconPath={images.headerLeftBack}
            onLeftIconPress={() => this.props.navigation.goBack()}
            bgColor={colors.black}
            tintColor={colors.white}
          />
        </View>

          <View style={styles.imagePickerContainer}>
            <TouchableOpacity onPress={this.ImagePicker}>
              <Image
                style={styles.imagePlaceHolder}
                source={
                  profileImage ? profileImage : images.ic_profile_inactive
                }
              />
            </TouchableOpacity>
          </View>
        <KeyboardAwareScrollView  showsVerticalScrollIndicator={false} style={{flex:0.9,paddingBottom:hp(10)}}>

          <View style={styles.tabsContainer}>
              <Tab.Navigator
                tabBarOptions={{
                  activeTintColor: colors.black,
                  labelStyle: {fontSize: wp(3.5)},
                }}>
                <Tab.Screen name="Customer" component={UserAccount} />
                <Tab.Screen name="Driver" component={DriverAccount} />
              </Tab.Navigator>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
export default AccountDetails;
