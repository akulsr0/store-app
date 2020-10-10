import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  ScrollView,
  Clipboard,
} from 'react-native';
import { Feather as Icon, FontAwesome as FAIcon } from '@expo/vector-icons';

import Category from '../../utils/categories';
import { api } from '../../utils/default';
import { Picker } from '@react-native-community/picker';
import { useNavigation } from '@react-navigation/native';
import Axios from 'axios';

function AddProduct() {
  const navigation = useNavigation();

  const [title, setTitle] = useState(null);
  const [actualPrice, setActualPrice] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [images, setImages] = useState(null);
  const [shortDescription, setShortDescription] = useState(null);
  const [longDescription, setLongDescription] = useState(null);
  const [category, setCategory] = useState(null);

  async function addProduct() {
    const url = `${api}/product/add-product`;
    const bodyObj = {
      title,
      actualPrice,
      currentPrice,
      category,
      shortDescription,
      longDescription,
      images,
    };
    const body = JSON.stringify(bodyObj);
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const { data } = await Axios.post(url, body, config);
    if (data.success) {
      Alert.alert('Added Successfully');
    }
  }

  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity
        style={{ paddingHorizontal: 6 }}
        onPress={() => {
          if (
            title === null ||
            actualPrice === null ||
            currentPrice === null ||
            images === null ||
            shortDescription === null ||
            longDescription === null ||
            category === null
          ) {
            Alert.alert('Enter all fields');
          } else {
            addProduct();
          }
        }}
      >
        <Icon name='check' size={26} />
      </TouchableOpacity>
    ),
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Add Product</Text>
        <TextInput
          style={{
            height: 40,
            backgroundColor: '#fbfbfb',
            marginTop: 14,
            paddingHorizontal: 10,
          }}
          placeholder={'Title'}
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          style={{
            height: 40,
            backgroundColor: '#fbfbfb',
            marginTop: 14,
            paddingHorizontal: 10,
          }}
          placeholder={'Actual Price'}
          keyboardType='numeric'
          onChangeText={(text) => setActualPrice(text)}
        />
        <TextInput
          style={{
            height: 40,
            backgroundColor: '#fbfbfb',
            marginTop: 14,
            paddingHorizontal: 10,
          }}
          placeholder={'Current Price'}
          keyboardType='numeric'
          onChangeText={(text) => setCurrentPrice(text)}
        />
        <TextInput
          style={{
            height: 100,
            backgroundColor: '#fbfbfb',
            marginTop: 14,
            paddingHorizontal: 10,
            textAlignVertical: 'top',
          }}
          placeholder={'Image URLs (comma seperated)'}
          multiline
          onChangeText={(text) => setImages(text)}
        />
        <TextInput
          style={{
            height: 40,
            backgroundColor: '#fbfbfb',
            marginTop: 14,
            paddingHorizontal: 10,
          }}
          placeholder={'Short Description'}
          onChangeText={(text) => setShortDescription(text)}
        />
        <TextInput
          style={{
            height: 140,
            backgroundColor: '#fbfbfb',
            marginTop: 14,
            paddingHorizontal: 10,
            textAlignVertical: 'top',
          }}
          placeholder={'Long Description'}
          multiline
          onChangeText={(text) => setLongDescription(text)}
        />
        <View style={{ marginTop: 14, height: 300 }}>
          <Text>Category</Text>
          <Picker
            selectedValue={category}
            style={{ height: 50, width: '100%' }}
            onValueChange={(itemValue, itemIndex) => {
              setCategory(itemValue);
            }}
          >
            <Picker.Item label={'Select'} value={null} />
            {Category.map((c) => (
              <Picker.Item label={c} value={c} />
            ))}
          </Picker>
        </View>
      </View>
    </ScrollView>
  );
}

function AddFeaturedProduct() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Featured Product</Text>
    </View>
  );
}

function EditProduct() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    Axios.get(`${api}/product/all`).then(({ data }) => {
      setProducts(data);
      setFilteredProducts(data);
    });
  }, []);

  const Rating = ({ rating, maxRating }) => {
    return (
      <View style={{ flexDirection: 'row' }}>
        {Array(rating)
          .fill(1)
          .map((el) => (
            <FAIcon name='star' size={20} color='#2e2e2e' />
          ))}
        {Array(maxRating - rating)
          .fill(1)
          .map((el) => (
            <FAIcon name='star-o' size={20} color='#2e2e2e' />
          ))}
      </View>
    );
  };

  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      <View style={{ ...styles.container, paddingHorizontal: 0 }}>
        <Text style={{ ...styles.title, paddingHorizontal: 10 }}>
          Edit Product
        </Text>
        <TextInput
          style={{
            height: 40,
            backgroundColor: '#fbfbfb',
            marginTop: 12,
            paddingHorizontal: 10,
          }}
          placeholder='Search Product'
          onChangeText={(text) => {
            if (text === '') {
              setFilteredProducts(products);
            } else {
              setFilteredProducts(
                products.filter((p) =>
                  p.title.toLowerCase().startsWith(text.toLowerCase())
                )
              );
            }
          }}
        />
        {filteredProducts.map((p) => (
          <TouchableOpacity
            style={{
              backgroundColor: '#fafafa',
              marginTop: 10,
              paddingHorizontal: 8,
              paddingVertical: 10,
              flexDirection: 'row',
            }}
          >
            <Image
              style={{ width: 100, height: 100 }}
              source={{ uri: p.images[0] }}
            />
            <View style={{ paddingHorizontal: 10 }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                }}
              >
                {p.title}
              </Text>
              <Text style={{ marginTop: 4 }}>
                {`Id: ${p._id}`}
                <TouchableOpacity
                  style={{ paddingHorizontal: 10 }}
                  onPress={() => {
                    Clipboard.setString(p._id);
                  }}
                >
                  <Icon name='copy' />
                </TouchableOpacity>
              </Text>
              <View style={{ marginTop: 4 }}>
                <Rating
                  rating={
                    p.rating.ratings.length > 0
                      ? Math.floor(
                          p.rating.ratings.reduce((acc, val) => acc + val) /
                            p.rating.ratings.length
                        )
                      : 0
                  }
                  maxRating={5}
                />
              </View>
              <View style={{ marginTop: 6, flexDirection: 'row' }}>
                <Text style={{ textDecorationLine: 'line-through' }}>
                  ₹{p.price.actualPrice}
                </Text>
                <Text style={{ fontWeight: 'bold', marginLeft: 8 }}>
                  ₹{p.price.currentPrice}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

function DeleteProduct() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delete Product</Text>
    </View>
  );
}

export default function ManageProduct({ route }) {
  const navigation = useNavigation();
  navigation.setOptions({
    headerLeft: () => (
      <TouchableOpacity
        style={{ paddingHorizontal: 4 }}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Icon name='chevron-left' size={26} />
      </TouchableOpacity>
    ),
  });

  let action = route.params.action;
  switch (action) {
    case 'ADD_PRODUCT':
      navigation.setOptions({ headerTitle: 'Add Product' });
      return <AddProduct />;
    case 'ADD_FEATURED_PRODUCT':
      navigation.setOptions({ headerTitle: 'Add Featured Product' });
      return <AddFeaturedProduct />;
    case 'EDIT_PRODUCT':
      navigation.setOptions({ headerTitle: 'Edit Product' });
      return <EditProduct />;
    case 'DELETE_PRODUCT':
      navigation.setOptions({ headerTitle: 'Delete Product' });
      return <DeleteProduct />;
    default:
      return <></>;
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
