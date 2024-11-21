import { StyleSheet, Text, Image, View, } from "react-native";


function EmptyList()
{
    return (
      <>
        <View style={styles.emptyContainer}>
          <Image
            source={require('../assets/moonlight.png')}
            style={styles.emptyImage}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.emptyText}>
          Such empty, start adding your goals by pressing the "Add Goal" button.
        </Text>
      </>
    )
}

const styles = StyleSheet.create({

  
    emptyImage: {
      width: 225,
      height: 125,
      justifyContent: 'center',
    },
  
    emptyText: {
      textAlign: 'center',
      fontSize: 12,
      paddingHorizontal: 100,
    },
  
    emptyContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default EmptyList