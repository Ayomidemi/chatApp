/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useLayoutEffect, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { collection, addDoc, orderBy, query, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

import { GiftedChat } from 'react-native-gifted-chat';
import { auth, db } from '../config/firebase';
import { AntDesign } from '@expo/vector-icons';

import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import colors from '../components/colors';

const Chat = () => {
  const [messages, setMessages] = useState<any>([]);
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const onSignOut = () => {
    signOut(auth).catch((error) => console.log('Error logging out: ', error));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10,
          }}
          onPress={onSignOut}
        >
          <AntDesign name="logout" size={24} color={colors.gray} style={{ marginRight: 10 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useLayoutEffect(() => {
    const collectionRef = collection(db, 'chats');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log('querySnapshot unsusbscribe');
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        })),
      );
    });
    return unsubscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages: never[] | undefined) =>
      GiftedChat.append(previousMessages, messages),
    );
    // setMessages([...messages, ...messages]);
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(db, 'chats'), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={false}
      showUserAvatar={false}
      isTyping={true}
      onSend={(messages: any) => onSend(messages)}
      messagesContainerStyle={{
        backgroundColor: '#fff',
      }}
      user={{
        _id: auth?.currentUser?.email as string | number,
        avatar:
          'https://images.pexels.com/photos/127028/pexels-photo-127028.jpeg?auto=compress&cs=tinysrgb&w=800',
      }}
    />
  );
};

export default Chat;
