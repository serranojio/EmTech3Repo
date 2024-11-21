import React from 'react';
import { StyleSheet, View } from 'react-native';
import NotificationContainer from './Notification';
import Header from './Header';
import Greetings from './Greetings';
import Summary from './Summary';
import ShowCameraFeed from './ShowCameraFeed';

function HomeScreen() {
  return (
    <View style={styles.appContainer}>
      <View style={styles.notificationWrapper}>
        <NotificationContainer />
      </View>

      <Header />
      <Greetings />

      <View style={styles.summaryContainer}>
        <Summary />
      </View>

      <View style={styles.showCameraFeedContainer}>
        <ShowCameraFeed />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 100, 
  },

  notificationWrapper: {
    position: 'absolute',
    top: 60,
    right: 10,
    zIndex: 10,
  },

  summaryContainer: {
    width: '100%',
  },

  showCameraFeedContainer: {
    flexGrow: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 0,
  },
});

export default HomeScreen;
