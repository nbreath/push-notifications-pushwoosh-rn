import Pushwoosh from 'pushwoosh-react-native-plugin';
import { credentials } from '../config/credentials';

Pushwoosh.init({
  pw_appid: credentials.PUSHWOOSH_APP_ID,
  project_number: credentials.GOOGLE_PROJECT_NUMBER
});

Pushwoosh.register(
  token => {
    console.warn('Registered for push notifications with token: ' + token);
  },
  error => {
    console.warn('Failed to register for push notifications: ' + error);
  }
);
