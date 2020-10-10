import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

import axios from 'axios';
import { api } from '../../utils/default';

import AsyncStorage from '@react-native-community/async-storage';
import { Feather as Icon } from '@expo/vector-icons';

export default function AuthView({ navigation }) {
  const [view, setView] = useState('login');
  const [showPassword, setShowPassword] = useState(false);

  const [logEmail, setLogEmail] = useState('');
  const [logPassword, setLogPassword] = useState('');

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  navigation.setOptions({
    headerTitle: view === 'login' ? 'Login' : 'Register',
  });

  async function loginUser(email, password) {
    try {
      if (email === '' || password === '') {
        return Alert.alert('Enter all fields');
      }
      const url = `${api}/auth/login`;
      const body = JSON.stringify({ email, password });
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const { data } = await axios.post(url, body, config);
      if (data.success) {
        await AsyncStorage.setItem('token', data.token);
        navigation.navigate('Account', {
          screen: 'UserAccount',
          params: { token: data.token },
        });
      } else {
        Alert.alert(data.msg);
      }
    } catch (err) {
      Alert.alert(err.message);
    }
  }

  async function registerUser(name, email, password) {
    try {
      if (name === '' || email === '' || password === '') {
        return Alert.alert('Enter all fields');
      }
      const url = `${api}/auth/register`;
      const body = JSON.stringify({ name, email, password });
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const { data } = await axios.post(url, body, config);
      Alert.alert(data.msg);
    } catch (err) {
      Alert.alert(err.message);
    }
  }

  if (view === 'login') {
    return (
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={{ marginTop: 10, fontSize: 20, fontWeight: 'bold' }}>
          Login
        </Text>
        <TextInput
          style={{
            height: 40,
            backgroundColor: '#fbfbfb',
            marginTop: 14,
            paddingHorizontal: 10,
          }}
          defaultValue={''}
          placeholder={'Email'}
          textContentType='emailAddress'
          keyboardType='email-address'
          autoCapitalize='none'
          onChangeText={(text) => setLogEmail(text)}
        />
        <View
          style={{
            height: 40,
            backgroundColor: '#fbfbfb',
            marginTop: 8,
            paddingHorizontal: 10,
            flexDirection: 'row',
          }}
        >
          <TextInput
            style={{ flex: 1 }}
            secureTextEntry={!showPassword}
            defaultValue={''}
            placeholder={'Password'}
            textContentType='password'
            keyboardType='visible-password'
            onChangeText={(text) => setLogPassword(text)}
          />
          <TouchableOpacity
            style={{ justifyContent: 'center' }}
            onPress={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <Icon name='eye-off' size={22} />
            ) : (
              <Icon name='eye' size={22} />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            height: 40,
            backgroundColor: '#222',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
          }}
          onPress={async () => await loginUser(logEmail, logPassword)}
        >
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 18,
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity onPress={() => setView('signup')}>
            <Text style={{ fontSize: 16 }}>Create an account?</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={{ marginTop: 10, fontSize: 20, fontWeight: 'bold' }}>
          Sign Up
        </Text>
        <TextInput
          style={{
            height: 40,
            backgroundColor: '#fbfbfb',
            marginTop: 14,
            paddingHorizontal: 10,
          }}
          placeholder={'Name'}
          onChangeText={(text) => setRegName(text)}
        />
        <TextInput
          style={{
            height: 40,
            backgroundColor: '#fbfbfb',
            marginTop: 8,
            paddingHorizontal: 10,
          }}
          placeholder={'Email'}
          textContentType='emailAddress'
          keyboardType='email-address'
          autoCapitalize='none'
          onChangeText={(text) => setRegEmail(text)}
        />
        <View
          style={{
            height: 40,
            backgroundColor: '#fbfbfb',
            marginTop: 8,
            paddingHorizontal: 10,
            flexDirection: 'row',
          }}
        >
          <TextInput
            style={{ flex: 1 }}
            secureTextEntry={!showPassword}
            placeholder={'Password'}
            textContentType='password'
            keyboardType='visible-password'
            onChangeText={(text) => setRegPassword(text)}
          />
          <TouchableOpacity
            style={{ justifyContent: 'center' }}
            onPress={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <Icon name='eye-off' size={22} />
            ) : (
              <Icon name='eye' size={22} />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            height: 40,
            backgroundColor: '#222',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
          }}
          onPress={async () =>
            await registerUser(regName, regEmail, regPassword)
          }
        >
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 18,
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity onPress={() => setView('login')}>
            <Text style={{ fontSize: 16 }}>Already have an account?</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

console.disableYellowBox = true;
