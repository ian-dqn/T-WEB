import React from 'react';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { newsOptions } from '../../constants/userPreferencesOptions'; 

const animatedComponents = makeAnimated();

// Convert the array of strings to an array of objects

const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: 'black', // Change the color to black
    }),
  };
  
  const MyComponent = () => (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={newsOptions}
      styles={customStyles}
    />
  )

  export default MyComponent;
