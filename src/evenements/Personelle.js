/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import Collapsible from 'react-native-collapsible';
import thematique from '../thematique.json';
import type_formation from '../type_formation.json';
import clubs from '../clubs.json';
import formations from '../formations.json';
import leagues from '../leagues.json';
import axios from 'axios';

export default function Personelle() {
  const navigation = useNavigation();
  const [thematiqueOptions, setThematiqueOptions] = useState([]);
  const [clubOptions, setClubOptions] = useState([]);
  const [formation, setFormationOption] = useState([]);
  const [league, setLeagueOption] = useState([]);
  const [collapsedSections, setCollapsedSections] = useState([]);

  const [formData, setFormData] = useState({
    planning: '',
    thematique: '',
    dateDebut: new Date(),
    dateFin: new Date(),
    types: type_formation.map(f => ({
      type: f.type,
      lieu: null,
      note: null,
      value: null,
      color: f.color,
    })),
  });

  useEffect(() => {
    const fetchThematiqueData = async () => {
      try {
        const data = await new Promise(resolve => {
          setTimeout(() => {
            resolve(thematique);
          }, 1000);
        });
        setThematiqueOptions(data);
      } catch (error) {
        console.error('Error fetching thematique data:', error);
      }
    };

    fetchThematiqueData();
  }, []);

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const data = await new Promise(resolve => {
          setTimeout(() => {
            resolve(clubs);
          }, 1000);
        });
        setClubOptions(data);
      } catch (error) {
        console.error('Error fetching club data:', error);
      }
    };

    fetchClubData();
  }, []);

  useEffect(() => {
    const fetchFormationData = async () => {
      try {
        const data = await new Promise(resolve => {
          setTimeout(() => {
            resolve(formations);
          }, 1000);
        });
        setFormationOption(data);
      } catch (error) {
        console.error('Error fetching formations data:', error);
      }
    };

    fetchFormationData();
  }, []);
  useEffect(() => {
    const fetchFormationData = async () => {
      try {
        const data = await new Promise(resolve => {
          setTimeout(() => {
            resolve(leagues);
          }, 1000);
        });
        setLeagueOption(data);
      } catch (error) {
        console.error('Error fetching leagues data:', error);
      }
    };

    fetchFormationData();
  }, []);

  const [datePickers, setDatePickers] = useState([
    {
      id: 1,
      label: 'Date debut*',
      showPicker: false,
      icon_name: 'calendar-start',
    },
    {id: 2, label: 'Date fin*', showPicker: false, icon_name: 'calendar-end'},
  ]);

  const handleInputChange = (field, value, index = null) => {
    if (index !== null) {
      const updatedTypes = formData.types.map((item, idx) =>
        idx === index ? {...item, [field]: value} : item,
      );
      setFormData({...formData, types: updatedTypes});
    } else {
      setFormData({...formData, [field]: value});
    }
  };

  const handleDateChange = (index, event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    if (index === 0) {
      setFormData({...formData, dateDebut: currentDate});
    } else {
      setFormData({...formData, dateFin: currentDate});
    }

    setDatePickers(prevState => {
      const updatedPickers = [...prevState];
      updatedPickers[index].showPicker = false;
      return updatedPickers;
    });
  };

  const toggleDatePicker = index => {
    setDatePickers(prevState => {
      const updatedPickers = [...prevState];
      updatedPickers[index].showPicker = !updatedPickers[index].showPicker;
      return updatedPickers;
    });
  };

  const handleSubmit = () => {
    // console.log(formData.dateDebut);
    // console.log(formData.dateFin);
    // console.log(formData.planning);
    // console.log(formData.thematique);
    // formData.types.forEach((typeObj, index) => {
    //   console.log(`Type ${index + 1}:`, typeObj);
    // });
    console.log(formData);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.row}>
          <FontAwesome name="user-circle" size={28} style={styles.icon} />
          <Text style={styles.text}>Personelle Événement</Text>
        </View>

        <Text style={styles.label}>Planning*</Text>

        <View style={styles.planContainer}>
          <Icon name="next-plan" size={25} style={styles.icon} />
          <TextInput
            placeholder="Planning..."
            multiline
            numberOfLines={2}
            style={styles.textPlan}
            value={formData.planning}
            onChangeText={text => setFormData({...formData, planning: text})}
          />
        </View>

        <Text style={styles.label}>Thématique*</Text>
        <View style={styles.inputContainer}>
          <Icon name="label" size={25} style={styles.icon} />
          <Picker
            style={styles.picker}
            selectedValue={formData.thematique}
            onValueChange={itemValue =>
              handleInputChange('thematique', itemValue)
            }
            // onChangeText={text => setFormData({...formData, pole: text})}
          >
            {thematique.map(th => (
              <Picker.Item
                style={styles.textPicker}
                label={th.value}
                value={th.id}
                key={th.id}
              />
            ))}
          </Picker>
        </View>

        {datePickers.map((picker, index) => (
          <View key={picker.id}>
            <Text style={styles.label}>{picker.label}</Text>
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => toggleDatePicker(index)}>
              <Icon1 name={picker.icon_name} size={25} style={styles.icon} />

              <Text style={styles.dateInput}>
                {index === 0
                  ? formData.dateDebut.toDateString()
                  : formData.dateFin.toDateString()}
              </Text>
            </TouchableOpacity>

            {picker.showPicker && (
              <DateTimePicker
                testID="dateTimePicker"
                mode="date"
                display="default"
                value={index === 0 ? formData.dateDebut : formData.dateFin}
                onChange={(event, date) => handleDateChange(index, event, date)}
              />
            )}
          </View>
        ))}

        <View style={{marginTop: 15}}>
          {type_formation.map((f, index) => {
            return (
              <View key={index}>
                <TouchableOpacity
                  onPress={() => {
                    setCollapsedSections(prevState =>
                      prevState.includes(index)
                        ? prevState.filter(i => i !== index)
                        : [...prevState, index],
                    );
                  }}
                  style={[
                    styles.buttonCollapse,
                    {
                      backgroundColor:
                        formData.types[index]?.color || '#d4f9e3d7',
                      flex: 1,
                    },
                  ]}>
                  <Icon name="radio-button-on" size={18} color="white" />
                  <Text style={styles.buttonText}>{f.label}</Text>
                </TouchableOpacity>

                <Collapsible collapsed={!collapsedSections.includes(index)}>
                  <View style={[styles.collapsibleContent]}>
                    {f.element === 'club' ? (
                      <>
                        <Text style={styles.labelCollapse}>{f.element}</Text>
                        <View style={styles.planContainer}>
                          <Icon1 name="soccer" size={25} style={styles.icon} />
                          <Picker
                            style={styles.picker}
                            selectedValue={formData.types[index]?.value}
                            onValueChange={itemValue => {
                              handleInputChange('value', itemValue, index);
                            }}>
                            {clubOptions.map(cl => (
                              <Picker.Item
                                style={styles.textPicker}
                                label={cl.name}
                                value={cl.id}
                                key={cl.id}
                              />
                            ))}
                          </Picker>
                        </View>
                      </>
                    ) : f.element === 'formation' ? (
                      <>
                        <Text style={styles.labelCollapse}>{f.element}</Text>
                        <View style={styles.planContainer}>
                          <Icon1 name="soccer" size={25} style={styles.icon} />
                          <Picker
                            style={styles.picker}
                            selectedValue={formData.types[index]?.value}
                            onValueChange={itemValue => {
                              handleInputChange('value', itemValue, index);
                            }}>
                            {formations.map(fm => (
                              <Picker.Item
                                style={styles.textPicker}
                                label={fm.value}
                                value={fm.id}
                                key={fm.id}
                              />
                            ))}
                          </Picker>
                        </View>
                      </>
                    ) : f.element === 'ligue' ? (
                      <>
                        <Text style={styles.labelCollapse}>{f.element}</Text>
                        <View style={styles.planContainer}>
                          <Icon1 name="soccer" size={25} style={styles.icon} />
                          <Picker
                            style={styles.picker}
                            selectedValue={formData.types[index]?.value}
                            onValueChange={itemValue => {
                              handleInputChange('value', itemValue, index);
                            }}>
                            {leagues.map(lg => (
                              <Picker.Item
                                style={styles.textPicker}
                                label={lg.label}
                                value={lg.id}
                                key={lg.id}
                              />
                            ))}
                          </Picker>
                        </View>
                      </>
                    ) : f.element === 'formation' ? (
                      <></>
                    ) : (
                      <></>
                    )}

                    <Text style={styles.labelCollapse}>Lieu</Text>
                    <View style={styles.planContainer}>
                      <Icon name="place" size={25} style={styles.icon} />
                      <TextInput
                        placeholder="Lieu"
                        multiline
                        numberOfLines={2}
                        value={formData.types[index]?.lieu || ''}
                        onChangeText={text =>
                          handleInputChange('lieu', text, index)
                        }
                        style={styles.textPlan}
                      />
                    </View>

                    <Text style={styles.labelCollapse}>Note</Text>
                    <View style={styles.planContainer}>
                      <Icon1 name="note" size={25} style={styles.icon} />
                      <TextInput
                        placeholder="Note"
                        multiline
                        numberOfLines={2}
                        value={formData.types[index]?.note || ''}
                        onChangeText={text =>
                          handleInputChange('note', text, index)
                        }
                        style={styles.textPlan}
                      />
                    </View>
                  </View>
                </Collapsible>
              </View>
            );
          })}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Evenement')}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  // scrollContainer: {},
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

  planContainer: {
    display: 'flex',
    flexDirection: 'row',
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
    alignItems: 'center',
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
