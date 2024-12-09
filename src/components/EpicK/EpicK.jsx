import { Link } from "react-router-dom"
import '../../styles/styles.css'; 

// Carta de la épica

export const EpicK = ({ epic }) => {
    return(
        // Linkea a la épica asociada al proyecto
        <Link
        to={`/my-projects/${epic.project}/${epic._id}`}
        className = 'epic-link' >
        
        <div className = 'epic-k'>
            <h2 className = 'epic-name'>{epic.name}</h2>
            <p className = 'epic-description'>
                {epic.description}
            </p>
            <p className = 'epic-icon'>{epic.icon}</p>
        </div>
        </Link>
    );
}