import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TextInput,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import axios from 'axios';
import { api } from '../../utils/default';

import AsyncStorage from '@react-native-community/async-storage';

export default function UserAccountView({ route, navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = route.params.token;
    const url = `${api}/auth/`;
    const body = JSON.stringify({ token });
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    axios.post(url, body, config).then((res) => {
      setUser(res.data.user);
      navigation.setOptions({
        headerTitle: res.data.user.name,
      });
    });
  }, []);

  if (!user) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }
  if (user.isAdmin) {
    return (
      <View style={{}}>
        <ScrollView
          style={{ marginTop: 10 }}
          showsVerticalScrollIndicator={false}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              paddingHorizontal: 10,
            }}
          >
            Admin Panel
          </Text>
          <View style={styles.optionCard}>
            <Text style={styles.optionCardTitle}>All Products</Text>
            <Text style={styles.optionCardSubtitle}>
              Manage all your products
            </Text>
          </View>
          <View style={styles.optionCard}>
            <Text style={styles.optionCardTitle}>All Products</Text>
            <Text style={styles.optionCardSubtitle}>
              Manage all your products
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#fafafa',
              alignItems: 'center',
              padding: 10,
              marginTop: 10,
            }}
            onPress={() => {
              AsyncStorage.removeItem('token');
              navigation.navigate('Account', { screen: 'AccountAuth' });
            }}
          >
            <Text>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
  return (
    <View>
      <Text>{JSON.stringify(user)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  optionCard: {
    backgroundColor: 'white',
    borderBottomColor: '#ced6e0',
    borderBottomWidth: 0.3,
    paddingHorizontal: 10,
    marginTop: 10,
    paddingVertical: 8,
  },
  optionCardTitle: {
    fontSize: 18,
  },
  optionCardSubtitle: {
    fontSize: 14,
    marginTop: 4,
    fontWeight: '300',
  },
});
