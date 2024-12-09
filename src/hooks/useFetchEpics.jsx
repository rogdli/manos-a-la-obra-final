import { useState, useEffect } from "react";
export const useFetchEpics = (projectId) => {

    const getEpics = async (projectId) => {
        const url = `http://localhost:3000/api/projects/${projectId}/epics`;
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
        data: [],
        loading: true
    });

    useEffect(() => {
        if (projectId){
            getEpics(projectId)
            .then(epics => {
                setState({
                    data: epics,
                    loading: false
                })
            })
            .catch((error) => {
                console.log(error)
                setState({
                    data: [],
                    loading: false
                })
            })
        }
        else{
            setState({
                data: [],
                loading: false
            })
        }
 
    }, [projectId])

    return state;
};
