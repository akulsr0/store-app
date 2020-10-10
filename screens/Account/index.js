import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

import AuthView from './AuthView';
import UserAccount from './UserAccount';
import ManageProduct from './ManageProduct';
import { useFocusEffect } from '@react-navigation/native';

const Stack = createStackNavigator();

function AccountScreen({ navigation }) {
  useFocusEffect(() => {
    // AsyncStorage.removeItem('token');
    AsyncStorage.getItem('token').then((token) => {
      if (token) {
        navigation.navigate('Account', {
          screen: 'UserAccount',
          params: { token },
        });
      } else {
        navigation.navigate('Account', { screen: 'AccountAuth' });
      }
    });
  });
  return (
    <View style={{ flex: 1 }}>
      <ActivityIndicator size='large' />
    </View>
  );
}

export default function Account(props) {
  return (
    <Stack.Navigator
      screenOptions={{ gestureEnabled: false, headerLeft: false }}
    >
      <Stack.Screen
        name='AccountRoot'
        component={AccountScreen}
        options={{ title: 'Account' }}
      />
      <Stack.Screen name='AccountAuth' component={AuthView} />
      <Stack.Screen name='UserAccount' component={UserAccount} />
      <Stack.Screen name='ManageProduct' component={ManageProduct} />
    </Stack.Navigator>
  );
}
