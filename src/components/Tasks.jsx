import Task from "./Task"

const Tasks = ({tasks, onDelete, onToogle, showTask, onUpdate}) => {
   
    return (
        <>
        {tasks.map((task, index) => (
            <Task key={index} task={task}
            showTask={showTask}
            onUpdate={onUpdate}
            onDelete={onDelete} onToogle={onToogle}></Task>))}
        </>
    )
}

export default Tasks
