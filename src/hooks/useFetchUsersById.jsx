import { useState, useEffect } from "react";

export const useFetchUsersById = (userIds) => {
  const getUserById = async (userId) => {
    const url = `https://lamansysfaketaskmanagerapi.onrender.com/api/users/${userId}`;
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
    users: {}, // objeto para mapear ID a usuario
    usernames: {}, // objeto para mapear ID a nombre de usuario
    loading: true
  });

  useEffect(() => {
    const fetchUsers = async () => {
      if (userIds && userIds.length > 0) {
        try {
          //...Se ejecutan todas las solicitudes en paralelo usando Promise.all
          const usersData = await Promise.all(
            userIds.map(userId => getUserById(userId))
          );
          
          // crear objeto de mapeo de ID a usuario y nombre de usuario
          const usersMap = usersData.reduce((acc, user) => {
            acc.users[user._id] = user;
            acc.usernames[user._id] = `${user.name.first} ${user.name.last}`;
            return acc;
          }, { users: {}, usernames: {} });

          setState({
            users: usersMap.users,
            usernames: usersMap.usernames,
            loading: false
          });
        } catch (error) {
          setState({
            users: {},
            usernames: {},
            loading: false
          });
        }
      } else {
        setState({
          users: {},
          usernames: {},
          loading: false
        });
      }
    };

    fetchUsers();
  }, [userIds]);

  return state;
};