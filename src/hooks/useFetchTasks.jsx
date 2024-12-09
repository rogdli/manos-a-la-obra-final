import { useState, useEffect } from "react";

export const useFetchTasks = (storyId) => {

    const getTasks = async (storyId) => {
        const url = `http://localhost:3000/api/stories/${storyId}/tasks`;
        const token = localStorage.getItem("authToken");

        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!resp.ok) {
            throw new Error(`Error: ${resp.status}`);
        }

        const tasks = await resp.json();
        return tasks;
    };

    const [state, setState] = useState({
        data: [],
        loading: true
    });

    useEffect(() => {
        if (storyId){
            getTasks(storyId)
            .then(tasks => {
                setState({
                    data: tasks,
                    loading: false
                });
            })
            .catch((error) => {
                console.log(error);
                setState({
                    data: [],
                    loading: false
                });
            });
        }
        else{
            setState({
                data: [],
                loading: false
            });
        }
 
    }, [storyId]);

    return state;
};
