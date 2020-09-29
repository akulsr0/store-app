import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function CartScreen() {
  return <View></View>;
}

export default function Cart(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Bag'>{() => <CartScreen {...props} />}</Stack.Screen>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
