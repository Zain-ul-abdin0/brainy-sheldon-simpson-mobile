
import {Image, View, Text, TextInput, TouchableOpacity, Platform, Keyboard, PermissionsAndroid, FlatList, Modal,Alert} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import Geocoder from "react-native-geocoding";
import React, {Component, createRef} from "react";

// Local File Imported

import images from "./Essential/images";
import colors from "./Essential/Colors";
import styles from "./style";
import PropTypes from 'prop-types';




export default class AddressPicker extends Component {

    constructor(props) {
        super(props);
        Geocoder.init(this.props.googleApiKey);

        this.state = {
            latitude : 0.0,
            longitude : 0.0,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
            pickupAddress: "",
            pickupLocation: {},
            selectedLocation: {},
            selectedAddress: "",
            searchLocation: "",
            isSearchKeyboardOnScreen: false,
            arrayPlaces: [],
        };
    }


    componentDidMount() {
        this.processCurrentLocation()
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('prevProps',prevProps);
        console.log('prevState',prevState);

        if(this.props.visible === true) {
            if(!this.props.googleApiKey){
                Alert.alert('Required','Please Provide Google Api Key',this.props.onCancelPress)
            }
        }

    }




    onPressCurrentLocation = () => {
        this.processCurrentLocation();
    };

    // ---------------------- CURRENT LOCATION -------------------------------//

    processCurrentLocation =  () => {
        if (Platform.OS === "ios") {
            Geolocation.requestAuthorization('whenInUse');
            this.startFetchingCurrentLocation();
        } else {
            this.askLocationPermissionFromAndroid();
        }
    };

    async askLocationPermissionFromAndroid() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Address Picker Location Permission",
                    message: "Address Picker needs access to your location ",
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.startFetchingCurrentLocation();
            } else {
                Alert.alert("Location Permission Not Granted");
            }
        } catch (err) {
            console.warn(err);
        }
    }

    startFetchingCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                console.log('position ===>', position);
                this.setState(
                    {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    },
                    () => {
                        if(this.mapRef) {
                            this.mapRef.animateToCoordinate({
                                latitude: this.state.latitude,
                                longitude: this.state.longitude,
                            })
                        } else {
                            console.log('this.mapRef ====>',this.mapRef)
                        }


                    }
                );
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
        );
    };

    // ------------------------------------------------------------//

    onChangeSearchText = (text) => {
        if(text.length < 0) {
            this.setState({ isSearchKeyboardOnScreen: false });
        } else {
            this.setState({ searchLocation: text,isSearchKeyboardOnScreen:true},
                () => {
                    this.searchPlacesForText(text, (places) => {
                        this.setState({ arrayPlaces: places });
                        if(text.length === 0) {
                            this.setState({isSearchKeyboardOnScreen:false})
                        }
                    });
                }
            );
        }

    };

    searchPlacesForText = (text, callback) => {
        const {googleApiKey} = this.props;

        let url = `https://maps.googleapis.com/maps/api/place/queryautocomplete/json?input=${text}&fields=formatted_address/name/geometry/location&key=${
            googleApiKey
        }`;
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                callback(responseJson.predictions);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    onPressDoneSearchLocation = (text) => {
        Keyboard.dismiss();
    };

    onSelectLocation = (place) => {
        Keyboard.dismiss();
        this.searchLocationDetail(place.place_id, (locationDetail) => {
            this.setState({
                latitude: locationDetail.lat,
                longitude: locationDetail.lng,
            });
            this.mapView.animateToCoordinate(
                { latitude: locationDetail.lat, longitude: locationDetail.lng },
                1
            );
        });
    };

    searchLocationDetail = (placeID, callback) => {
        const {googleApiKey} = this.props;
        let url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeID}&key=${
            googleApiKey
        }`;
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                callback(responseJson.result.geometry.location);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    handleLocationChange(region) {
        if (region) {
            let selectedLocation = {
                latitude: region.latitude,
                longitude: region.longitude,
            };


            Geocoder.from({ lat: region.latitude, lng: region.longitude }).then(
                (res) => {
                    console.log("Address ===>> ", res);
                    let address = res.results[0].formatted_address;
                    this.setState({
                        selectedAddress: address,
                        selectedLocation: selectedLocation,
                        searchLocation: address,
                    });
                }
            );
        }
    }

    onPressDoneButton = () => {
        this.props.onDonePress(this.state.selectedLocation,this.state.selectedAddress)
    };

    renderPlacesList = () => {
        return (
            <View style={styles.mainView}>
                <FlatList
                    keyboardShouldPersistTaps={"handled"}
                    data={this.state.arrayPlaces}
                    renderItem={(item) => this.renderPlacesRow(item)}
                    contentContainerStyle={{
                        paddingBottom: 10,
                    }}
                />
            </View>
        );
    };

    renderPlacesRow = (place) => {
        return (
            <TouchableOpacity style={styles.itemView} onPress={this.onSelectLocation.bind(this, place.item)}>
                <Text style={styles.itemTextStyle} numberOfLines={1}>
                    {place.item.description}
                </Text>
            </TouchableOpacity>
        );
    };


    searchFieldFocus=(event)=>{
        this.setState({
            searchLocation:""
        })
    }

    render() {
        let { latitude, latitudeDelta, longitude, longitudeDelta } = this.state;
        const {visible,animationType,locationMarkerStyle,doneButtonStyle,inputStyle,cancelButtonStyle,onCancelPress} = this.props;
        return (
            <Modal
                animationType={animationType}
                visible={visible}
            >
            <View style={{ flex: 1 }}>
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        provider={PROVIDER_GOOGLE}
                        initialRegion={{
                            latitude: latitude,
                            longitude: longitude,
                            latitudeDelta: latitudeDelta,
                            longitudeDelta: longitudeDelta,
                        }}
                        ref={(ref) => this.mapRef = ref}
                        onRegionChangeComplete={(region) => this.handleLocationChange(region)}
                    />

                    <TextInput
                        style={[styles.textInputStyle,inputStyle]}
                        // placeholder={this.state.selectedAddress}
                        value={this.state.searchLocation}
                        placeholderTextColor={colors.gray}
                        onFocus={(e)=>this.searchFieldFocus(e)}
                        onChangeText={(text) => this.onChangeSearchText(text)}
                        returnKeyType={"done"}
                        onSubmitEditing={(event) =>
                            this.onPressDoneSearchLocation(event.nativeEvent.text)
                        }
                    />

                    <Image source={images.location} style={[styles.locationImageStyle,locationMarkerStyle,]} />

                    <TouchableOpacity style={[styles.doneButton,doneButtonStyle]} onPress={this.onPressDoneButton}>
                        <Text style={styles.doneButtonStyle}>DONE</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.cancelButton,cancelButtonStyle]} onPress={onCancelPress}>
                        <Text style={styles.cancelButtonStyle}>Cancel</Text>
                    </TouchableOpacity>

                    {this.props.currentLocationIcon ? <TouchableOpacity
                                style={styles.currentLocationStyle} onPress={this.onPressCurrentLocation}>
                                <Image style={styles.currentButtonStyle} source={images.current_location} resizeMode="contain"/>
                            </TouchableOpacity>:null}
                    {this.state.isSearchKeyboardOnScreen && this.renderPlacesList()}
                </View>
            </View>
            </Modal>

        );
    }
}



AddressPicker.propTypes = {
    googleApiKey:PropTypes.string,    // Provide google api key
    onCancelPress:PropTypes.func,
    visible:PropTypes.bool,
    animationType:PropTypes.string, // 'slide', 'fade', 'none'
    inputStyle:PropTypes.object,
    locationMarkerStyle:PropTypes.object,
    doneButtonStyle:PropTypes.object,
    cancelButtonStyle:PropTypes.object,

}

AddressPicker.defaultProps ={


}
