// React Native File Imported
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";

// Local File Imported

import images from '../../Assets/Images/images';
import colors from '../../Assets/Colors/colors';

export default class CheckBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      radioButtonChecked: this.props.value || false,
    };
  }

  onRadioPress() {
    if (this.state.radioButtonChecked) {
        this.props.onValueChange(false)

    } else {
      this.props.onValueChange(true)
    }
  }

  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
    this.props.value !== prevProps.value && this.setState({radioButtonChecked:this.props.value})
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={[styles.container,{marginTop:this.props.marginTop,marginBottom:this.props.marginBottom}]}>
          <TouchableOpacity
            onPress={() => this.onRadioPress()}
            style={styles.touchViewRadio}
          >
            {this.state.radioButtonChecked && (
              <Image style={styles.img} source={images.ic_circle} />
            )}
          </TouchableOpacity>

          <View>
            <Text style={styles.text}>{this.props.checkTitle}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {},
  text: {
    fontSize:wp(3.7),
    fontWeight:'500',
    color: colors.black,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft:'5.5%'
  },
  touchViewRadio: {
    height: hp(2.8),
    width: hp(2.8),
    backgroundColor: "#fff",
    borderWidth: wp(0.5),
    justifyContent: "center",
    alignItems: "center",
    marginRight: wp(2),
    borderColor: colors.appBlue,
    borderRadius: hp(2.8),
  },
  img: {
    resizeMode: "contain",
    height: hp(2),
    width: hp(2),
    tintColor: colors.most_blue_button,
  },
});
