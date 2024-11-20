import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import React from "react";

const ToolbarButton = ({ title, onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <Text style={styles.button}>{title}</Text>
    </TouchableOpacity>
);

ToolbarButton.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
};

export default class ToolbarComponent extends React.Component {

    setInputRef = (ref) => {
        this.input = ref;
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.isFocused !== this.props.isFocused) {
            if (nextProps.isFocused) {
                this.input.focus();
            } else {
                this.input.blur();
            }
        }
    }

    handleFocus = () => {
        const { onChangeFocus } = this.props;
        onChangeFocus(true);
    };

    handleBlur = () => {
        const { onChangeFocus } = this.props;
        onChangeFocus(false);
    };

    static propTypes = {
        isFocused: PropTypes.bool.isRequired,
        onChangeFocus: PropTypes.func,
        onSubmit: PropTypes.func,
        onPressCamera: PropTypes.func, 
        onPressLocation: PropTypes.func,
    };

    static defaultProps = {
        onChangeFocus: () => {},
        onSubmit: () => {},
        onPressCamera: () => {},
        onPressLocation: () => {},
    };

    state = {
        text: "",
    };

    handleChangeText = (text) => {
        this.setState({ text });
    };

    handleSubmitEditing = () => {
        const { onSubmit } = this.props;
        const { text } = this.state;
        if (!text) return;
        onSubmit(text);
        this.setState({ text: ""});
    };

    render() {
        const { onPressCamera, onPressLocation } = this.props;
        const { text } = this.state;
        return (
            <View style={styles.toolbar}>
                <ToolbarButton title={'📷'} onPress={onPressCamera} style={styles.button} />
                <ToolbarButton title={'📍'} onPress={onPressLocation} style={styles.button} />
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid={"transparent"}
                        placeholder={"Type something!"}
                        blurOnSubmit={false}
                        value={text}
                        onChangeText={this.handleChangeText}
                        onSubmitEditing={this.handleSubmitEditing}
                        ref={this.setInputRef}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                    />
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    toolbar: {
        flexDirection: 'row',
        alignItems: 'left',
        paddingVertical: 10,
        paddingHorizontal: 10,
        paddingLeft: 16, 
        backgroundColor: 'white',
    },

    button: {
        top: -2,
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: 25,
    }, 

    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: 16,
        paddingVertical: 4,
        paddingHorizontal: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },

    input: {
        flex: 1,
        fontSize: 18,
    },
});