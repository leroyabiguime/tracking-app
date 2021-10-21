import React from 'react'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'

const UpdateTask = ({updateTaskData}) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState('')
   function makeEmpty(){
setText('')
setDay('')
setReminder(false)
    }

    const onSubmit = (e) => {
        e.preventDefault()
            const updTask = {
              'text': text,
              'day': day,
              'reminder': reminder
            }
            const res =  fetch(`http://localhost:5000/tasks/${id}`, {
              method: 'PUT',
              headers: {
                'Content-type': 'application/json'
              },
              body: JSON.stringify(updTask)
            }).then(res => res.json())
            .then(
                (result) => {
                    if(result) {
                        window.location.href ='/'
                    }
                }
            )
          

        makeEmpty()
    }
    //Get and fill update form
    const {id} = useParams()
    useEffect(() => {
      fetch("http://localhost:5000/tasks/"+id)
      .then(res => res.json())
      .then(
        (result) => {
          setText(result.text)
          setDay(result.day)
          setReminder(result.reminder)
          console.log(result.text)
        }
      )
    },[id])
  
    return (
<form className='add-form' onSubmit={onSubmit} >
            <div className='form-control'>
                <label>Task</label>
                <input type='text'
                value={text}
                onChange={ (e) => setText(e.target.value)} 
                />
            </div>
            <div className='form-control'>
                <label>Day & Time</label>
                <input type='text'
                value={day}
                onChange={ (e) => setDay(e.target.value)} 
                />
            </div>
            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input type='checkbox'
                checked={reminder}
                value={reminder}
                onChange={ (e) => setReminder(e.currentTarget.checked)}
                />
            </div>
            <input type='submit' value='Update Task' className='btn btn-block'/>
        </form> 
    )
}

export default UpdateTask
