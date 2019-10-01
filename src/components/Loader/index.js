import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme => ({
  progress: {
    margin: theme.spacing(10),
    color: "black"
  }
}))

const Loader = ({ classes }) => {
  return(
    <CircularProgress
      className={classes.progress}
      size={24}
    />
  );
}

export default withStyles(styles)(Loader);