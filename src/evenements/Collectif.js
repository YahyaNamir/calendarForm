import React, { useState } from 'react'; // Import useState
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker

export default function Collectif() {
  const navigation = useNavigation();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [formData, setFormData] = useState({ date: new Date() }); // Initialize formData

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || formData.date; // Use current date if no date is selected
    setShowDatePicker(false);
    setFormData({ ...formData, date: currentDate }); // Update formData with the selected date
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Collectif</Text>

      <Text style={styles.label}>DATE_OF_MALADY</Text>
      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setShowDatePicker(true)}>
        <Text style={styles.input}>{formData.date.toDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={formData.date}
          mode="date"
          display="default"
          onChange={handleDateChange}
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
