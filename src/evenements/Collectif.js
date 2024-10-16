/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useTransition} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import type from '../type.json';
import players from '../players.json';
import CheckBox from 'react-native-check-box';
import {useTranslation} from 'react-i18next';
import MultiSelect from 'react-native-multiple-select';

export default function Personelle() {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    titre: '',
    type: '',
    date_debut: new Date(),
    date_fin: new Date(),
    joueurs_id: '',
    see: 2,
    sub_id: 231,
    // types: type_formation.map(f => ({
    //   type: f.type,
    //   lieu: null,
    //   note: null,
    //   value: null,
    //   color: f.color,
    //   value_autre: null,
    //   isOther: false,
    // })),
  });
  const [showDatePicker1, setShowDatePicker1] = useState(false);
  const [showDatePicker2, setShowDatePicker2] = useState(false);
  const [typeOptions, setTypeOption] = useState([]);

  const handleInputChange = (
    field,
    value,
    index = null,
    isOtherValue = false,
  ) => {
    if (index !== null) {
      const updatedTypes = formData.types.map((item, idx) => {
        if (idx === index) {
          if (isOtherValue) {
            return {...item, value_autre: value};
          } else {
            const isOtherSelected = value === 'other';
            return {...item, [field]: value, isOther: isOtherSelected};
          }
        }
        return item;
      });
      setFormData({...formData, types: updatedTypes});
    } else {
      setFormData({...formData, [field]: value});
    }
  };

  useEffect(() => {
    const fetchLeagueData = async () => {
      try {
        const data = await new Promise(resolve => {
          setTimeout(() => {
            resolve(type);
          }, 1000);
        });
        setTypeOption(data);
      } catch (error) {
        console.error('Error fetching leagues data:', error);
      }
    };

    fetchLeagueData();
  }, []);

  const handleDateChange = (event, selectedDate, dateType) => {
    if (event.type === 'set') {
      const currentDate = selectedDate || formData[dateType];
      setFormData({...formData, [dateType]: currentDate});

      if (dateType === 'date_debut') {
        setShowDatePicker1(false);
      } else if (dateType === 'date_fin') {
        setShowDatePicker2(false);
      }
    } else if (event.type === 'dismissed') {
      if (dateType === 'date_debut') {
        setShowDatePicker1(false);
      } else if (dateType === 'date_fin') {
        setShowDatePicker2(false);
      }
    }
  };

  const handleSubmit = () => {
    console.log(JSON.stringify(formData, null, 2));

    Alert.alert('Form Submitted!');
    // setTimeout(() => {
    //   navigation.navigate('Evenement');
    // }, 10);
  };
  const [isChecked, setIsChecked] = useState(false);
  const [checkBoxStatus, setCheckBoxStatus] = useState({
    allPlayers: false,
    somePlayers: false,
  });

  const [playerState, setPlayerState] = useState([]);
  useEffect(() => {
    const fetchThematiqueData = async () => {
      try {
        const data = await new Promise(resolve => {
          setTimeout(() => {
            resolve(players);
          }, 1000);
        });
        setPlayerState(data);
      } catch (error) {
        console.error('Error fetching pole data:', error);
      }
    };

    fetchThematiqueData();
  }, []);

  const onSelectedItemsChange = selectedItems => {
    const joueursId = selectedItems.join(',');
    setFormData(prevState => ({
      ...prevState,
      joueurs_id: joueursId,
    }));
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.row}>
          <FontAwesome name="user-circle" size={28} style={styles.icon} />
          <Text style={styles.text}>{t('COLLECTIVE')}</Text>
        </View>

        <Text style={styles.label}>{`${t('TITLE_OF_EVENT')}*`}</Text>

        <View style={styles.planContainer}>
          <Icon name="chevron-right" size={25} style={styles.icon} />

          <TextInput
            placeholder={`${t('TITLE_OF_EVENT')}...`}
            multiline
            numberOfLines={2}
            style={styles.textPlan}
            value={formData.titre}
            onChangeText={text => setFormData({...formData, titre: text})}
          />
        </View>

        <Text style={styles.label}>{`${t('TYPE')}*`}</Text>
        <View style={styles.inputContainer}>
          <Icon name="bookmark" size={25} style={styles.icon} />
          <Picker
            style={styles.picker}
            selectedValue={formData.type}
            onValueChange={itemValue => handleInputChange('type', itemValue)}>
            {typeOptions.map(ty => (
              <Picker.Item
                style={styles.textPicker}
                label={ty.name}
                value={ty.name}
                key={ty.id}
              />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>{t('START_DATE')}</Text>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowDatePicker1(true)}>
          <Icon2 name="calendar-start" size={25} style={styles.icon} />
          <Text style={styles.dateInput}>
            {formData.date_debut.toDateString()}
          </Text>
        </TouchableOpacity>

        {showDatePicker1 && (
          <DateTimePicker
            testID="dateTimePicker1"
            value={formData.date_debut}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setShowDatePicker1(false);
              handleDateChange(event, date, 'date_debut');
            }}
          />
        )}
        <View style={styles.checkBoxContainer}>
          <Text style={styles.checkBoxLabel}>{t('END_DATE')}</Text>
          <CheckBox
            onClick={() => setIsChecked(!isChecked)}
            isChecked={isChecked}
            style={styles.checkBox}
          />
        </View>

        {isChecked && (
          <>
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker2(true)}>
              <Icon2 name="calendar-end" size={25} style={styles.icon} />
              <Text style={styles.dateInput}>
                {formData.date_fin.toDateString()}
              </Text>
            </TouchableOpacity>
            {showDatePicker2 && (
              <DateTimePicker
                testID="dateTimePicker2"
                value={formData.date_fin}
                mode="date"
                display="default"
                onChange={(event, date) => {
                  setShowDatePicker2(false);
                  handleDateChange(event, date, 'date_fin');
                }}
              />
            )}
          </>
        )}

        <Text style={styles.label}>{t('SELECT_PLAYERS')}</Text>

        <View style={[styles.checkBoxContainer, styles.planContainer]}>
          <CheckBox
            onClick={() =>
              setCheckBoxStatus({allPlayers: false, somePlayers: true})
            }
            isChecked={checkBoxStatus.somePlayers}
            style={styles.checkBox}
          />

          <Icon1 name="people-circle-sharp" size={30} color="#000000" />
          <Text style={styles.checkBoxLabel}> {t('INFORM_ALL_PLAYERS')}</Text>
        </View>

        <View style={[styles.checkBoxContainer, styles.planContainer]}>
          <CheckBox
            onClick={() =>
              setCheckBoxStatus({allPlayers: true, somePlayers: false})
            }
            isChecked={checkBoxStatus.allPlayers}
            style={styles.checkBox}
          />
          <Icon1 name="people-circle-sharp" size={30} color="#000000" />
          <Text style={styles.checkBoxLabel}>{t('INFORM_SOME_PLAYERS')}</Text>
        </View>

        {checkBoxStatus.somePlayers && (
          <>
            <View style={styles.planContainerMulti}>
              <MultiSelect
                hideTags
                items={playerState}
                uniqueKey="id"
                onSelectedItemsChange={onSelectedItemsChange}
                selectedItems={formData.joueurs_id.split(',')}
                selectText="Pick Players"
                searchInputPlaceholderText="Search Players..."
                submitButtonText="Submit"
                styleListContainer={{backgroundColor: '#ffffff'}}
                styleItemContainer={{padding: 10}}
                styleTextItem={{
                  color: '#333',
                  fontSize: 16,
                  fontFamily: 'Poppins-Bold',
                }}
                styleDropdownMenu={{fontFamily: 'Poppins-Bold', color: '#333'}}
                styleSearchInput={{
                  borderWidth: 1,
                  borderColor: '#ddd',
                  borderRadius: 5,
                  padding: 8,
                  fontFamily: 'Poppins-Bold',
                }}
                styleSubmitButtonText={{
                  color: '#ffffff',
                  fontFamily: 'Poppins-Bold',
                }}
                submitButtonColor="#0bca0b"
              />
            </View>
          </>
        )}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkBoxLabel: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#333',
  },
  checkBox: {
    marginBottom: 4,
  },
  // icon: {
  //   marginHorizontal: 10,
  // },

  searchInput: {
    height: 45,
    fontFamily: 'Poppins-Regular',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
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
    padding: 20,
    backgroundColor: '#eaf9f0b4',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 15,
    color: 'black',
    fontFamily: 'Poppins-Bold',
  },
  buttonCollapse: {
    fontSize: 16,
    padding: 10,
    textAlign: 'left',
    borderRadius: 5,
    fontFamily: 'Poppins-Bold',
    flexDirection: 'row',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 15,
    padding: 2,
    fontFamily: 'Poppins-Bold',
    textAlign: 'left',
    marginLeft: 15,
  },

  textPicker: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    color: 'black',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#11b239',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },

  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#CCC',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  picker: {
    flex: 1,
    height: 50,
    color: '#000',
  },
  icon: {
    marginRight: 10,
    color: '#0e9b49',
  },

  collapsibleContent: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#d4f9e3d7',
  },

  textCollapse: {
    backgroundColor: 'white',
    color: 'black',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    flex: 1,
    width: '100%',
  },

  labelCollapse: {
    fontSize: 15,
    marginBottom: 5,
    marginTop: 5,
    color: 'black',
    fontFamily: 'Poppins-Bold',
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  planContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#CCC',
    borderWidth: 1,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  planContainerMulti: {
    // display: 'flex',
    // flexDirection: 'row',
    // height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#CCC',
    borderWidth: 1,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    // alignItems: 'center',
  },
  planContainerNote: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#CCC',
    borderWidth: 1,
    height: 80,
    maxHeight: 300,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  planContainerCola: {
    display: 'flex',
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#CCC',
    borderWidth: 1,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  halfWidth: {
    width: '50%',
  },
  fullWidth: {
    width: '100%',
  },

  textPlan: {
    fontFamily: 'Poppins-Regular',
    flex: 1,
    height: '100%',
    paddingHorizontal: 5,
  },

  datePickerButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#CCC',
    borderWidth: 1,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    justifyContent: 'space-between',
  },
  dateInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#000',
    paddingLeft: 10,
  },
});
