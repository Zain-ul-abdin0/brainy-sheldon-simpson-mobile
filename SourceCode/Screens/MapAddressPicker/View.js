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
import AppInput from '../../Components/AppInput/AppInput';
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoding';


class MapAddressPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitudeDelta: "",
        longitudeDelta: "",
        latitude: 37.78825,
        longitude: -122.4324,
      },
      mapState: false,

    }


  }
  stateChange = () => {
    this.setState({ mapState: true })
    console.log(this.state.mapState)
  }

  onRegionChange = (region) => {
    this.setState({
      region
    }, () => {
      this.setState({
        latitude: region.latitude,
        longitude: region.longitude
      })
    })
    console.log(this.state.region)
  };

  // pickLatLog = () => {
  //   let { latitude, longitude } = this.state;
  //   var coordinate = {
  //     lat: latitude,
  //     lng: longitude,
  //   };
  //   Geocoder.from(41.89, 12.49)
  //       .then(json => {
  //         var addressComponent = json.results[0].address_components[0];
  //         console.log(addressComponent);
  //       })
  //       .catch(error => console.warn(error))
  //   // Geocoder.geocodePosition(coordinate).then(res => {
  //   //   console.log('res',res);
  //   //   var address = res[0].formattedAddress
  //   //   CommonDataManager.getInstance().setAddress(address)
  //   //   // this.props.navigation.navigate("EditProfileScreen")
  //   //
  //   // }).catch(err => console.log(err))
  // };

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
            rightIconOnePath={images.done}
            title={"Map"}
            onLeftIconPress={() => this.props.navigation.goBack()}
            bgColor={colors.black}
            tintColor={colors.white}
            leftIconPath={images.headerLeftBack}
            onRightIconPress={() => this.props.navigation.goBack()}
          />
        </View>
        <View style={styles.bottomContainer}>

          {/* <View style={styles.mapTextContainer}>
            <Text style={styles.addressTextContainer}>Address: <Text style={styles.addressPickContainer}> Address</Text></Text>
          </View> */}

          <View style={styles.mapView}>
            <MapView
              onRegionChangeComplete={this.state.mapState === true ? this.onRegionChange : null}
              style={styles.mapStyles}
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
          </View>
          <View style={styles.fixMarker}>

            <TouchableOpacity style={styles.getAddressContainer}
                              // onPress={this.pickLatLog}
            >
              <Text>Get Address</Text>
            </TouchableOpacity>

            <View style={styles.getAddressPic}>
              <Image source={images.bottomMapPic} style={{ height: 28, width: 38, resizeMode: 'contain' }} />
            </View>


          </View>
          <View style={styles.enterTitleContainer}>
            {/* <Text>ok</Text> */}
            <AppInput
              height={hp(6.5)}
              placeholder={'Enter Address Title'}
              colortextInput={colors.black}
              // paddingLeft={wp(5)}
              placeholderTextColor={colors.black}
              marginBottom={wp(3)}
              marginTop={5}
              borderRadius={wp(2)}
              borderColor
              borderWidth={0.5}
              backgroundColor={'rgba(255,255,255,0.3)'}
            // onChangeText={(email) => this.setState({ email })}
            // value={this.state.email}

            />
          </View>
        </View>





      </View>
    );
  }
}
export default MapAddressPicker;
