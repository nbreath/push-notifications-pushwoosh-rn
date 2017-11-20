import React from 'react';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { DeviceEventEmitter, Platform } from 'react-native';
import Home from './screens/Home';
import ByPush from './screens/ByPush';
import PushNotifications from './lib/push_notifications';

const Navigator = StackNavigator({
  Home: { screen: Home },
  ByPush: { screen: ByPush }
});

export default class App extends React.Component {
  constructor() {
    super();
  }

  openPush = userdata => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'ByPush',
      params: userdata
    });

    this.navigator &&
      this.navigator.dispatch(NavigationActions.navigate(navigateAction));
  };

  componentDidMount() {
    // this event is fired when the push is received in the app
    DeviceEventEmitter.addListener('pushReceived', e => {
      console.warn('pushReceived: ' + JSON.stringify(e));
      // shows a push is received. Implement passive reaction to a push, such as UI update or data download.
    });

    // this event is fired when user clicks on notification
    DeviceEventEmitter.addListener('pushOpened', e => {
      console.warn('pushOpened: ' + JSON.stringify(e));
      // shows a user tapped the notification. Implement user interaction, such as showing push details
      if (Platform.OS === 'ios') {
        try {
          const data = JSON.parse(e.u);
          this.openPush(data);
        } catch (error) {
          console.log(error);
        }
      } else {
        const { userdata } = e;
        console.log(userdata);
        this.openPush(userdata);
      }
    });
  }

  render() {
    return (
      <Navigator
        ref={nav => {
          this.navigator = nav;
        }}
      />
    );
  }
}
