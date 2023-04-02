//================================ React Native Imported Files ======================================//

import React from 'react';
import { View} from 'react-native';

//================================ Local Imported Files ======================================//

import InAppNotification from './SourceCode/Firebase/InAppNotification/view'
import RootStack from './SourceCode/RootStack';
import FirebaseHelper from './SourceCode/Firebase/FirebaseHelper';


class App extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    FirebaseHelper.addNotificationListener();
  }


  render() {
    console.disableYellowBox = true;

    return (
        <View style={{flex:1}}>
          <RootStack />
          <InAppNotification
              vibrate
              interval={4000}
              onPress={(remoteMessage) => {
                console.log('remoteMessage',remoteMessage)
              }}
          />
        </View>
    )
  }
}
export default App
