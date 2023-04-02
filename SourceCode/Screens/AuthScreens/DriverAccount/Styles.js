//================================ React Native Imported Files ======================================//

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {StyleSheet} from 'react-native';

//================================ Local Imported Files ======================================//

import colors from '../../../Assets/Colors/colors';

const Styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  lottie: {
    width: '60%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerView: {
    flex: 0.1,
  },
  dateStyle: {
    borderRadius: wp(2),
    borderWidth: 0.5,
    marginTop: wp(1.5),
    height: hp(7.5),
    width: "85%",
    alignSelf: "center",
    justifyContent: 'center',
    marginBottom: wp(3),
    backgroundColor: "white",
  },
  bottomContainer: {
    flex: 1,
    paddingTop: hp(4),
  },
  drivingStyle: {
    borderRadius: wp(2),

    flexDirection: 'row',
    borderWidth: 0.5,
    marginTop: wp(1.5),
    height: hp(7.5),
    width: '85%',
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: wp(3),
    paddingLeft: wp(2),
    backgroundColor: 'white',
  },
  imagePickerIdCard: {
    height: hp(7.5),
    width: '85%',
    backgroundColor: 'white',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    marginTop: wp(1.5),
    borderRadius: wp(2),
    paddingLeft: wp(2),
  },
  imagePlaceHolder: {
    height: wp(10),
    width: wp(10),
    resizeMode: 'cover',
    borderRadius: wp(10),
  },

  validEmail: {
    fontSize: wp(3.5),
    color: colors.black,
    paddingLeft: wp(8),
    fontWeight: 'bold',
  },
  buttonView: {
    height: hp(10),
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: wp(5),
  },
  buttonStyles: {
    borderRadius: wp(2),
    width: '85%',
    marginBottom: wp(4),
  },
  titleStyles: {
    color: colors.white,
    fontSize: wp(4.5),
    fontWeight: 'bold',
  },
});
export default Styles;
