import React from 'react';
import Select from 'react-select';

import './index.scss';

const options = [
  { value: 'all', label: 'All' },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "hermaphrodite", label: "Hermaphrodite" },
  { value: "n/a", label: "N/A" },
];

const GenderFilter = ({ handleFilter, filterName }) => {
  return(
    <div>
      <Select 
        className="filter-dropdown"
        onChange={filter => handleFilter(filter)}
        placeholder= "Filter"
        options={options}
        autoFocus={true}
      />
    </div>
  )
}

export default GenderFilter;