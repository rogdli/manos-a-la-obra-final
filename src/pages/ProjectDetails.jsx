import React, { useState, useEffect } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar/Navbar";
import "../styles/styles.css";
import { useFetchProjectsById } from '../hooks/useFetchProjectsById';
import { useFetchEpics } from '../hooks/useFetchEpics';
import { EpicK } from '../components/EpicK/EpicK';
import { useFetchUsersById } from '../hooks/useFetchUsersById';

const ProjectDetails = () => {
    const { projectId } = useParams();
    const { data: projectsData, loading: projectLoading } = useFetchProjectsById(projectId);
    const { data: projectsEpics } = useFetchEpics(projectId);
    const { users, usernames, loading: usersLoading } = useFetchUsersById(projectsData?.members);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(projectLoading || usersLoading);
    }, [projectLoading, usersLoading]);

    return (
        <>
            <Navbar />
            <div className='project-container'>
                <h1>Project details</h1>
                {isLoading && <h3>Loading project details...</h3>}

                {projectsData && (
                    <>
                        <div>
                            <h2 className='project-name'><p>{projectsData.icon}</p>{projectsData.name}</h2>
                            <p className='project-description'>{projectsData.description}</p>
                            <p className='project-members'>
                                <br />
                                Members:
                                {projectsData.members && projectsData.members.length > 0 ? (
                                    <ul>
                                        {projectsData.members.map((memberId) => (
                                            <li key={memberId}>
                                                {usersLoading ? 'Loading...' : usernames[memberId]}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <span> No members in this project.</span>
                                )}
                            </p>
                        </div>

                        <div className='project-epics'>
                            <h3>Epics</h3>
                            {projectsEpics && (
                                <ul>
                                    {projectsEpics.map(epic => (
                                        <EpicK  key={epic._id} 
                                                epic={epic} />
                                    ))}
                                </ul>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default ProjectDetails;