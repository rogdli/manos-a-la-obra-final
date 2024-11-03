import '../../styles/styles.css';

export const TaskI = ({ task }) => {
    
    const formatDate = (dateString) => {
        if (!dateString) return "No date";
        
        const date = typeof dateString === "string" ? new Date(dateString) : dateString;
        return date.toLocaleDateString('en-GB');
    };

    return (
        <div className='task-i'>
            <h2 className='task-name'>{task.name}</h2>
            <h3 className='task-description'>{task.description}</h3>
            Created: {formatDate(task.created)}
            <p className={`task-status ${task.done ? "complete" : "incomplete"}`}>
                {task.done ? "Completed" : "Incomplete"}
            </p>       
             </div>
    );
};
