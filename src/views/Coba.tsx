// import {
//     Image,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from "react-native";
// import React, { useState } from "react";




// import Ionicons from "react-native-vector-icons/Ionicons";
// import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
// import { useNavigation } from "@react-navigation/native";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../store";
// import { decrement, getUser, UserLogin } from "../store/slice/UserSlice";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { RootStackParamList } from "../navigation/root";
// import { fonts } from "../utils/fonts";

// const LoginView = () => {
//     const { value, user } = useSelector((state: RootState) => state.counter);
//     const dispatch = useDispatch<AppDispatch>()
//     const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//     const [secureEntery, setSecureEntery] = useState(true);
//     const [formData, setFormData] = useState({
//         username: '',
//         password: '',
//     }); // Satu state untuk semua input

//     // Handler untuk mengubah nilai sesuai key (input field)
//     const handleInputChange = (name: string, value: string) => {
//         setFormData({
//             ...formData, // Spread existing data
//             [name]: value, // Update field yang diinput
//         });
//     };

//     const handleGoBack = () => {
//         navigation.goBack();
//     };


//     return (
//         <View style={styles.container}>

//             <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
//                 <Ionicons
//                     name={"arrow-back-outline"}
//                     color={colors.primary}
//                     size={25}
//                 />
//             </TouchableOpacity>
//             <Image source={require('../assets/access.jpg')} style={styles.stepImage} resizeMode="cover" />

//             <ScrollView style={styles.scrollContainer}>

//                 <View style={styles.textContainer}>
//                     <Text style={styles.headingText}>Hi, Welcome back {value} {user.firstName}</Text>

//                 </View>

//                 <View style={styles.formContainer}>
//                     <View style={styles.inputContainer}>
//                         <Ionicons name={"mail-outline"} size={30} color={colors.secondary} />
//                         <TextInput
//                             style={styles.textInput}
//                             placeholder="Enter your email"
//                             placeholderTextColor={colors.secondary}
//                             keyboardType="email-address"
//                             value={formData.username}
//                             onChangeText={(value) => handleInputChange('username', value)}
//                         />
//                     </View>
//                     <View style={styles.inputContainer}>
//                         <SimpleLineIcons name={"lock"} size={30} color={colors.secondary} />
//                         <TextInput
//                             style={styles.textInput}
//                             placeholder="Enter your password"
//                             placeholderTextColor={colors.secondary}
//                             secureTextEntry={secureEntery}
//                             value={formData.password}
//                             onChangeText={(value) => handleInputChange('password', value)}
//                         />
//                         <TouchableOpacity
//                             onPress={() => {
//                                 setSecureEntery((prev) => !prev);
//                             }}
//                         >
//                             <SimpleLineIcons name={"eye"} size={20} color={colors.secondary} />
//                         </TouchableOpacity>
//                     </View>
//                     <TouchableOpacity>
    
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.loginButtonWrapper} onPress={async () => {
//                         // dispatch(UserLogin())
//                         let res = await UserLogin(formData.username, formData.password);
//                         dispatch(getUser({ firstName: res.firstName, lastName: res.lastName }))
//                         console.log(res);
//                         navigation.navigate('home')
//                     }}>
//                         <Text style={styles.loginText}>Login</Text>
//                     </TouchableOpacity>

//                 </View>
//             </ScrollView>

//         </View>
//     );
// };

// export default LoginView;

// // const colors = {
// //     white: '#FFFFFF',
// //     primary: '#45484A',
// //     secondary: '#AEB5BB',
// //     gray: '#D9D9D9',
// // };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: colors.white,
//         // paddingTop: 10,
//     },
//     // backButtonWrapper: {
//     //     height: 40,
//     //     width: 40,
//     //     backgroundColor: colors.gray,
//     //     borderRadius: 20,
//     //     justifyContent: "center",
//     //     alignItems: "center",
//     //     margin: 20
//     // },
//     // textContainer: {
//     //     // marginVertical: 10,
//     // },
//     // headingText: {
//     //     fontSize: 12,
//     //     color: colors.primary,
//     //     fontFamily: fonts.Regular
//     // },
//     // formContainer: {
//     //     marginTop: 20,
//     // },
//     // inputContainer: {
//     //     borderWidth: 1,
//     //     borderColor: colors.secondary,
//     //     borderRadius: 100,
//     //     paddingHorizontal: 20,
//     //     flexDirection: "row",
//     //     alignItems: "center",
//     //     padding: 2,
//     //     marginVertical: 10,
//     // },
//     // textInput: {
//     //     flex: 1,
//     //     paddingHorizontal: 10,
//     //     //   fontFamily: fonts.Light,
//     // },
//     // forgotPasswordText: {
//     //     textAlign: "right",
//     //     color: colors.primary,
//     //     //   fontFamily: fonts.SemiBold,
//     //     marginVertical: 10,
//     // },
//     // loginButtonWrapper: {
//     //     backgroundColor: colors.primary,
//     //     borderRadius: 100,
//     //     marginTop: 20,
//     // },
//     // loginText: {
//     //     color: colors.white,
//     //     fontSize: 20,
//     //     //   fontFamily: fonts.SemiBold,
//     //     textAlign: "center",
//     //     padding: 10,
//     // },
//     // continueText: {
//     //     textAlign: "center",
//     //     marginVertical: 20,
//     //     fontSize: 14,
//     //     //   fontFamily: fonts.Regular,
//     //     color: colors.primary,
//     // },
//     // googleButtonContainer: {
//     //     flexDirection: "row",
//     //     borderWidth: 2,
//     //     borderColor: colors.primary,
//     //     borderRadius: 100,
//     //     justifyContent: "center",
//     //     alignItems: "center",
//     //     padding: 10,
//     //     gap: 10,
//     // },
//     // googleImage: {
//     //     height: 20,
//     //     width: 20,
//     // },
//     // googleText: {
//     //     fontSize: 20,
//     //     //   fontFamily: fonts.SemiBold,
//     // },
//     // footerContainer: {
//     //     flexDirection: "row",
//     //     justifyContent: "center",
//     //     alignItems: "center",
//     //     marginVertical: 20,
//     //     gap: 5,
//     // },
//     // accountText: {
//     //     color: colors.primary,
//     //     //   fontFamily: fonts.Regular,
//     // },
//     // signupText: {
//     //     color: colors.primary,
//     //     //   fontFamily: fonts.Bold,
//     // },
//     // stepImage: {
//     //     width: "90%",
//     //     height: "50%",
//     //     // marginVertical: 30,
//     //     justifyContent: 'center',
//     //     alignItems: 'center',
//     //     marginLeft: 20
//     //     // justifyContent: 'center',
//     // },

//     // bannerImage: {
//     //     // marginVertical: 20,
//     //     height: 250,
//     //     width: 231,
//     // },
//     // scrollContainer: {
//     //     padding: 20,
//     // }
// });

