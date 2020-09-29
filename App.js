import React from 'react';
import { StatusBar } from 'react-native';

// Redux
import { Provider } from 'react-redux';
import configStore from './store';
const store = configStore();

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Icons
import { Feather as Icon } from '@expo/vector-icons';

import Home from './screens/Home';
import Categories from './screens/Categories';
import Cart from './screens/Cart';
import Wishlist from './screens/Wishlist';
import Account from './screens/Account';

StatusBar.setBarStyle('dark-content');

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#000',
          inactiveTintColor: '#a4b0be',
        }}
      >
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name='home' color={color} size={size} />
            ),
          }}
          name='Home'
          component={Home}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name='menu' color={color} size={size} />
            ),
          }}
          name='Categories'
          component={Categories}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name='shopping-bag' color={color} size={size} />
            ),
          }}
          name='Bag'
          component={Cart}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name='heart' color={color} size={size} />
            ),
          }}
          name='Wishlist'
          component={Wishlist}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name='user' color={color} size={size} />
            ),
          }}
          name='Account'
          component={Account}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
