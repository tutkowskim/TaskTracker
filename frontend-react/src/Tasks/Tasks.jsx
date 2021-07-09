import React, {useState} from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button, CircularProgress, Divider, TextField, List, makeStyles } from '@material-ui/core';
import useTasks from './useTasks';
import TaskListItem from './TaskListItem';

const useStyles = makeStyles(() => ({
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

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onAddTask();
    }
  }

  const onRemoveTask = (task) => setTasks(tasks.filter((t) => t !== task));

  const onToggleTaskCompletion = (task) => {
    task.complete = !task.complete;
    setTasks([...tasks]);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;
    setTasks(reorder(tasks, result.source.index, result.destination.index));
  }

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
        <TextField className={classes.addTaskRowText} label="New Task" value={newTaskName} onChange={(event) => setNewTaskName(event.target.value)} onKeyDown={handleKeyDown} />
        <Button color="primary" onClick={onAddTask}>Add</Button>
      </div>
      <Divider />
      <DragDropContext onDragEnd={onDragEnd}>
        <List>
          <Droppable droppableId="tasks">
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <List>
                  {tasks.map((task, index) =>
                    <Draggable key={task.name} draggableId={task.name} index={index}>
                      {provided => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <TaskListItem
                            task={task}
                            onRemoveTask={onRemoveTask}
                            onToggleTaskCompletion={onToggleTaskCompletion} />
                        </div>
                      )}
                    </Draggable>
                  )}
                </List>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </List>
      </DragDropContext>
    </div>
  );
}

export default Tasks;
