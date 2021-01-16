import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import {
  Checkbox,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  tasksContainer: {
    height: '100%',
    width: '100%',
    overflow: 'scroll',
  },
  tasksListContainer: {
    height: '100%',
    width: '100%',
    maxWidth: '1200px',
    margin: 'auto',
  },
  tasksList: {
    paddingRight: '75px',
    paddingLeft: '75px',
  },
  fab: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  }
}));

function Tasks() {
  const classes = useStyles();
  const [tasks, setTasks] = useState<any[]>([]);
  const { getAccessTokenSilently } = useAuth0();

  const fetchTasks = () => {
    getAccessTokenSilently()
      .then((accessToken) => fetch('/api/GetTasks', { headers: { 'Authorization': `Bearer ${accessToken}` } }))
      .then(res => res.json())
      .then(data => setTasks(data));
  };

  const addTask = (taskName: string) => {
    getAccessTokenSilently()
      .then(accessToken => fetch(`/api/AddTask?name=${taskName}`, { headers: { 'Authorization': `Bearer ${accessToken}` } }))
      .then(() => fetchTasks());
  };

  const removeTask = (task: any) => {
    getAccessTokenSilently()
      .then(accessToken => fetch(`/api/DeleteTask?id=${task.id}`, { headers: { 'Authorization': `Bearer ${accessToken}` } }))
      .then(() => fetchTasks());
  };
  const toggleTaskComplete = (task: any) => {
    getAccessTokenSilently()
      .then(accessToken => fetch(`/api/EditTask?id=${task.id}&complete=${!task.complete}`, { headers: { 'Authorization': `Bearer ${accessToken}` } }))
      .then(() => fetchTasks());
  };

  // Load tasks when the component is mounted
  useEffect(() => fetchTasks());

  return (
    <div className={classes.tasksContainer}>
      <div className={classes.tasksListContainer}>
        <List className={classes.tasksList}>
          { tasks.map(task => 
            <ListItem key={String(task.id)} button onClick={() => toggleTaskComplete(task)}>
              <ListItemIcon>
                <Checkbox edge='start' checked={task.complete}></Checkbox>
              </ListItemIcon>
              <ListItemText primary={task.name} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => removeTask(task)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )}
        </List>
      </div>
      <Fab className={classes.fab} color='primary'>
        <AddIcon onClick={() => addTask(`New Task ${Math.round(Math.random() * 1000)}`)} />
      </Fab>
    </div>
  );
}

export default Tasks;
