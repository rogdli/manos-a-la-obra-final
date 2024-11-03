import { ProjectN } from "../components/ProjectN/ProjectN"
import Navbar from "../components/Navbar/Navbar"
import { useFetchProjects } from '../hooks/useFetchProjects'
import "../styles/styles.css";

export const MyProjects = () => {

    const { data: projects, loading: loadingProjects } = useFetchProjects();

    return (
        <>
            <Navbar />
            <div className="container">
                <h2>My projects</h2>
                <div>
                    {loadingProjects ? (
                        <p>Loading...</p>
                    ) : projects && projects.length > 0 ? (
                        projects.map((project) => (
                            <ProjectN key={project._id} project={project} />
                        ))
                    ) : (
                        <p>No projects</p>
                    )}
                </div>
            </div>
        </>
    );
};