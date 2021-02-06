import React, {useState, useEffect} from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import useInterval from '../useInterval';
import TaskListItem from './TaskListItem';

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
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const reorderedTasks = reorder(
      tasks,
      result.source.index,
      result.destination.index
    );

    setTasks([...reorderedTasks]);
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
