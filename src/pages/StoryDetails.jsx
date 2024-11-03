import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { useFetchStoriesById } from "../hooks/useFetchStoriesById";
import { useFetchTasks } from '../hooks/useFetchTasks';
import TaskForm from "../components/TaskForm/TaskForm";
import TaskList from "../components/TaskList/TaskList";
import DeleteConfirmation from "../components/StoryDeleteConfirmation/StoryDeleteConfirmation";
import "../styles/styles.css";

export const StoryDetails = () => {
    const { storyId } = useParams();
    const { data: storiesData, loading: loadingStories } = useFetchStoriesById(storyId);
    const { data: storiesTask, loading: loadingTasks } = useFetchTasks(storyId);
    
    const [showAddTaskForm, setShowAddTaskForm] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    const handleTaskAdded = () => {
        setShowAddTaskForm(false);
        window.location.reload();
    };

    const handleDeleteClick = (task) => {
        setTaskToDelete(task);
        setShowDeleteConfirm(true);
    };

    const handleDeleteTask = async () => {
        if (!taskToDelete) return;

        setIsSubmitting(true);
        const token = localStorage.getItem("authToken");

        try {
            const response = await fetch(`https://lamansysfaketaskmanagerapi.onrender.com/api/tasks/${taskToDelete._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    auth: token,
                }
            });

            if (response.ok) {
                setShowDeleteConfirm(false);
                setTaskToDelete(null);
                window.location.reload();
            } else {
                const error = await response.json();
                alert("Error deleting task: " + error.message);
            }
        } catch (error) {
            console.error("Error deleting task:", error);
            alert("Error deleting task");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className='story-container'>
                <h1>Story details</h1>
                {loadingStories && <h3>Loading story details...</h3>}
    
                {storiesData && (
                    <>
                        <div>
                            <h2 className='story-name'>{storiesData.name}</h2>
                            <p className='story-description'>{storiesData.description}</p>
                        </div>
    
                        <div>
                            <div className="tasks-header">
                                <h3>Tasks</h3>
                                <button onClick={() => setShowAddTaskForm(true)}>Add Task</button>
                            </div>
                            
                            {/* Coloca el formulario antes de la lista de tareas */}
                            {showAddTaskForm && (
                                <TaskForm 
                                    storyId={storyId} 
                                    onTaskAdded={handleTaskAdded} 
                                />
                            )}
    
                            {loadingTasks && <h3>Loading tasks...</h3>}
                            <TaskList 
                                tasks={storiesTask} 
                                storyId={storyId} 
                                onDeleteClick={handleDeleteClick} 
                            />
                        </div>
                    </>
                )}
    
                {showDeleteConfirm && (
                    <DeleteConfirmation 
                        onConfirmDelete={handleDeleteTask} 
                        onCancel={() => setShowDeleteConfirm(false)} 
                        isSubmitting={isSubmitting} 
                    />
                )}
            </div>
        </>
    );
    
};
