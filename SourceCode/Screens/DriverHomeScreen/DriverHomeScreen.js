// =========================== React Native Imported Files =========================== //

import React from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import DriverHomeComponent from '../../Components/DriverHomeComponent/DriverHomeComponent';

// =========================== Local Imported Files =========================== //

import CommonDataManager from '../Singleton';
import AppLoading from '../../Components/AppLoading/AppLoading';
import images from '../../Assets/Images/images';
import styles from './Styles';
import {launchImageLibrary} from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AppHeader from '../../Components/AppHeader/AppHeader';
import colors from '../../Assets/Colors/colors';


class DriverHomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            result: '',
            profilePic: '',
            orders:[{
                price:'60.$',
            }],
            show:true,
            title:'Delivery Search',
        };
    }


    componentDidMount() {
        this.listener = this.props.navigation.addListener('focus',() =>{
            this.startLoading();
            this.getUserInfo();
        })
    }

    componentWillUnmount() {
        this.listener()
    }

    getUserInfo = () =>{
        if(CommonDataManager.getInstance().getUser()) {
            let userUid = CommonDataManager.getInstance().getUser();
            firestore().collection('UserRecords').doc(userUid).get().then((res)=>{
                this.setState({profilePic:res._data.ProfilePicUri,},
                    //     ()=>{
                    //   CommonDataManager.getInstance().setProfilePic(res._data.ProfilePicUri)
                    // }
                )
            })
        }

    }

    startLoading = () =>{
        this.setState({loading:true})
        setTimeout(() =>{
            this.setState({loading:false})
        },1000)
    }

    navigateToDrinks = () => {
        let berverages = 'berverages';
        CommonDataManager.getInstance().setCategoryType(berverages);
        this.props.navigation.navigate('drawer');
    };
    navigateToMeals = () => {
        let meal = 'meal';
        CommonDataManager.getInstance().setCategoryType(meal);
        this.props.navigation.navigate('drawer');
    };

    render() {
        return (
            <View style={styles.mainContainer}>
                {AppLoading.renderLoading(this.state.loading)}

                <View style={styles.headerView}>
                    <AppHeader
                        title={this.state.title}
                        textColor={colors.black}
                    />
                </View>
                <View style={styles.logo}>
                    {this.state.show && <View style={{flex: 1}}>
                        <View style={styles.btnView}>
                        </View>
                        <View style={styles.flatListView}>
                            <FlatList
                                data={this.state.orders}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(val) => val.id}
                                renderItem={({item}) => {
                                    return <DriverHomeComponent item={item} remove={this.removeImages} />;
                                }}
                            />
                        </View>
                    </View>}
                </View>

                <View style={styles.bottomView}>
                    <TouchableOpacity
                        style={styles.leftView}
                        onPress={() => this.navigateToDrinks()}>
                        <Image source={images.search} style={styles.bottleStyle} />
                        <Text style={{paddingTop: wp(2)}}>Search</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.rightView}
                        onPress={() => this.navigateToMeals()}>
                        <Image source={images.car} style={styles.bottleStyle} />
                        <Text style={{paddingTop: wp(2)}}>Deliveries</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
export default DriverHomeScreen;
