//================================ React Native Imported Files ======================================//
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Image, StatusBar, View, Text, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//

import styles from './Styles';
import images from '../../Assets/Images/images';
import colors from '../../Assets/Colors/colors';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
import Button from '../../Components/Button/Button';
import CommonDataManager from '../Singleton';






class MapScreeen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitudeDelta: "",
                longitudeDelta: "",
                latitude: 37.78825,
                longitude: -122.4324,
            },

        }

    }
    onRegionChange = (region) => {
        this.setState({
            region
        }, () => {
            this.setState({
                latitude: region.latitude,
                longitude: region.longitude
            })
        })
        console.log(this.state.latitude)
        console.log(this.state.longitude)
    };

    pickLatLog = () => {
        let { latitude, longitude } = this.state;
        var coordinate = {
            lat: latitude,
            lng: longitude,
        };
        Geocoder.geocodePosition(coordinate).then(res => {
            var address = res[0].formattedAddress
            console.log(address)

            CommonDataManager.getInstance().setAddressLat(latitude)
            CommonDataManager.getInstance().setAddressLog(longitude)
            CommonDataManager.getInstance().setFullAddress(address)
            this.props.navigation.goBack();

            console.log("after full address" + CommonDataManager.getInstance().getFullAddress())
            // CommonDataManager.getInstance().getAddressLog()
            // CommonDataManager.getInstance().getAddressLat()

        }).catch(err => console.log(err))
    }

    render() {
        return (

            <View style={styles.mainCotainer} >

                <View style={styles.mapView}>
                    <MapView
                        onRegionChangeComplete={this.onRegionChange}
                        style={styles.mapStyles}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                    </MapView>
                </View>
                <View style={styles.fixMarker}>
                    <Image source={images.marker} style={{ height: 40, width: 40, resizeMode: 'contain', tintColor: colors.appGreenColor }} />
                </View>
                <View style={styles.button}>
                    <Button
                        height={hp(8)}
                        width={'85%'}
                        style={styles.buttonStyles}
                        title={'Pick Address'}
                        bgColor={colors.appGreenColor}
                        titleColor={colors.dark_red}
                        titleStyle={[styles.titleStyles]}
                        onPress={this.pickLatLog}
                    />
                </View>
            </View>


        )
    }
}



export default MapScreeen;
