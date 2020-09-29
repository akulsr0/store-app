import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { addProduct } from '../actions/product';

const Stack = createStackNavigator();

function HomeScreen(props) {
  return <View></View>;
}

function Home(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Store'>
        {() => <HomeScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
const mapStateToProps = (state) => {
  return {
    products: state.products.products,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (product) => dispatch(addProduct(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
