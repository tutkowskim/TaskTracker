import React from 'react';
import { IconButton, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import { CheckBox, CheckBoxOutlineBlank, Delete } from '@material-ui/icons';

function TaskListItem(props) {
  const { task, onToggleTaskCompletion, onRemoveTask} = props;
  return (
    <ListItem key={task.name} button onClick={() => onToggleTaskCompletion(task)}>
      <ListItemIcon>
        { task.complete ? <CheckBox /> : <CheckBoxOutlineBlank /> }
      </ListItemIcon>
      <ListItemText primary={task.name}/>
      <ListItemSecondaryAction onClick={(event) => {onRemoveTask(task); event.stopPropagation()}}>
        <IconButton edge="end" aria-label="delete">
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default  TaskListItem;