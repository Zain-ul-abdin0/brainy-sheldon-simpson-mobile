// =========================== React Native File =========================== //

import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

// =========================== Local File =========================== //

import OrderHistoryComponent from '../../Components/OrderHistoryComponent/OrderHistoryComponent';
import AppHeader from '../../Components/AppHeader/AppHeader';
import CommonDataManager from '../Singleton';
// import apiService from '../../firebase/FirebaseHelper';
import AppLoading from '../../Components/AppLoading/AppLoading';
import colors from '../../Assets/Colors/colors';
import images from '../../Assets/Images/images';
import styles from './Styles';
import {launchImageLibrary} from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      result: '',
      profilePic: '',
    };
  }


  componentDidMount() {
    this.listener = this.props.navigation.addListener('focus',() =>{
      this.startLoading();
      this.getUserInfo();
    })
  }

  componentWillUnmount() {
    this.listener()
  }

  getUserInfo = () =>{
    if(CommonDataManager.getInstance().getUser()) {
      let userUid = CommonDataManager.getInstance().getUser();
      firestore().collection('UserRecords').doc(userUid).get().then((res)=>{
        this.setState({profilePic:res._data.ProfilePicUri,},
        //     ()=>{
        //   CommonDataManager.getInstance().setProfilePic(res._data.ProfilePicUri)
        // }
        )
      })
    }

  }

  startLoading = () =>{
    this.setState({loading:true})
    setTimeout(() =>{
      this.setState({loading:false})
    },1000)
  }

  navigateToDrinks = () => {
    let berverages = 'beverages';
    CommonDataManager.getInstance().setCategoryType(berverages);
    this.props.navigation.navigate('drawer');
  };
  navigateToMeals = () => {
    let meal = 'Meal';
    CommonDataManager.getInstance().setCategoryType(meal);
    this.props.navigation.navigate('drawer');
  };

  render() {
    let {profilePic} = this.state;
    console.log('profilePic =====>',profilePic);
    return (
      <View style={styles.mainContainer}>
        {AppLoading.renderLoading(this.state.loading)}
        <View style={styles.userImage}>
          <View>
            <Image
              style={styles.imageStyles}
              source={profilePic ? {uri: this.state.profilePic} : images.no_user_image}
            />
          </View>
        </View>


        <View style={styles.welcomeText}>
          <Text style={styles.welcomeTextStyle}> Welcome </Text>
          <Text style={styles.welcomeTextStyle}> To </Text>
        </View>


        <View style={styles.logo}>
          <View style={styles.innerImageView}>
          <Image style={styles.logoStyle} source={images.logAnimated} />
          </View>
          </View>

        <View style={styles.bottomView}>
          <TouchableOpacity
            style={styles.leftView}
            onPress={() => this.navigateToDrinks()}>
            <Image source={images.drinks} style={styles.bottleStyle} />
            <Text style={{paddingTop: wp(2)}}>Liquor Service</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rightView}
            onPress={() => this.navigateToMeals()}>
            <Image source={images.meal} style={styles.bottleStyle} />
            <Text style={{paddingTop: wp(2)}}>Meals</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default WelcomeScreen;
