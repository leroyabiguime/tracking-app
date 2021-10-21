import { FaTimes, FaEdit } from 'react-icons/fa'

const Task = ({task, onDelete, onToogle, showTask, onUpdate}) => {
    return (
        <div  className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={
            () => onToogle(task.id)
        }>
            <h3>{task.text}
                <div>
                <FaEdit style={{color: 'green'}}
            onClick={()=> onUpdate(task.id)}
             />
             <FaTimes style={{color: 'red', cursor: 'pointer'}} 
                onClick={() => onDelete(task.id)}
             />
                </div>
            </h3>
            <p>{task.day}</p>
        </div>
    )
}

export default Task
