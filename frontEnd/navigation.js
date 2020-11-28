import React from 'react';
import {createAppContainer } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from './screen/HomeScreen'
import SnapScreen from './screen/SnapScreen'
import GalleryScreen from './screen/GalleryScreen'

import { FontAwesome5 } from '@expo/vector-icons'; 


var BottomNavigator = createBottomTabNavigator({
    Gallery: GalleryScreen,
    Snap: SnapScreen  



},
{
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        var iconName;
        if (navigation.state.routeName == 'Gallery') {
          iconName = 'images';
        } else if (navigation.state.routeName == 'Snap') {
          iconName = 'camera';
        }
        return <FontAwesome5 name={iconName} size={25} color={tintColor} />

      },
    }),
    tabBarOptions: {
      activeTintColor: '#009788',
      inactiveTintColor: '#FFFFFF',
      style: {
        backgroundColor: '#111224',
    },
    },
    
  });
var StackNavigator = createStackNavigator({
    Home: HomeScreen,
    Menu: BottomNavigator
},
{
    headerMode:"none",
});
  
  
export default Navigation = createAppContainer(StackNavigator)