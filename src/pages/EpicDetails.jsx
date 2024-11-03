import React from "react";
import { useFetchStories } from "../hooks/useFetchStories";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { StoryJ } from "../components/StoryJ/StoryJ";
import "../styles/styles.css";
import { useFetchEpicsById } from "../hooks/useFetchEpicsById";

export const EpicDetails = () => {
    const { epicId, projectId } = useParams();
    const { data: epicsData, loading: loadingEpic } = useFetchEpicsById(epicId); 
    const { data: storiesEpic, loading: loadingStories } = useFetchStories(epicId); 

    return (
        <>
            <Navbar/>
            <div className="epic-container">
                <h1>Epic details</h1>
                {loadingEpic ? <p>Loading epics...</p> : null}
                {epicsData && (
                    <>
                        <div>
                            <h2 className = "epic-name">{epicsData.name}</h2> 
                            <p>{epicsData.description}</p>
                            <p>{epicsData.icon}</p> 
                        </div>

                        <div>
                            <h3>Stories:</h3>
                            {loadingStories ? <p>Loading stories...</p> : null}
                            {storiesEpic && (
                                <ul className="story-link">
                                    {storiesEpic.map((story) => (
                                        <StoryJ
                                            key={story._id}
                                            story={story}
                                        />
                                    ))}
                                </ul>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default EpicDetails;