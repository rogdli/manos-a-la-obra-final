import { useState, useEffect } from "react";

export const useFetchStories = (epicId) => {
    const getStoriesEpic = async (epicId) => {
        const url = `http://localhost:3000/api/epics/${epicId}/stories`;
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

        const stories = await resp.json();
        return stories;
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
