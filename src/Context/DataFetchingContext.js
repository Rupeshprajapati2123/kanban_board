import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const DataFetchingContext = createContext();

export const useDataFetching = () => {
  return useContext(DataFetchingContext);
};

export const DataFetchingProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
        setTickets(response.data.tickets);
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <DataFetchingContext.Provider value={{ tickets, users }}>
      {children}
    </DataFetchingContext.Provider>
  );
};
