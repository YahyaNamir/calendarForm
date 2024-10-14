import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import {useTranslation} from 'react-i18next';

export default function EventNavigator() {
  const navigation = useNavigation();
  const {t} = useTranslation();

  return (
    <View style={{padding: 20}}>
      <View style={styles.row}>
        <Icon2 name="pluscircle" size={25} style={styles.icon} />
        <Text style={styles.text}>{t('ADD_EVENT')}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Personelle')}>
        <Icon name="user-circle" size={30} color="#ffffff" />
        <Text style={styles.buttonText}>{t('PERSONAL')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Collectif')}>
        <Icon1 name="people-circle-sharp" size={30} color="#ffffff" />
        <Text style={styles.buttonText}>{t('COLLECTIVE')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
    color: '#0e9b49',
  },
  text: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: 'black',
    textAlign: 'center',
    marginLeft: 15,
  },
  row: {
    padding: 10,
    marginBottom: 5,
    borderRadius: 3,
    shadowColor: '#19722b61',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  button: {
    backgroundColor: '#00a357',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontFamily: 'Poppins-Bold',
    marginLeft: 40,
  },
});
