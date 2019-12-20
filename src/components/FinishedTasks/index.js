import React from 'react';
import './style.scss';
import { Checkbox, List, ListItem, ListItemIcon, ListItemText, makeStyles, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      marginTop: '10px',
      marginBottom: '10px',
    },
  }));
  
function FinishedTasks(){
    const classes = useStyles();

    const todolists = useSelector(state => state.todolists);
    
    const tasks = todolists.TodoLists.filter(list=>(list.Id==todolists.activeListId))[0];
    return (
        <div>
            <h3>Finished Tasks</h3>

            <List className={classes.root}>
                {tasks && tasks.length!=0 && tasks.Tasks.filter(item=>(!item.IsActive)).map(value => {
                    return (
                    <ListItem key={value.Id+''} role={undefined} dense button>
                        <s>{value.Name}</s>                        
                    </ListItem>
                    );
                })}
            </List>
            
        </div>
    );
}
export default FinishedTasks;