import React from 'react';
import Task from './Task';

const Tasks = ({ tasks, onDelete, onDoubleClick }) => {
  return (
    <div>
        {tasks.map(task => (
            <Task task={task} key={task.id} onDelete={onDelete} onDoubleClick={onDoubleClick} />
        ))} 
    </div>
  )
};

export default Tasks;
