import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import DeleteIcon from '@material-ui/icons/Delete';
import { ListItemSecondaryAction } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  addTaskRow: {
    display: 'flex',
    padding: '5px',
  },
  addTaskRowText: {
    flex: 1,
  },
}));

function Tasks() {
  const classes = useStyles();
  const [tasks, setTasks] = useState([{ name: 'Initial Task', complete: true }]);
  const [newTaskName, setNewTaskName] = useState('');

  const onAddTask = () => {
    if (newTaskName) {
      setTasks([...tasks, { name: newTaskName, complete: false }]);
      setNewTaskName('');
    }
  };

  const onRemoveTask = (task) => setTasks(tasks.filter((t) => t !== task));

  const onToggleTaskCompletion = (task) => {
    task.complete = !task.complete;
    setTasks([...tasks]);
  };

  return (
    <div className={classes.root}>
      <div className={classes.addTaskRow}>
        <TextField className={classes.addTaskRowText} label="New Task" value={newTaskName} onChange={(event) => setNewTaskName(event.target.value)} />
        <Button color="primary" onClick={onAddTask}>Add</Button>
      </div>
      <Divider />
      <List>
        { tasks.map((task) =>
          <ListItem key={task.name} button onClick={() => onToggleTaskCompletion(task)}>
            <ListItemIcon>
              { task.complete ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon /> }
            </ListItemIcon>
            <ListItemSecondaryAction onClick={(event) => {onRemoveTask(task); event.stopPropagation()}}>
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
            <ListItemText primary={task.name}/>
          </ListItem>
        )}
      </List>
    </div>
  );
}

export default Tasks;