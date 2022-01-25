import { useState, useEffect } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
  const [tasks, setTasks] = useState([]);

  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }

    getTasks();
  }, []);

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();
    return data;
  }

  // Fetch Single Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });

    const data = await res.json();

    setTasks([...tasks, data]);
    setShowAddTask(false);
  }
  
  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id));
  }

  // Toggle Reminder,
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}; 

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updTask)
    });

    const data = await res.json();

    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task));
  }

  return (
    <div className='container'>
      <Header toggleAddTask={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      {showAddTask && (<AddTask onAdd={addTask} />)}
      {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onDoubleClick={toggleReminder} />) : ('No tasks to show')}
    </div>
  );
}

export default App;
