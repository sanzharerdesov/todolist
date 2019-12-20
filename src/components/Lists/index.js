import React, {useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { connect, useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  }
}));

export const Lists = () => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        lists: '',
        newlist: ''
      });

    const [open, setOpen] = React.useState(false);
    const todolists = useSelector(state => state.todolists);
    const dispatch = useDispatch();
    
    
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleAddList = useCallback((val, rand) => dispatch({ 
        type: 'ADD_LIST', 
        data: {
          Id: rand,
          IsActive: true,
          Name: val,
          DateCreated: new Date(),
          DateFinished: "",
          Tasks: []
        }
      }), [dispatch]);

    const handleUpdateList = useCallback((val) => dispatch({
        type: 'UPDATE_ACTIVE_LIST', 
        data: {
          value: val
        }
      }), [dispatch]);

    const handleAddListInit = ()=>{
      handleClose();
      const val = state.newlist;
      const rand = Math.random();
      handleAddList(val, rand);
      handleUpdateList(rand);
      setState({newlist: ''});
    }

    const handleChange = (event) => {     
      handleUpdateList(event.target.value);
    };



    return (
        <React.Fragment>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="lists-native-simple">List of tasks</InputLabel>
                <Select
                    native
                    value={state.age}
                    onChange={handleChange}
                    value = {todolists.activeListId}
                    className="listSelect"
                    // style={{width: '170px'}}
                    inputProps={{
                    name: 'lists',
                    id: 'lists-native-simple',
                    }}
                >
                  {
                    todolists.TodoLists.map(item=>{
                      return (<option value={item.Id} key={item.Id}>{item.Name}</option>);
                    })
                  }
                </Select>
                
            </FormControl>
            <Button variant="contained" className={classes.selectEmpty} onClick={handleClickOpen}>Add list</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Add new list</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="List name"
                      type="listname"
                      fullWidth
                      value={state.newlist}
                      onChange={e => setState({
                        ...state, newlist: e.target.value
                      }) }
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleAddListInit} color="primary">
                      Add
                    </Button>
                  </DialogActions>
                </Dialog>
        </React.Fragment>
    );
  }
  export default Lists;