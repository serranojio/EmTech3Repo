import { StyleSheet, Text, Image, View, Pressable, Modal } from "react-native";
import { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Inter_100Thin, Inter_800ExtraBold, Inter_700Bold, Inter_900Black, Inter_500Medium } from '@expo-google-fonts/inter';
import { Quicksand_300Light, Quicksand_700Bold } from "@expo-google-fonts/quicksand";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function Header() {

  const [fontsLoaded] = useFonts({
    Inter_800ExtraBold,
    Inter_700Bold,
    Inter_900Black,
    Inter_100Thin,
    Inter_500Medium,
    Quicksand_300Light,
    Quicksand_700Bold,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer); 
  }, []);

  function pressUserHandler(){
    setModalVisible(true);
  }

  const formattedDate = currentTime.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <View style={styles.headerContainer}>
      <View style={styles.clockContainer}>
        <Text style={styles.clockTimeText}>{formattedTime}</Text>
        <Text style={styles.clockDateText}>{formattedDate}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 300,
    height: 200,
    marginBottom: -20,
  },
  headerContainer: {
    marginBottom: 20,
  },
  headerText: {
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: "Quicksand_700Bold", 
    fontSize: 20,
    color: '#fff',
    backgroundColor: '#00bfa6',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 33,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    textAlign: 'right',
  },
  modalIcon: {
    textAlign: 'center',
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00bfa6',
  },
  welcomeText: {
    fontSize: 14,
  },
  welcomeTextHeader: {
    fontSize: 18,
    fontFamily: 'Inter_800ExtraBold',
  },
  pressableTextContainer: {
    backgroundColor: '#00bfa6',
    margin: 10,
    borderRadius: 15,
    padding: 5,
    width: 100,
  },
  pressableText: {
    color: '#fff',
    textAlign: 'center',
  },
  clockContainer: {
    alignItems: 'center',
  },
  clockTimeText: {
    fontSize: 72,
    color: '#1c1c1c',
    fontFamily: 'Inter_800ExtraBold',
    marginBottom: -7,
  },

  clockDateText: {
    fontSize: 21,
    color: '#1c1c1c',
    fontFamily: 'Inter_500Medium',
  },
});

export default Header;
