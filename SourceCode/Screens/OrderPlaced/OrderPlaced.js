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
import auth from "@react-native-firebase/auth";

//================================ Local Imported Files ======================================//

import Button from '../../Components/Button/Button';
import colors from '../../Assets/Colors/colors';
import images from '../../Assets/Images/images';
import styles from './style';
import AppHeader from '../../Components/AppHeader/AppHeader';
import FirebaseHelper from "../../Firebase/FirebaseHelper";


class OrderPlaced extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: auth().currentUser.uid,
            fcmTokens: this.props.route.params.fcmTokens,
        };
    }

    componentDidMount() {
        this.sendNotificationsToDrivers();
    }


    sendNotificationsToDrivers = () => {
        let { userId,fcmTokens } = this.state;
        if(fcmTokens.length > 1){
            fcmTokens.map((token) => {
                if(token.userId !== userId){
                    FirebaseHelper.onSendNotifications(
                        token.fcmToken,
                        'New Order',
                        'New Order Placed',
                        )
                }
            })
        }else{

        }
    }

    render() {

        return (
            <View style={styles.mainContainer}>
                {/* //================================ Header ======================================// */}
                <View style={styles.headerView}>
                    <AppHeader
                        title={'Delivery Details'}
                        bgColor={colors.black}
                        tintColor={colors.white}
                    />
                </View>
                <View style={styles.bottomContainer}>
                    <View style={styles.viewText}>
                        <Text style={styles.textOrderPlaced}>Congratulations,Your Order Has Been Successfully Placed!</Text>
                    </View>

                    <View style={styles.viewImage}>
                        <Image style={styles.imageStyle} source={images.like} />
                    </View>

                    <View style={styles.viewTextDetails}>
                        <Text style={styles.textDetails}>Shortly you will receive update notifications, those notifications will include
                            details about the estimated delivery time and other important details.
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
                            onPress={()=>this.props.navigation.navigate('Home')}
                        />
                    </View>

                </View>



            </View>
        );
    }
}
export default OrderPlaced;
