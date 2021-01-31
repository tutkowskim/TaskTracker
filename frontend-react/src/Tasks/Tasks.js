import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
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
import useInterval from '../useInterval';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  verticalCenterContents: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  horizontalCenterContents: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  addTaskRow: {
    display: 'flex',
    padding: '5px',
  },
  addTaskRowText: {
    flex: 1,
  },
}));

const useTasks = () => {
  const [areTasksLoading, setAreTasksLoading] = useState(true);
  const [tasks, setTasks] = useState([{ name: 'Initial Task', complete: true }]);

  const fetchTasks = async () => {
    const response = await fetch('/api/GetTasks');
    const data = await response.json();
    setTasks(data);
    setAreTasksLoading(false);
  }

  // Fetch initial data
  useEffect(() => fetchTasks(), []);

  // Refresh the data
  useInterval(() => fetchTasks(), 5000);

  const setTasksWrapper = (updatedTasks) => {
    //Update the state
    setTasks(updatedTasks);

    // Post the new tasks back, so that they are saved
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTasks)
    };
    fetch('/api/SetTasks', requestOptions);
  }
  return [areTasksLoading, tasks, setTasksWrapper];
}

function Tasks() {
  const classes = useStyles();
  const [areTasksLoading, tasks, setTasks] = useTasks();
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

  if (areTasksLoading) {
    return (
      <div className={classes.verticalCenterContents}>
        <div className={classes.horizontalCenterContents}>
          <CircularProgress size="100px" />
        </div>
      </div>
    );
  }

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
            <ListItemText primary={task.name}/>
            <ListItemSecondaryAction onClick={(event) => {onRemoveTask(task); event.stopPropagation()}}>
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )}
      </List>
    </div>
  );
}

export default Tasks;