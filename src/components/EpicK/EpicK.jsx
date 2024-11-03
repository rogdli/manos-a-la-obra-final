import { Link } from "react-router-dom"
import '../../styles/styles.css'; 

export const EpicK = ({ epic }) => {
    return(
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