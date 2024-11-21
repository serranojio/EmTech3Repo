import { StyleSheet, Text, View, Pressable, Modal, FlatList } from "react-native";
import { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function NotificationContainer() {
  const [modalVisible, setModalVisible] = useState(false);

  const notifications = [
    { id: '1', message: 'Mushroom [label] is Ready to Harvest', timestamp: '2024-11-07 10:30:00', status: 'ready' },
    { id: '2', message: 'Mushroom [label] is Ready to Harvest', timestamp: '2024-11-07 11:00:00', status: 'ready' },
    { id: '3', message: 'Mushroom [label] is Overdue', timestamp: '2024-11-06 14:15:00', status: 'overdue' },
    { id: '4', message: 'Mushroom [label] is Ready to Harvest', timestamp: '2024-11-07 12:30:00', status: 'ready' },
    { id: '5', message: 'Mushroom [label] is Ready to Harvest', timestamp: '2024-11-07 13:45:00', status: 'ready' },
  ];

  function pressUserHandler() {
    setModalVisible(true);
  }

  function closeModalHandler() {
    setModalVisible(false);
  }

  function getCircleColor(status) {
    if (status === 'ready') return '#066839';  
    if (status === 'overdue') return '#e74c3c';  
    return '#ccc';  
  }

  return (
    <View style={styles.notificationContainer}>
      <Pressable onPress={pressUserHandler}>
        <MaterialIcons name='notifications' size={30} color='#000000' style={styles.icon} />
      </Pressable>

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModalHandler}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Notifications</Text>
              <Pressable onPress={closeModalHandler}>
                <Text style={styles.closeText}>Close</Text>
              </Pressable>
            </View>

            <FlatList
              data={notifications}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.notificationItem}>
                  <View style={[styles.circle, { backgroundColor: getCircleColor(item.status) }]} />
                  <View style={styles.notificationTextContainer}>
                    <Text style={styles.notificationText}>{item.message}</Text>
                    <Text style={styles.timestampText}>{item.timestamp}</Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  notificationContainer: {
    paddingHorizontal: 15,
    padding: 10,
  },
  icon: {
    textAlign: 'right',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeText: {
    fontSize: 16,
    color: '#066839',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 30,  
    marginRight: 15,
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationText: {
    fontSize: 16,
    color: '#333',
  },
  timestampText: {
    fontSize: 12,
    color: '#777',
    marginTop: 5,
  },
});

export default NotificationContainer;
