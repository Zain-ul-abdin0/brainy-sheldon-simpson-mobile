//================================ React Native Imported Files ======================================//

import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {CommonActions, NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import * as React from 'react';
import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Linking,
} from 'react-native';
import  AsyncStorage  from '@react-native-community/async-storage';


//================================ Local Imported Files ======================================//

import SplashScreen from './Screens/SplashScreen/View';
import OnBoarding from './Screens/OnBoarding/View';
import SignUpScreen from './Screens/AuthScreens/SignUp/View';
import LoginScreen from './Screens/AuthScreens/Login/View';
import ResetPassword from './Screens/AuthScreens/ResetPassword/View';
import TermsAndCondtions from './Screens/TermAndConditions/View';
import AccountDetails from './Screens/AuthScreens/AccountDetails/View';
import UserAccount from './Screens/AuthScreens/UserAccount/View';
import DriverAccount from './Screens/AuthScreens/DriverAccount/View';
import Home from './Screens/Home/View';
import MainProduct from './Components/MainProductComponent/MainProduct';
import CategoryOne from './Screens/CategoryOne/View';
import Category from './Components/CategoryComponet/Category';
import styles from './Components/MyNav/styles';
import images from './Assets/Images/images';
import colors from './Assets/Colors/colors';
import ItemPage from './Screens/ItemPage/View';
import CommentFlatList from './Components/CommnetFlatList/CommentFlatList';
import MyCart from './Screens/MyCart/View';
import MyCartComponet from './Components/MyCartComponet/MyCartComponet';
import AddressComponet from './Components/AddressComponet/AddressComponet';
import MapAddressPicker from './Screens/MapAddressPicker/View';
import OrderHistory from './Screens/OrderHistory/View';
import OrderHistoryComponet from './Components/OrderHistoryComponent/OrderHistoryComponent';
import OrderHistoryItemDetails from './Components/OrderHistoryItemDetails/OrderHistoryItemDetails';
import WriteAReview from './Screens/WriteAReview/View';
import TrackOrder from './Screens/TrackOrder/View';
import PrivacyScreen from './Screens/Privacy/View';
import MapScreeen from './Screens/MapScreen/View';
import auth from '@react-native-firebase/auth';
import SignupWith from './Screens/AuthScreens/SignupWithScreen/View';
import ChooseAddress from './Screens/ChooseAddress/View';
import AddressPicker from './Components/AddressPicker/AddressPicker';
import CommonDataManager from './Screens/Singleton';
import AccountScreen from './Screens/AccountScreen/View';
import OrderHistoryProductInfo from './Components/OrderHistoryProductInfo/OrderHistoryProductInfo';
import TrackOrderDetails from './Screens/TrackOrderDetails/TrackOrderDetails';
import EditProfile from './Screens/EditProfile/EditProfile';
import WelcomeScreen from './Screens/WelcomeScreen/View';
import OrderPlaced from './Screens/OrderPlaced/OrderPlaced';
import DriverHomeScreen from './Screens/DriverHomeScreen/DriverHomeScreen';
import DriverHomeComponent from './Components/DriverHomeComponent/DriverHomeComponent';
import UpcomingOrders from './Screens/UpcomingOrders/UpcomingOrders';
import CurrentOrders from './Screens/CurrentOrders/CurrentOrders';
import OrderHistoryDriverComponent from './Screens/OrderHistoryDriverComponent/OrderHistoryDriverComponent';
import DriverProfileCreated from './Screens/DriverProfileCreated/DriverProfileCreated';
import OrderHistoryDriverDetails from './Screens/OrderHistoryDriverDetails/OrderHistoryDriverDetails';
import CheckBox from './Screens/CheckBox/CheckBox';


let homeFocus = true,
  accountFocus = false,
  myCartFocus = false,
  trackOrderFocus = false,
  orderHistoryFocus = false,
  settingsScreenFocus = false,
  rateScreenFocus = false,
  menuScreenFocus = false,
  logoutScreenFocus = false;

//================================ Root Stack ======================================//

function CustomDrawerContent(props) {
  let userPersonalInfo = CommonDataManager.getInstance().getUserPersonalInfo();
  let navigation = props.navigation;

  // console.log('props ====>',props);
  return (
    <View {...props} style={styles.drawerMainContainer}>
      <ImageBackground
        style={styles.backgroundImageContainer}
        source={images.ic_menubg}>
        <View style={styles.userInfoContainer}>
          <View
            style={styles.userImageContainer}
            onPress={() => props.navigation.navigate('ProfileScreen')}>
            <Image
              source={userPersonalInfo!==undefined && userPersonalInfo.url ?{uri: userPersonalInfo.url} : images.ic_profile_active }
              style={styles.userProfileImage}
            />
          </View>
          <TouchableOpacity style={styles.userTextContainer}>
            <Text style={styles.userNameText}>
              Hi, {userPersonalInfo.firstName + ' ' + userPersonalInfo.lastName}{' '}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.drawerItemsContainer}>
          <DrawerItem
            label={() => (
              <Text
                style={[
                  styles.drawerItemLabelText,
                  {color: homeFocus ? colors.appGreenColor : colors.black},
                ]}>
                {'Home'}
              </Text>
            )}
            icon={() => (
              <Image
                source={
                  homeFocus ? images.ic_home_active : images.ic_home_inactive
                }
                style={styles.drawerItemImage}
              />
            )}
            onPress={() => {
              (homeFocus = true),
                (accountFocus = false),
                (myCartFocus = false),
                (trackOrderFocus = false),
                (orderHistoryFocus = false),
                (settingsScreenFocus = false),
                (rateScreenFocus = false),
                (menuScreenFocus = false),
                (logoutScreenFocus = false);
              props.navigation.navigate('Home');
            }}
          />

          <DrawerItem
            style={styles.drawerItemStyles}
            label={() => (
              <Text
                style={[
                  styles.drawerItemLabelText,
                  {color: accountFocus ? colors.appGreenColor : colors.black},
                ]}>
                {'Account'}
              </Text>
            )}
            icon={() => (
              <Image
                source={
                  accountFocus
                    ? images.ic_profile_active
                    : images.ic_profile_inactive
                }
                style={styles.drawerItemImage}
              />
            )}
            onPress={() => {
              (homeFocus = false),
                (accountFocus = true),
                (myCartFocus = false),
                (trackOrderFocus = false),
                (orderHistoryFocus = false),
                (settingsScreenFocus = false),
                (rateScreenFocus = false),
                (menuScreenFocus = false),
                (logoutScreenFocus = false),
                props.navigation.navigate('AccountScreen');
            }}
          />

          <DrawerItem
            activeTintColor={'red'}
            inactiveTintColor={'yellow'}
            style={styles.drawerItemStyles}
            label={() => (
              <Text
                style={[
                  styles.drawerItemLabelText,
                  {color: myCartFocus ? colors.appGreenColor : colors.black},
                ]}>
                {'My Cart'}
              </Text>
            )}
            icon={(focused) => (
              <Image
                source={
                  myCartFocus ? images.ic_cart_active : images.ic_cart_inactive
                }
                style={styles.drawerItemImage}
              />
            )}
            onPress={() => {
              (homeFocus = false),
                (accountFocus = false),
                (myCartFocus = true),
                (trackOrderFocus = false),
                (orderHistoryFocus = false),
                (settingsScreenFocus = false),
                (rateScreenFocus = false),
                (menuScreenFocus = false),
                (logoutScreenFocus = false),
                props.navigation.navigate('MyCart');
            }}
          />

          <DrawerItem
            style={styles.drawerItemStyles}
            label={() => (
              <Text
                style={[
                  styles.drawerItemLabelText,
                  {
                    color: trackOrderFocus
                      ? colors.appGreenColor
                      : colors.black,
                  },
                ]}>
                {'Track My Order'}
              </Text>
            )}
            icon={(focused) => (
              <Image
                source={
                  trackOrderFocus
                    ? images.ic_driver_history_active
                    : images.ic_driver_history_inactive
                }
                style={styles.drawerItemImage}
              />
            )}
            onPress={() => {
              (homeFocus = false),
                (accountFocus = false),
                (myCartFocus = false),
                (trackOrderFocus = true),
                (orderHistoryFocus = false),
                (settingsScreenFocus = false),
                (rateScreenFocus = false),
                (menuScreenFocus = false),
                (logoutScreenFocus = false),
                props.navigation.navigate('TrackOrder');
            }}
          />

          <DrawerItem
            style={styles.drawerItemStyles}
            label={() => (
              <Text
                style={[
                  styles.drawerItemLabelText,
                  {
                    color: orderHistoryFocus
                      ? colors.appGreenColor
                      : colors.black,
                  },
                ]}>
                {'Order History'}
              </Text>
            )}
            icon={() => (
              <Image
                source={
                  orderHistoryFocus
                    ? images.ic_oder_history_active
                    : images.ic_oder_history_inactive
                }
                style={styles.drawerItemImage}
              />
            )}
            onPress={() => {
              (homeFocus = false),
                (accountFocus = false),
                (myCartFocus = false),
                (trackOrderFocus = false),
                (orderHistoryFocus = true),
                (settingsScreenFocus = false),
                (rateScreenFocus = false),
                (menuScreenFocus = false),
                (logoutScreenFocus = false),
                props.navigation.navigate('OrderHistory');
            }}
          />

          <DrawerItem
            label={() => (
              <Text
                style={[
                  styles.drawerItemLabelText,
                  {
                    color: rateScreenFocus
                      ? colors.appGreenColor
                      : colors.black,
                  },
                ]}>
                {'Rate Us'}
              </Text>
            )}
            icon={() => (
              <Image
                source={
                  rateScreenFocus
                    ? images.ic_rate_active
                    : images.ic_rate_inactive
                }
                style={styles.drawerItemImage}
              />
            )}
            onPress={() => {
              (homeFocus = false),
                (accountFocus = false),
                (myCartFocus = false),
                (trackOrderFocus = false),
                (orderHistoryFocus = false),
                (settingsScreenFocus = false),
                (rateScreenFocus = true),
                (menuScreenFocus = false),
                (logoutScreenFocus = false);
              if (Platform.OS === 'ios') {
                Linking.openURL('https://www.apple.com/app-store/');
              } else {
                Linking.openURL('https://www.playstore.com');
              }
            }}
          />
            <DrawerItem
                label={() => (
                    <Text
                        style={[
                            styles.drawerItemLabelText,
                            {
                                color: rateScreenFocus
                                    ? colors.appGreenColor
                                    : colors.black,
                            },
                        ]}>
                        {'Menu Screen'}
                    </Text>
                )}
                icon={() => (
                    <Image
                        source={
                            rateScreenFocus
                                ? images.menu
                                : images.menu
                        }
                        style={[styles.drawerItemImage,{tintColor:colors.dark_grey}]}                    />
                )}
                onPress={() => {
                    (homeFocus = false),
                        (accountFocus = false),
                        (myCartFocus = false),
                        (trackOrderFocus = false),
                        (orderHistoryFocus = false),
                        (settingsScreenFocus = false),
                        (rateScreenFocus = false),
                        (menuScreenFocus = true),
                        (logoutScreenFocus = false);
                    props.navigation.navigate('WelcomeScreen');

                }}
            />

          <DrawerItem
            style={[styles.drawerItemStyles, {backgroundColor: colors.white}]}
            label={() => (
              <Text
                style={[
                  styles.drawerItemLabelText,
                  {
                    color: logoutScreenFocus
                      ? colors.appGreenColor
                      : colors.black,
                  },
                ]}>
                {'Logout'}
              </Text>
            )}
            icon={() => (
              <Image
                source={
                  logoutScreenFocus
                    ? images.ic_cart_active
                    : images.ic_logout_inactive
                }
                style={[styles.drawerItemImage]}
              />
            )}
            onPress={() => {
                (homeFocus = false),
                (accountFocus = false),
                (myCartFocus = false),
                (trackOrderFocus = false),
                (orderHistoryFocus = false),
                (settingsScreenFocus = false),
                (rateScreenFocus = false),
                (menuScreenFocus = false),
                (logoutScreenFocus = true),
                Alert.alert(
                  'Logout',
                  'Are you sure you want to logout?',
                  [
                    {text: 'No', style: 'destructive'},
                    {
                      text: 'Yes',
                      onPress: async() => {
                          try {
                            await AsyncStorage.clear().then(() => {
                              CommonDataManager.getInstance().setUser(null)
                              CommonDataManager.getInstance().setUser(null);
                              CommonDataManager.getInstance().setProfile(null);
                              CommonDataManager.getInstance().setUserPersonalInfo(
                                null,
                              );
                              auth().signOut()
                               props.navigation.dispatch(
                          CommonActions.reset({
                            index: 0,
                            routes: [{name: 'SignupWith'}],
                          }),
                        );
                            })
                          } catch(error) {
                            console.log("Error While Signing Out");
                          }
                          console.log('Done.')

                        // props.navigation.dispatch(
                        //   CommonActions.reset({
                        //     index: 0,
                        //     routes: [{name: 'SignupWith'}],
                        //   }),
                        // );
                      },
                    },

                  ],
                  {cancelable: true},
                );
            }}
          />
        </View>
      </ImageBackground>
    </View>
  );

}

function CustomDriverContent(props) {
    let userPersonalInfo = CommonDataManager.getInstance().getUserPersonalInfo();
    let navigation = props.navigation;

    // console.log('props ====>',props);
    return (
        <View {...props} style={styles.drawerMainContainer}>
            <ImageBackground
                style={styles.backgroundImageContainer}
                source={images.ic_menubg}>
                <View style={styles.userInfoContainer}>
                    <View
                        style={styles.userImageContainer}
                        onPress={() => props.navigation.navigate('ProfileScreen')}>
                        <Image
                            source={{uri: userPersonalInfo.url}}
                            style={styles.userProfileImage}
                        />
                    </View>
                    <TouchableOpacity style={styles.userTextContainer}>
                        <Text style={styles.userNameText}>
                            Hi, {userPersonalInfo.firstName + ' ' + userPersonalInfo.lastName}{' '}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.drawerItemsContainer}>
                    <DrawerItem
                        label={() => (
                            <Text
                                style={[
                                    styles.drawerItemLabelText,
                                    {color: homeFocus ? colors.appGreenColor : colors.black},
                                ]}>
                                {'Upcoming Orders'}
                            </Text>
                        )}
                        icon={() => (
                            <Image
                                source={
                                    homeFocus ? images.ic_home_active : images.ic_home_inactive
                                }
                                style={styles.drawerItemImage}
                            />
                        )}
                        onPress={() => {
                            (homeFocus = true),
                                (accountFocus = false),
                                (myCartFocus = false),
                                (trackOrderFocus = false),
                                (orderHistoryFocus = false),
                                (settingsScreenFocus = false),
                                (rateScreenFocus = false),
                                (menuScreenFocus = false),
                                (logoutScreenFocus = false);
                            props.navigation.navigate('Home');
                        }}
                    />

                    <DrawerItem
                        style={styles.drawerItemStyles}
                        label={() => (
                            <Text
                                style={[
                                    styles.drawerItemLabelText,
                                    {color: accountFocus ? colors.appGreenColor : colors.black},
                                ]}>
                                {'Current Orders'}
                            </Text>
                        )}
                        icon={() => (
                            <Image
                                source={
                                    accountFocus
                                        ? images.ic_profile_active
                                        : images.ic_profile_inactive
                                }
                                style={styles.drawerItemImage}
                            />
                        )}
                        onPress={() => {
                            (homeFocus = false),
                                (accountFocus = true),
                                (myCartFocus = false),
                                (trackOrderFocus = false),
                                (orderHistoryFocus = false),
                                (settingsScreenFocus = false),
                                (rateScreenFocus = false),
                                (menuScreenFocus = false),
                                (logoutScreenFocus = false),
                                props.navigation.navigate('CurrentOrder');
                        }}
                    />

                    <DrawerItem
                        activeTintColor={'red'}
                        inactiveTintColor={'yellow'}
                        style={styles.drawerItemStyles}
                        label={() => (
                            <Text
                                style={[
                                    styles.drawerItemLabelText,
                                    {color: myCartFocus ? colors.appGreenColor : colors.black},
                                ]}>
                                {'Order History'}
                            </Text>
                        )}
                        icon={(focused) => (
                            <Image
                                source={
                                    myCartFocus ? images.ic_cart_active : images.ic_cart_inactive
                                }
                                style={styles.drawerItemImage}
                            />
                        )}
                        onPress={() => {
                            (homeFocus = false),
                                (accountFocus = false),
                                (myCartFocus = true),
                                (trackOrderFocus = false),
                                (orderHistoryFocus = false),
                                (settingsScreenFocus = false),
                                (rateScreenFocus = false),
                                (menuScreenFocus = false),
                                (logoutScreenFocus = false),
                                props.navigation.navigate('History');
                        }}
                    />


                    <DrawerItem
                        style={[styles.drawerItemStyles, {backgroundColor: colors.white}]}
                        label={() => (
                            <Text
                                style={[
                                    styles.drawerItemLabelText,
                                    {
                                        color: logoutScreenFocus
                                            ? colors.appGreenColor
                                            : colors.black,
                                    },
                                ]}>
                                {'Logout'}
                            </Text>
                        )}
                        icon={() => (
                            <Image
                                source={
                                    logoutScreenFocus
                                        ? images.ic_cart_active
                                        : images.ic_logout_inactive
                                }
                                style={[styles.drawerItemImage]}
                            />
                        )}
                        onPress={() => {
                            (homeFocus = false),
                                (accountFocus = false),
                                (myCartFocus = false),
                                (trackOrderFocus = false),
                                (orderHistoryFocus = false),
                                (settingsScreenFocus = false),
                                (rateScreenFocus = false),
                                (menuScreenFocus = false),
                                (logoutScreenFocus = true),
                                Alert.alert(
                                    'Logout',
                                    'Are you sure you want to logout?',
                                    [
                                        {text: 'No', style: 'destructive'},
                                        {
                                            text: 'Yes',
                                            onPress: async() => {
                                                try {
                                                    await AsyncStorage.clear().then(() => {
                                                        CommonDataManager.getInstance().setUser(null)
                                                        CommonDataManager.getInstance().setUser(null);
                                                        CommonDataManager.getInstance().setProfile(null);
                                                        CommonDataManager.getInstance().setUserPersonalInfo(
                                                            null,
                                                        );
                                                        auth().signOut()
                                                        props.navigation.dispatch(
                                                            CommonActions.reset({
                                                                index: 0,
                                                                routes: [{name: 'SignupWith'}],
                                                            }),
                                                        );
                                                    })
                                                } catch(error) {
                                                    console.log("Error While Signing Out");
                                                }
                                                console.log('Done.')
                                            },
                                        },

                                    ],
                                    {cancelable: true},
                                );
                        }}
                    />
                </View>
            </ImageBackground>
        </View>
    );

}


const Drawer = createDrawerNavigator();
function drawerNav() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => CustomDrawerContent(props)}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="AccountScreen" component={AccountScreen} />
      <Drawer.Screen name="MyCart" component={MyCart} />
      <Drawer.Screen name="TrackOrder" component={TrackOrder} />
      <Drawer.Screen name="OrderHistory" component={OrderHistory} />
    </Drawer.Navigator>
  );
}


const DriverDrawer = createDrawerNavigator();
function driverNav() {
    return (
        <DriverDrawer.Navigator
            initialRouteName="Home"
            drawerContent={(props) => CustomDriverContent(props)}>
            <DriverDrawer.Screen name="Home" component={UpcomingOrders} />
            <DriverDrawer.Screen name="CurrentOrder" component={CurrentOrders} />
            <DriverDrawer.Screen name="History" component={OrderHistoryDriverComponent} />
        </DriverDrawer.Navigator>
    );
}



const RootStack = createStackNavigator();
export default function myStack() {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={'splashScreen'}
        headerMode={'none'}
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <RootStack.Screen name="splashScreen" component={SplashScreen} />
        <RootStack.Screen name="OnBoarding" component={OnBoarding} />
        <RootStack.Screen name="SignupWith" component={SignupWith} />
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
        <RootStack.Screen name="LoginScreen" component={LoginScreen} />
        <RootStack.Screen name="ResetPassword" component={ResetPassword} />
        <RootStack.Screen name="TermsAndCondtions" component={TermsAndCondtions}/>
        <RootStack.Screen name="PrivacyScreen" component={PrivacyScreen} />
        <RootStack.Screen name="AccountDetails" component={AccountDetails} />
        <RootStack.Screen name="OrderPlaced" component={OrderPlaced} />
        <RootStack.Screen name="checkBox" component={CheckBox} />

        <RootStack.Screen name="ItemPage" component={ItemPage} />
        <RootStack.Screen name="ChooseAddress" component={ChooseAddress} />
        <RootStack.Screen name="MapAddressPicker" component={MapAddressPicker}/>
        <RootStack.Screen name="WriteAReview" component={WriteAReview} />
        <RootStack.Screen name="TrackOrderDetails" component={TrackOrderDetails}/>
        <RootStack.Screen name="EditProfile" component={EditProfile} />

        <RootStack.Screen name="MapScreeen" component={MapScreeen} />
        <RootStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <RootStack.Screen name="drawer" component={drawerNav} />
        <RootStack.Screen name="driverDrawer" component={driverNav} />

        {/* //================================ Component ======================================// */}

        <RootStack.Screen name="UserAccount" component={UserAccount} />
        <RootStack.Screen name="DriverAccount" component={DriverAccount} />
        <RootStack.Screen name="MainProduct" component={MainProduct} />
        <RootStack.Screen name="Category" component={Category} />
        <RootStack.Screen name="CategoryOne" component={CategoryOne} />
        <RootStack.Screen name="CommentFlatList" component={CommentFlatList} />
        <RootStack.Screen name="MyCartComponet" component={MyCartComponet} />
        <RootStack.Screen name="AddressComponet" component={AddressComponet} />
        <RootStack.Screen name="OrderHistoryComponet" component={OrderHistoryComponet}/>
        <RootStack.Screen name="DriverHomeComponent" component={DriverHomeComponent}/>
        <RootStack.Screen name="OrderHistoryItemDetails" component={OrderHistoryItemDetails}/>
        <RootStack.Screen name="OrderHistoryDriverDetails" component={OrderHistoryDriverDetails}/>
        <RootStack.Screen name="OrderHistoryProductInfo" component={OrderHistoryProductInfo}/>
        <RootStack.Screen name="AddressPicker" component={AddressPicker} />
        <RootStack.Screen name="DriverHomeScreen" component={DriverHomeScreen} />
        <RootStack.Screen name="DriverProfileCreated" component={DriverProfileCreated} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
