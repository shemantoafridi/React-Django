import React from 'react';
import './styles.css';

const Task = ({ task, toggleTask, deleteTask }) => {
    return (
        <div className={`task ${task.completed ? 'completed' : ''}`}>

             {/* Toggle Task Completion */}
            <div className="task-status">
                <button
                    className={`toggle ${task.completed ? 'completed-btn' : 'pending-btn'}`}
                    onClick={() => toggleTask(task.id, task.completed)}
                >
                    {task.completed ? <i className="material-icons">done</i> : <i className="material-icons">close</i>}
                </button>
            </div>
            {/* Task Name and Delete Button */}
            <div className="task-info">
                <span>{task.name}</span>
                <button className="delete" onClick={() => deleteTask(task.id)}>
                    <i className="material-icons">delete</i>
                </button>
            </div>
            
           
        </div>
    );
};

export default Task;

