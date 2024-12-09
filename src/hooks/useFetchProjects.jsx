import { useEffect, useState } from "react";

export const useFetchProjects = () => {
  // Función para obtener proyectos desde la API
  const getProjects = async () => {
    const url = 'http://localhost:3000/api/projects';
    const token = localStorage.getItem("authToken");  // Obtiene el token de autenticación desde localStorage
    
    const resp = await fetch(url, {
      // Solicitud
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 

      }
    });
    if (!resp.ok) {
      throw new Error('Error fetching projects');
    }

    const projects = await resp.json();
    return projects;
  };



  // Estado para almacenar los datos y el estado de carga
  const [state, setState] = useState({
    data: [],
    loading: true,  // Inicialmente está cargando
  });

  // useEffect se ejecuta después de que el componente se monte
  useEffect(() => {
    // Llama a getProjects y actualiza el estado con los datos o en caso de error
    getProjects()
      .then((projects) => {
        console.log("Datos del proyecto:", projects); // Agregar este log

        setState({
          data: projects,  // Almacena los proyectos obtenidos
          loading: false,  // Cambia el estado de carga a false
        });
      })
      .catch(() => {
        setState({
          data: [],  // ...Si hay un error, no hay datos
          loading: false,  // Cambia el estado de carga a false
        });
      });
  }, []);  // El array vacío asegura que se ejecute solo al montarse el componente

  return state;  // Devuelve el estado actual de los proyectos y el estado de carga
};
