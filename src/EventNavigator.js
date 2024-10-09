import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function EventNavigator() {
  const navigation = useNavigation();

  return (
    <View style={{padding: 20}}>
      <Text style={styles.text}>Evenement</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Collectif')}>
        <Text style={styles.buttonText}>Collectif</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Personelle')}>
        <Text style={styles.buttonText}>Personelle</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    // fontSize: 24,
    color: 'black',
    fontFamily: 'Poppins-Bold',
  },
  button: {
    backgroundColor: '#00a357',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
});
