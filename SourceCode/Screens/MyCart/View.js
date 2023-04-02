//================================ React Native Imported Files ======================================//
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  TouchableHighlightBase,
} from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();
//================================ Local Imported Files ======================================//
import styles from "./Styles";
import colors from "../../Assets/Colors/colors";
import images from "../../Assets/Images/images";
import AppHeader from "../../Components/AppHeader/AppHeader";
import Button from "../../Components/Button/Button";
import MyCartComponet from "../../Components/MyCartComponet/MyCartComponet";
import CommonDataManager from "../Singleton";
class MyCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartArray: [],
      totalPrice: 0,
      deliveryCharges: 5.0,
      distanceChargesState: "",
      taxPercentageState: "",
      distanceInKMState: "",
    };
  }
  componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      this.getShoppingItemsToCart();
      this.getTotalPrice();
    });
  }
  getShoppingItemsToCart = () => {
    let checkProductsExists = CommonDataManager.getInstance().getShoppingCartDetails();
    this.setState({ cartArray: checkProductsExists });
  };
  getTotalPrice = () => {
    let distanceInKM = CommonDataManager.getInstance().getDistance() / 1000;
    this.setState({
      distanceInKMState: distanceInKM,
    });
    let arrayProducts = CommonDataManager.getInstance().getShoppingCartDetails();
    let serviceFee = 4.0;
    let taxPercentage = 13.0;
    let distanceCharges = 1.05 * distanceInKM;
    let totalAmount = 0.0;
    this.setState({
      distanceChargesState: distanceCharges,
    });
    arrayProducts.forEach((product) => {
      totalAmount = totalAmount + parseFloat(product.productPrice);
    });
    totalAmount =
        totalAmount + serviceFee + distanceCharges + this.state.deliveryCharges;
    let taxPercentageAmount = (totalAmount / 100) * taxPercentage;
    this.setState({
      taxPercentageState: taxPercentageAmount,
    });
    totalAmount = totalAmount + taxPercentageAmount;
    this.setState({ totalPrice: totalAmount }, () => {
      CommonDataManager.getInstance().setTotalPriceProducts(
          this.state.totalPrice
      );
    });
  };
  deleteBuyingItem = (item) => {
    const { cartArray } = this.state;
    this.setState(
        {
          // Deleting the Product and upating the array at the same time
          cartArray: cartArray.filter(
              (product) => product.firebaseProductId !== item.firebaseProductId
          ),
        },
        () => {
          CommonDataManager.getInstance().setShoppingCartDetails(
              this.state.cartArray
          );
          this.getTotalPrice();
        }
    );
  };
  menuItem(item) {
    return (
        //================================ Common FlatList ======================================//
        <MyCartComponet
            productPic={item.productImage[0]}
            mainProductName={item.productName}
            quantityNumber={item.productQuantity}
            price={item.productPrice}
            onPress={() => this.deleteBuyingItem(item)}
        />
    );
  }
  render() {
    return (
        <View style={styles.mainContainer}>
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
                title={"My Cart"}
                onLeftIconPress={() => this.props.navigation.openDrawer()}
                bgColor={colors.black}
                tintColor={colors.white}
                leftIconPath={images.ic_hamburger_menu}
            />
          </View>
          {this.state.cartArray.length <= 0 ? (
              <View
                  style={{
                    flex: 0.9,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
              >
                <Text style={{ fontSize: wp(4), fontWeight: "500" }}>
                  No Product added yet!
                </Text>
              </View>
          ) : (
              <View style={styles.bottomContainer}>
                <View style={styles.flatlistContainer}>
                  <FlatList
                      showsVerticalScrollIndicator={false}
                      data={this.state.cartArray}
                      renderItem={({ item }) => this.menuItem(item)}
                      keyExtractor={(item) => item.id}
                  />
                </View>
                <View style={styles.deliveryChargeContainer}>
                  <Text style={styles.deliveryChargeStyle}>Delivery Charges</Text>
                  <Text style={styles.deliveryChargeStyle}>
                    ${this.state.deliveryCharges.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.deliveryChargeContainer}>
                  <Text style={styles.deliveryChargeStyle}>Service Charges</Text>
                  <Text style={styles.deliveryChargeStyle}>${"4.00"}</Text>
                </View>
                <View style={styles.deliveryChargeContainer}>
                  <Text style={styles.deliveryChargeStyle}>
                    Distance Charges ($1.05/km)
                  </Text>
                  <Text style={styles.deliveryChargeStyle}>
                    {"$" +
                    this.state.distanceChargesState +
                    " " +
                    "(" +
                    this.state.distanceInKMState +
                    " km)"}
                  </Text>
                </View>
                <View
                    style={[
                      styles.divderContainer,
                      { width: "20%", marginLeft: wp(78) },
                    ]}
                ></View>
                <View style={styles.deliveryChargeContainer}>
                  <Text
                      style={[styles.deliveryChargeStyle, { color: colors.black }]}
                  >
                    Total
                  </Text>
                  <Text
                      style={[styles.deliveryChargeStyle, { color: colors.black }]}
                  >
                    ${(this.state.distanceChargesState + 4.0 + 5.0).toFixed(2)}
                  </Text>
                </View>
                <View style={styles.deliveryChargeContainer}>
                  <Text style={styles.deliveryChargeStyle}>13% Tax</Text>
                  <Text style={styles.deliveryChargeStyle}>
                    ${this.state.taxPercentageState.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.divderContainer}></View>
                <View style={styles.totalChargeContainer}>
                  <Text style={styles.totalStyle}>Grand Total</Text>
                  <Text style={styles.totalChargeStyle}>
                    ${this.state.totalPrice.toFixed(3)}
                  </Text>
                </View>
                <View style={styles.buttonContainer}>
                  <Button
                      activeOpacity={0.7}
                      height={hp(8)}
                      width={"80%"}
                      style={styles.buttonStyles}
                      title={"PLACE THE ORDER"}
                      titleColor={colors.appBlue}
                      bgColor={colors.appButtonColor}
                      titleStyle={[styles.titleStyles]}
                      onPress={() =>
                          this.props.navigation.navigate(
                              "ChooseAddress",
                              this.state.cartArray
                          )
                      }
                  />
                </View>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.contineShopingContainer}
                    onPress={() => this.props.navigation.navigate("Home")}
                >
                  <Text style={styles.continueShopingText}>Continue Shopping</Text>
                </TouchableOpacity>
                <View style={styles.bottomTextContainer}>
                  <Text style={styles.bottomTextStyle}>
                    Taxes and Service Fees are included.
                  </Text>
                </View>
              </View>
          )}
        </View>
    );
  }
}
export default MyCart;
