import React from 'react';
import { StyleSheet } from 'react-native';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import HomeScreen from './components/screens/home/home-screen';
import DetailsScreen from './components/screens/details/details-screen';


const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Details: DetailsScreen
},
{
  initialRouteName: "Home"
})

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />
  }
}
