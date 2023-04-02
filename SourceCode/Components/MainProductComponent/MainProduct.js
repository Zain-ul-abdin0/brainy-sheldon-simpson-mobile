import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
import {Divider, SocialIcon} from 'react-native-elements';

import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../Assets/Colors/colors';
import images from '../../Assets/Images/images';

class MainProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
    };
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <AnimatedLoader
          visible={this.state.spinner}
          overlayColor="rgba(255,255,255,0.50)"
          source={require('../../Assets/Loading/lf30_editor_xycez9s4.json')}
          animationStyle={styles.lottie}
          speed={1}
        />
        <TouchableOpacity style={styles.conatiner} onPress={this.props.onPress}>
          <View style={styles.mainTextConatiner}>
            <Text style={styles.mainTextStyle}>
              {this.props.mainProductName}
            </Text>
          </View>
          {/*<View style={styles.subTextConatiner}>*/}
          {/*  <Text style={styles.subTextStyle}>{this.props.subTextProduct}</Text>*/}
          {/*</View>*/}

          <View style={styles.mainProductPicConatiner}>
            <Image
              style={styles.imageStyles}
              source={{uri: this.props.productPic}}/>
          </View>

          <View style={styles.priceConatiner}>
            <Text style={styles.priceTextStyle}>
              {'$' + this.props.priceTag}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  conatiner: {
    height: hp(30),
    width: '90%',
    // borderBottomWidth: 0.3,
    // borderWidth: 0.5,
    // flex: 0.3,
    // backgroundColor: '#EBE8E6',
    // margin: 10,
    alignSelf: 'center',
    // marginHorizontal: wp(2),
    // borderRadius: wp(3),
    marginTop: wp(3),
    // flexDirection: "row"
  },
  lottie: {
    width: '60%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainTextConatiner: {
    height: '30%',
    width: '100%',
    paddingLeft: wp(2),
    // backgroundColor: "red",
    // justifyContent: 'center',
    // paddingTop: wp(2),
  },
  subTextConatiner: {
    height: '15%',
    width: '100%',
    paddingLeft: wp(2),
    // backgroundColor: "green",
    // justifyContent: 'flex-start',
  },
  mainProductPicConatiner: {
    height: '55%',
    width: '100%',
    // backgroundColor: "red",
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceConatiner: {
    height: '15%',
    width: '100%',
    paddingLeft: wp(2),


    // backgroundColor: "red",
  },
  imageStyles: {
    // height: hp(20),
    // width: hp(20),
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    borderRadius: 20,
  },
  mainTextStyle: {
    fontSize: wp(3.5),
    color: '#666666',
    fontWeight: 'bold',
  },

  subTextStyle: {
    fontSize: wp(3.5),
    color: '#B8B8B8',
  },
  priceTextStyle: {
    fontSize: wp(3.5),
    color: '#E02929',
    fontWeight: 'bold',
  },
});

export default MainProduct;
