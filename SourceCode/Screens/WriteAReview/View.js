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
  FlatList, Dimensions
} from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

//================================ Local Imported Files ======================================//

import styles from './Styles';
import colors from '../../Assets/Colors/colors';
import images from '../../Assets/Images/images';
import AppHeader from '../../Components/AppHeader/AppHeader';
import { AirbnbRating } from 'react-native-ratings';
import AppInput from '../../Components/AppInput/AppInput';
import Button from '../../Components/Button/Button';


class WriteAReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {


    }
  }


  render() {
    return (
      <View style={styles.mainContainer}>
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

            title={"Write a Review"}
            onLeftIconPress={() => this.props.navigation.goBack()}
            bgColor={colors.black}
            tintColor={colors.white}
            leftIconPath={images.headerLeftBack}
          // rightIconOnePath={images.cart}
          />
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleStyleContainer}>
              Corona Extra
            </Text>
          </View>
          <View style={styles.subTitleContainer}>

            <View style={styles.subTitleAndPriceContainer}>

              <Text style={styles.subTitleStyleContainer}>
                Locally Roasted
            </Text>

            </View>

            <View style={styles.priceContainer}>
              <Text style={styles.priceStyleContainer}>
                $12
            </Text>
            </View>

          </View>

          <View style={styles.quantityContainer}>
            <Text style={styles.quantityStyleContainer}>
              Quantity:
            </Text>
            <Text style={styles.quantityNumberStyleContainer}>
              2
            </Text>
          </View>
          <View style={styles.dividerContainer}></View>

          <View style={styles.ratingContainer}>
            <AirbnbRating
              count={5}
              reviewSize={0}
              defaultRating={1}
              size={40}
              // ratingColor={colors.appBlue}
              // ratingBackgroundColor={colors.appBlue}
              showRating={false}
            />


          </View>
          <View style={styles.reviewCosntainer}>

            <AppInput
              height={hp(30)}
              width={'85%'}
              placeholder={'Write here...'}
              colortextInput={colors.black}
              // paddingLeft={wp(5)}
              placeholderTextColor={colors.placeholder_text_color}
              marginBottom={wp(3)}
              marginTop={45}
              paddingBottom={hp(22)}
              borderColor={colors.grey1}
              borderWidth={0.5}
              multiline={true}

            // onChangeText={(email) => this.setState({ email })}
            // value={this.state.email}

            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              activeOpacity={0.7}
              height={hp(8)}
              width={'70%'}
              style={styles.buttonStyles}
              title={'SEND'}
              titleColor={colors.appBlue}
              bgColor={colors.appButtonColor}
              titleStyle={[styles.titleStyles]}
              onPress={() => this.props.navigation.navigate('drawer')}
            />

          </View>



        </View>





      </View>
    );
  }
}
export default WriteAReview;
