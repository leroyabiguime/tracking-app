import React ,{ useEffect, useState } from 'react';
import './App.css';
import AddTask from './components/AddTask';
import Header from './components/Header';
import Task from './components/Task';
import Tasks from './components/Tasks';
import UpdateTask from './components/UpdateTask';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";


function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  const [showUpdateTask, setShowUpdateTask] = useState(false)


  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
   getTasks()
  }, [])

// Fetch Tasks
const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
}

// Fetch Task
const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json()

  return data
}

// Add task
const addTask = async (task) => {
  const res = await fetch('http://localhost:5000/tasks',{
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(task)
  })
  const data = await res.json()
  setTasks([...tasks, data])
}

// Delete task
const deleteTask = async (id) => {
 const res = await fetch(`http://localhost:5000/tasks/${id}`,{
    method: 'DELETE',
  })
  res.status === 200 ? setTasks(tasks.filter((task) => task.id !== id)) : alert('Error deleting this task')

}
const showTask = async (id) => {
  return await fetchTask(id)
}
// Go Update page
const goUpdate = (id) => {
  window.location = '/update/'+id
}
//toggle Reminder
// Two times click to change the reminder value :=)
const toogleReminder = async (id)=> {

  const taskToToggle = await fetchTask(id)
  const updTask = {...taskToToggle,
    reminder: !taskToToggle.reminder
  }
  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(updTask)
  })
  const data = await res.json()


  setTasks(tasks.map((task) => task.id === id
  ? { ...task,reminder: data.reminder } : task
  ))
}

  return (
    <Router>
      <div className="container">
    <Header onAdd={()=> setShowAddTask(!showAddTask)} showAdd={showAddTask} />
    {showAddTask && <AddTask onAdd={addTask} /> }
    {showUpdateTask && <UpdateTask getData={showTask} showAdd={showAddTask} /> }
    {tasks.length > 0 ? <Tasks tasks={tasks} 
    onUpdate={goUpdate}
    onDelete = {deleteTask} 
    onToogle={toogleReminder} /> : 'No Tasks To Show'}
      <Switch>
    <Route path='/update/:id' component={UpdateTask} />
    </Switch>

    </div>
    </Router>
  );
}

export default App;
