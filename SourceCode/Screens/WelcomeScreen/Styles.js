import {StyleSheet} from 'react-native';
import colors from '../../Assets/Colors/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  userImage: {
    flex: 0.2,
    // backgroundColor: 'red',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imageStyles: {
    height: hp(12),
    width: hp(12),
    borderRadius: hp(12),
    // backgroundColor:"green",
  },
  welcomeText: {
    flex: 0.1,
    // backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeTextStyle: {
    fontSize: wp(6),
    color: colors.black,
  },
  logo: {
    flex: 0.58,
     // backgroundColor:'pink',
    // justifyContent: 'flex-start',
    // alignItems: 'center',

    //
  },
  innerImageView:{
    height:'70%',
    // backgroundColor:'red'
  },
  logoStyle: {
    width: wp(100),
    // paddingHorizontal:wp(20),
    height: hp(40),
    resizeMode: 'contain',
  },
  bottomView: {
    flex: 0.12,
    borderTopWidth: 0.5,
    backgroundColor: '#F8F8F8',
    flexDirection: 'row',
  },
  leftView: {
    width: '50%',
    height: '100%',
    // backgroundColor: 'gold',
    // justifyContent:"center",
    alignItems: 'center',
  },
  rightView: {
    width: '50%',
    height: '100%',
    // backgroundColor: 'pink',
    // justifyContent:"center",
    alignItems: 'center',
  },
  bottleStyle: {
    width: hp(5),
    height: hp(5),
    resizeMode: 'contain',
    marginTop: wp(2),
  },
});
export default styles;
