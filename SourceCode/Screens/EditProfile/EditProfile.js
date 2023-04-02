//================================ React Native Imported Files ======================================//

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
    View,
    ScrollView,
    StatusBar,
    Image,
    Text,
    TouchableOpacity,
    Platform, Dimensions, Alert
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import React from 'react';
import {launchImageLibrary} from 'react-native-image-picker';

//================================ Local Imported Files ======================================//

import styles from './style';
import AppInput from '../../Components/AppInput/AppInput';
import Button from '../../Components/Button/Button';
import colors from '../../Assets/Colors/colors';
import images from '../../Assets/Images/images';
import AppHeader from '../../Components/AppHeader/AppHeader';
import CommonDataManager from '../Singleton';
import AppLoading from '../../Components/AppLoading/AppLoading';
import auth from '@react-native-firebase/auth';




class EditProfile extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            profileImage: '',
            profileImage1:'',
            firstName: "",
            lastName: "",
            phoneNumber: "",
            loading:true,
            urls:'',

        };
    }


    componentDidMount() {
        this.props.navigation.addListener('focus',() =>{
            this.getUserInfo();
            this.loading();
        })
    }


    loading = () => {
        setTimeout(() =>{
            this.setState({loading:false})
        },1000)
    }


    getUserInfo = () =>{
        if(CommonDataManager.getInstance().getUser()){
            let userUid = auth().currentUser.uid;
            firestore().collection('UserRecords').doc(userUid).get().then((res)=>{
                this.setState({firstName:res._data.firstName,lastName:res._data.lastName,profileImage:res._data.ProfilePicUri,phoneNumber:res._data.phoneNumber,localStorage:false})
            },() => {
                console.log('userProfileImage',this.state.userProfileImage);})
        }

    }


    ImagePicker = () => {
        let { localStorage } = this.state;
        let options = {
          mediaType: 'photo',
        };
        launchImageLibrary(options, (res) => {
          if (res.didCancel) {
            console.log('User cancelled image picker');
          } else if (res.errorMessage) {
            console.log('ImagePicker Error: ', res.errorMessage);
          } else {
                this.setState({
                    profileImage1: res,
                    localStorage:true,
                });
          }
        });
      };


    uploadProfilePic = (ImagesArray, callback) => {
        const item = this.state.profileImage1;

        console.log('ImagesArray', ImagesArray);
        const image = (Platform.OS === 'android') ? item.uri : item.uri.replace('file:///', ''); //imagePath.uri;
        const imageRef =  storage().ref(`ProfilePics/${item.fileName}`);

        imageRef
            .putFile(image)
            .then(() => {
                 storage()
                    .ref(`ProfilePics/${item.fileName}`)
                    .getDownloadURL()
                    .then((url) => {
                        if (url) {
                            callback(url);
                        } else {
                            this.setState({loading: false});
                            alert('No Image Url found');
                        }
                    });
            })
            .catch((error) => {
                this.setState({loading: false});
                console.log(error);
            });
    };


    storeDataToFirebase = async  () => {

        this.setState({ loading: true })
        let { firstName,lastName,phoneNumber,profileImage1,urls, profileImage} = this.state;
        let userProfileInfo;
        const userID = CommonDataManager.getInstance().getUser();
            if (firstName === '') {
                this.setState({loading: false})
                alert("Enter firstname")
            } else if (lastName === '') {
                this.setState({loading: false})
                alert("Enter lastName")
            } else if (phoneNumber === '') {
                this.setState({loading: false})
                alert("Enter phoneNumber")
            } else if(profileImage1 === ''){

                const userID = auth().currentUser.uid;
                await firestore().collection('UserRecords').doc(userID).update({
                        firstName: firstName,
                        lastName: lastName,
                        phoneNumber: phoneNumber,
                    });
                let mainProfielPic = this.state.profileImage;
                 userProfileInfo = {
                    firstName,
                    lastName,
                    url: mainProfielPic,
                };
                CommonDataManager.getInstance().setUserPersonalInfo(userProfileInfo);
                this.setState({ loading: false })
                setTimeout(() => {
                    alert('Your profile has been updated')

                },200)

            } else{
                this.uploadProfilePic(profileImage1, callback => {
                    this.setState({ urls: callback },() => {
                        console.log("urls",this.state.urls)
                    });
                    this.updateProfileImage(userID,firstName,lastName,phoneNumber,this.state.urls);
                    let mainProfielPic = this.state.urls;
                     userProfileInfo = {
                        firstName,
                        lastName,
                        ur:mainProfielPic,
                    };
                    CommonDataManager.getInstance().setUserPersonalInfo(userProfileInfo);
                    setTimeout(() => {
                        alert('Your profile has been updated')

                    },200)
                })
            }
    };



    updateProfileImage= async(userID,firstName,lastName,phoneNumber,url) => {
        await firestore().collection('UserRecords').doc(userID).update({
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            ProfilePicUri: url
        })
    }



    render() {
        const {profileImage, firstName, lastName, phoneNumber,profileImage1} = this.state;
        return (
            <View style={styles.mainContainer}>
                {AppLoading.renderLoading(this.state.loading)}
                {/* //================================ StatusBar ======================================// */}
                <StatusBar
                    barStyle="dark-content"
                    hidden={false}
                    backgroundColor={colors.statusBarColor}
                    translucent={false}
                />
                <View style={styles.headerView}>
                    <AppHeader
                        title={"Edit Profile"}
                        onLeftIconPress={() => this.props.navigation.goBack()}
                        bgColor={colors.black}
                        tintColor={colors.white}
                        leftIconPath={images.headerLeftBack}
                    />
                </View>

                <View style={styles.bottomContainer}>
                    <View style={styles.imagePickerContainer}>
                        <TouchableOpacity onPress={this.ImagePicker}>
                            <Image
                                style={styles.imagePlaceHolder}
                                source={profileImage1 ? {uri: profileImage1.uri} : {uri: profileImage}}
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.validEmail}>First Name</Text>

                    <AppInput
                        height={hp(6.5)}
                        placeholder={firstName}
                        colortextInput={colors.black}
                        placeholderTextColor={colors.placeholder_text_color}
                        marginBottom={wp(3)}
                        marginTop={5}
                        borderRadius={wp(2)}
                        borderColor
                        borderWidth={0.5}
                        onChangeText={(firstName) => this.setState({ firstName })}
                        value={firstName}
                    />
                    <Text style={styles.validEmail}>Last Name</Text>

                    <AppInput
                        height={hp(6.5)}
                        placeholder={lastName}
                        colortextInput={colors.black}
                        placeholderTextColor={colors.placeholder_text_color}
                        marginBottom={wp(3)}
                        marginTop={5}
                        borderRadius={wp(2)}
                        borderColor
                        borderWidth={0.5}
                        onChangeText={(lastName) => this.setState({ lastName })}
                        value={lastName}
                    />

                    <Text style={styles.validEmail}>Phone Number</Text>

                         <AppInput
                        height={hp(6.5)}
                        placeholder={phoneNumber}
                        colortextInput={colors.black}
                        placeholderTextColor={colors.placeholder_text_color}
                        marginBottom={wp(3)}
                        marginTop={5}
                        borderRadius={wp(2)}
                        borderColor
                        borderWidth={0.5}
                        keyboardType='numeric'
                        maxLength={15}
                        onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
                        value={phoneNumber}
                    />
                         <View style={styles.buttonView}>
                         <Button
                            activeOpacity={0.7}
                            height={hp(8)}
                            width={'90%'}
                            style={styles.buttonStyles}
                            title={'Update'}
                            titleColor={colors.appButtonColor}
                            bgColor={colors.appButtonColor}
                            titleStyle={[styles.titleStyles]}
                            onPress={this.storeDataToFirebase}
                        />
                          </View>

                             </View>

                          </View>
        );
    }
}
export default EditProfile;
