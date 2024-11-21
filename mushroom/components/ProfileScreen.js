import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Pressable } from 'react-native';
import { useFonts } from 'expo-font';
import { Inter_800ExtraBold, Inter_500Medium } from '@expo-google-fonts/inter';

function ProfileScreen() {
  const [fontsLoaded] = useFonts({
    Inter_800ExtraBold,
    Inter_500Medium,
  });

  const [username, setUsername] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');

  const handleEditProfile = () => {
    alert('Edit Profile');
  };

  const handleSignOut = () => {
    alert('Signed Out');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.profileImage}
        />
        <Text style={styles.username}>{username}</Text>
      </View>
      <View style={styles.profileDetails}>
        <Text style={styles.detailsTitle}>Profile Details</Text>
        <TextInput
          style={styles.inputField}
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
        />
        <TextInput
          style={styles.inputField}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
        />
      </View>
      <View style={styles.actions}>
        <Pressable style={styles.button} onPress={handleEditProfile}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.signOutButton]} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontFamily: 'Inter_800ExtraBold',
    color: '#333',
  },
  profileDetails: {
    marginBottom: 30,
  },
  detailsTitle: {
    fontSize: 18,
    fontFamily: 'Inter_500Medium',
    color: '#555',
    marginBottom: 10,
  },
  inputField: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
    borderRadius: 5,
  },
  actions: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#48D38A',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
  },
  signOutButton: {
    backgroundColor: '#FF5757',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Inter_500Medium',
  },
});

export default ProfileScreen;
