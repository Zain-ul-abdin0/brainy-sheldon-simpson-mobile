import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


// import { wp, hp } from '../../UtilityMethods/commonMethods';
// const commonStyles = AppConfig.styling.default;
const Styles = {

    mainContainer: {
        container: {
            paddingLeft: wp(2),
            paddingRight: wp(2),
            backgroundColor: 'transparent'
        }
    },

    horizontalRow: {
        width: '100%',
        height: 1,
        backgroundColor: '#D3D3D3'
    },
    cancelButton: {
        width: '100%',
        height: '10%',
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: wp(2),
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonStyle: {
        color: '#1569C7',
        fontSize: hp('1.9')
    }


}

export default Styles