import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


const GenderFilter = ({ handleFilter, filterName }) => {
  return(
    <div>
      <FormControl>
        <InputLabel htmlFor="movies">Filter By Gender</InputLabel>
        <Select
          value={filterName}
          renderValue={() => filterName}
          onChange={(e) => handleFilter(e)}
        >
          <MenuItem value={"All"}>
            ALL
          </MenuItem>
          <MenuItem value={"Male"}>
            MALE
          </MenuItem>
          <MenuItem value={"Female"}>
            FEMALE
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default GenderFilter;