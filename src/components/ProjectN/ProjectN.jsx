import { Link } from 'react-router-dom';
import { useFetchUsersById } from '../../hooks/useFetchUsersById';
import "../../styles/styles.css"

export const ProjectN = ({ project }) => {
    
    const memberIds = project.members;
    
    const { usernames } = useFetchUsersById(memberIds);

    return (
        <div>
            <Link to={`/my-projects/${project._id}`} className='project-link'>
                <div className='project-n'>
                    {project.icon}
                    <h2>{project.name}</h2>
                    <p>{project.description}</p>
                    <p>
                        Members: {project.members.length > 0 
                            ? project.members.map(memberId => usernames[memberId] || memberId).join(', ') 
                            : "No members"
                        }
                    </p>
                </div>
            </Link>
        </div>
    );
};