import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function CategoriesScreen() {
  return <View></View>;
}

export default function Categories(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Categories'>
        {() => <CategoriesScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
