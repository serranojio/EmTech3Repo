import React from 'react';
import Constants from 'expo-constants';
import { Text, View, Platform, StyleSheet, StatusBar, Animated } from "react-native";
import NetInfo from '@react-native-community/netinfo';

export default class Status extends React.Component{
    state = {
      info: 'none',
      messageVisible: false,
      statusBarOpacity: new Animated.Value(1),
    };

    slideAnim = new Animated.Value(-40);

    slideIn = () => {
      Animated.timing(this.slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        this.setState({ messageVisible: true});
      });
    }

    slideOut = () => {
      Animated.timing(this.slideAnim, {
        toValue: -80,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        this.setState({ messageVisible: false })
      });
    }

    updateStatusBarOpacity = (isConnected) => {
      Animated.timing(this.state.statusBarOpacity, {
        toValue: isConnected ? 1 : 0,
        duration: 400,
        useNativeDriver: false,
      }).start();
    }

    connectionChangeHandler = (state) => {
      this.setState({ info: state.isConnected ? 'connected' : 'none'}, () => {
        this.updateStatusBarOpacity(state.isConnected);

        if (state.isConnected) {
          if (this.state.messageVisible) {
            this.slideOut();
          }
        } else {
          this.setState({ messageVisible: true });
          this.slideIn();
        }
      });
    };

    componentDidMount() {
      NetInfo.fetch().then(state => {
        this.connectionChangeHandler(state);
      });

      this.unsubscribe = NetInfo.addEventListener(this.connectionChangeHandler);
    }

    componentWillUnmount() {
      if(this.unsubscribe) {
        this.unsubscribe();
      }
    }
  
    render() {
      const { info, messageVisible } = this.state;
      const isConnected = info !== 'none';
      const backgroundColor = isConnected ? 'white' : 'red';

      const statusBar = (
        <Animated.View style={{ opacity: this.state.statusBarOpacity }}>
          <StatusBar 
            backgroundColor={backgroundColor}
            barStyle={isConnected ? 'dark-content' : 'light-content'} 
            translucent={false}
            animated={true} 
          />
        </Animated.View>
      );

      const messageContainer = (
        <View style={styles.messageContainer} pointerEvents={'none'}>
          {statusBar}
          {messageVisible && (
            <Animated.View style={[styles.bubble, { transform: [{ translateY: this.slideAnim }]}]}>
              <Text style={styles.text}>No network connection</Text>
            </Animated.View>
          )}
        </View>
      );

      if(Platform.OS === 'ios' && isConnected === false){
        return (
          <View style={[styles.status, { backgroundColor }]}>
            {messageContainer}
          </View>
        );
      }
  
      return messageContainer;
    }
}

const statusHeight = Platform.OS === 'ios' ? Constants.statusBarHeight : 0;

const styles = StyleSheet.create({
    status: {
        zIndex: 1,
        height: statusHeight,
    },

    messageContainer: {
      zIndex: 1,
      position: 'absolute',
      top: statusHeight + 20,
      right: 0,
      left: 0,
      height: 80,
      alignItems: 'center',
    },

    bubble: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 20,
      backgroundColor: 'red',
    },

    text: {
      color: 'white',
    }

})