import Task from "./Task"

const Tasks = ({tasks, onDelete, onToogle}) => {
   
    return (
        <>
        {tasks.map((task, index) => (
            <Task key={index} task={task}
            onDelete={onDelete} onToogle={onToogle}></Task>))}
        </>
    )
}

export default Tasks
