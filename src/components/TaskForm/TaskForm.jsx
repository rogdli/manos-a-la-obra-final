import React, { useState } from 'react';

const TaskForm = ({ storyId, onTaskAdded }) => {
    const [newTask, setNewTask] = useState({
        name: "",
        description: "",
        story: storyId,
        status: "TO_DO",
        dueDate: "",
        done: false
    });
    
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const errors = {};
        if (!newTask.name.trim()) {
            errors.name = "Name is required";
        }
        if (newTask.description && newTask.description.length < 10) {
            errors.description = "Description must be at least 10 characters long";
        }
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
    
        setIsSubmitting(true);
        const token = localStorage.getItem("authToken");
    
        const taskData = { 
            ...newTask, 
            done: newTask.status === "DONE" // Si el estado es DONE, marca como completado
        };
        
        
    
        console.log("Data being sent:", taskData); // Revisa si dueDate es correcto
    
        try {
            const response = await fetch('https://lamansysfaketaskmanagerapi.onrender.com/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    auth: token,
                },
                body: JSON.stringify(taskData),
            });
    
            const responseData = await response.json();
            console.log("Response from server:", responseData); // Revisa la respuesta del servidor
    
            if (response.ok) {
                setNewTask({
                    name: "",
                    description: "",
                    story: storyId,
                    status: "TO_DO",
                    dueDate: ""
                });
                onTaskAdded();
            } else {
                alert("Error creating task: " + responseData.message);
            }
        } catch (error) {
            console.error("Error adding task:", error);
            alert("Error creating task");
        } finally {
            setIsSubmitting(false);
        }
    };
    
    
    

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Add New Task</h3>
                <form onSubmit={handleAddTask}>
                    <div>
                        <input
                            type="text"
                            placeholder="Task name"
                            value={newTask.name}
                            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                            disabled={isSubmitting}
                        />
                        {validationErrors.name && (
                            <span className="error">{validationErrors.name}</span>
                        )}
                    </div>
                    <div>
                        <textarea
                            placeholder="Task description (min 10 characters)"
                            value={newTask.description}
                            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                            disabled={isSubmitting}
                        />
                        {validationErrors.description && (
                            <span className="error">{validationErrors.description}</span>
                        )}
                    </div>
                    <div>
                <select
                            value={newTask.status}
                            onChange={(e) => setNewTask({ 
                                ...newTask, 
                                status: e.target.value, 
                                done: e.target.value === "DONE" // Actualiza done según el estado
                            })}
                            disabled={isSubmitting}
                        >
                            <option value="TO_DO">To Do</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="DONE">Done</option>
                </select>

                    </div>
                    <div className="button-group">
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Creating..." : "Create Task"}
                        </button>
                        <button 
                            type="button" 
                            onClick={() => onTaskAdded()}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;
