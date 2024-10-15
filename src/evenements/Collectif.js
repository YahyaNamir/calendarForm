import React, {useState} from 'react'; // Import useState
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker

export default function Collectif() {
  const navigation = useNavigation();
  const [showDatePicker1, setShowDatePicker1] = useState(false);
  const [showDatePicker2, setShowDatePicker2] = useState(false);
  const [formData, setFormData] = useState({
    date1: new Date(),
    date2: new Date(),
  }); 

  const handleDateChange = (event, selectedDate, dateType) => {
    const currentDate = selectedDate || formData[dateType]; 
    setFormData({...formData, [dateType]: currentDate});    

    if (dateType === 'date1') {
      setShowDatePicker1(false);
    } else {
      setShowDatePicker2(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Collectif</Text>

      <Text style={styles.label}>DATE_OF_MALADY 1</Text>
      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setShowDatePicker1(true)}>
        <Text style={styles.input}>{formData.date1.toDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker1 && (
        <DateTimePicker
          testID="dateTimePicker1"
          value={formData.date1}
          mode="date"
          display="default"
          onChange={(event, date) => handleDateChange(event, date, 'date1')}
        />
      )}

      <Text style={styles.label}>DATE_OF_MALADY 2</Text>
      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setShowDatePicker2(true)}>
        <Text style={styles.input}>{formData.date2.toDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker2 && (
        <DateTimePicker
          testID="dateTimePicker2"
          value={formData.date2}
          mode="date"
          display="default"
          onChange={(event, date) => handleDateChange(event, date, 'date2')}
        />
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Evenement')}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f9',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  datePickerButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
    color: 'black',
  },
  button: {
    backgroundColor: '#0c8f2d',
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
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
