//================================ React Native Imported Files ======================================//

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  View,
  ScrollView,
  StatusBar,
  FlatList,
  Text,
  TouchableOpacity,
  Modal, Dimensions
} from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//

import styles from './Styles';
import colors from '../../Assets/Colors/colors';
import images from '../../Assets/Images/images';
import AppHeader from '../../Components/AppHeader/AppHeader';
import AppInput from '../../Components/AppInput/AppInput';
import UserAccount from '../AuthScreens/UserAccount/View';
import DriverAccount from '../AuthScreens/DriverAccount/View';
import TermsAndCondtions from '../TermAndConditions/View';
import MainProduct from '../../Components/MainProductComponent/MainProduct';

class CategoryOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: [

        {
          id: 1,
          mainProductName: "Corona Extra",
          subTextProduct: "Lager",
          productPic: images.p1,
          priceTag: '$10'
        }, {
          id: 2,
          mainProductName: "Corona Extra",
          subTextProduct: "Lager",
          productPic: images.p3,
          priceTag: '$10'
        }, {
          id: 3,
          mainProductName: "Corona Extra",
          subTextProduct: "Lager",
          productPic: images.p2,
          priceTag: '$10'
        },
        {
          id: 4,
          mainProductName: "Corona Extra",
          subTextProduct: "Lager",
          productPic: images.p1,
          priceTag: '$10'
        },
        {
          id: 5,
          mainProductName: "Corona Extra",
          subTextProduct: "Lager",
          productPic: images.p2,
          priceTag: '$10'
        },
        {
          id: 6,
          mainProductName: "Corona Extra",
          subTextProduct: "Lager",
          productPic: images.p3,
          priceTag: '$10'
        },


      ],

    }
  }
  menuItem(item) {
    return (
      //================================ Comman FlatList ======================================//
      <MainProduct
        mainProductName={item.mainProductName}
        subTextProduct={item.subTextProduct}
        productPic={item.productPic}
        priceTag={item.priceTag}

      />
    )
  }

  render() {
    return (
      <View style={styles.mainContainer}>

        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor={colors.statusBarColor}
          translucent={false}
        />

        <View style={styles.bottomContainer}>

          <FlatList
            showsHorizontalScrollIndicator={false}
            numColumns={2}
            data={this.state.Data}
            renderItem={({ item }) => this.menuItem(item)}
            keyExtractor={item => item.id}
          />

        </View>
      </View>
    );
  }
}
export default CategoryOne;
