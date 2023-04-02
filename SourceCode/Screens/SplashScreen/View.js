//================================ React Native Imported Files ======================================//

import {ImageBackground, StatusBar,Alert} from 'react-native';
import React  from 'react';
import firestore from '@react-native-firebase/firestore';
import CommonDataManager from '../Singleton';
import GetLocation from 'react-native-get-location';
import { getDistance } from 'geolib';
import AsyncStorage  from '@react-native-community/async-storage';

//================================ Local Imported Files ======================================//

import styles from './Styles';
import Colors from '../../Assets/Colors/colors';
import images from '../../Assets/Images/images';


class SplashScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            latitude:null,
            longitude:null,

            matchLatitude: 43.91607055134877,
            matchLongitude: -78.83045847100843,

            radius: 32000,
            pass:false,
            distance:null,
        };
    }


    componentDidMount() {
        // this.clearValue();
        this.userLocation();
    }


    userLocation = async() => {

        let {latitude,longitude} = this.state;

        await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then((location) => {
                this.setState({
                    latitude:location.latitude,
                    longitude:location.longitude,
                    loading:false,
                },() => {
                    this.calculateDistance();
                    console.log("lat long",this.state.latitude,this.state.longitude)
                });

            })
            .catch((error) => {
                this.setState({loading:false})
                alert("Location Accessing failed");
            })
    }


    calculateDistance = () => {
        let dis = getDistance(
            {latitude: this.state.latitude, longitude: this.state.longitude},
            // {latitude: 43.91607055134877, longitude: -78.83045847100843},
            {latitude: this.state.matchLatitude, longitude: this.state.matchLongitude},
        )
        if(dis === 0){
            this.setState({pass:true,distance:dis})
            CommonDataManager.getInstance().setDistance(dis)
            this.getValue();
        } else if(dis <= this.state.radius) {
            this.setState({pass:true,distance:dis})
            CommonDataManager.getInstance().setDistance(dis)
            this.getValue();
        }
        else{
            setTimeout(() => {
                this.setState({loading:false})
                alert("Sorry we are not delivering in your area. Thank you for your interest.");
            },1000)

        }
    }


    getValue = async() => {
        try {
            await AsyncStorage.getItem('Uid').then((resp) => {
                    if (resp) {
                        this.firebaseHelper(resp);
                    } else {
                        console.log("Response of on boarding manager", CommonDataManager.getInstance().getUser())
                        this.props.navigation.navigate('OnBoarding');
                    }
                })
        } catch(e) {
            console.log(e);
        }
    }


    clearValue = async() => {
        await AsyncStorage.clear();
    }


    firebaseHelper = async(resp) => {
        await firestore()
            .collection('UserRecords')
            .doc(resp)
            .get()
            .then((res) => {
            if(res)
            {
                if(res._data.isActive === false){
                    this.setState({loading: false})
                    Alert.alert('User Banned', 'User is Banned By the Admin', [
                        {
                            text: 'Ok',
                            style: 'agree',
                            onPress: () => console.log("Banned")
                        },
                    ]);
                }else{
                    if(res._data.isCustomer === true) {
                        let userPersonalInfo = {
                            firstName: res._data.firstName,
                            lastName: res._data.lastName,
                            url: res._data.ProfilePicUri,
                        };
                        CommonDataManager.getInstance().setUserPersonalInfo(
                            userPersonalInfo,
                        );
                        CommonDataManager.getInstance().setUser(res.id);
                        this.setState({loading: false}, () => {
                            this.props.navigation.navigate('WelcomeScreen');
                    });
                }else if((res._data.isCustomer === false) && (res._data.isApproved === true)){
                        let userPersonalInfo = {
                            firstName: res._data.firstName,
                            lastName: res._data.lastName,
                            url: res._data.ProfilePicUri,
                        };
                        CommonDataManager.getInstance().setUserPersonalInfo(
                            userPersonalInfo,
                        );
                    this.setState({loading: false}, () => {
                        this.props.navigation.navigate('driverDrawer');
                    });
                }else{
                        this.setState({loading:false})
                        Alert.alert(
                            "Alert",
                            "Admin has not approved your profile yet",
                            [
                                {
                                    text: 'ok',
                                    onPress: () => this.props.navigation.navigate('SignupWith'),
                                },
                                {cancelable: false, style: 'cancel'},
                            ],
                        )
                    }
            }
    }
    else{
        this.setState({loading: false});
        alert("No User Found")
    }

})
}


    render() {
        return (
            <ImageBackground style={styles.mainCotainer} source={images.splash}>

                {/* //================================ StatusBar ======================================// */}

                <StatusBar
                    barStyle="dark-content"
                    hidden={false}
                    backgroundColor={Colors.white}
                    translucent={false}
                />
            </ImageBackground>
    );
  }
}

export default SplashScreen;
