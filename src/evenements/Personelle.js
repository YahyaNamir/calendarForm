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
import DateTimePicker from '@react-native-community/datetimepicker';
import Collapsible from 'react-native-collapsible';
import thematique from '../thematique.json';
import formation from '../type_formation.json';

export default function Personelle() {
  const navigation = useNavigation();
  const [thematiqueOptions, setThematiqueOptions] = useState([]);

  const [formData, setFormData] = useState({
    planning: '',
    thematique: '',
    dateDebut: new Date(),
    dateFin: new Date(),
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

  const [isCollapsed, setIsCollapsed] = useState(true);

  const [datePickers, setDatePickers] = useState([
    {
      id: 1,
      label: 'Date debut*',
      showPicker: false,
      icon_name: 'calendar-start',
    },
    {id: 2, label: 'Date fin*', showPicker: false, icon_name: 'calendar-end'},
  ]);

  const handleInputChange = (field, value) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleDateChange = (index, event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    const updatedField = index === 0 ? 'dateDebut' : 'dateFin';

    handleInputChange(updatedField, currentDate);

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
    console.log('Form Data:', formData);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.text}>Ajouter un Événement</Text>

        <Text style={styles.label}>Planning*</Text>

        <View style={styles.planContainer}>
          <Icon name="next-plan" size={20} style={styles.icon} />
          <TextInput
            placeholder="Planning..."
            multiline
            numberOfLines={2}
            style={styles.textPlan}
            value={formData.planning}
            onChangeText={text => handleInputChange('planning', text)}
          />
        </View>

        <Text style={styles.label}>Thématique*</Text>
        <View style={styles.inputContainer}>
          <Icon name="label" size={20} style={styles.icon} />
          <Picker
            style={styles.picker}
            selectedValue={formData.thematique}
            onValueChange={itemValue =>
              handleInputChange('thematique', itemValue)
            }>
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
              <Icon1 name={picker.icon_name} size={20} style={styles.icon} />

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
          {formation.map(f => {
            return (
              <>
                <Button
                  title={f.label}
                  onPress={() => setIsCollapsed(!isCollapsed)}
                />
                <Collapsible collapsed={isCollapsed}>
                  <View style={styles.collapsibleContent}>
                    <Text style={styles.labelCollapse}>Club</Text>

                    <View style={styles.planContainer}>
                      <Icon1 name="soccer" size={20} style={styles.icon} />
                      <TextInput
                        placeholder="Club"
                        multiline
                        numberOfLines={2}
                        style={styles.textPlan}
                      />
                    </View>

                    <Text style={styles.labelCollapse}>Lieu</Text>
                    <View style={styles.planContainer}>
                      <Icon name="place" size={20} style={styles.icon} />
                      <TextInput
                        placeholder="Lieu"
                        multiline
                        numberOfLines={2}
                        style={styles.textPlan}
                      />
                    </View>

                    <Text style={styles.labelCollapse}>Note</Text>
                    <View style={styles.planContainer}>
                      <Icon1 name="note" size={20} style={styles.icon} />
                      <TextInput
                        placeholder="Note"
                        multiline
                        numberOfLines={2}
                        style={styles.textPlan}
                      />
                    </View>
                  </View>
                </Collapsible>
              </>
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
    marginBottom: 5,
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
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
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
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
