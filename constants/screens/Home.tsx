/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import colors from '../components/colors';

const Home = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <FontAwesome name="search" size={24} color={colors.gray} style={{ marginLeft: 15 }} />
      ),
      headerRight: () => (
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&w=800',
          }}
          style={{
            width: 40,
            height: 40,
            marginRight: 15,
            borderRadius: 100,
          }}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/2194261/pexels-photo-2194261.jpeg?auto=compress&cs=tinysrgb&w=800',
          }}
          style={{
            width: 500,
            height: 500,
            borderRadius: 50,
          }}
        />
      </View>

      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Chat')} style={styles.chatButton}>
          <Entypo name="chat" size={24} color={colors.lightGray} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
  },
  chatButton: {
    backgroundColor: colors.primary,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    marginRight: 20,
    marginBottom: 50,
  },
});
