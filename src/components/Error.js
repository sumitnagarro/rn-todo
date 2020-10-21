import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import homeStyles from '../css/HomeCSS';

const Error = (props) => {
    return (
        <View style={homeStyles.errorContainer}>
            <Text style={homeStyles.errorPageTextBold}>Something went wrong !!!</Text>
            <Text style={homeStyles.errorPageTextNormal}>Give it another try. </Text>
            <TouchableOpacity onPress={props.onPress}>
                <Text style={homeStyles.errorPageButton}>Retry</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Error;
