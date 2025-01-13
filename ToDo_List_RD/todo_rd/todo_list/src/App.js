import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Task from './Task'; // Import the Task component
import './styles.css';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/tasks/');
        setTasks(response.data);
        console.log(tasks);
    };

    const addTask = async () => {
        if (newTask.trim()) {
            const response = await axios.post('http://127.0.0.1:8000/api/tasks/add/', {
                name: newTask,
            });
            setTasks([...tasks, response.data]);
            setNewTask('');
        }
        console.log(tasks);
    };

    const deleteTask = async (id) => {
        await axios.delete(`http://127.0.0.1:8000/api/tasks/${id}/delete/`);
        setTasks(tasks.filter((task) => task.id !== id));
        console.log(tasks);
    };

    const toggleTask = async (id, completed) => {
        await axios.put(`http://127.0.0.1:8000/api/tasks/${id}/update/`, {
            completed: !completed,
        });
        fetchTasks();
        console.log(tasks);
    };

    return (
        // console.log(tasks),
        <div>            
            <div id="newtask" className="container1">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task"
                />
                <button onClick={addTask}><i className="material-icons">add_task</i></button>
            </div>
            <table id="tasks" className="container2">
                <h1>Task List</h1>
                {tasks.map((task) => (
                    <Task
                        key={task.id}
                        task={task}
                        toggleTask={toggleTask}
                        deleteTask={deleteTask}
                    />
                ))}
            </table>
        </div>
    );
};

export default App;
