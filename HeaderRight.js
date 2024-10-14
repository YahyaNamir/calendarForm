import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';

const HeaderRight = () => {
  const {i18n} = useTranslation();
  const [activeLanguage, setActiveLanguage] = useState(i18n.language);

  const switchLanguage = lng => {
    i18n.changeLanguage(lng);
    setActiveLanguage(lng);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => switchLanguage('fr')}
        style={[styles.button, activeLanguage === 'fr' && styles.activeButton]}>
        <Text
          style={[styles.text, activeLanguage === 'fr' && styles.activeText]}>
          FR
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => switchLanguage('en')}
        style={[styles.button, activeLanguage === 'en' && styles.activeButton]}>
        <Text
          style={[styles.text, activeLanguage === 'en' && styles.activeText]}>
          EN
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginRight: 30,
  },
  button: {
    padding: 8,
    borderRadius: 3,
    backgroundColor: '#12ae2f',
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: '#ffffff',
  },
  text: {
    color: '#ffffff',
    fontFamily: 'Poppins-Bold',
  },
  activeText: {
    color: '#003366',
  },
});

export default HeaderRight;
