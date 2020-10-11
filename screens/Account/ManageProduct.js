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
  const navigation = useNavigation();
  const [pid, setPID] = useState(null);
  const [product, setProduct] = useState(null);
  const [seeFullDescription, setSeeFullDescription] = useState(false);

  async function addFeaturedProduct() {
    setProduct(null);
    const url = `${api}/product/${pid}`;
    const { data } = await Axios.get(url);
    setProduct(data.product);
    if (data.success) {
      Alert.alert(
        `Add Featured Product`,
        `Are you sure you want to add ${data.product.title} as Featured Product?`,
        [
          { text: 'No' },
          {
            text: 'Yes',
            onPress: async () => {
              const url = `${api}/product/${pid}/edit`;
              const bodyObj = { ...product, isFeatured: true };
              const body = JSON.stringify(bodyObj);
              const config = {
                headers: {
                  'Content-type': 'application/json',
                },
              };
              const { data } = await Axios.post(url, body, config);
              if (data.success) {
                Alert.alert('Added to Featured Products');
              }
            },
          },
        ]
      );
    }
  }

  async function searchProduct() {
    setProduct(null);
    const url = `${api}/product/${pid}`;
    const { data } = await Axios.get(url);
    if (data.success) {
      setProduct(data.product);
    }
  }

  navigation.setOptions({
    headerRight: () =>
      pid ? (
        <TouchableOpacity
          style={{ paddingHorizontal: 10 }}
          onPress={addFeaturedProduct}
        >
          <Icon name='check' size={24} />
        </TouchableOpacity>
      ) : null,
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Add Featured Product</Text>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <View
            style={{
              backgroundColor: '#fbfbfb',
              justifyContent: 'center',
              paddingLeft: 8,
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>ID:</Text>
          </View>
          <TextInput
            style={{ ...styles.input, flex: 1 }}
            onChangeText={(text) => setPID(text)}
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#333',
              paddingHorizontal: 14,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={searchProduct}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Search</Text>
          </TouchableOpacity>
        </View>
        {product ? (
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              {product.title}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {product.images.map((img) => (
                <View style={{ marginRight: 10, marginTop: 10 }}>
                  <Image
                    source={{ uri: img }}
                    style={{ width: 200, height: 200 }}
                  />
                </View>
              ))}
            </ScrollView>
            <Text style={{ marginTop: 10, fontWeight: 'bold' }}>
              Product Id:
              <Text selectable style={{ fontWeight: '400', fontSize: 16 }}>
                {` ${product._id}`}
              </Text>
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: '500' }}>
                ₹{product.price.currentPrice}
              </Text>
              <Text
                style={{
                  textDecorationLine: 'line-through',
                  fontSize: 16,
                  marginLeft: 6,
                  fontWeight: '300',
                }}
              >
                ₹{product.price.actualPrice}
              </Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottomWidth: 1,
                }}
                onPress={() => setSeeFullDescription((prev) => !prev)}
              >
                <Text style={{ fontSize: 18 }}>Product Description</Text>
                <TouchableOpacity
                  onPress={() => setSeeFullDescription((prev) => !prev)}
                >
                  {seeFullDescription ? (
                    <Icon name='chevron-up' size={26} />
                  ) : (
                    <Icon name='chevron-down' size={26} />
                  )}
                </TouchableOpacity>
              </TouchableOpacity>
              {seeFullDescription ? (
                <Text style={{ marginTop: 10 }}>
                  {product.description.long}
                </Text>
              ) : (
                <Text style={{ marginTop: 10 }}>
                  {product.description.short}
                </Text>
              )}
            </View>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

function RemoveFeaturedProduct() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [filteredFeaturedProducts, setFilteredFeaturedProducts] = useState([]);

  useEffect(() => {
    Axios.get(`${api}/product/featured/all`).then(({ data }) => {
      if (data.success) {
        setFeaturedProducts(data.products);
        setFilteredFeaturedProducts(data.products);
      }
    });
  }, []);

  async function removeFeaturedProduct(product) {
    Alert.alert(
      `Remove Featured Product`,
      `Are you sure you want to remove ${product.title} as Featured Product?`,
      [
        { text: 'No' },
        {
          text: 'Yes',
          onPress: async () => {
            const url = `${api}/product/${product._id}/edit`;
            const bodyObj = { ...product, isFeatured: false };
            const body = JSON.stringify(bodyObj);
            const config = {
              headers: {
                'Content-type': 'application/json',
              },
            };
            const { data } = await Axios.post(url, body, config);
            if (data.success) {
              setFilteredFeaturedProducts(
                filteredFeaturedProducts.filter((p) => p._id !== product._id)
              );
              Alert.alert('Removed from Featured Products');
            }
          },
        },
      ]
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Remove Featured Product</Text>
        <View>
          <TextInput
            style={{ ...styles.input, marginTop: 10 }}
            placeholder='Search'
            onChangeText={(text) => {
              setFilteredFeaturedProducts(
                featuredProducts.filter((p) =>
                  p.title.toLowerCase().startsWith(text.toLowerCase())
                )
              );
            }}
          />
        </View>
        {filteredFeaturedProducts.map((p) => (
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
              <View style={{ marginTop: 6, flexDirection: 'row' }}>
                <Text style={{ textDecorationLine: 'line-through' }}>
                  ₹{p.price.actualPrice}
                </Text>
                <Text style={{ fontWeight: 'bold', marginLeft: 8 }}>
                  ₹{p.price.currentPrice}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 6 }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#333',
                    paddingHorizontal: 6,
                    paddingVertical: 4,
                    borderRadius: 2,
                  }}
                  onPress={async () => {
                    await removeFeaturedProduct(p);
                  }}
                >
                  <Icon name='delete' size={16} color='#fff' />
                  <Text style={{ marginLeft: 6, fontSize: 16, color: '#fff' }}>
                    Remove
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

function EditProductsScreen() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const navigation = useNavigation();

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
            onPress={() => {
              navigation.navigate('Account', {
                screen: 'ManageProduct',
                params: {
                  action: 'EDIT_PRODUCT',
                  product: p,
                },
              });
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

function EditProduct({ product }) {
  const [updatedProduct, setUpdatedProduct] = useState({ ...product });
  const [moreImages, setMoreImages] = useState(null);

  const navigation = useNavigation();

  async function editProduct() {
    const url = `${api}/product/${product._id}/edit`;
    let bodyObj;
    if (moreImages !== null) {
      const newImagesArray = moreImages.split(',').map((i) => i.trim());
      bodyObj = {
        ...updatedProduct,
        images: [...updatedProduct.images, ...newImagesArray],
      };
    } else {
      bodyObj = { ...updatedProduct };
    }
    const body = JSON.stringify(bodyObj);
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const { data } = await Axios.post(url, body, config);
    if (data.success) {
      navigation.navigate('Account', {
        screen: 'ManageProduct',
        params: {
          action: 'EDIT_PRODUCTS_SCREEN',
        },
      });
      Alert.alert('Saved');
    } else {
      Alert.alert("Something wen't wrong");
    }
  }

  navigation.setOptions({
    headerLeft: () => (
      <TouchableOpacity
        style={{ paddingHorizontal: 4 }}
        onPress={() => {
          navigation.navigate('Account', {
            screen: 'ManageProduct',
            params: {
              action: 'EDIT_PRODUCTS_SCREEN',
            },
          });
        }}
      >
        <Icon name='chevron-left' size={26} />
      </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity
        style={{ paddingHorizontal: 10 }}
        onPress={() => {
          editProduct();
        }}
      >
        <Icon name='check' size={24} />
      </TouchableOpacity>
    ),
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16, marginHorizontal: 6 }}>
          {'Product Id: '}
          <Text style={{ fontWeight: '400' }}>{product._id}</Text>
        </Text>
        <View
          style={{ paddingHorizontal: 6, marginTop: 20, paddingBottom: 20 }}
        >
          {/* Title */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Title:</Text>
            <TextInput
              style={{ ...styles.input, flex: 1, marginLeft: 6 }}
              defaultValue={updatedProduct.title}
              placeholder={'Title'}
              onChangeText={(text) =>
                setUpdatedProduct({ ...updatedProduct, title: text })
              }
            />
          </View>
          {/* Actual Price */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
              Actual Price:
            </Text>
            <TextInput
              style={{ ...styles.input, flex: 1, marginLeft: 6 }}
              defaultValue={JSON.stringify(product.price.actualPrice)}
              placeholder={'Actual Price'}
              keyboardType='numeric'
              onChangeText={(text) => {
                setUpdatedProduct({
                  ...updatedProduct,
                  price: {
                    actualPrice: text,
                    currentPrice: updatedProduct.price.currentPrice,
                  },
                });
              }}
            />
          </View>
          {/* Current Price */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
              Current Price:
            </Text>
            <TextInput
              style={{ ...styles.input, flex: 1, marginLeft: 6 }}
              defaultValue={JSON.stringify(product.price.currentPrice)}
              placeholder={'Current Price'}
              keyboardType='numeric'
              onChangeText={(text) => {
                setUpdatedProduct({
                  ...updatedProduct,
                  price: {
                    currentPrice: text,
                    actualPrice: updatedProduct.price.actualPrice,
                  },
                });
              }}
            />
          </View>
          {/* Images */}
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 10 }}>
            Images:
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}
            >
              {updatedProduct.images.map((img) => (
                <View style={{ marginRight: 10 }}>
                  <Image
                    style={{ width: 200, height: 200 }}
                    source={{ uri: img }}
                  />
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#fafafa',
                      paddingVertical: 6,
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      setUpdatedProduct({
                        ...updatedProduct,
                        images: updatedProduct.images.filter((i) => i !== img),
                      });
                    }}
                  >
                    <Icon name='trash-2' size={20} color='#333' />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
          <TextInput
            style={{
              ...styles.input,
              marginTop: 10,
              height: 100,
              textAlignVertical: 'top',
            }}
            multiline
            placeholder='Add More Images'
            onChangeText={(text) => setMoreImages(text)}
          />
          {/* Description */}
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 10 }}>
            Short Description:
          </Text>
          <TextInput
            style={{
              ...styles.input,
              marginTop: 6,
            }}
            defaultValue={product.description.short}
            placeholder='Short Description'
            onChangeText={(text) => {
              setUpdatedProduct({
                ...updatedProduct,
                description: {
                  short: text,
                  long: updatedProduct.description.long,
                },
              });
            }}
          />
          {/* Long Description */}
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 10 }}>
            Long Description:
          </Text>
          <TextInput
            style={{
              ...styles.input,
              marginTop: 10,
              height: 200,
              textAlignVertical: 'top',
            }}
            defaultValue={product.description.long}
            multiline
            placeholder='Long Description'
            onChangeText={(text) => {
              setUpdatedProduct({
                ...updatedProduct,
                description: {
                  long: text,
                  short: updatedProduct.description.short,
                },
              });
            }}
          />
          {/* Category */}
          <View style={{ height: 400, marginTop: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 10 }}>
              Category:
            </Text>
            <Picker
              selectedValue={updatedProduct.category}
              style={{ height: 50, width: '100%' }}
              onValueChange={(itemValue, itemIndex) => {
                setUpdatedProduct({
                  ...updatedProduct,
                  category: itemValue,
                });
              }}
            >
              {Category.map((c) => (
                <Picker.Item label={c} value={c} />
              ))}
            </Picker>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function DeleteProduct() {
  const navigation = useNavigation();
  const [pid, setPID] = useState(null);
  const [product, setProduct] = useState(null);
  const [seeFullDescription, setSeeFullDescription] = useState(false);

  async function removeProduct() {
    setProduct(null);
    const url = `${api}/product/${pid}`;
    const { data } = await Axios.get(url);
    setProduct(data.product);
    if (data.success) {
      Alert.alert(
        `Delete Product`,
        `Are you sure you want to delete ~ ${data.product.title}?`,
        [
          { text: 'No' },
          {
            text: 'Yes',
            onPress: async () => {
              const url = `${api}/product/${pid}/delete`;
              const { data } = await Axios.delete(url);
              if (data.success) {
                Alert.alert('Deleted');
                navigation.goBack();
              }
            },
          },
        ]
      );
    }
  }

  async function searchProduct() {
    setProduct(null);
    const url = `${api}/product/${pid}`;
    const { data } = await Axios.get(url);
    if (data.success) {
      setProduct(data.product);
    } else {
      Alert.alert('Invalid Product Id');
    }
  }

  navigation.setOptions({
    headerRight: () =>
      pid ? (
        <TouchableOpacity
          style={{ paddingHorizontal: 10 }}
          onPress={removeProduct}
        >
          <Icon name='check' size={24} />
        </TouchableOpacity>
      ) : null,
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Delete Product</Text>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <View
            style={{
              backgroundColor: '#fbfbfb',
              justifyContent: 'center',
              paddingLeft: 8,
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>ID:</Text>
          </View>
          <TextInput
            style={{ ...styles.input, flex: 1 }}
            onChangeText={(text) => setPID(text)}
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#333',
              paddingHorizontal: 14,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={searchProduct}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Search</Text>
          </TouchableOpacity>
        </View>
        {product ? (
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              {product.title}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {product.images.map((img) => (
                <View style={{ marginRight: 10, marginTop: 10 }}>
                  <Image
                    source={{ uri: img }}
                    style={{ width: 200, height: 200 }}
                  />
                </View>
              ))}
            </ScrollView>
            <Text style={{ marginTop: 10, fontWeight: 'bold' }}>
              Product Id:
              <Text selectable style={{ fontWeight: '400', fontSize: 16 }}>
                {` ${product._id}`}
              </Text>
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: '500' }}>
                ₹{product.price.currentPrice}
              </Text>
              <Text
                style={{
                  textDecorationLine: 'line-through',
                  fontSize: 16,
                  marginLeft: 6,
                  fontWeight: '300',
                }}
              >
                ₹{product.price.actualPrice}
              </Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottomWidth: 1,
                }}
                onPress={() => setSeeFullDescription((prev) => !prev)}
              >
                <Text style={{ fontSize: 18 }}>Product Description</Text>
                <TouchableOpacity
                  onPress={() => setSeeFullDescription((prev) => !prev)}
                >
                  {seeFullDescription ? (
                    <Icon name='chevron-up' size={26} />
                  ) : (
                    <Icon name='chevron-down' size={26} />
                  )}
                </TouchableOpacity>
              </TouchableOpacity>
              {seeFullDescription ? (
                <Text style={{ marginTop: 10 }}>
                  {product.description.long}
                </Text>
              ) : (
                <Text style={{ marginTop: 10 }}>
                  {product.description.short}
                </Text>
              )}
            </View>
          </View>
        ) : null}
      </View>
    </ScrollView>
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
    case 'REMOVE_FEATURED_PRODUCT':
      navigation.setOptions({ headerTitle: 'Remove Featured Product' });
      return <RemoveFeaturedProduct />;
    case 'EDIT_PRODUCTS_SCREEN':
      navigation.setOptions({ headerTitle: 'Edit Products' });
      return <EditProductsScreen />;
    case 'EDIT_PRODUCT':
      navigation.setOptions({ headerTitle: 'Edit Product' });
      return <EditProduct product={route.params.product} />;
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
  input: {
    height: 40,
    backgroundColor: '#fbfbfb',
    paddingHorizontal: 10,
  },
});
