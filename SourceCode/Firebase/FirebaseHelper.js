//================================ React Native Imported Files ======================================//

import AsyncStorage from '@react-native-community/async-storage';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import {GoogleSignin} from '@react-native-community/google-signin';
import {Platform} from 'react-native';
import moment, {now} from 'moment';
import {statusCodes} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import messaging from '@react-native-firebase/messaging';
import {EventRegister} from 'react-native-event-listeners';

//================================ Local Imported Files ======================================//

import UtilityHelper from './UtilityMethods';
import CommonDataManager from '../Screens/Singleton';


class firebaseServices {
  constructor(props) {}

  // componentDidMount () {
  //
  // }

  // ---------------------------- Authentication ----------------------------//

  signUpWith(email, password, callback) {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        AsyncStorage.setItem('CURRENT_USER', JSON.stringify(user.user));
        callback({
          isSuccess: true,
          response: user.user,
          message: 'user logged in successfully.',
        }); // user.user;
      })
      .catch((error) => {
        callback({isSuccess: false, response: null, message: error.message});
      });
  }

  loginWithEmailPass(email, password, callback) {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        AsyncStorage.setItem('CURRENT_USER', JSON.stringify(user.user));
        callback({
          isSuccess: true,
          response: user.user,
          message: 'user logged in successfully.',
        }); // user.user;
      })
      .catch((error) => {
        callback({isSuccess: false, response: null, message: error.message});
      });
  }

  // ---------------------------- Social Media Authentication ----------------------------//

  loginWithFacebook = (facebookCallback) => {
    LoginManager.logInWithPermissions(['public_profile', 'email'])
      .then((result) => {
        console.log('Facebook Result: --->>> ', result);
        if (result.isCancelled) {
          facebookCallback({
            isSuccess: false,
            response: null,
            message: 'User cancelled the process',
          });
        } else {
          return AccessToken.getCurrentAccessToken();
        }
      })
      .then((data) => {
        console.log('Facebook Data: --->>> ', data);
        if (data !== undefined) {
          return auth.FacebookAuthProvider.credential(data.accessToken);
        }
      })
      .then((res) => {
        console.log('Facebook Response: --->>> ', res);
        if (res) {
          this._loginWithSocialMediaCredentials(res, facebookCallback);
        }
      })
      .catch((err) => {
        console.log('Login with Facebook Error: ===>>', err);
        facebookCallback({
          isSuccess: false,
          response: null,
          message: err.message,
        });
      });
  };

  loginWithGoogle = async (googleCallback) => {
    await GoogleSignin.configure({
      // scopes: ["https://www.googleapis.com/auth/userinfo.profile"], // what API you want to access on behalf of the user, default is email and profile
      iosClientId:
        '728283242336-aalvudrk0gp1kldjb424gv312q5rf07c.apps.googleusercontent.com',
      webClientId:
        '728283242336-bhj03up0qsfvdi68s7d0dev11n0vc2n8.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true,
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below
      forceConsentPrompt: true,
    });
    GoogleSignin.hasPlayServices()
      .then((res) => {
        GoogleSignin.signIn()
          .then((data) => {
            GoogleSignin.getTokens().then((res) => {
              const credential = auth.GoogleAuthProvider.credential(
                res.idToken,
                res.accessToken,
              );
              this._loginWithSocialMediaCredentials(credential, googleCallback);
            });
          })
          .catch((error) => {
            googleCallback({
              isSuccess: false,
              response: null,
              message: this.returnErrorMessage(error),
            });
          });
      })
      .catch((error) => {
        googleCallback({
          isSuccess: false,
          response: null,
          message: this.returnErrorMessage(error),
        });
      });
  };

  returnErrorMessage = (error) => {
    let errorMesssage = 'There is an unknown error.';
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      errorMesssage = 'The user canceled the sign-in flow';
    } else if (error.code === statusCodes.IN_PROGRESS) {
      errorMesssage = 'The sign-in flow is still in progress';
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      errorMesssage = 'Play services are not available';
    }

    return errorMesssage;
  };

  _loginWithSocialMediaCredentials(socialCredentials, callback) {
    auth()
      .signInWithCredential(socialCredentials)
      .then((user) => {
        console.log('user cread', user);
        callback({
          isSuccess: true,
          response: user.user,
          message: 'user logged in successfully.',
        }); // user.user;
      })
      .catch((error) => {
        console.log('user cread errr', error);
        callback({isSuccess: false, response: null, message: error.message});
      });
  }

  // ---------------------------- Profile Methods ----------------------------//

  setProfileForUser(user, profileData, callback) {
    // return
    firestore()
      .collection('UserProfile')
      .doc(user.uid)
      .set(profileData)
      .then((response) => {
        callback({
          isSuccess: true,
          response: response,
          message: 'Profile created successfully successfully',
        });
      })
      .catch((error) => {
        callback({isSuccess: false, response: null, message: error});
      });
  }

  updateProfileForUser(userId, profileData, callback) {
    let firebaseRef = firestore().collection('UserProfile').doc(userId);
    firebaseRef
      .update(profileData)
      .then((response) => {
        callback({
          isSuccess: true,
          response: response,
          message: 'Profile updated successfully',
        });
      })
      .catch((error) => {
        callback({isSuccess: false, response: null, message: error});
      });
  }

  getProfileForUser = (user, callback) => {
    firestore()
      .collection('UserProfile')
      .doc(user.uid)
      .get()
      .then((snapshot) => {
        if (snapshot._data) {
          callback({
            isSuccess: true,
            response: snapshot,
            message: 'User Profile fetched successfully',
          });
        } else {
          callback({
            isSuccess: false,
            response: null,
            message: 'Profile Not found',
          });
        }
      })
      .catch((error) => {
        callback({isSuccess: false, response: null, message: error});
      });
  };

  getLiveProfileForUser = (user, callback) => {
    let collection = firestore().collection('UserProfile').doc(user.uid);
    let unsubscribe = this.firebaseLiveFetch(collection, (liveCallback) => {
      callback(liveCallback);
    });
    return unsubscribe;
  };

  getProfilesOfAllDrivers = (callback) => {
    let firebaseCollection = firestore()
      .collection('UserProfile')
      .where('driver', '==', true);

    this.firebaseFetch(firebaseCollection, (response) => {
      callback(response);
    });
  };

  getProfilesOfAllDriversForFcm = async(callback) => {
    await firestore()
        .collection('UserRecords')
        .where('isCustomer', '==', false)
        .get()
        .then((response) => {
          callback(response)
        })

    this.firebaseFetch(firebaseCollection, (response) => {
      callback(response);
    });
  };

  getProfilesOfAllUsers = (callback) => {
    let firebaseCollection = firestore()
      .collection('UserProfile')
      .where('driver', '==', false);
    this.firebaseFetch(firebaseCollection, (response) => {
      callback(response);
    });
  };

  uploadImage(imagePath, imageName, callback) {

    const image =
      Platform.OS === 'android'
        ? imagePath.uri
        : imagePath.uri.replace('file:///', ''); //imagePath.uri;
    const imageRef = storage().ref(`ProfileImage/${imageName}.png`);
    imageRef
      .putFile(image)
      .then(() => {
        return imageRef.getDownloadURL();
      })
      .then((url) => {
        callback({
          isSuccess: true,
          response: url,
          message: 'Image uploaded successfully',
        });
        return url;
      })
      .catch((error) => {
        callback({
          isSuccess: false,
          response: null,
          message: 'Image uploading failed',
        });
        console.log(error);
      });
  }

  // ---------------------------- Notification FCM Settings ----------------------------//

  checkAndUpdateFCMTokenForUser = () => {
    console.log('Notification - checkAndUpdateFCMTokenForUser ===>> ');
    let user = CommonDataManager.getInstance().getUser();
    messaging()
      .hasPermission()
      .then((isEnable) => {
        if (isEnable) {
          this.getFCMToken(user);
        } else {
          this.requestPermission(user);
        }
      })
      .catch((error) => {
        console.log(
          'Notification - checkAndUpdateFCMTokenForUser (Error) ===>> ',
          error,
        );
      });
  };

  requestPermission = (user) => {
    messaging()
      .requestPermission()
      .then((response) => {
        console.log('Notification - requestPermission ===>> ', response);
        this.getFCMToken(user);
      })
      .catch((error) => {
        console.log('Notification - requestPermission (Error) ===>> ', error);
      });
  };

  getFCMToken = async (user) => {
    await messaging()
      .getToken()
      .then((response) => {
        console.log('Notification - getFCMToken ===>> ', response);
        this.updateFCMTokenForUser(user, response);
      })
      .catch((error) => {
        console.log('Notification - getFCMToken (Error) ===>> ', error);
      });
  };

  updateFCMTokenForUser = (user, fcmToken, callback) => {
    let firebaseRef = firestore().collection('UserProfile').doc(user.uid);
    firebaseRef
      .update({fcmToken: fcmToken})
      .then((response) => {
        callback({
          isSuccess: true,
          response: null,
          message: 'FCM token updated successfully',
        });
      })
      .catch((error) => {
        callback({isSuccess: false, response: null, message: error});
      });
  };

  sendNotificaitonToFCMTokens = (tokens, title, body, type, callback) => {
    // let url = 'https://fcm.googleapis.com/fcm/send';
    // const notificationBody = {
    //     "priority": "HIGH",
    //     "notification": {"title": title, "body": body, "type":type, "sound":'default'},
    //     "data": {"channelId": "e7eee0aa8551c5e",},
    //     "registration_ids":tokens,
    //     "icon": images.icon,
    // };
    //
    // let fetchProperties = {
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json', 'Authorization': `key=${config.fcmServerKey}`},
    //     body: JSON.stringify(notificationBody),
    // };
    //
    // fetch(url, fetchProperties).then((res) => {
    //     console.log('Fetch Response ====>>> ', res);
    //     callback(true);
    // }).catch(error =>{
    //     console.log('Fetch Error ====>>> ', error);
    //     callback(false);
    // })
  };

  sendNotificaitonOfNewRideToAllDrivers = (callback) => {
    this.getProfilesOfAllDrivers((response) => {
      if (response.isSuccess) {
        console.log('response  notificaton ', response);
        let arrayDrivers = response.response._docs;
        let arrayFcmTokens = [];
        let arrayUids = [];
        arrayDrivers.map((driverSnapshot, index) => {
          if (driverSnapshot._data.fcmToken.length > 0) {
            arrayFcmTokens.push(driverSnapshot._data.fcmToken);
            arrayUids.push(driverSnapshot.id);
          }
        });

        let title = 'New Ride';
        let message =
          'There is a new ride near you. Would you like to pick it up?';
        this.sendNotificaitonToFCMTokens(
          arrayFcmTokens,
          title,
          message,
          UtilityHelper.notificationType_NewRide,
          (callback) => {
            let notificationData = {
              createdAt: firestore.Timestamp.now(),
              receiverIDs: arrayUids,
              title: title,
              message: message,
            };

            this.addNewNotification(notificationData, () => {});
          },
        );
      }
    });
  };

  // addNotificationListener = () => {
  //   this.messageForeGround();
  //   this.messageBackGround();
  //
  //   messaging().onNotificationOpenedApp((remoteMessage) => {
  //     console.log('onNotificationOpenedApp', remoteMessage);
  //
  //   });
  //
  //   messaging()
  //     .getInitialNotification()
  //     .then((remoteMessage) => {
  //       console.log('getInitialNotification', remoteMessage);
  //     });
  // };
  //
  // messageForeGround = () => {
  //   return messaging().onMessage(async (remoteMessage) => {
  //     EventRegister.emit('InAppNotification', remoteMessage);
  //
  //     console.log('onMessage====>', remoteMessage);
  //     console.log('onMessage', remoteMessage);
  //   });
  // };
  //
  // messageBackGround = () => {
  //   messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  //     console.log('setBackgroundMessageHandler', remoteMessage);
  //   });
  // };

  // ------------------------------- Ride Requests -------------------------------//

  ridesTable = 'rides';

  requestNewRide = (rideData, callback) => {
    let firebaseRef = firestore().collection(this.ridesTable);

    firebaseRef
      .add(rideData)
      .then((response) => {
        callback({
          isSuccess: true,
          response: response,
          message: 'Your ride request has been submitted successfully',
        });
      })
      .catch((error) => {
        console.log(error.message);
        callback({isSuccess: false, response: null, message: error});
      });
  };

  updateRideWithData = (documentID, orderData, callback) => {
    let firebaseRef = firestore().collection(this.ridesTable).doc(documentID);
    firebaseRef
      .update(orderData)
      .then((response) => {
        callback({
          isSuccess: true,
          response: null,
          message: 'Order updated Successfully',
        });
      })
      .catch((error) => {
        callback({isSuccess: false, response: null, message: error});
      });
  };

  fetchAllRideRequests_once = (callback) => {
    let firebaseCollection = firestore().collection(this.ridesTable);

    this.firebaseFetch(firebaseCollection, (response) => {
      callback(response);
    });
  };

  fetchAllUpComingRidesForUser_once = (userID, isDriver, callback) => {
    let firebaseCollection = firestore().collection(this.ridesTable);
    firebaseCollection = firebaseCollection.where(
      'status',
      '==',
      UtilityHelper.orderStatus_Requested,
    );
    if (isDriver) {
      firebaseCollection = firebaseCollection.where('driverID', '==', '');
    } else {
      console.log(
        'firebase      ======>>>>',
        firebaseCollection.where('userID', '==', userID),
      );
      firebaseCollection = firebaseCollection.where('userID', '==', userID);
    }

    // firebaseCollection      = firebaseCollection.orderBy("pickupDateAndTime", "desc");

    this.firebaseFetch(firebaseCollection, (response) => {
      callback(response);
    });
  };

  fetchAllHistoryRidesForUser_once = (userID, isDriver, callback) => {
    let firebaseCollection = firestore().collection(this.ridesTable);
    firebaseCollection = firebaseCollection.where(
      'status',
      '==',
      UtilityHelper.orderStatus_Closed,
    );
    if (isDriver) {
      firebaseCollection = firebaseCollection.where('driverID', '==', userID);
    } else {
      firebaseCollection = firebaseCollection.where('userID', '==', userID);
    }

    this.firebaseFetch(firebaseCollection, (response) => {
      callback(response);
    });
  };

  fetchRunningRideRequestFor = (user, isDriver, callback) => {
    let firebaseCollection = firestore().collection(this.ridesTable);

    let date = new Date();
    let stringDate = moment(date).format('YYYY-MM-DD');

    if (isDriver) {
      //DRIVER
      firebaseCollection = firebaseCollection.where('driverID', '==', user.uid);
      firebaseCollection = firebaseCollection.where(
        'isRunningForDriver',
        '==',
        true,
      );
    } else {
      //RIDER (Customer)
      firebaseCollection = firebaseCollection.where(
        'isRunningForRider',
        '==',
        true,
      );
      firebaseCollection = firebaseCollection.where('userID', '==', user.uid);
      firebaseCollection = firebaseCollection.where(
        'pickupDateOnly',
        '==',
        stringDate,
      );
    }

    let unsubscribe = this.firebaseLiveFetch(
      firebaseCollection,
      (liveCallback) => {
        callback(liveCallback);
      },
    );
    return unsubscribe;
  };

  fetchWaitingForDriverRideRequest = (callback) => {
    let date = new Date();
    let stringDate = moment(date).format('YYYY-MM-DD');

    let firebaseCollection = firestore().collection(this.ridesTable);

    firebaseCollection = firebaseCollection.where(
      'isRunningForDriver',
      '==',
      true,
    );
    firebaseCollection = firebaseCollection.where('driverID', '==', '');
    firebaseCollection = firebaseCollection.where(
      'pickupDateOnly',
      '==',
      stringDate,
    );

    let unsubscribe = this.firebaseLiveFetch(
      firebaseCollection,
      (liveCallback) => {
        callback(liveCallback);
      },
    );
    return unsubscribe;
  };

  fetchLiveAllRidesForStatuses = (arrayStatuses, user, isDriver, callback) => {
    let firebaseCollection = firestore().collection(this.ridesTable);

    firebaseCollection = firebaseCollection.where('status', '==', 'DroppedOff');

    if (user) {
      if (isDriver) {
        firebaseCollection = firebaseCollection.where(
          'driverID',
          '==',
          user.uid,
        );
      } else {
        firebaseCollection = firebaseCollection.where('userID', '==', user.uid);
      }
    }

    console.log('Firebase Collection ====>>> ', firebaseCollection);
    let unsubscribe = this.firebaseLiveFetch(
      firebaseCollection,
      (liveCallback) => {
        callback(liveCallback);
      },
    );
    return unsubscribe;
  };

  fetchAllRidesForStatus = (status, callback) => {
    let firebaseCollection = firestore()
      .collection(this.ridesTable)
      .where('status', '==', status);

    this.firebaseFetch(firebaseCollection, (response) => {
      callback(response);
    });
  };

  fetchRidesForUser = (user, status, callback) => {
    let firebaseCollection = firestore()
      .collection(this.ridesTable)
      .where('status', '==', status)
      .where('userID', '==', user.uid);

    this.firebaseFetch(firebaseCollection, (response) => {
      callback(response);
    });
  };

  fetchRideForDocumentID = (documentID, callback) => {
    let firebaseCollection = firestore()
      .collection(this.ridesTable)
      .doc(documentID);

    this.firebaseFetch(firebaseCollection, (response) => {
      callback(response);
    });
  };

  fetchLiveRideForDocumentID = (documentID, callback) => {
    let firebaseCollection = firestore()
      .collection(this.ridesTable)
      .doc(documentID);
    let unsubscribe = this.firebaseLiveFetch(firebaseCollection, callback);
    return unsubscribe;
  };

  // ----------------------------------- NOTIFICATIONS -----------------------------------//
  notificationsTable = 'notifications';

  fetchAllNotifications = (callback) => {
    let firebaseCollection = firestore().collection(this.notificationsTable);

    this.firebaseFetch(firebaseCollection, (response) => {
      callback(response);
    });
  };

  fetchAllNotificationsReceivedToUser = (userID, callback) => {
    let firebaseCollection = firestore().collection(this.notificationsTable);
    firebaseCollection = firebaseCollection.where(
      'receiverIDs',
      'array-contains',
      userID,
    );

    this.firebaseFetch(firebaseCollection, (response) => {
      callback(response);
    });
  };

  addNewNotification = (notificationData, callback) => {
    let firebaseRef = firestore().collection(this.notificationsTable);
    firebaseRef
      .add(notificationData)
      .then((response) => {
        callback({
          isSuccess: true,
          response: null,
          message: 'Thank you for your review',
        });
      })
      .catch((error) => {
        callback({isSuccess: false, response: null, message: error});
      });
  };

  // ----------------------------------- COMMENTS -----------------------------------//
  commentsTable = 'comments';

  fetchAllComments = (callback) => {
    let firebaseCollection = firestore().collection(this.commentsTable);

    this.firebaseFetch(firebaseCollection, (response) => {
      callback(response);
    });
  };

  fetchAllCommentsReceivedToUser = (userID, callback) => {
    let firebaseCollection = firestore().collection(this.commentsTable);
    firebaseCollection = firebaseCollection.where('receiverID', '==', userID);

    this.firebaseFetch(firebaseCollection, (response) => {
      callback(response);
    });
  };

  getCommentSenderProfile = (userID) => {
    firestore()
      .collection('UserProfile')
      .doc(userID)
      .get()
      .then((snapshot) => {
        if (snapshot._data) {
          return snapshot._data;
        } else {
          return null;
        }
      })
      .catch((error) => {
        return null;
      });
  };

  addNewCustomerComment = (commentData, callback) => {
    let firebaseRef = firestore().collection(this.commentsTable);
    firebaseRef
      .add(commentData)
      .then((response) => {
        callback({
          isSuccess: true,
          response: null,
          message: 'Thank you for your review',
        });
      })
      .catch((error) => {
        callback({isSuccess: false, response: null, message: error});
      });
  };

  //----------------------------------- Chat -----------------------------------//
  chatMessages = 'ChatMessages';

  sendChatMessage = (messageData, callback) => {
    let firebaseRef = firestore().collection(this.chatMessages);
    firebaseRef
      .add(messageData)
      .then((response) => {
        callback({isSuccess: true, response: null, message: 'Message sent'});
      })
      .catch((error) => {
        callback({isSuccess: false, response: null, message: error});
      });
  };

  fetchLiveChatMessages = (clientID, adminID, callback) => {
    let firebaseCollection = firestore().collection(this.chatMessages);

    firebaseCollection = firebaseCollection.where(
      'participants',
      '==',
      adminID + '/' + clientID,
    );

    // firebaseCollection = firebaseCollection.orderBy('createdAt',"DESC");
    // firebaseCollection = firebaseCollection.limit(100);

    let unsubscribe = this.firebaseLiveFetch(
      firebaseCollection,
      (liveCallback) => {
        callback(liveCallback);
      },
    );
    return unsubscribe;
  };

  fetchUserInfo(uid) {
    console.log('UID ===>>>', uid);
    return firestore()
      .collection('UserProfile')
      .doc(uid)
      .get()
      .then((snapshot) => {
        return snapshot.data();
      })
      .catch((error) => {
        return error;
      });
  }

  addToUserCart(userCart, uid) {
    let userCarts = [];
    firestore()
      .collection('UserProfile')
      .doc(uid)
      .get()
      .then((snapshot) => {
        if (snapshot.data().userCartList !== undefined) {
          userCarts = snapshot.data().userCartList;
          let arr = [...userCarts, ...userCart];
          return firestore().collection('UserProfile').doc(uid).update({
            userCartList: arr,
          });
        } else {
          // User Create his cart list first time

          return firestore().collection('UserProfile').doc(uid).update({
            userCartList: userCart,
          });
        }
      });
  }

  setImageNameToUserFirestore = (imageName) => {
    console.log('firebase', imageName);
    return firestore()
      .collection('UserProfile')
      .doc(CommonDataManager.getInstance().getUser())
      .update({
        profileImage: imageName,
      });
  };

  makeOrder(amount, userCartList, uid) {
    return firestore().collection('orderQueue').add({
      userUID: uid,
      total_amount: amount,
      status: 'Requested',
      cart_list: userCartList,
    });
  }

  clearUserCart(uid) {
    return firestore().collection('UserProfile').doc(uid).update({
      userCartList: '',
    });
  }

  addOrderReference(referenceId, uid) {
    let array = [];
    let orderArray = [];
    array.push({
      order_id: referenceId,
      // stripe_resp: stripeResponse.data,
    });
    firestore()
      .collection('UserProfile')
      .doc(uid)
      .get()
      .then((snapshot) => {
        if (snapshot.data().orders !== undefined) {
          orderArray = [...snapshot.data().orders, ...array];
          return firestore()
            .collection('UserProfile')
            .doc(uid)
            .set({orders: orderArray}, {merge: true});
        } else {
          return firestore()
            .collection('UserProfile')
            .doc(uid)
            .set({orders: [{order_id: referenceId}]}, {merge: true});
        }
      });
  }

  fetchRequestedOrdersId(uid) {
    return firestore()
      .collection('UserProfile')
      .doc(uid)
      .get()
      .then((snapshot) => {
        return snapshot.data();
      })
      .catch((error) => {
        return error;
      });
  }

  fetchRequestedOrders(orderId) {
    return firestore()
      .collection('orderQueue')
      .doc(orderId)
      .get()
      .then((snapshot) => {
        return snapshot.data();
      })
      .catch((error) => {
        return error;
      });
  }

  fetchOrderDelivery() {
    return firestore()
      .collection('OrderDelivery')
      .get()
      .then((response) => {
        return response;
      });
  }

  orderDeliveryCart(orderId) {
    return firestore()
      .collection('orderQueue')
      .doc(orderId.trim())
      .get()
      .then((snapshot) => {
        return snapshot.data();
      })
      .catch((error) => {
        return error;
      });
  }

  getOrderHistory() {
    return firestore()
      .collection('orderHistory')
      .get()
      .then((snapshot) => {
        return snapshot;
      })
      .catch((error) => {
        return error;
      });
  }

  commentHandler = (comments) => {
    return firestore().collection('comments').doc(CommonDataManager.getInstance().getUser()).set({
      comment: comments,
    });
  };

  addComments = (review, rating, date) => {
    let Comments = [];
    let data;
    return firestore()
      .collection('comments')
      .get()
      .then((response) => {
        response.forEach((response) => {
          console.log('response===>', response.data());
          data = response.data();
          console.log('data reso--->', data);
        });
        console.log('data--->', data);
        if (data !== undefined) {
          Comments = data.comment;
          let arr = [...Comments, review];
          return firestore().collection('comments').doc().update({
            comment: arr,
            rating: rating,
            date: date,
          });
        } else {
          return firestore().collection('comments').doc().set({
            comment: review,
            rating: rating,
            date: date,
          });
        }
      });
  };
  getComment = () => {
    return firestore()
      .collection('comments')
      .doc()
      .get()
      .then((resp) => {
        return resp;
      });
  };

  // Helping Methods
  firebaseFetch(collection, callback) {
    collection
      .get()
      .then((snapshot) => {
        callback({
          isSuccess: true,
          response: snapshot,
          message: 'Data collected successfully',
        });
      })
      .catch((error) => {
        console.log('Fetch Error ====>>> ', error.message);
        callback({isSuccess: false, response: null, message: error});
      });
  }

  firebaseLiveFetch(collection, callback) {
    let unsubscribe = collection.onSnapshot((snapshot) => {
      if (snapshot) {
        callback({
          isSuccess: true,
          response: snapshot,
          reference: unsubscribe,
          message: 'Live Data fetched successfully',
        });
      } else {
        callback({
          isSuccess: false,
          response: snapshot,
          reference: unsubscribe,
          message: 'Live Data Not found',
        });
      }
    });

    return unsubscribe;
  }

  //----------------------------------- Collections -----------------------------------//
  //get all products
  getAllProducts = (callback) => {
    return firestore()
      .collection('Products')
      .get()
      .then((response) => {
        callback(response._docs);
      })
      .catch((error) => {
        callback(error);
      });
  };

  updateUserAddress = (address, userUid) => {
    return firestore()
      .collection('UserRecords')
      .doc(userUid)
      .update({
        address: firestore.FieldValue.arrayUnion(address),
      });
  };

  getAllHistoryOrders = (userUid, callback) => {
    return firestore()
      .collection('Orders')
      .where('userId', '==', userUid)
      .get()
      .then((response) => {
        // console.log('fake', respone._docs);
        callback(response._docs);
      })
      .catch((error) => {
        callback(error);
      });
  };

  getAllVideo = (callback) => {
    firestore()
      .collection('Videos')
      .get()
      .then((response) => {
        callback(response._docs);
      })
      .catch((error) => {
        callback(error);
      });
  };

  submitOrderToFirebase = (
    createdAt,
    products,
    address,
    totalPrice,
    tip,
    firstName,
    lastName,
    profileImage,
    phoneNumber,
  ) => {
    return firestore().collection('Orders').doc().set({
      createdAt: createdAt,
      orderProduct: products,
      userId: CommonDataManager.getInstance().getUser(),
      address: address,
      totalPrice: totalPrice,
      tip: tip,
      firstName: firstName,
      lastName: lastName,
      orderStatus: 'Pending',
      profileImage: profileImage,
      phoneNumber: phoneNumber,
    });
  };


  getTimings = async(callback) => {
      await firestore()
          .collection('Settings')
          .get()
          .then((response) => {
            callback(response)
          })
  }

  getCategories = async(value,callback) => {
    await firestore()
        .collection('Categories')
        .where('categoryType','==',value)
        .get()
        .then((response) => {
          callback(response)
        })
  }

  fetchUserData = async(Id,callback) => {
    await firestore()
        .collection('UserRecords')
        .doc(Id)
        .get()
        .then((response) => {
          callback(response)
        })
  }

  changeOrderStatus = async(orderNumber,status) => {
    await firestore()
        .collection('Orders')
        .doc(orderNumber)
        .update({
          orderStatus:status
        })
  }

  changeOrderStatusAndUpdatePic = async(orderNumber,status,deliveryImage) => {
    await firestore()
        .collection('Orders')
        .doc(orderNumber)
        .update({
          orderStatus:status,
          deliveryImageUrl: deliveryImage,
        })
  }

  onSendNotifications = (tokens, title, body, callback) => {
    let url = "https://fcm.googleapis.com/fcm/send";
    console.log("body", body, tokens, title)
    let notificationBody = {
      to: tokens,
      notification: {
        priority: "high",
        title: title,
        body: body,
        content_available: true,
        OrganizationId: "2",
        subtitle: "New Message Received"
      },
      data: {priority: "high", sound: "default", contentAvailable: true, bodyText: "New Message"},
    };
    let fetchProperties = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "key=" + "AAAAcAxOn8w:APA91bEcyoT0lMG8JDXJPyn13y4A9bFRj0nmTH1y34PW_pzEEZiU_kfnesUCoAMju00-03Ctf0baqy7GsjzdhG5bzDwku5DAqFFVn07zNwrmY9KRPMO0zDYWtK1LEHO629GewdVYUXHc",
      },
      body: JSON.stringify(notificationBody),
    };
    fetch(url, fetchProperties)
        .then((res) => {
          console.log("Fetch Response ====>>> ", res);
          callback(true);
        })
        .catch((error) => {
          console.log("Fetch Error ====>>> ", error);
          callback(false);
        });
  };

  fetchOrdersOfOneId = (callback) => {
    let tempArray = [];
    let query1 =  firestore().collection('Orders')
        .where('orderStatus','==','Accepted')

    query1.onSnapshot((resp) => {
      if (resp._docs.length > 0) {
        resp.forEach((response) => {
          tempArray.push(response)
        })
      }
    })

    let query2 =  firestore().collection('Orders')
        .where('orderStatus','==','OnRoute')

    query2.get().then((res) => {
      if (res._docs.length > 0) {
        res.forEach((response) => {
          tempArray.push(response)
        })
      }
    })

    setTimeout(() => {
      callback(tempArray)
    },1000)


  }

  addNotificationListener = () => {
    this.messageForeGround();
    this.messageBackGround();

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log("onNotificationOpenedApp", remoteMessage.notification);
    });

    messaging()
        .getInitialNotification()
        .then((remoteMessage) => {
          console.log("getInitialNotification", remoteMessage);
        });
  };


  messageForeGround = () => {
    return messaging().onMessage(async (remoteMessage) => {
      EventRegister.emit("InAppNotification", remoteMessage)

      console.log("onMessageForGround====>", remoteMessage);
    });
  };


  messageBackGround = () => {
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("setBackgroundMessageHandler", remoteMessage);
    });
  };

}

const apiService = new firebaseServices();

export default apiService;
