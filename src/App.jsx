import { useState } from 'react';
import './App.css';
import AddTask from './components/AddTask';
import Header from './components/Header';
import Task from './components/Task';
import Tasks from './components/Tasks';


function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState(
    [
        {
            id: 1,
            text: 'Doctors Appointment',
            day: 'Feb 5th at 2:30pm',
            reminder: true,
        },
        {
            id: 2,
            text: 'Meeting at School',
            day: 'Feb 6th at 1:30pm',
            reminder: false,
        },
        {
            id: 3,
            text: 'Food Shoping',
            day: 'Feb 7th at 1:30pm',
            reminder: false,
        },
        {
            id: 4,
            text: 'Client Meeting',
            day: 'Feb 8th at 8:30am',
            reminder: true,
        }
    
])

// Add task
const addTask = (task) => {
  const id = Math.floor(Math.random() * 10000) + 1
  const newTask = {id, ...task}
  setTasks([...tasks, newTask])
}

// Delete task
const deleteTask = (id) => {
  setTasks(tasks.filter((task) => task.id !==id ))
}

//toggle Reminder
// Two times click to change the reminder value :=)
const toogleReminder = (id)=> {
  setTasks(tasks.map((task) => task.id === id
  ? { ...task, reminder: !task.reminder } : task
  ))
}
  return (
    <div className="container">
    <Header onAdd={()=> setShowAddTask(!showAddTask)} />
    {showAddTask && <AddTask onAdd={addTask} /> }
    {tasks.length > 0 ? <Tasks tasks={tasks} 
    onDelete = {deleteTask} onToogle={toogleReminder} /> : 'No Tasks To Show'}
    </div>
  );
}

export default App;
