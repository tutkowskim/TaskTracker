import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import DeleteIcon from '@material-ui/icons/Delete';
import { ListItemSecondaryAction } from '@material-ui/core';

function TaskListItem(props) {
  const { task, onToggleTaskCompletion, onRemoveTask} = props;
  return (
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
  );
}

export default  TaskListItem;