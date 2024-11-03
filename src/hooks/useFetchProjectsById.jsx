import { useState, useEffect } from "react";


export const useFetchProjectsById = (projectId) => {

    const getProjectsById = async (projectId) => {
        const url = `https://lamansysfaketaskmanagerapi.onrender.com/api/projects/${projectId}`;
        const token = localStorage.getItem("authToken");

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                auth: token,
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const { data } = await response.json();
        return data;
    };

    const [state, setState] = useState({
        data: null,
        loading: true
    });
    
    useEffect(() => {
        getProjectsById(projectId)
            .then(project => {
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
