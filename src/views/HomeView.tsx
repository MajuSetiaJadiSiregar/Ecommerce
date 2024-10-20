import { View, Text, StyleSheet, Platform } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { NavigationContainer } from '@react-navigation/native';
import ProductView from './ProductView';
import { color } from '../utils/color';
import CustomText from '../components/CustomText';
import CartView from './CartView';
import FavoriteView from './FavoriteView';
import ProfileView from './ProfileView';
// import { regular } from '../utils/fonts';

const BottomTabNavigator = createBottomTabNavigator();

function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home!</Text>
        </View>
    );
}

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}

export default function HomeView() {
    //   const tabBarHeight = useBottomTabBarHeight();
    return (

        <BottomTabNavigator.Navigator
            screenOptions={{
                tabBarLabelStyle: styles.label,
                tabBarStyle: [
                    styles.tabContainer,
                    Platform.OS === 'ios' && {
                        shadowOffset: { height: -2, width: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 15,
                    },
                ],
                tabBarItemStyle: {
                    marginBottom: 7,
                },
                tabBarInactiveTintColor: 'gray',
                tabBarActiveTintColor: '#0071ff',
            }}
            safeAreaInsets={{
                bottom: 0,
            }}
        >
            <BottomTabNavigator.Screen
                name="products"
                component={ProductView}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <AntDesign
                            name="home"
                            size={22}
                            color={focused ? color.white : 'gray'}
                        />
                    ),
                    headerShown: false,
                    tabBarLabel: ({ focused }) => (
                        <CustomText style={{ color: focused ? color.white : color.gray }} size={14} color={color.white} >Product</CustomText>
                    ),
                }
                }
            />

            <BottomTabNavigator.Screen
                name="favorite"
                component={FavoriteView}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <AntDesign
                            name="heart"
                            size={22}
                            color={focused ? color.white : 'gray'}
                        />
                    ),
                    headerShown: false,
                    tabBarLabel: ({ focused }) => (
                        <CustomText style={{ color: focused ? color.white : color.gray }} size={14} color={color.white} >Favorite</CustomText>
                    ),
                }}
            />

            <BottomTabNavigator.Screen
                name="cart"
                component={CartView}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <AntDesign
                            name="shoppingcart"
                            size={22}
                            color={focused ? color.white : 'gray'}
                        />
                    ),
                    headerShown: false,
                    tabBarLabel: ({ focused }) => (
                        <CustomText style={{ color: focused ? color.white : color.gray }} size={14} color={color.white} >Cart</CustomText>
                    ),
                }}
            />

            <BottomTabNavigator.Screen
                name="profile"
                component={ProfileView}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <AntDesign
                            name="user"
                            size={22}
                            color={focused ? color.white : 'gray'}
                        />
                    ),
                    headerShown: false,
                    tabBarLabel: ({ focused }) => (
                        <CustomText style={{ color: focused ? color.white : color.gray }} size={14} color={color.white} >Profile</CustomText>
                    ),
                }}
            />

        </BottomTabNavigator.Navigator>
    );
}

const styles = StyleSheet.create({
    tabContainer: {
        position: 'absolute',
        width: '90%',
        borderRadius: 12,
        left: '5%',
        bottom: 10,
        backgroundColor: color.primary,
        height: 70,
    },
    label: {
        textTransform: 'capitalize',
        fontSize: 10,
    },
});