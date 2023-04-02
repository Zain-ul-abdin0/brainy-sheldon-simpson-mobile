import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from "../../Assets/Colors/colors";
import images from "../../Assets/Images/images";


export default class CheckBox extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            radioButtonChecked:this.props.show,
        };

    }

    onRadioPress = () => {
        if (this.state.radioButtonChecked){
            this.setState({radioButtonChecked:true},() => {
                // this.props.onPress(false);
            })
        }else{
            this.setState({radioButtonChecked:true},() => {
                this.props.onPress(true);
            })
        }}


    render() {
        return(
            <View style={styles.mainContainer} >
                <View style={[styles.container,{marginTop:this.props.marginTop || wp(2),marginLeft:this.props.marginLeft}]}>

                    <TouchableOpacity onPress={()=>this.onRadioPress()} style={styles.touchViewRadio}>
                        {this.state.radioButtonChecked &&  <Image style={styles.img} source={images.ic_circle} />  }
                    </TouchableOpacity>

                    <View>
                        <Text style={styles.text}>{this.props.title}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles= StyleSheet.create({
    mainContainer:{
    // backgroundColor:'red'
    },
    text: {
        fontSize:wp(4),
        color:colors.black,
        fontWeight:'500'

    },
    container: {
        flexDirection:'row',
        alignItems: 'center',
    },
    touchViewRadio: {
        height:hp(3),
        width:hp(3),
        borderRadius:hp(5),
        borderWidth:wp(0.5),
        justifyContent: 'center',
        alignItems:'center',
        marginRight:wp(2),

    },

    img:{
        resizeMode:'contain',
        height:hp(2.7),
        width:hp(2.7),
    }



});


