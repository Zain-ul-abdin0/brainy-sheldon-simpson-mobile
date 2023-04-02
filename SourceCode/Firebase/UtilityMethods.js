import {Alert, Image, PermissionsAndroid, View} from "react-native";


import Geolocation from "react-native-geolocation-service";
import MapView, {Polyline} from "react-native-maps";
// import polyLineDecode from "@mapbox/polyline";
// import config from "../assets/config";
import React from "react";


class UtilityMethods {

    orderStatus_Requested     = 'Requested';
    orderStatus_Accepted      = 'Accepted';
    orderStatus_PickedUp      = 'PickedUp';
    orderStatus_DroppedOff    = 'DroppedOff';
    orderStatus_Closed        = 'Closed';
    orderStatus_Cancelled     = 'Cancelled';

    notificationType_Message    = 'message';
    notificationType_NewRide    = 'NewRide';
    notificationType_RideStatus = 'RideStatus';




    isEmailValid = (email) => {
        console.log(email);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        console.log("Email is ", reg.test(email));
        return reg.test(email);
    }


    // getOverAllRatingOutOfFive = (totalRatings, overallRating, newRating) => {
    //     let newOverAllRating    = (((overallRating * totalRatings) + newRating) / (totalRatings + 1));
    //     return newOverAllRating;
    // }





    // getDistance = (location1, location2, callback)=>{
    //     let url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${location1.latitude},${location1.longitude}&destinations=${location2.latitude},${location2.longitude}&key=${config.GOOGLE_API_KEY}`;
    //     fetch(url)
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //             let rows = responseJson.rows;
    //             if (rows.length>0){
    //                 if (rows[0].elements.length>0){
    //                     if (rows[0].elements[0].distance){
    //                         let distance = rows[0].elements[0].distance.text;
    //                         let estimation = rows[0].elements[0].duration.text;
    //                         callback({distance:distance, estimation:estimation});
    //                     }
    //                 }
    //             }
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }

    // getRoute = (origin, destination, callback) =>{
    //     const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${config.MAP_API_KEY}&mode=driving`;
    //
    //     console.log('Route URL ===>>> ', url);
    //
    //     fetch(url)
    //         .then(response => response.json())
    //         .then(responseJson => {
    //             console.log('Routes Response ===>>> ', responseJson);
    //             let points = polyLineDecode.decode(responseJson.routes[0].overview_polyline.points);
    //             // let points = polyLineDecode.decode(responseJson.routes[0].overview_polyline.points);
    //
    //             let coords = points.map((point, index) => {
    //                 return  {
    //                     latitude : point[0],
    //                     longitude : point[1]
    //                 }
    //             });
    //
    //             callback(coords)
    //         }).catch(e => {
    //         console.warn(e)
    //     })
    // }

    // getMapPinMarker = (latitude, longitude, imageSource) => {
    //     return {
    //         coordinate:{latitude:latitude, longitude:longitude},
    //         pinImage:imageSource,
    //         pinSize:40,
    //     }
    // }
    //
    // renderMarkerViewOnMap (marker, index) {
    //     // onPress={()=>alert(marker.request._data.userID)}
    //     return(
    //         <MapView.Marker key={`coordinate_${index}`} coordinate={marker.coordinate} >
    //             <View>
    //                 <Image source={marker.pinImage} style={{width: marker.pinSize, height: marker.pinSize}} resizeMode={'contain'}/>
    //             </View>
    //         </MapView.Marker>
    //     )
    // }

    // renderDrawRouteLineOnMap (coordinates, color) {
    //     return(
    //         <Polyline
    //             coordinates={coordinates}
    //             strokeWidth={5}
    //             strokeColor={color}
    //         />
    //     )
    // }







    // ---------------------- CURRENT LOCATION -------------------------------//

    getCurrentLocation = (callback)=>{
        if (Platform.OS === 'ios'){
            this._getCurrentPosition((positionCallback)=>{
                callback(positionCallback);
            });
        }else {
            this._askLocationPermissionFromAndroid((permissionCallback)=>{
                callback(permissionCallback);
            });
        }
    }

    async _askLocationPermissionFromAndroid(permissionCallback){
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                    'title': 'Earth and Sky Location Permission',
                    'message': 'Earth and Sky needs access to your location '
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this._getCurrentPosition((positionCallback)=>{
                    permissionCallback(positionCallback);
                });
            } else {
                Alert.alert("Location Permission Not Granted");
            }
        } catch (err) {
            console.warn(err)
        }
    }

    _getCurrentPosition = (positionCallback)=>{
        Geolocation.getCurrentPosition((position => {
            this._startTrackingCurrentPosition((trackingCallback)=>{
                positionCallback(trackingCallback);
            });
        }), (error => {
            console.log(error.message);

        }), { enableHighAccuracy: false, timeout: 15000 })
    }

    _startTrackingCurrentPosition = (trackingCallback) =>{
        Geolocation.watchPosition((position)=>{
            trackingCallback(position.coords);
        }, (error)=>{

        });
    }

    stopTrackingCurrentPosition = () =>{
        Geolocation.stopObserving();
    }
}





const Utilits = new UtilityMethods();

export default Utilits;
