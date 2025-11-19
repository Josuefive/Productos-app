import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useThemeColor } from '../hooks/use-theme-color';

interface props {
  options: string[];
  selectedOption: string[];

  onSelect: (option: string) => void;
}

const ThemeButtonGroup = ({ options, selectedOption, onSelect }: props) => {
  
  const primaryColor = useThemeColor({}, 'promary');
  
  return (
    <View style ={styles.container}>
        {options.map((option) => (
          <TouchableOpacity
          key = {option}
          onPress={() => onSelect(option)}
          style = {[
            styles.button,
            selectedOption.includes(option) && {
              backgroundColor: primaryColor,
            }
          ]}
          >
            <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style = {[
              styles.buttonText,
              selectedOption.includes(option) && styles.selectedButtonText
            ]}
            >{option[0].toUpperCase() + option.slice(1)}</Text>
          </TouchableOpacity>
        ))}
    </View>
  );
};

export default ThemeButtonGroup;


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },


  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  buttonText: {
    fontSize: 16,
  },

  selectedButtonText: {
    color: '#fff'
  }
})