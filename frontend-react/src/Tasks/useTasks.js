import {useState, useEffect} from 'react';
import useInterval from '../useInterval';

const useTasks = () => {
  const [areTasksLoading, setAreTasksLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

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

export default useTasks;