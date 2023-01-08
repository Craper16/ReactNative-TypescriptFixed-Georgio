import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useAppSelector} from '../redux/hooks';

import {MainNavigator, AuthNavigator} from './MainNavigation';

const AppNavigation = () => {
  const isAuth = useAppSelector(state => !!state.auth.accessToken);
  return (
    <NavigationContainer>
      {isAuth && <MainNavigator />}
      {!isAuth && <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigation;
