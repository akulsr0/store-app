import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function AccountScreen() {
  return <View></View>;
}

export default function Account(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Account'>
        {() => <AccountScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
