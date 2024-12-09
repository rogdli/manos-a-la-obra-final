import { useState, useEffect } from "react";

export const useFetchStoriesById = (storiesId) => {
    const getStoriesById = async (storiesId) => {
        const url = `http://localhost:3000/api/stories/${storiesId}`;
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

        const story = await resp.json();
        return story;
    };

    const [state, setState] = useState({
        data: null,
        loading: true
    });

    useEffect(() => {
        getStoriesById(storiesId)
            .then(story => {
                setState({
                    data: story,
                    loading: false
                });
            })
            .catch(() => {
                setState({
                    data: null,
                    loading: false
                });
            });
    }, [storiesId]);

    return state;
};
