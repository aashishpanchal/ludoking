import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LudoBoardScreen from '../screens/LudoBoardScreen';
import {navigationRef} from '../helpers/NavigationUtil';
import HomeScreen from '../screens/HomeScreen';
import SplashScreen from '../screens/SplashScreen';
const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={() => ({
          headerShown: false,
        })}>
        <Stack.Screen
          name="LudoBoardScreen"
          options={{
            animation: 'fade',
          }}
          component={LudoBoardScreen}
        />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen
          name="HomeScreen"
          options={{
            animation: 'fade',
          }}
          component={HomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
