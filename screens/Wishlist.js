import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function WishlistScreen() {
  return <View></View>;
}

export default function Wishlist(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Wishlist'>
        {() => <WishlistScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
