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
import { Feather as Icon } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

function Admin() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
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
        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => {
            navigation.navigate('Account', {
              screen: 'ManageProduct',
              params: {
                action: 'VIEW_ORDERS',
              },
            });
          }}
        >
          <View
            style={{
              justifyContent: 'center',
              paddingRight: 14,
            }}
          >
            <Icon name='shopping-cart' size={26} />
          </View>
          <View>
            <Text style={styles.optionCardTitle}>View Orders</Text>
            <Text style={styles.optionCardSubtitle}>View all Orders</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => {
            navigation.navigate('Account', {
              screen: 'ManageProduct',
              params: {
                action: 'ADD_PRODUCT',
              },
            });
          }}
        >
          <View
            style={{
              justifyContent: 'center',
              paddingRight: 14,
            }}
          >
            <Icon name='plus' size={26} />
          </View>
          <View>
            <Text style={styles.optionCardTitle}>Add Product</Text>
            <Text style={styles.optionCardSubtitle}>Create a new Product</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => {
            navigation.navigate('Account', {
              screen: 'ManageProduct',
              params: {
                action: 'ADD_FEATURED_PRODUCT',
              },
            });
          }}
        >
          <View
            style={{
              justifyContent: 'center',
              paddingRight: 14,
            }}
          >
            <Icon name='plus-circle' size={26} />
          </View>
          <View>
            <Text style={styles.optionCardTitle}>Add Featured Product</Text>
            <Text style={styles.optionCardSubtitle}>
              Create a new featured Product
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => {
            navigation.navigate('Account', {
              screen: 'ManageProduct',
              params: {
                action: 'EDIT_PRODUCT',
              },
            });
          }}
        >
          <View
            style={{
              justifyContent: 'center',
              paddingRight: 14,
            }}
          >
            <Icon name='edit' size={26} />
          </View>
          <View>
            <Text style={styles.optionCardTitle}>Edit Product</Text>
            <Text style={styles.optionCardSubtitle}>
              Edit an existing Product
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => {
            navigation.navigate('Account', {
              screen: 'ManageProduct',
              params: {
                action: 'DELETE_PRODUCT',
              },
            });
          }}
        >
          <View
            style={{
              justifyContent: 'center',
              paddingRight: 14,
            }}
          >
            <Icon name='trash' size={26} />
          </View>
          <View>
            <Text style={styles.optionCardTitle}>Delete Product</Text>
            <Text style={styles.optionCardSubtitle}>
              Delete an existing Product
            </Text>
          </View>
        </TouchableOpacity>
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
    return <Admin />;
  }
  return (
    <View>
      <Text>{JSON.stringify(user)}</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  optionCard: {
    flexDirection: 'row',
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
