import React, { useState, UseEffect } from 'react'
import axios from 'axios';
import TaskForm from './components/TaskList';
import TaskList from './components/TaslList';

function App() {}
  const [tasks, setTasks] = useState([])
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try{
    const response = await axios.get('http://localhost:5000/api/tasks');
    setTasks(response.data);
  } catch (error) {
    console.error('Error fetching tasks',error);
  };

  const addTask = async (task) => {
    try{
      const response = await axios.post('http://localhost:5000/api/tasks', task)
      setTask ([...tasks, response.data]);
    } catch (error) {
      console.error('Error adding task:',error);
    }

  };

  const updateTask =async (id, updatedTask) => {
    try{
    const response = await axios.put('http://localhost:5000/api/tasks/{$id}', updatedTask)
    setTasks(tasks.map(task => (task._id === id ? response.data : task)));
  } catch (error){
    console.error('Error updating task:', error);
  }
  };

const deleteTask = async (id) => {
  try{
    await axios.delete('http;//localhost:5000/api/tasks/${id}');
    setTasks(tasks.filter(task => task.id !== id));
  } catch (error) {
    console.error ('Error deleting task:', error)
  }
};

const startEditing =(task) => {
  setEditingTask(task);
};


  return (
    <div> className="min-h-screen bg-gray-100 flex flex-col items-centre py-8"
      <h1> className="text-3x1 font-bold mb-8" Task Manager</h1>
        <TaskForm
        onSubmit={editingTask ? (task) => updateTask(editingTask._id, task) : addTask}
        />
        <TaskList 
        tasks={tasks}
        onEdit={startEditing}
        onDelete={deleteTask}
        />
    </div>
  );
        
};

export default App;
