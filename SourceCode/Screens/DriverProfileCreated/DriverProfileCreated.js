//================================ React Native Imported Files ======================================//
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
    View,
    Text,
    Image,
} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';


//================================ Local Imported Files ======================================//

import Button from '../../Components/Button/Button';
import colors from '../../Assets/Colors/colors';
import images from '../../Assets/Images/images';
import styles from './Styles';
import AppHeader from '../../Components/AppHeader/AppHeader';
import CommonDataManager from '../Singleton';
import FirebaseHelper from '../../Firebase/FirebaseHelper';
import AppLoading from '../../Components/AppLoading/AppLoading';



class DriverProfileCreated extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: auth().currentUser.uid,
            isApproved: false,
            loading:false,
        };
    }

    componentDidMount() {
        this.setState({loading:true})
        setTimeout(() => {
            this.getUserData();
        },1000)
    }

    getUserData = () => {
        FirebaseHelper.fetchUserData(this.state.userId,(response) => {
            if(response === undefined) {

            }else{
                let userPersonalInfo = {
                    firstName: response._data.firstName,
                    lastName: response._data.lastName,
                    url: response._data.ProfilePicUri,
                };
                CommonDataManager.getInstance().setUserPersonalInfo(
                    userPersonalInfo,
                );
                this.setState({loading:false,isApproved:response._data.isApproved})
            }
        })
    }


    onPressContinue = () => {
        let { isApproved } = this.state;
        if(isApproved === true){
            this.props.navigation.navigate('driverDrawer');
        }else{
            this.props.navigation.navigate('SignupWith');
        }
    }


    render() {

        return (
            <View style={styles.mainContainer}>
                {AppLoading.renderLoading(this.state.loading)}
                {/* //================================ Header ======================================// */}
                <View style={styles.headerView}>
                    <AppHeader
                        title={'Create and Account'}
                        bgColor={colors.black}
                        tintColor={colors.white}
                    />
                </View>
                <View style={styles.bottomContainer}>
                    <View style={styles.viewText}>
                        <Text style={styles.textOrderPlaced}>Thank you for Creating a Driver Account!</Text>
                    </View>

                    <View style={styles.viewImage}>
                        <Image style={styles.imageStyle} source={images.like} />
                    </View>

                    <View style={styles.viewTextDetails}>
                        <Text style={styles.textDetails}>Your information is being verified and you will receive an email when you have been approved and denied.
                        </Text>
                    </View>

                    <View style={styles.viewButton}>
                        <Button
                            activeOpacity={0.7}
                            height={hp(8)}
                            width={'85%'}
                            title={'CONTINUE'}
                            titleColor={colors.appBlue}
                            bgColor={colors.appButtonColor}
                            titleStyle={[styles.titleStyles]}
                            onPress={()=> this.onPressContinue()}
                        />
                    </View>

                </View>

            </View>
        );
    }
}
export default DriverProfileCreated;



