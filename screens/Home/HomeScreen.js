import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { api } from '../../utils/default';
import Axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';

function FeaturedProducts({ featuredProducts }) {
  return (
    <View>
      <Text
        style={{
          fontWeight: '700',
          fontSize: 20,
          margin: 10,
        }}
      >
        Featured Products:
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {featuredProducts.map((fp, index) => (
          <View
            style={{
              backgroundColor: '#fbfbfb',
              width: 160,
              overflow: 'hidden',
              marginRight: 14,
              marginLeft: index === 0 ? 10 : 0,
            }}
          >
            <Image
              source={{ uri: fp.images[0] }}
              style={{ width: '100%', height: 150 }}
            />
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                marginTop: 4,
                fontWeight: '500',
              }}
            >
              {fp.title}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 8,
                paddingHorizontal: 10,
              }}
            >
              <Text style={{ fontWeight: '500' }}>
                ₹{fp.price.currentPrice}
              </Text>
              <Text
                style={{
                  marginLeft: 4,
                  textDecorationLine: 'line-through',
                  fontWeight: '300',
                }}
              >
                ₹{fp.price.actualPrice}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: '#333',
                paddingVertical: 8,
                alignItems: 'center',
                marginTop: 6,
              }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                Add to Cart
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function GenderBlocks() {
  return (
    <View>
      {/* Men Clothing */}
      <TouchableOpacity
        style={{ flex: 1, backgroundColor: '#fff', marginTop: 20 }}
      >
        <Image
          style={{ width: '100%', height: 180, resizeMode: 'cover' }}
          source={{
            uri:
              'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80',
          }}
        />
        <Text
          style={{
            position: 'absolute',
            bottom: 10,
            left: 10,
            fontWeight: 'bold',
          }}
        >
          Men's Section
        </Text>
      </TouchableOpacity>
      {/* Women Clothing */}
      <TouchableOpacity style={{ marginTop: 10 }}>
        <Image
          style={{ width: '100%', height: 180 }}
          source={{
            uri:
              'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80',
          }}
        />
        <Text
          style={{
            position: 'absolute',
            bottom: 10,
            left: 10,
            fontWeight: 'bold',
          }}
        >
          Women's Clothing
        </Text>
      </TouchableOpacity>
      {/* Kids Clothing */}
      <TouchableOpacity style={{ marginTop: 10 }}>
        <Image
          style={{ width: '100%', height: 180 }}
          source={{
            uri:
              'https://images.unsplash.com/photo-1530304027019-6bd0e056c223?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
          }}
        />
        <Text
          style={{
            position: 'absolute',
            bottom: 10,
            left: 10,
            fontWeight: 'bold',
          }}
        >
          Kids Clothing
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default function HomeScreen() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  function getDataFromApi() {
    Axios.get(`${api}/product/all`).then(({ data }) => {
      setFeaturedProducts(data.filter((p) => p.isFeatured));
    });
  }

  useEffect(() => {
    getDataFromApi();
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        {/* Featured Products */}
        <FeaturedProducts featuredProducts={featuredProducts} />
        {/* Gender Blocks */}
        <GenderBlocks />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
