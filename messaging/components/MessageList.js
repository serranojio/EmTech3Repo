import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import MapView, { Marker } from 'react-native-maps'; 
import { MessageShape } from '../utils/MessageUtils';

export default class MessageList extends React.Component {
    static propTypes = {
        messages: PropTypes.arrayOf(MessageShape).isRequired,
        onPressMessage: PropTypes.func,
    };

    static defaultProps = {
        onPressMessage: () => {},
    };

    keyExtractor = (item) => item.id.toString();

    renderMessageItem = ({ item }) => {
        const { onPressMessage } = this.props;
        return (
            <View key={item.id} style={styles.messageRow}>
                <TouchableOpacity onPress={() => onPressMessage(item)}>
                    {this.renderMessageBody(item)}
                </TouchableOpacity>
            </View>
        );
    };

    renderMessageBody = ({ type, text, uri, coordinate }) => {
        switch (type) {
            case 'text':
                return (
                    <View style={styles.messageBubble}>
                        <Text style={styles.text}>{text}</Text>
                    </View>
                );
            case 'image':
                return <Image style={styles.image} source={{ uri }} />;
            case 'location':
                return (
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            ...coordinate,
                            latitudeDelta: 0.2,
                            longitudeDelta: 0.2,

                        }}
                    >
                        {coordinate && <Marker coordinate={coordinate} />}
                    </MapView>
                );
            default:
                return null; 
        }
    };

    render() {
        const { messages } = this.props;
        return (
            <FlatList
                style={styles.container}
                data={messages}
                inverted
                renderItem={this.renderMessageItem}
                keyExtractor={this.keyExtractor}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.contentContainer}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden',
    },
    contentContainer: {
        paddingBottom: 20,
    },
    messageRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 5,
    },
    messageBubble: {
        backgroundColor: '#007AFF',
        borderRadius: 20,
        padding: 10,
        marginLeft: 60,
        maxWidth: '100%', 
    },
    text: {
        color: 'white',
        fontSize: 16,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 15,
    },
    map: {
        width: 300,
        height: 200,
        borderRadius: 15,
    },
});