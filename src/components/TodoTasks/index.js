import React, { useCallback } from 'react';
import './style.scss';
import { Checkbox, Button, List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      marginTop: '10px',
      marginBottom: '10px',
    },
  }));
  
function TodoTasks(){
    const classes = useStyles();

    const [checked, setChecked] = React.useState([0]);

    const todolists = useSelector(state => state.todolists);
    const dispatch = useDispatch();

    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleAdd = useCallback(() => dispatch({ 
        type: 'ADD_TASK', 
        data: {
            Id: Math.random(),
            IsActive: true,
            Name: "",
            DateCreated: "",
            DateFinished: ""
        }
      }), [dispatch]);

    const addTask = () => {
        handleAdd();
    };

    const tasks = todolists.TodoLists.filter(list=>(list.Id==todolists.activeListId))[0];
    console.log('tasks='+JSON.stringify(tasks));
    return (
        <div>
            <h3>TODO Tasks</h3>

            <List className={classes.root}>
                {tasks && tasks.length!=0 && tasks.Tasks.map(value => {
                    const labelId = `checkbox-list-label-${value}`;

                    return (
                    <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
                        <ListItemIcon>
                        <Checkbox
                            edge="start"
                            checked={checked.indexOf(value) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                        />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={``}
                            contentEditable={true} suppressContentEditableWarning={true}/>
                        
                    </ListItem>
                    );
                })}
            </List>
            <Button variant="contained" onClick={()=>addTask()}>+ Add task</Button>
        </div>
    );
}
export default TodoTasks;