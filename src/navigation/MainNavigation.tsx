import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';

const MainNavigatorStack = createStackNavigator();
const AuthNavigatorStack = createStackNavigator();

export const MainNavigator = () => {
  return (
    <MainNavigatorStack.Navigator>
      <MainNavigatorStack.Screen name="Articles" component={Dashboard} />
    </MainNavigatorStack.Navigator>
  );
};

export const AuthNavigator = () => {
  return (
    <AuthNavigatorStack.Navigator>
      <AuthNavigatorStack.Screen name="Login" component={Login} />
    </AuthNavigatorStack.Navigator>
  );
};
