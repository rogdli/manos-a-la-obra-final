import React from 'react';
import { TaskI } from '../TaskI/TaskI';

const TaskList = ({ tasks, storyId, onDeleteClick }) => {
    return (
        <div>
            {tasks.length > 0 ? (
                <ul>
                    {tasks
                        .filter(task => task.story === storyId)
                        .map(task => (
                            <div key={task._id} className="task-item">
                                <TaskI task={task} />
                                <button 
                                    onClick={() => onDeleteClick(task)}
                                    className="delete-button"
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    }
                </ul>
            ) : (
                <span>No tasks associated with this story.</span>
            )}
        </div>
    );
};

export default TaskList;
