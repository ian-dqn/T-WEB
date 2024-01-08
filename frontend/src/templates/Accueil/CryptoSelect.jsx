import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { getNewsOptions } from '../../constants/newsOptions';

const animatedComponents = makeAnimated();

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        color: 'black',
    }),
};

const CryptoSelect = ({ onChange, initialValues }) => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        // Call the function to get the newsOptions
        getNewsOptions()
            .then(newsOptions => {
                setOptions(newsOptions);
            })
            .catch(error => {
                console.error('Error getting newsOptions:', error);
            });
    }, []); // Empty dependency array ensures useEffect runs once on component mount
    console.log('CryptoSelect received initialValues:', initialValues);
    const labels =
        Array.isArray(initialValues)
            ? initialValues.map(myValue => {
                const selectOption = options.find(opt => opt.value === myValue);
                return selectOption ? selectOption : null;
            })
            : [];

    let flattenedArray = [].concat(...labels);
    let newLabels = flattenedArray.filter(option => option !== null);

    return (
        <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={options}
            onChange={onChange}
            styles={customStyles}
            value={newLabels}
        />
    );
};

export default CryptoSelect;
