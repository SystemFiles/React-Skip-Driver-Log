import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import {
createStackNavigator,
createAppContainer } from 'react-navigation';

// SCREEN
import MainScreen from './screens/MainScreen';
import CostAnalysis from './screens/CostAnalysis';
import DriverLog from './screens/DriverLog';
import HelpInfo from "./screens/HelpInfo";
import Overview from './screens/Overview';

// REDUX IMPORTS
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { recordReducer } from './reducers/recordReducer';
import { databaseReducer } from './reducers/databaseReducer';

const MainNavigator = createStackNavigator({
  Home: {screen: MainScreen},
  DriverLog: {screen: DriverLog},
  CostAnalysis: {screen: CostAnalysis},
  Overview: {screen: Overview},
  HelpInfo: {screen: HelpInfo},
}, {
  defaultNavigationOptions: {
    header: null
  }
});

const AppContainer = createAppContainer(MainNavigator);

const rootReducer = combineReducers(
  {records: recordReducer,
      database: databaseReducer});

const store = createStore(rootReducer);

class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <AppContainer />
        </Provider>
    );
  }
}

export default (App);