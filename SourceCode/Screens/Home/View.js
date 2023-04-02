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
  FlatList,
    Keyboard,
  Alert,
} from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//

import styles from './Styles';
import colors from '../../Assets/Colors/colors';
import images from '../../Assets/Images/images';
import AppHeader from '../../Components/AppHeader/AppHeader';
import AppInput from '../../Components/AppInput/AppInput';
import firestore from '@react-native-firebase/firestore';
import Category from '../../Components/CategoryComponet/Category';
import MainProduct from '../../Components/MainProductComponent/MainProduct';
import CommonDataManager from '../Singleton';
import AppLoading from '../../Components/AppLoading/AppLoading';
import FirebaseHelper from '../../Firebase/FirebaseHelper';


let unsubscribe;
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      selectedCategory: 1,
      categoryStateArray: [],
      productStateArray: [],

      categoryType: CommonDataManager.getInstance().getCategoryType(),

      key: '',
      loading: false,
      search: '',
      imagesArray:[],
      tempArray:[],
    };
  }
  componentDidMount() {
    // this.props.navigation.addListener('focus', () => {
    this.setState({loading: true});
    this.getCategoryFromDatebase();
    if (this.state.categoryType === 'Meal') {
      FirebaseHelper.getCategories('Meal',(response) => {
        if((response === undefined) || (response._docs.length < 1)) {
            this.setState({loading:false})
        }else{
          this.commonFunctionForMenu(response._docs[0].id);
        }
      })
    }else if(this.state.categoryType === 'beverages'){
      FirebaseHelper.getCategories('beverages',(response) => {
        if((response === undefined) || (response._docs.length < 1)) {
          this.setState({loading:false})
        }else{
          this.commonFunction(response._docs[0].id);
        }
      })
    }
    // });
  }

  getCategoryFromDatebase = async() => {
    let {categoryType} = this.state;
    let counter = 0;
    let tempArrCategory = [];
    unsubscribe = await firestore()
      .collection('Categories')
      .where('categoryType', '==', categoryType)
      .onSnapshot((res) => {
        if (res !== undefined && res !== null) {
          res.forEach((res2) => {
            counter++;
            tempArrCategory.push({
              categoryName: res2._data.categoryName,
              id: counter,
              firebaseCategoryId: res2.id,
              borderBottomWidth: 4,
              borderBottomColor: colors.appBlue,
            });
          });
          this.setState({
            categoryStateArray: tempArrCategory,
          },() => {
            console.log('categories',tempArrCategory)
          });
        } else {
          // alert('No Category Found')
          console.log('No Category Found');
        }
      });
  };


  menuItem(item) {
    // alert(item.categoryName);
    return (
      //================================ Common FlatList ======================================//
      <Category
        category={item.categoryName}
        categoryId={item.firebaseCategoryId}
        onPress={() => this.CategoryFucntion(item.id, item.firebaseCategoryId)}
        borderBottomWidth={
          this.state.selectedCategory === item.id
            ? item.borderBottomWidth
            : null
        }
        borderBottomColor={
          this.state.selectedCategory === item.id
            ? item.borderBottomColor
            : null
        }
      />
    );
  }


  CategoryFucntion = (id, categoryId) => {
    if(this.state.categoryType === 'beverages') {
      this.setState({selectedCategory: id}, () => {
        this.commonFunction(categoryId);
      });
    }else{
      this.setState({selectedCategory: id}, () => {
        this.commonFunctionForMenu(categoryId);
      });
    }
    // if (id === 1) {
    //   this.commonFunction(categoryName);
    // } else if (id === 2) {
    //   this.commonFunction(categoryName);
    // } else if (id === 3) {
    //   this.commonFunction(categoryName);
    // } else if (id === 4) {
    //   this.commonFunction(categoryName);
    // }
  };


  componentWillUnmount() {
    unsubscribe();
    console.log('umount');
  }

  commonFunction = async(categoryId) => {
    this.setState({loading:true,search:''})
    let tempArrCategory = [];
    let tempArrayImages = [];

    unsubscribe = await firestore()
      .collection('Products')
      .where('categoryId', '==', categoryId)
      .onSnapshot((res) => {
        if (res !== undefined && res !== null) {
          res.forEach((res2) => {
            tempArrCategory.push({
              productDetail: res2._data.productDetail,
              productName: res2._data.productName,
              subTitle: res2._data.subTitle,
              imageUrl: res2._data.imageUrl,
              productPrice: res2._data.productPrice,
              firebaseProductId: res2.id,
            });
            res2._data.imageUrl.map((image) => {
              tempArrayImages.push(image);
            })
          });
          this.setState({
            imagesArray:tempArrayImages,
            productStateArray: tempArrCategory,
            loading:false
          });
        } else {
          this.setState({loading: false});
          console.log('No Category Found');
        }
      });
  };


  commonFunctionForMenu = async(categoryId) => {
    this.setState({loading:true,search:''})
    let tempArrCategory = [];
    let tempArrayImages = [];

    unsubscribe = await firestore()
      .collection('MenuItems')
      .where('categoryId', '==', categoryId)
      .onSnapshot((res) => {
        if (res !== undefined && res !== null) {
          res.forEach((res2) => {
            tempArrCategory.push({
              productDetail: res2._data.description,
              productName: res2._data.name,
              subTitle: '',
              imageUrl: res2._data.imageUrl,
              productPrice: res2._data.price,
              firebaseProductId: res2.id,
            });
            res2._data.imageUrl.map((image) => {
              tempArrayImages.push(image);
            })
          });
          this.setState({
            imagesArray:tempArrayImages,
            productStateArray: tempArrCategory,
            loading:false
          });
        } else {
          this.setState({loading: false});
          console.log('No Category Found');
        }
      });
  };


  menuItem2(item) {
    console.log('this.item',item)

    return (
      //================================ Comman FlatList ======================================//
      <MainProduct
        mainProductName={item.productName}
        subTextProduct={item.subTitle}
        productPic={item.imageUrl[0]}
        priceTag={item.productPrice}
        firebaseProductId={item.firebaseProductId}
        // onPress={() => this.props.navigation.navigate('ItemPage', item.productName, item.subTitle, item.imageUrl, item.productPrice)}
        onPress={() => this.props.navigation.navigate('ItemPage', {item:item,images:this.state.imagesArray})}
      />
    );
  }


  searchProduct = () => {
    // let tempArray = this.state.productStateArray;
    // let tempArray = [];
    // console.log('tempArray',tempArray)
    console.log('this.state.search',this.state.search)
    if(this.state.categoryType === 'Meal') {
      let tempArrCategory = [];
      // this.setState({productStateArray: []});

      let {productStateArray, search} = this.state;

      if(this.state.search !== '') {
        this.setState({tempArray:this.state.productStateArray})

        tempArrCategory = productStateArray.filter((res) => {
          if (res.productName.includes(search)) {
            console.log('search',search)
            return true
          }else{
            return false
          }

        });
        let array = [];
        tempArrCategory.map((value) => {
          array.push({
            productName: value.productName,
            subTitle: '',
            imageUrl: value.imageUrl,
            productPrice: value.productPrice,
            firebaseProductId: value.firebaseProductId,
          });
        })

        this.setState({productStateArray: []},() => {
          this.setState({productStateArray: array},() => {
            console.log('this.stat.productStateArray======>>>>',this.state.productStateArray)
          })
        });
      }else{
        this.setState({productStateArray: this.state.tempArray});
      }

    }else if(this.state.categoryType === 'beverages') {


      let tempArrCategory = [];
      // this.setState({productStateArray: []});

      let {productStateArray, search} = this.state;

      if (this.state.search !== '') {
        this.setState({tempArray: this.state.productStateArray})

        tempArrCategory = productStateArray.filter((res) => {
          if (res.productName.includes(search)) {
            console.log('search', search)
            return true
          } else {
            return false
          }

        });
        let array = [];
        tempArrCategory.map((value) => {
          array.push({
            productName: value.productName,
            subTitle: '',
            imageUrl: value.imageUrl,
            productPrice: value.productPrice,
            firebaseProductId: value.firebaseProductId,
          });
        })

        this.setState({productStateArray: []}, () => {
          this.setState({productStateArray: array},() => {
            console.log('..array======>>>>', this.state.productStateArray)
          })
        });

      } else {
        this.setState({productStateArray: this.state.tempArray});
      }
    }
  };


  onPressDrawer =()=>{
    Keyboard.dismiss()
    this.props.navigation.openDrawer()

  }


  render() {
    console.log('this.array',this.state.productStateArray)
    return (
      <View style={styles.mainContainer}>
        {AppLoading.renderLoading(this.state.loading)}
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
            title={'Home'}
            onLeftIconPress={this.onPressDrawer}
            bgColor={colors.black}
            tintColor={colors.white}
            leftIconPath={images.ic_hamburger_menu}
            rightIconOnePath={images.cart}
            onRightIconPress={() => this.props.navigation.navigate('MyCart')}
          />
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.inputView}>
            {/* <Image style={styles.sortIcon} source={images.ic_sort_2} /> */}
            <AppInput
              leftIconPath={images.iic_rate}
              placeholder={'Search'}
              width={'95%'}
              height={hp(6)}
              borderRadius={5}
              leftImageHeight={hp(5)}
              leftImageWidth={wp(5)}
              colortextInput={colors.black}
              fontSize={wp(4)}
              onChangeText={(search) => this.setState({search})}
              value={this.state.search}
              onSubmitEditing={() => this.searchProduct()}
              // onFocus={console.log('ok')}
              // ref={console.log("ppp")}
              // onBlur={() => this.searchProduct()}
            />
          </View>

          <View style={styles.tabsContainer}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={this.state.categoryStateArray}
              renderItem={({item}) => this.menuItem(item)}
              // keyExtractor={item => item.id}
            />
          </View>
          <View style={styles.flatlistContainer}>
            <FlatList
              // style={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={this.state.productStateArray}
              renderItem={({item}) => this.menuItem2(item)}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </View>
    );
  }
}
export default Home;
