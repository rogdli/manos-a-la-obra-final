import { useState, useEffect } from "react";

export const useFetchStories = (epicId) => {
    const getStoriesEpic = async (epicId) => {
        const url = `https://lamansysfaketaskmanagerapi.onrender.com/api/epics/${epicId}/stories`;
        const token = localStorage.getItem("authToken");

        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                auth: token,
            }
        });

        const responseData = await resp.json();
        return responseData.data;
    };

    const [state, setState] = useState({
        data: [],
        loading: true
    });

    useEffect(() => {
        getStoriesEpic(epicId)
            .then(stories => {
                setState({
                    data: stories,
                    loading: false
                });
            })
            .catch(error => {
                console.error(error);
                setState({
                    data: [],
                    loading: false
                });
            });
    }, [epicId]);

    return state;
};
