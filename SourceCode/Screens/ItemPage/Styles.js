//================================ React Native Imported Files ======================================//

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {StyleSheet} from 'react-native';

//================================ Local Imported Files ======================================//

import colors from '../../Assets/Colors/colors';

const Styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
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
  bottomContainer: {
    flex: 0.9,
    // backgroundColor: "red"
  },
  swiperContainer: {
    height: hp(27),
    width: '100%',
  },
  mainTitleContainer: {
    height: hp(8),
    width: '100%',
    paddingHorizontal:wp(12),
    //  justifyContent: "center",
    alignItems: 'center',
    // textAlign:'center'
    // backgroundColor: "red"
  },
  aboutProductTitleContainer: {
marginTop:wp(5),
    height: hp(10),
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: wp(4),
    // backgroundColor: "pink",
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdwonAndTotalContainer: {
    height: hp(13),
    width: '100%',
    // backgroundColor: "pink",
    flexDirection: 'row',
  },
  dropdwonContainer: {
    height: '100%',
    width: '45%',
    // backgroundColor: "blue",
  },
  dividerContainer: {
    height: '100%',
    width: '0.2%',
    backgroundColor: 'grey',
    // paddingLeft:wp(4),
    marginLeft: wp(6),
    // alignSelf: "center",
  },
  totalPriceContainer: {
    height: '100%',
    width: '45%',
    // backgroundColor: "yellow",
  },
  totalPriceTextContainer: {
    height: '50%',
    width: '100%',
    // backgroundColor: "gold",
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalPriceNumberContainer: {
    height: '50%',
    width: '100%',
    // backgroundColor: "green",
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  addToShoppingCart: {
    height: wp(20),
    width: '100%',
    // backgroundColor: "green",
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  commnetContainer: {
    height: wp(15),
    width: '100%',
    // backgroundColor: "green",
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(6),
    alignItems: 'center',
  },
  flatListContainer: {
    // height: wp(20),
    // width: '100%',
    flexGrow: 1,
    // backgroundColor: 'green',
  },
  buttonStyles: {
    // borderRadius: wp(2),
    // width: '85%',
    // height: hp(0)
    // marginBottom: wp(4),
  },
  titleStyles: {
    color: colors.white,
    fontSize: wp(4),
    // fontWeight: "bold"
  },
  dropdwonQuantityContainer: {
    height: '50%',
    width: '100%',
    // backgroundColor: "grey",
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdwonMainContainer: {
    height: '50%',
    width: '100%',
    paddingLeft: wp(18),
    // backgroundColor: "red",
    justifyContent: 'center',
    alignItems: 'center',
    // paddingRight: wp(4)
  },
  dropdownStyle: {
    backgroundColor: '#ffffff',
    height: hp(5),
    width: wp(35),
    paddingHorizontal: '1%',
    // borderWidth: 1,
    // borderColor: '#9ec600',
    // borderRadius: 5
  },
  dropdownLeftOptionsStyle: {
    // backgroundColor:'green',
    marginRight: '10%',
    width: wp(35),
  },
  dropdownButtonText: {
    color: '#1F2023',
  },

  slides: {
    flex: 1,
    // backgroundColor: 'green'
  },
  imageView: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'pink'
  },
  midView: {
    flex: 0.3,
    paddingTop: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: wp(10),
    // backgroundColor: "blue"
  },
  textStyleWelcome: {
    fontSize: wp(5),
    marginBottom: wp(2),
    color: colors.black,
    textAlign: 'center',
    // fontWeight: "bold",
  },
  imageStyles: {
    height: wp(26),
    width: wp(26),
    resizeMode: 'contain',
  },
  mainTitleStyle: {
    fontSize: wp(5.5),
    color: '#666666',
    textAlign:'center'
  },
  subTitleStyle: {
    fontSize: wp(4),
    color: '#B8B8B8',
    textAlign:'center'
  },
  aboutProductTitleTextStyle: {
    fontSize: wp(3.5),
    color: '#A3A3A3',
    textAlign: 'center',
  },

  dropdwonQuantityStyleContainer: {
    fontSize: wp(4),
    color: colors.black,
    textAlign: 'center',
  },
  CommentsTextContainer: {
    fontSize: hp(3),
    color: 'black',
    textAlign: 'center',
  },
  addCommentsTextContainer: {
    fontSize: wp(3.5),
    color: '#526AB2',
    textAlign: 'center',
  },
  totalPriceNumberTextContainer: {
    fontSize: hp(3.7),
    fontWeight: 'bold',
    color: '#5FBFDC',
    textAlign: 'center',
  },
  rBSheetHeaderView: {
    height: '12%',
    width: '100%',
    // backgroundColor:'red'
  },
  rBSheetProductMainView: {
    height: '20%',
    width: '100%',
    // backgroundColor:'green',
    flexDirection: 'row',
    borderBottomWidth: wp(0.1),
    borderColor: colors.placeholder_color,
  },
  rBSheetImageView: {
    height: '100%',
    width: '30%',
    // backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rBSheetImageStyle: {
    // height:'70%',
    // width:'70%',
    height: hp(9),
    width: hp(9),
    resizeMode: 'cover',
    // backgroundColor:'green',
    borderRadius: hp(9),
  },
  rBSheetProductInfo: {
    height: '100%',
    width: '70%',
    // backgroundColor:'pink',
    paddingTop: '2%',
    paddingHorizontal:'5%',
    justifyContent: 'center',
  },
  rBSheetRatingView: {
    height: '20%',
    width: '100%',
    // backgroundColor:'yellow',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rBSheetInputView: {
    height: '45%',
    width: '100%',
    // backgroundColor:'blue'
  },
});
export default Styles;
