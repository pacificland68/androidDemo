import React from 'react'
import 'react-native-gesture-handler'
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Home from './src/Home'
import Login from './src/Login'
import Camera from './src/Camera'
import { Provider } from 'react-redux'
import { Store } from './src/redux/store'

const Tab = createMaterialBottomTabNavigator()

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}></Stack.Screen>
          <Stack.Screen name="Home" component={Home}></Stack.Screen>
          <Stack.Screen name="Camera" component={Camera}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
