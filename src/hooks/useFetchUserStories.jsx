import { useState, useEffect } from "react";

export const useFetchUserStories = () => {
    const [state, setState] = useState({
        data: [],
        loading: true
    });

    const getUserStories = async () => {
        const url = 'https://lamansysfaketaskmanagerapi.onrender.com/api/stories';
        const token = localStorage.getItem("authToken");

        try {
            // Primero, obtenemos las stories
            const storiesResp = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    auth: token,
                }
            });

            const storiesData = await storiesResp.json();
            
            // Ahora, obtenemos los usuarios para poder filtrar
            const usersResp = await fetch('https://lamansysfaketaskmanagerapi.onrender.com/api/users', {
                headers: {
                    'Content-Type': 'application/json',
                    auth: token,
                }
            });
            
            const usersData = await usersResp.json();
            
            // Buscamos el ID del usuario actual por su username
            const username = localStorage.getItem("username");
            const currentUser = usersData.data.find(user => user.username === username);
            
            if (!currentUser) {
                console.error("Current user not found");
                return [];
            }

            // Filtramos las stories donde el usuario está asignado
            const filteredStories = storiesData.data.filter(story => 
                story.assignedTo && story.assignedTo.includes(currentUser._id)
            );
            //...Y las retornamos.
            return filteredStories;
        } catch (error) {
            console.error("Error:", error);
            return [];
        }
    };

    useEffect(() => {
        getUserStories()
            .then(stories => {
                setState({
                    data: stories,
                    loading: false
                });
            });
    }, []); 

    return state;
};