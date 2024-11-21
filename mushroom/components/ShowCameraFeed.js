import { StyleSheet, Text, Image, View, Pressable } from "react-native";
import { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Inter_100Thin, Inter_800ExtraBold, Inter_700Bold, Inter_900Black, Inter_500Medium } from '@expo-google-fonts/inter';
import { Quicksand_300Light, Quicksand_700Bold } from "@expo-google-fonts/quicksand";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from "axios";

function ShowCameraFeed() {
  const [fontsLoaded] = useFonts({
    Inter_800ExtraBold,
    Inter_700Bold,
    Inter_900Black,
    Inter_100Thin,
    Inter_500Medium,
    Quicksand_300Light,
    Quicksand_700Bold,
  });

  const [showFeed, setShowFeed] = useState(false); 
  const [currentTime, setCurrentTime] = useState(new Date());

  const captureImage = async () => {
    try {
      const response = await axios.get()
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer); 
  }, []);

  function pressUserHandler() {
    setShowFeed(prevState => !prevState); 
  }

  const formattedDate = currentTime.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <View style={styles.container}>
      <Pressable style={styles.cameraFeedPressable} onPress={pressUserHandler}>
        <Text style={styles.ShowCameraFeedText}>
            {showFeed ? "Hide Camera Feed" : "Show Camera Feed"}</Text>
      </Pressable>

      {showFeed && (
        <View style={styles.cameraFeedContainer}></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    width: '100%',
    alignItems: 'center',
  },

  cameraFeedPressable: {
    backgroundColor: '#15412D',
    borderRadius: 25,
    alignContent: 'center',
    width: '90%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  ShowCameraFeedText: {
    fontFamily: 'Inter_500Medium',
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },

  cameraFeedContainer: {
    backgroundColor: 'gray',
    width: '90%',
    height: 200,
    borderRadius: 15,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10, 
  },

  cameraFeedText: {
    fontFamily: 'Inter_700Bold',
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },

  cameraFeedImage: {
    marginTop: 15,
    width: '100%',
    height: 200,
    borderRadius: 0,
    resizeMode: 'contain', 
  },
});

export default ShowCameraFeed;
