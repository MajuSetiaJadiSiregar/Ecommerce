import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { color } from '../utils/color';
import CustomText from './CustomText';
import { fonts } from '../utils/fonts';

interface LoadingIndicatorProps {
    message?: string; 
    size?: 'small' | 'large';
}

const Loading: React.FC<LoadingIndicatorProps> = ({ message = "please wait", size = "large" }) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={size} color={color.primary} />
            <CustomText color={color.tertiary} size={12} font={fonts.SemiBold}>{message}</CustomText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Loading;
