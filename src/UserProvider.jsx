import React, { createContext, useState, useEffect } from 'react';
import Loading from './loading';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios.get("https://myeasykart.codeyogi.io/me", {
        headers: {
          Authorization: token
        }
      }).then((response) => {
        setUser(response.data);
        setLoading(false);
      }).catch(() => {
        localStorage.removeItem("token");
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return (<Loading />);
  }

  const logout = () => {
    localStorage.setItem("token", "");
    setUser(null); // Clear user state
    navigate('/login'); // Redirect to login page
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
