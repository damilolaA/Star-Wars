import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  root: {
    spacing: 4
  }
});

const GenderFilter = ({ handleFilter, classes }) => {
  return(
    <div>
      <FormControl className={classes.root}>
        <InputLabel htmlFor="movies">Filter By Gender</InputLabel>
        <Select
          value={"gender"}
          onChange={(e) => handleFilter(e)}
        >
          <MenuItem value={"all"}>
            ALL
          </MenuItem>
          <MenuItem value={"male"}>
            MALE
          </MenuItem>
          <MenuItem value={"female"}>
            FEMALE
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default withStyles(styles)(GenderFilter);