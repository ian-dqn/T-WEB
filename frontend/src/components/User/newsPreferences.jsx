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

const SelectUserPref = ({ onChange, initialValues }) => {
    const labels =
        Array.isArray(initialValues) ?
            initialValues.map(myValue => {
                const selectOption = newsOptions.map(opt => { return opt.value === myValue ? opt : null })
                return selectOption ? selectOption : null;
            }):[];

    let flattenedArray = [].concat(...labels);
    let newLabels = flattenedArray.filter(option => option !== null)

    return (
        <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={newsOptions}
            onChange={onChange}
            styles={customStyles}
            value={newLabels}
        />
    );
};
export default SelectUserPref;