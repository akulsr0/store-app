import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { api } from '../../utils/default';
import Axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function HomeScreen() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  function getDataFromApi() {
    Axios.get(`${api}/product/featured/all`).then(({ data }) => {
      setFeaturedProducts(data.products);
    });
  }

  useEffect(() => {
    getDataFromApi();
  });

  return (
    <ScrollView>
      <View>
        {/* Featured Products */}
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
          <ScrollView horizontal>
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
