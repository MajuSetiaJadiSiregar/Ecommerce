
import React, { useState } from 'react';

import { StyleSheet, Text, View, TouchableOpacity, Image, Button } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/root';
import ButtonAction from '../components/ButtonAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { features } from '../utils';
import CustomText from '../components/CustomText';
import { color } from '../utils/color';
import { fontSize, spacing } from '../utils/size';
import { fonts } from '../utils/fonts';


function SplashView(): React.JSX.Element {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [currentImage, setCurrentImage] = useState(0);
    const [data, setData] = useState(features);


    const nextImage = () => {
        setCurrentImage(currentImage >= 2 ? 2 : currentImage + 1)
    }

    const prevImage = () => {
        setCurrentImage(currentImage <= 0 ? 0 : currentImage - 1)
    }


    const HandleContinue = async () => {
        try {
            let token = await AsyncStorage.getItem('accessToken');

            if (token === null) {
                navigation.navigate("login");
            } else {
                navigation.navigate("home")
            }
        } catch (error) {

        }
    }

    return (
        <View style={styles.container}>
            <Image source={data[currentImage].image} style={styles.containerImage} resizeMode="cover" />
            <View style={styles.containerIndicator}>
                {data.map((item, index) => {
                    return (
                        <View key={index} style={{
                            ...styles.indicator,
                            width: currentImage === index ? 40 : 30,
                            backgroundColor: currentImage === index ? "#A838D7" : "gray"
                        }}></View>
                    )
                })}
            </View>
            <CustomText style={{ marginVertical: spacing.sm }} color={color.tertiary} size={fontSize.xxl}>{data[currentImage].title}</CustomText>
            <CustomText style={{ textAlign: 'center', marginBottom: spacing.xl }} color={color.black} size={fontSize.md}>{data[currentImage].description}</CustomText>

            <View style={styles.containerButton}>
                {
                    currentImage > 0 ?
                        <TouchableOpacity
                            onPress={() => prevImage()}
                            style={{ ...styles.button, borderTopEndRadius: 20, borderBottomEndRadius: 20, }}>
                            <CustomText font={fonts.SemiBold} color={color.white} size={fontSize.md}>Prev</CustomText>
                        </TouchableOpacity>
                        :
                        <View></View>
                }

                <TouchableOpacity
                    onPress={() => nextImage()}
                    style={{ ...styles.button, borderTopStartRadius: 20, borderBottomStartRadius: 20 }}>
                    <CustomText font={fonts.SemiBold} color={color.white} size={fontSize.md}>Next</CustomText>
                </TouchableOpacity>
            </View>



            <ButtonAction title='continue' style={styles.continueBtn} onPress={HandleContinue} isLoading={false} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    containerImage: {
        width: "90%",
        height: "50%",
        marginVertical: spacing.md
    },

    containerIndicator: {
        flexDirection: "row"
    },
    indicator: {
        height: 10,
        marginHorizontal: spacing.sm,
        borderRadius: spacing.md
    },


    containerButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },

    button: {
        backgroundColor: color.secondary,
        height: 40,
        width: 80,
        justifyContent: "center",
        alignItems: "center"
    },


    continueBtn: {
        width: '90%',
        justifyContent: 'center',
        backgroundColor: '#bd236c',
        alignItems: 'center',
        marginTop: 40,
        borderRadius: spacing.md
    }

});

export default SplashView;
