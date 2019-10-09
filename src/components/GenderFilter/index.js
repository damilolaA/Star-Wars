import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { ALL, FEMALE, MALE, HERMAPHRODITE, NA } from '../../utils/constants';


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
          <MenuItem value={HERMAPHRODITE}>
            Hermaphrodite
          </MenuItem>
          <MenuItem value={NA}>
            N/A
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default GenderFilter;