import React from 'react';
import { ActivityIndicator, Dimensions, Modal, View } from "react-native";
// import Text from "../Text/View"
class AppLoading {
    renderLoading = (visible) => {
        return (<View>
            <Modal transparent={true} onRequestClose={() => null} visible={visible}>
                <View style={{ flex: 1, backgroundColor: '#00000070', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ borderRadius: 15, backgroundColor: "#fff", padding: 25 }}>
                        <ActivityIndicator size="large" color='#030031' />
                        {/* <Text style={{ fontSize: 14, fontWeight: '200', color: '#030031', opacity: 1 }} text={"Loading"} /> */}
                    </View>
                </View>
            </Modal> </View>
        );
    }
    getCalculated = (percentage) => {
        let deviceHeight = Dimensions.get('window').height;
        return (percentage * deviceHeight) / 100;
    }
    getWidthCalculated = (percentage) => {
        let deviceWidth = Dimensions.get('window').width;
        return (percentage * deviceWidth) / 100;
    }
}
export default new AppLoading();