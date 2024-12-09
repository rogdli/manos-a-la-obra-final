import { useState, useEffect } from "react";

export const useFetchUserStories = () => {
    const [state, setState] = useState({
        data: [],
        loading: true,
        error: null
    });

    const getUserStories = async () => {
        const url = 'http://localhost:3000/api/stories';
        const token = localStorage.getItem("authToken");

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const result = await response.json();

            if (response.ok) {
                return result.data;
            } else {
                throw new Error(result.message || "Error al obtener las historias");
            }
        } catch (error) {
            console.error("Error al obtener las historias:", error);
            throw error;
        }
    };

    useEffect(() => {
        getUserStories()
            .then(stories => {
                setState({
                    data: stories,
                    loading: false,
                    error: null
                });
            })
            .catch(error => {
                setState({
                    data: [],
                    loading: false,
                    error: error.message
                });
            });
    }, []);

    return state;
};