import React from 'react';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { newsOptions } from '../../constants/userPreferencesOptions'; 

const animatedComponents = makeAnimated();

const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: 'black',
    }),
  };
  const SelectUserPref = ({ onChange }) => (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={newsOptions}
      styles={customStyles}
      onChange={onChange}
    />
  )

  export default SelectUserPref;

import React from 'react';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { newsOptions } from '../../constants/userPreferencesOptions'; 

const animatedComponents = makeAnimated();

const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: 'black', // Change the color to black
    }),
  };
  
  const selectUserPref = () => (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={newsOptions}
      styles={customStyles}
    />
  )

  export default selectUserPref;
