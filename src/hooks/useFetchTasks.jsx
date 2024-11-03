import { useState, useEffect } from "react";


export const useFetchTasks = (storyId) => {

    const getTasks = async (storyId) => {
        const url = `https://lamansysfaketaskmanagerapi.onrender.com/api/stories/${storyId}/tasks`;
        const token = localStorage.getItem("authToken");

        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                auth: token,
            }
        });

        const { data } = await resp.json();
        return data;
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
