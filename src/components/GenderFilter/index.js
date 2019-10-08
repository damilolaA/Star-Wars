import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { ALL, FEMALE, MALE, OTHERS } from '../../utils/constants';


const GenderFilter = ({ handleFilter, filterName }) => {
  return(
    <div>
      <FormControl>
        <InputLabel htmlFor="movies">Filter By Gender</InputLabel>
        <Select
          value={filterName}
          onChange={(e) => handleFilter(e)}
        >
          <MenuItem value={ALL}>
            All
          </MenuItem>
          <MenuItem value={MALE}>
            Male
          </MenuItem>
          <MenuItem value={FEMALE}>
            Female
          </MenuItem>
          <MenuItem value={OTHERS}>
            Others
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default GenderFilter;