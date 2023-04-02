//================================ React Native Imported Files ======================================//

import React, {PureComponent} from "react";
import { TouchableOpacity, View,Image,Text,Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

//================================ Local Imported Files ======================================//

import NotificationStyles from "./styles";
import images from '../../../Assets/Images/images';
import colors from '../../../Assets/Colors/colors';

const PropTypes = require('prop-types');


class DetailRow extends PureComponent {
    constructor(props) {
        super(props);

    }


    onPress(){
        this.props.onPress();
        this.props.onClose();
    }


    onSwipe = (direction) => {
        const { SWIPE_LEFT, SWIPE_RIGHT, SWIPE_UP } = swipeDirections;
        if (direction === SWIPE_RIGHT || direction === SWIPE_LEFT || direction === SWIPE_UP) {
            this.props.onClose();
        }

    }


    render() {
        let {title,message} = this.props;
            return (
                <View style={[{width: "100%", height: Platform.OS === 'ios' ? hp(15) : hp(10), position: "absolute", top: 0,}]}>
                    <GestureRecognizer onSwipe={this.onSwipe} style={{position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,}} >

                        <TouchableOpacity onPress={()=>this.onPress()}
                                          style={[{flexDirection: "row", backgroundColor:colors.black}]}>
                            <View style={NotificationStyles.imageContainer}>
                                <Image source={images.logo} style={NotificationStyles.imageStyle}/>
                            </View>
                            <View style={NotificationStyles.textContainerStyle}>
                                <Text style={[NotificationStyles.titleStyle,{color:'white'}]} ellipsizeMode={"tail"} numberOfLines={1} >{title}</Text>
                                <Text style={[NotificationStyles.messageStyle,{color: 'white'}]} ellipsizeMode={"tail"} numberOfLines={1} > {message}</Text>
                            </View>

                        </TouchableOpacity>
                    </GestureRecognizer>
                </View>


            )

        }

}
DetailRow.propTypes = {

};
DetailRow.defaultProps = {

};
export default DetailRow;

