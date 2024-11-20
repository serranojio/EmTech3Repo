import { StyleSheet, Text, View, SafeAreaView, Platform, Alert } from 'react-native';
import Status from './components/StatusBar';
import IMEComponent from './components/IMEComponent';
import MessageList from './components/MessageList';
import { createImageMessage, createLocationMessage, createTextMessage } from './utils/MessageUtils';
import ToolbarComponent from './components/ToolbarComponent';
import React, { useState } from 'react';
import * as Location from 'expo-location';
import { TouchableOpacity } from 'react-native';
import { Image, TouchableHighlight, geolocation } from 'react-native';
import { BackHandler } from 'react-native';

export default class App extends React.Component {

  state = {
    messages: [
      createImageMessage('https://th.bing.com/th/id/OIP.ZJOUSHF99nSg1V6JG_R9lAHaFj?rs=1&pid=ImgDetMain'),
      createTextMessage('World'),
      createTextMessage('Hello'),
      createLocationMessage({
        latitude: 14.6488,
        longitude: 121.0509,
      }),
    ],

    fullScreenImageId: null,
    isInputFocused: false,
  };

  requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission Denied", "Permission to access location was denied.");
      throw new Error("Location permission not granted");
    }
  };
  

  handlePressToolbarCamera = () => {

  };

handlePressToolbarLocation = async () => {
  try {
    await this.requestLocationPermission();
    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    this.setState((prevState) => ({
      messages: [
        createLocationMessage({ latitude, longitude }),
        ...prevState.messages,
      ],
    }));
  } catch (error) {
    console.error('Error getting location:', error);
    Alert.alert("Error", "Unable to retrieve location. Make sure permissions are granted.");
  }
};
  

  handleChangeFocus = (isFocused) => {
    this.setState({ isInputFocused: isFocused });
  };

  handleSubmit = (text) => {
    const { messages } = this.state;
    this.setState({
      messages: [createTextMessage(text), ...messages],
    });
  };

  dismissFullscreenImage = () => {
    this.setState({ fullScreenImageId: null });
  };

  handlePressMessage = ({ id, type }) => {
    this.setState({ isInputFocused: false });
    switch (type) {
      case 'text':
        Alert.alert(
          'Delete Message?',
          'Are you sure you want to permanently delete this message?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              onPress: () => this.handleDeleteMessage(id),
              style: 'destructive',
            },
          ]
        );
        break;
      
        case 'image':
          this.setState({ fullScreenImageId: id }); 
          break;
      
        default:
          break;
    }
  };

  handleDeleteMessage = (messageId) => {
    this.setState((prevState) => ({
      messages: prevState.messages.filter((message) => message.id !== messageId)
    }));
  };

  componentDidMount () {
    this.subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      const { fullScreenImageId } = this.state;
      if (fullScreenImageId) {
        this.dismissFullscreenImage();
        return true;
      }
      return false;
    });
  }

  componentWillUnmount() {
    this.subscription.remove();
  }



  renderFullscreenImage = () => {
    const { messages, fullScreenImageId } = this.state;
    if(!fullScreenImageId) return null;
    const image = messages.find(message => message.id === fullScreenImageId);
    if(!image) return null;
    const { uri } = image;
    return (
      <TouchableHighlight style={styles.fullScreenOverlay}
        onPress={this.dismissFullscreenImage}>
          <Image style={styles.fullscreenImage} source= {{ uri }} />
      </TouchableHighlight>
    );
  };

  renderMessageList = () => {
    return (
      <View style={styles.messageListStyle}>
        <MessageList messages={this.state.messages} onPressMessage={this.handlePressMessage} />
      </View>
    );
  };

  renderToolbar = () => {
    const { isInputFocused } = this.state;
    return (
      <View style={styles.toolbarContainer}>
        <ToolbarComponent 
          isFocused={isInputFocused}
          onSubmit={this.handleSubmit}
          onChangeFocus={this.handleChangeFocus}
          onPressCamera={this.handlePressToolbarCamera}
          onPressLocation={this.handlePressToolbarLocation}
          /> 
      </View>
    )
  }

  renderInputMethodEditor = () => {
    return (
      <View style={styles.inputMethodEditor}>
        <IMEComponent />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Status />
        {this.renderMessageList()}
        {this.renderToolbar()}
        {this.renderInputMethodEditor()}
        {this.renderFullscreenImage()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingRight: 10,
    marginTop: 10,
  },

  content: {
    flex: 1,
    backgroundColor: '#fff',
  },

  inputMethodEditor: {
    height: '35%',
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  toolbarContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },

  messageListStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10,
    paddingTop: 50,
    paddingRight: 10,
  },

  statusStyle: {
    alignItems: 'center',
    height: '3%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.4)',
    borderBottomColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
  },

  fullScreenOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },

  fullscreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  toolbarText: {
    padding: 10,
    textAlign: 'center',
  }


});