import { useState, useEffect } from "react";

export const useFetchProjectsById = (projectId) => {

    const getProjectsById = async (projectId) => {
        const url = `http://localhost:3000/api/projects/${projectId}`;
        const token = localStorage.getItem("authToken");
        console.log("Token obtenido:", token);
        
        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            }
        });

        if (!resp.ok) {
            throw new Error('Error fetching projects');
          }
      
          const projects = await resp.json();
          return projects;
    };

    const [state, setState] = useState({
        data: null,
        loading: true
    });
    
    useEffect(() => {
        getProjectsById(projectId)
            .then(project => {
                console.log("Projects data:", project);

                setState({
                    data: project,
                    loading: false
                });
            })
            .catch(() => {
                setState({
                    data: null,
                    loading: false
                });
            });
    }, [projectId]);

    return state;
};
