import { useState, useEffect } from "react";

export const useFetchUsersById = (userIds) => {
  const getUserById = async (userId) => {
    const url = `http://localhost:3000/api/users/${userId}`;
    const token = localStorage.getItem("authToken");

    try {
      const resp = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });

      if (resp.status === 404) {
        console.error(`User with ID ${userId} not found`);
        return null;
      } else if (!resp.ok) {
        console.error(`Error fetching user with ID ${userId}: ${resp.status} - ${resp.statusText}`);
        throw new Error(`Failed to fetch user with ID ${userId}`);
      }

      const user = await resp.json();
      return user;
    } catch (error) {
      console.error(`Error fetching user with ID ${userId}:`, error);
      return null;
    }
  };

  const [state, setState] = useState({
    users: {},
    usernames: {},
    loading: true
  });

  useEffect(() => {
    const fetchUsers = async () => {
      if (userIds && userIds.length > 0) {
        try {
          const usersData = await Promise.all(
            userIds.map(userId => getUserById(userId))
          );

          const users = usersData.reduce((acc, user) => {
            if (user) {
              acc[user._id] = user;
            }
            return acc;
          }, {});

          const usernames = usersData.reduce((acc, user) => {
            if (user) {
              acc[user._id] = user.name?.first && user.name?.last 
              ? `${user.name.first} ${user.name.last}` 
              : user.username;            }
            return acc;
          }, {});

          setState({
            users,
            usernames,
            loading: false
          });
        } catch (error) {
          console.error('Error fetching users:', error);
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