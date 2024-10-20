import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { color } from "../utils/color";
import { fontSize } from "../utils/size";
import { fonts } from "../utils/fonts";
import CustomText from "../components/CustomText";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import ButtonAction from "../components/ButtonAction";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/root";
import { useNavigation } from "@react-navigation/native";

const ProfileView = () => {

    const { user } = useSelector((state: RootState) => state.user);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();


    const Logout =  async () => {
        try {
            await AsyncStorage.clear();
            navigation.navigate('splash');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={[styles.body, { paddingBottom: 0 }]}>
            <CustomText size={20} color={color.black} font={fonts.SemiBold}>Hi {user.username} Thank you for using this app</CustomText>
            <ButtonAction title="logout" onPress={Logout} style={{width : '100%'}}/>
        </View>
    );

};


const styles = StyleSheet.create({
    body: {
        flex: 1,
        padding: 30,
        backgroundColor: color.white,
        flexDirection : 'column',
        alignItems : 'center',
        justifyContent : 'center'
    },
    headline: {
        fontSize: fontSize.xxl,
        color: color.black,
        fontFamily: fonts.Bold,
    },
})
export default ProfileView;