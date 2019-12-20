import React, { useCallback } from 'react';
import './style.scss';
import { Checkbox, Button, List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, makeStyles, Input, TextField } from '@material-ui/core';
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
    const [taskName, setTaskName] = React.useState("");

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

        dispatch({ 
            type: 'FINISH_TASK', 
            data: {
                Id: value.Id,
                IsActive: false,
            }
        });

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


    const handleTaskName = (text, taskId)=>{
        console.log('test1='+JSON.stringify(taskName))
        setTaskName(...taskName,text);
        console.log('test2='+JSON.stringify(taskName))
        
        handleTaskNameUpdate(text, taskId);
    };

    const handleTaskNameUpdate = (text, taskId) => {
        console.log('text='+text);
        dispatch({ 
        type: 'UPDATE_TASK', 
        data: {
            Id: taskId,
            Name: text,
        }
      })};

    const tasks = todolists.TodoLists.filter(list=>(list.Id==todolists.activeListId))[0];
    return (
        <div>
            <h3>TODO Tasks</h3>

            <List className={classes.root}>
                {tasks && tasks.length!=0 && tasks.Tasks.filter(item=>(item.IsActive)).map(value => {
                    const labelId = `checkbox-list-label-${value}`;

                    return (
                    <ListItem key={value.Id+''} role={undefined} dense button>
                        <ListItemIcon>
                        <Checkbox
                            edge="start"
                            checked={checked.indexOf(value) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                            onClick={handleToggle(value)}
                        />
                        </ListItemIcon>
                        <TextField key={value.Id} primary={``}
                            value={value.Name} onChange={(e)=>handleTaskName(e.target.value, value.Id)}/>
                        
                    </ListItem>
                    );
                })}
            </List>
            {
             todolists.activeListId!==0 &&
                <Button variant="contained" onClick={()=>addTask()}>+ Add task</Button>
            }
            {
             todolists.activeListId===0 &&
                <label>Please select task list</label>
            }
        </div>
    );
}
export default TodoTasks;