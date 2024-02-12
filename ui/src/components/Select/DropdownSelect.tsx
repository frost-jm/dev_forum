import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';

import { useMode } from '@/context/ModeContext';

const DropdownSelect = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'content', label: 'Content' },
    { value: 'design', label: 'Design' },
    { value: 'development', label: 'Development' },
  ];

  const styles = {
    backgroundColor: '#25282E',
    color: '#ffffff',
    fontSize: '12px',
  };

  const handleChange = (newValue: any) => {
    setSelectedOptions(newValue);
  };

  const handleCreate = async (inputValue: any) => {
    console.log(inputValue);
  };

  return (
    <CreatableSelect
      isMulti
      createOptionPosition="first"
      onChange={handleChange}
      onCreateOption={handleCreate}
      options={options}
      value={selectedOptions}
      placeholder="Tags"
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          ...styles,
          border: '1px solid #40444C',
          borderRadius: '4px',
          fontFamily: 'Figtree-Medium,sans-serif',
          fontWeight: '500',
          lineHeight: '1.2',
          padding: '12px',

          '>.css-3w2yfm-ValueContainer': {
            gap: '10px',
            padding: '0',
          },

          '>div >div': {
            color: 'inherit',
          },

          '.css-1hb7zxy-IndicatorsContainer': {
            '.css-1u9des2-indicatorSeparator': {
              backgroundColor: 'rgba(255, 255, 255, .10)',
            },

            '.css-1xc3v61-indicatorContainer': {
              width: '24px',
              height: '24px',

              svg: {
                display: 'none',
              },

              '&:first-child': {
                backgroundColor: 'transparent',
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg opacity='0.3'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.77342 5.90943C7.14247 5.34247 7.77312 5.00049 8.44961 5.00049H19.0022C20.1067 5.00049 21.0022 5.89592 21.0022 7.00049V17.0005C21.0022 18.1051 20.1067 19.0005 19.0022 19.0005H8.44966C7.77311 19.0005 7.14243 18.6585 6.77339 18.0914L3.51905 13.091C3.08737 12.4277 3.0874 11.5722 3.51913 10.909L6.77342 5.90943ZM19.0022 7.00049L8.44961 7.00049L5.19531 12L8.44966 17.0005H19.0022V7.00049ZM10.2908 9.28987C10.6813 8.89934 11.3145 8.89934 11.705 9.28987L12.9979 10.5828L14.2908 9.28987C14.6813 8.89934 15.3145 8.89934 15.705 9.28987C16.0955 9.68039 16.0955 10.3136 15.705 10.7041L14.4121 11.997L15.705 13.2899C16.0955 13.6804 16.0955 14.3136 15.705 14.7041C15.3145 15.0946 14.6813 15.0946 14.2908 14.7041L12.9979 13.4112L11.705 14.7041C11.3145 15.0946 10.6813 15.0946 10.2908 14.7041C9.90025 14.3136 9.90025 13.6804 10.2908 13.2899L11.5837 11.997L10.2908 10.7041C9.90025 10.3136 9.90025 9.68039 10.2908 9.28987Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A")`,
              },

              '&:last-child': {
                backgroundColor: 'transparent',
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg opacity='0.3'%3E%3Cpath d='M7 9.00007L12 15L17 9.00007' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/g%3E%3C/svg%3E%0A")`,
              },
            },
          },
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          ...styles,
          padding: '12px',

          ':hover': {
            backgroundColor: 'rgba(64, 68, 76, 0.4)',
          },
        }),
        multiValue: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: 'rgba(255, 255, 255, 0.12)',
          color: '#ffffff',
          padding: '6px 8px 6px 12px',
          borderRadius: '50px',
          margin: '0',
          className: 'btn-remove',

          '>div': {
            color: '#ffffff',
          },

          '>.css-12a83d4-MultiValueRemove': {
            padding: '0 ',
            marginLeft: '6px',
            width: '16px',
            height: '16px',
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg opacity='0.2'%3E%3Cpath d='M8.97203 8.00016L12.6654 11.6935V12.6668H11.692L7.9987 8.9735L4.30536 12.6668H3.33203V11.6935L7.02536 8.00016L3.33203 4.30683V3.3335H4.30536L7.9987 7.02683L11.692 3.3335H12.6654V4.30683L8.97203 8.00016Z' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A")`,

            '&:hover': {
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='16' height='16' rx='4' fill='white' fill-opacity='0.2'/%3E%3Cpath d='M8.97203 8.00016L12.6654 11.6935V12.6668H11.692L7.9987 8.9735L4.30536 12.6668H3.33203V11.6935L7.02536 8.00016L3.33203 4.30683V3.3335H4.30536L7.9987 7.02683L11.692 3.3335H12.6654V4.30683L8.97203 8.00016Z' fill='white'/%3E%3C/svg%3E%0A")`,
              backgroundColor: 'transparent',
            },

            svg: {
              display: 'none',
            },
          },
        }),
        menu: (baseStyles, state) => ({
          ...baseStyles,
          ...styles,
          margin: '0',
          fontFamily: 'Figtree-Semibold,sans-serif',
          fontWeight: '600',
          lineHeight: '1.4',

          '>div': {
            padding: '0',
            borderRadius: '4px',
          },
        }),
      }}
    />
  );
};

export default DropdownSelect;
