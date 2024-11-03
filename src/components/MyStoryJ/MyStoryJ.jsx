import { Link } from 'react-router-dom';
import { useFetchUsersById } from '../../hooks/useFetchUsersById';
import "../../styles/styles.css";

export const MyStoryJ = ({ story }) => {
    const assignedToArray = story.assignedTo 
        ? String(story.assignedTo).split(',').map(id => id.trim())
        : [];

    const { usernames } = useFetchUsersById(assignedToArray);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB');
    };

    return (
        <div>
            <Link to={`/my-stories/${story._id}`} className='story-link'>
                <div className='story-j'>
                    <p className="story-name">{story.name}</p>
                    <p className="story-description">{story.description}</p>
                    <h5>Status: {story.status}</h5>
                    <p>Created: {formatDate(story.created)}</p>
                    <p>
                        Assigned to: {assignedToArray.length > 0
                            ? assignedToArray.map(id => usernames[id] || id).join(', ')
                            : "No assignments"
                        }
                    </p>
                </div>
            </Link>
        </div>
    );
};