import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Ionicons';

export default function EventNavigator() {
  const navigation = useNavigation();

  return (
    <View style={{padding: 20}}>
      <Text style={styles.text}>Ajouter un evenement :</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Personelle')}>
        <Icon name="user-circle" size={30} color="#ffffff" />
        <Text style={styles.buttonText}>Personelle</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Collectif')}>
        <Icon1 name="people-circle-sharp" size={30} color="#ffffff" />
        <Text style={styles.buttonText}>Collectif</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    marginBottom: 15,
    fontSize: 20,
    color: 'black',
    fontFamily: 'Poppins-Bold',
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
