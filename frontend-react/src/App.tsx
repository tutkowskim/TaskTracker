import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Checkbox,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  app: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  toolBar: {
    height: '64px',
  },
  title: {
    flexGrow: 1,
  },
  appContent: {
    position: 'relative',
    height: 'calc(100% - 64px)',
    overflow: 'scroll',
  },
  tasksContainer: {
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

function App() {
  const classes = useStyles();
  const [tasks, setTasks] = useState<any[]>([]);

  const fetchTasks = () => {
    fetch('/api/GetTasks')
      .then(res => res.json())
      .then(data => setTasks(data));
  };

  const addTask = (taskName: string) => {
    fetch(`/api/AddTask?name=${taskName}`)
      .then(() => fetchTasks());
  };

  const removeTask = (task: any) => {
    fetch(`/api/DeleteTask?id=${task.id}`)
      .then(() => fetchTasks());
  };
  const markTaskComplete = (task: any) => {
    fetch(`/api/EditTask?id=${task.id}&complete=${!task.complete}`)
      .then(() => fetchTasks());
  };

  // Load tasks when the component is mounted
  useEffect(() => fetchTasks(), []);

  return (
    <div className={classes.app}>
      <AppBar position='static'>
        <Toolbar className={classes.toolBar}>
          <Typography variant="h6" className={classes.title}>Todo Tracker</Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.appContent}>
        <div className={classes.tasksContainer}>
          <List className={classes.tasksList}>
            { tasks.map(task => 
              <ListItem key={String(task.id)} button onClick={() => markTaskComplete(task)}>
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
      </div>
      <Fab className={classes.fab} color='primary'>
        <AddIcon onClick={() => addTask(`New Task ${Math.round(Math.random() * 1000)}`)} />
      </Fab>
    </div>
  );
}

export default App;
