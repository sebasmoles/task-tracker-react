import React from 'react';
import { FaTimes } from 'react-icons/fa'; 

const Task = ({ task, onDelete, onDoubleClick }) => {    
  return (
    <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onDoubleClick(task.id)}>
        <h3>{ task.text }  <FaTimes className='fa-times' onClick={() => onDelete(task.id)} /></h3>
        <p>{ task.date }</p>
    </div>
  )
};

export default Task;
