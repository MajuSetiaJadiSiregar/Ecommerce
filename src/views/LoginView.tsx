import { Image, ScrollView, StyleSheet, View, Alert } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { getUser, handleLoading } from "../store/slice/UserSlice";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/root";
import { color } from "../utils/color";
import ButtonBack from "../components/ButtonBack";
import CustomText from "../components/CustomText";
import Input from "../components/Input";
import ButtonAction from "../components/ButtonAction";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Endpoint } from "../utils";
import { spacing } from "../utils/size";

const LoginView = () => {
    const { isLoading } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>()

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [secureEntery, setSecureEntery] = useState(true);
    const [formData, setFormData] = useState({ username: '', password: ''});



    const handleInputChange = (name: string, value: string) => {
        setFormData({...formData, [name]: value });
    };

    const goBack = () => {
        navigation.goBack();
    };

    const UserLogin = async () => {

        dispatch(handleLoading(true))
        try {

            let res = await fetch(`${Endpoint}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                }),
            });

            let response = await res.json();

            if (response.message === 'Invalid credentials') {
                throw { message: 'Invalid credentials', name: 'Invalid credentials' }
            }

            dispatch(getUser({ firstName: response.firstName, lastName: response.lastName, username: response.username }));
            await AsyncStorage.setItem('accessToken', response.accessToken);
            dispatch(handleLoading(false))
            navigation.navigate('home');

        } catch (error: any) {
            dispatch(handleLoading(false))
            if (error.message === 'Invalid credentials') {
                Alert.alert(error.message);
            } else {
                Alert.alert("Something Error");
            }
        }
    }


    return (
        <View style={styles.container}>
            <ButtonBack onPress={goBack} />
            <Image source={require('../assets/access.jpg')} style={styles.image} resizeMode="cover" />

            <ScrollView style={styles.scrollContainer}>

                <View style={styles.containerGreeting}>
                    <CustomText size={18} color={color.tertiary}>Hi, Welcome back...</CustomText>
                </View>

                <View style={styles.formContainer}>
                    <Input label="enter your username" iconName="person" value={formData.username} onChangeText={(value) => handleInputChange('username', value)} />
                    <Input label="enter your password" iconName="lock-closed" value={formData.password} onChangeText={(value) => handleInputChange('password', value)} secureTextEntry={secureEntery} onPress={() => setSecureEntery(!secureEntery)} />

                    <ButtonAction title="Login" style={{ width: '100%', marginTop: 10 }} onPress={UserLogin} isLoading={isLoading} />

                </View>
            </ScrollView>

        </View>
    );
};

export default LoginView;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white
    },

    image: {
        width: '100%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    scrollContainer: {
        // backgroundColor : 'red'
    },

    containerGreeting: {
        marginLeft: spacing.md,
        marginRight: spacing.md
    },

    formContainer: {
        marginHorizontal: spacing.md
    }
});

