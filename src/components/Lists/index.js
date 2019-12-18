import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  }
}));

function Lists(props){
    const classes = useStyles();
    const [state, setState] = React.useState({
        lists: '',
        name: 'hai',
      });

    const handleChange = name => event => {
        setState({
        ...state,
        [name]: event.target.value,
        });
    };
    
    return (
        <React.Fragment>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="lists-native-simple">List of tasks</InputLabel>
                <Select
                    native
                    value={state.age}
                    onChange={handleChange('lists')}
                    inputProps={{
                    name: 'lists',
                    id: 'lists-native-simple',
                    }}
                >
                    <option value="" />
                    <option value={10}>List1</option>
                    <option value={20}>List2</option>
                    <option value={30}>List3</option>
                </Select>
            </FormControl>
            <Button variant="contained" className={classes.selectEmpty}>Add list</Button>
        </React.Fragment>
    );
  }
  export default Lists;