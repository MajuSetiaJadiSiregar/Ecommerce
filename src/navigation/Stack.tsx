import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashView from '../views/SplashView';
import { RootStackParamList } from './root';
import HomeView from '../views/HomeView';
import ProductDetailView from '../views/ProductDetailView';
import LoginView from '../views/LoginView';


const StackNavigator = createNativeStackNavigator<RootStackParamList>();

export default function Stack(): React.JSX.Element {
  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <StackNavigator.Screen name="splash" component={SplashView} />

      <StackNavigator.Screen name="home" component={HomeView} />
      <StackNavigator.Screen name="productdetail" component={ProductDetailView} />
      <StackNavigator.Screen name="login" component={LoginView} />
      
    </StackNavigator.Navigator>
  );
}
