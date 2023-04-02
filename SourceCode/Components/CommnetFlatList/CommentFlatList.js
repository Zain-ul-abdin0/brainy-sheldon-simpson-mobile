import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../Assets/Colors/colors';
import images from '../../Assets/Images/images';
import {AirbnbRating} from 'react-native-ratings';

class CommentFlatList extends React.Component {
  render() {
    return (
      // <View style={styles.mainContainer}>
      <View style={styles.mainCommentContainer}>
        <View style={styles.leftImageView}>
          <Image
            style={styles.imageStyles}
            source={{uri: this.props.userImage}}
          />
        </View>

        <View style={styles.rightInfoView}>
          <View style={styles.centerInfoView}>
            <Text style={styles.userName}>{this.props.userName}</Text>
            <AirbnbRating
              count={5}
              defaultRating={this.props.givenRating}
              size={20}
              showRating={false}
              isDisabled={true}
            />
          </View>
          <View style={styles.commentView}>
            <Text style={styles.userComment}>{this.props.userComment}</Text>
          </View>
        </View>
      </View>

      // </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    // flex: 1,
    // backgroundColor: 'white'
  },
  mainCommentContainer: {
    height: hp(15),
    width: wp(95),
    flexDirection: 'row',
    // borderBottomWidth: wp(0.1),
    // borderBottomColor: colors.deep_grey,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 3,
    borderRadius: wp(3),
    alignSelf: 'center',
    marginTop: wp(2),
    backgroundColor: colors.white,
    marginBottom: wp(1),
  },
  leftImageView: {
    height: '100%',
    width: '25%',
    // backgroundColor: "green",
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyles: {
    height: hp(7),
    width: hp(7),
    borderRadius: hp(7),
    resizeMode: 'cover',
  },
  rightInfoView: {
    height: '100%',
    width: '75%',
    // backgroundColor: "red",
  },
  userName: {
    fontSize: wp(4.4),
    fontWeight: '600',
  },
  userComment: {
    paddingTop: '1%',
  },
  centerInfoView: {
    height: '40%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    // backgroundColor: "yellow",
    paddingRight: '2%',
  },
  commentView: {
    height: '60%',
    width: '100%',
    paddingRight: '3%',
    paddingTop: '1%',
  },
});

export default CommentFlatList;
