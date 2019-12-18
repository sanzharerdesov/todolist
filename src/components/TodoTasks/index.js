import React from 'react';
import './style.scss';
import { Checkbox, Button, List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, makeStyles } from '@material-ui/core';

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

    return (
        <div>
            <h3>TODO Tasks</h3>

            <List className={classes.root}>
                {[0, 1, 2, 3].map(value => {
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
                        <ListItemText id={labelId} primary={`Line item ${value + 1}`} contentEditable={true}/>
                        
                    </ListItem>
                    );
                })}
            </List>
            <Button variant="contained" className>+ Add task</Button>
        </div>
    );
}
export default TodoTasks;