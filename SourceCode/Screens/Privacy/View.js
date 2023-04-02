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
  Modal
} from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//

import styles from './Styles';
import colors from '../../Assets/Colors/colors';
import images from '../../Assets/Images/images';
import AppHeader from '../../Components/AppHeader/AppHeader';

class PrivacyScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      dummyText: 'It is a long established fact that a reader will be distracted by the' +
        ' readable content of a page when looking at its layout. The point of using ' +
        'Lorem Ipsum is that it has a more-or-less normal distribution of letters, as\n'
    }
  }

  //================================ Navigation Functions ======================================//


  render() {
    return (
      <View style={styles.mainContainer}>
        {/* //================================ StatusBar ======================================// */}
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor={colors.white} translucent={false} />
        {/* //================================ Header ======================================// */}
        <View style={styles.headerView}>

          <AppHeader
            headerHeight='100%'
            leftIconPath={images.headerLeftBack}
            title={'PRIVACY'}
            onLeftIconPress={() => this.props.navigation.goBack()}
            bgColor={colors.black}
            tintColor={colors.white}
          />
        </View>
        {/* //================================ Bottom Container ======================================// */}
        <View style={styles.container}>
          <Text style={styles.textContainer}>
            {this.state.dummyText}
          </Text>
          <Text style={styles.textContainer}>
            {this.state.dummyText}
          </Text>
          <Text style={styles.textContainer}>
            {this.state.dummyText}
          </Text>
          <Text style={styles.textContainer}>
            {this.state.dummyText}
          </Text>
        </View>
      </View>
    );
  }
}
export default PrivacyScreen;
