import { useState, useEffect } from "react";
///el proposito del hook es guardar el nombre del usuario para mostrarlo en el home
const useUsername = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return username;
};

export default useUsername;
