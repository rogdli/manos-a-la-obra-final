import { useState, useEffect } from "react";


export const useFetchEpicsById = (epicId) => {
    const getEpicsById = async (epicId) => {
        const url = `http://localhost:3000/api/epics/${epicId}`;
        const token = localStorage.getItem("authToken");

        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            }
        });

        const epics = await resp.json();
        return epics; 
        
    };

    const [state, setState] = useState({
        data: null,
        loading: true
    });

    useEffect(() => {
        getEpicsById(epicId)
            .then(epic => {
                setState({
                    data: epic,
                    loading: false
                });
            })
            .catch(() => {
                setState({
                    data: null,
                    loading: false
                });
            });
    }, [epicId]);

    return state;
};
